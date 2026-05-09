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

export class ContactError extends Error {
  readonly code: string;
  readonly fields?: Record<string, string>;

  constructor(code: string, message: string, fields?: Record<string, string>) {
    super(message);
    this.name = 'ContactError';
    this.code = code;
    this.fields = fields;
  }
}

const API_URL = '/api/contact';
const REQUEST_TIMEOUT_MS = 15_000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9]{9,15}$/;
const PHONE_FILLER_REGEX = /[\s\-()]/g;

const NAME_MIN = 2;
const EMAIL_MAX = 254;
const EVENT_MIN = 4;
const GUESTS_MIN = 10;
const GUESTS_MAX = 100;
const GUESTS_MIN_DIGITS = 2;
const GUESTS_MAX_DIGITS = 3;
const AGE_MIN = 2;
const MESSAGE_MIN = 10;

export const normalizePhone = (telefono: string): string =>
  telefono.replace(PHONE_FILLER_REGEX, '');

export const validateEmail = (email: string): boolean =>
  email.length <= EMAIL_MAX && EMAIL_REGEX.test(email);

export const validatePhone = (telefono: string): boolean =>
  PHONE_REGEX.test(normalizePhone(telefono));

export const validateForm = (formData: ContactFormData): ValidationErrorKey | null => {
  if (!formData.nombre || formData.nombre.trim().length < NAME_MIN) {
    return 'nombre';
  }

  if (!formData.email || !validateEmail(formData.email.trim())) {
    return 'email';
  }

  if (!validatePhone(formData.telefono)) {
    return 'telefono';
  }

  if (!formData.evento || formData.evento.trim().length < EVENT_MIN) {
    return 'evento';
  }

  if (!formData.fechaEvento) {
    return 'fechaEventoRequired';
  }

  const [year, month, day] = formData.fechaEvento.split('-').map(Number);
  const fechaEvento = new Date(year, month - 1, day);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (Number.isNaN(fechaEvento.getTime()) || fechaEvento <= hoy) {
    return 'fechaEventoPast';
  }

  const invitados = formData.numInvitados.trim();
  if (!invitados) {
    return 'numInvitadosRequired';
  }

  const invitadosNum = Number(invitados);
  if (
    !Number.isInteger(invitadosNum) ||
    invitadosNum < GUESTS_MIN ||
    invitadosNum > GUESTS_MAX
  ) {
    return 'numInvitadosInvalid';
  }

  if (invitados.length < GUESTS_MIN_DIGITS || invitados.length > GUESTS_MAX_DIGITS) {
    return 'numInvitadosLength';
  }

  if (!formData.mediaEdad || formData.mediaEdad.trim().length < AGE_MIN) {
    return 'mediaEdad';
  }

  if (!formData.mensaje || formData.mensaje.trim().length < MESSAGE_MIN) {
    return 'mensaje';
  }

  return null;
};

const parseErrorBody = (parsed: unknown, status: number): ContactError => {
  if (
    parsed &&
    typeof parsed === 'object' &&
    'error' in parsed &&
    parsed.error &&
    typeof parsed.error === 'object'
  ) {
    const err = parsed.error as {
      code?: unknown;
      message?: unknown;
      fields?: unknown;
    };
    const code = typeof err.code === 'string' ? err.code : `HTTP_${status}`;
    const message = typeof err.message === 'string' ? err.message : '';
    const fields =
      err.fields && typeof err.fields === 'object' && !Array.isArray(err.fields)
        ? (err.fields as Record<string, string>)
        : undefined;
    return new ContactError(code, message, fields);
  }
  return new ContactError(`HTTP_${status}`, '');
};

export const sendContactForm = async (
  formData: ContactFormData,
  noObservationsLabel: string,
  honeypot: string
): Promise<void> => {
  const observaciones = formData.observaciones.trim() || noObservationsLabel;

  let response: Response;
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      body: JSON.stringify({
        nombre: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        telefono: normalizePhone(formData.telefono),
        evento: formData.evento.trim(),
        fechaEvento: formData.fechaEvento,
        numInvitados: Number(formData.numInvitados),
        mediaEdad: formData.mediaEdad.trim(),
        observaciones,
        mensaje: formData.mensaje.trim(),
        website: honeypot,
      }),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new ContactError('CLIENT_TIMEOUT', '');
    }
    throw new ContactError('NETWORK_ERROR', '');
  }

  let parsed: unknown = null;
  try {
    parsed = await response.json();
  } catch {
    if (!response.ok) {
      throw new ContactError(`HTTP_${response.status}`, '');
    }
    throw new ContactError('RESPONSE_PARSE_ERROR', '');
  }

  if (response.ok) {
    return;
  }

  throw parseErrorBody(parsed, response.status);
};
