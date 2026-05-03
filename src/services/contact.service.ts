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

export type ValidationErrorKey =
  | 'nombre'
  | 'email'
  | 'telefono'
  | 'evento'
  | 'fechaEventoRequired'
  | 'fechaEventoPast'
  | 'numInvitadosRequired'
  | 'numInvitadosInvalid'
  | 'numInvitadosLength'
  | 'mediaEdad'
  | 'mensaje';

const API_URL = '/api/contact';

export const sendContactForm = async (
  formData: ContactFormData,
  noObservationsLabel: string
): Promise<ContactResponse> => {
  const observaciones = formData.observaciones.trim() || noObservationsLabel;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      observaciones,
      numInvitados: Number(formData.numInvitados),
    }),
  });

  let data: ContactResponse;
  try {
    data = await response.json();
  } catch {
    throw new Error('RESPONSE_PROCESS_ERROR');
  }

  if (!response.ok) {
    throw new Error(data.message || `HTTP_${response.status}`);
  }

  return data;
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateForm = (formData: ContactFormData): ValidationErrorKey | null => {
  if (!formData.nombre || formData.nombre.trim().length < 2) {
    return 'nombre';
  }

  if (!formData.email || !validateEmail(formData.email)) {
    return 'email';
  }

  if (!formData.telefono || !/^[+]{0,1}[0-9]{9,15}$/.test(formData.telefono)) {
    return 'telefono';
  }

  if (!formData.evento || formData.evento.trim().length < 4) {
    return 'evento';
  }

  if (!formData.fechaEvento) {
    return 'fechaEventoRequired';
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaEvento = new Date(formData.fechaEvento);

  if (fechaEvento <= hoy) {
    return 'fechaEventoPast';
  }

  const invitados = formData.numInvitados.trim();
  const invitadosNum = Number(invitados);

  if (!invitados) {
    return 'numInvitadosRequired';
  }

  if (Number.isNaN(invitadosNum) || invitadosNum <= 0) {
    return 'numInvitadosInvalid';
  }

  if (invitados.length < 2) {
    return 'numInvitadosLength';
  }

  if (!formData.mediaEdad || formData.mediaEdad.trim().length < 2) {
    return 'mediaEdad';
  }

  if (!formData.mensaje || formData.mensaje.trim().length < 10) {
    return 'mensaje';
  }

  return null;
};
