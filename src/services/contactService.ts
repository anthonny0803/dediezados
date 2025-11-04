export interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  evento: string;
  fechaEvento: string;
  mediaEdad: string;
  observaciones: string;
  mensaje: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// Servicio para enviar formulario de contacto
// https://dediezados.com/api/contact.php
const API_URL = "https://dediezados.com/api/contact.php";

export const sendContactForm = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let data: ContactResponse;
    try {
      data = await response.json();
    } catch {
      throw new Error("Error al procesar respuesta del servidor");
    }

    // Si el servidor devuelve error HTTP
    if (!response.ok) {
      throw new Error(data.message || `Error HTTP: ${response.status}`);
    }

    return data;
  } catch (error) {
    // Manejar errores de red o del servidor
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error desconocido al enviar formulario");
  }
};

/**
 * Validar email en el frontend
 */
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validar formulario completo
 */
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

  if (!formData.mediaEdad || formData.mediaEdad.trim().length < 2) {
    return "La media de edad debe tener al menos 2 caracteres";
  }

  // Validar que la fecha sea al menos un día después de hoy
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // eliminar hora para comparar solo fecha
  const fechaEvento = new Date(formData.fechaEvento);

  if (fechaEvento <= hoy) {
    return "La fecha del evento debe ser posterior a hoy";
  }

  if (!formData.mediaEdad || formData.mediaEdad.trim().length < 3) {
    return "La media de edad debe tener al menos 3 caracteres";
  }

  if (!formData.observaciones.trim()) {
    formData.observaciones = "Sin observaciones";
  }

  if (!formData.mensaje || formData.mensaje.trim().length < 10) {
    return "El mensaje debe tener al menos 10 caracteres";
  }

  return null; // Campo válido
};
