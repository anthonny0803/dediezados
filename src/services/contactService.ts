export interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  evento: string;
  fechaEvento: string;
  numInvitados: string;
  mediaEdad: string;
  observaciones: string;
  mensaje: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

const API_URL = "https://api.dediezados.com/contact.php";

export const sendContactForm = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        numInvitados: Number(formData.numInvitados),
      }),
    });

    let data: ContactResponse;
    try {
      data = await response.json();
    } catch {
      throw new Error("Error al procesar respuesta del servidor");
    }

    if (!response.ok) {
      throw new Error(data.message || `Error HTTP: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error desconocido al enviar formulario");
  }
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateForm = (formData: ContactFormData): string | null => {
  if (!formData.nombre || formData.nombre.trim().length < 2) {
    return "El nombre debe tener al menos 2 caracteres";
  }

  if (!formData.email || !validateEmail(formData.email)) {
    return "Email inválido";
  }

  if (!formData.telefono || !/^[+]{0,1}[0-9]{9,15}$/.test(formData.telefono)) {
    return "El teléfono debe tener entre 9 y 15 dígitos numéricos";
  }

  if (!formData.evento || formData.evento.trim().length < 4) {
    return "El tipo de evento debe tener al menos 4 caracteres";
  }

  if (!formData.fechaEvento) {
    return "Debe seleccionar una fecha para el evento";
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaEvento = new Date(formData.fechaEvento);

  if (fechaEvento <= hoy) {
    return "La fecha del evento debe ser posterior a hoy";
  }

  const invitados = formData.numInvitados.trim();
  const invitadosNum = Number(invitados);

  if (!invitados) {
    return "El número de invitados es obligatorio";
  }

  if (Number.isNaN(invitadosNum) || invitadosNum <= 0) {
    return "El número de invitados debe ser un número válido";
  }

  if (invitados.length < 2) {
    return "El número de invitados debe tener al menos 2 caracteres";
  }

  if (!formData.mediaEdad || formData.mediaEdad.trim().length < 2) {
    return "La media de edad debe tener al menos 2 caracteres";
  }

  if (!formData.observaciones.trim()) {
    formData.observaciones = "Sin observaciones";
  }

  if (!formData.mensaje || formData.mensaje.trim().length < 10) {
    return "El mensaje debe tener al menos 10 caracteres";
  }

  return null;
};
