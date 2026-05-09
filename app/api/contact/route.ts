import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONTACT_API_URL = process.env.CONTACT_API_URL ?? 'https://api.dediezados.com/contact.php';
const UPSTREAM_TIMEOUT_MS = 8_000;
const MAX_BODY_BYTES = 10_000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9]{9,15}$/;
const PHONE_FILLER_REGEX = /[\s\-()]/g;
const DATE_ISO_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const EVENT_MIN = 4;
const EVENT_MAX = 80;
const GUESTS_MIN = 10;
const GUESTS_MAX = 100;
const AGE_MIN = 2;
const AGE_MAX = 30;
const NOTES_MAX = 500;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 200;

interface UpstreamPayload {
  nombre: string;
  email: string;
  telefono: string;
  evento: string;
  fechaEvento: string;
  numInvitados: number;
  mediaEdad: string;
  observaciones: string;
  mensaje: string;
}

const errorResponse = (
  code: string,
  message: string,
  status: number,
  fields?: Record<string, string>
) =>
  NextResponse.json(
    fields ? { error: { code, message, fields } } : { error: { code, message } },
    { status }
  );

const successResponse = () => NextResponse.json({ data: { ok: true } }, { status: 200 });

const isString = (v: unknown): v is string => typeof v === 'string';

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const validate = (body: Record<string, unknown>):
  | { kind: 'spam' }
  | { kind: 'invalid'; fields: Record<string, string> }
  | { kind: 'ok'; data: UpstreamPayload } => {
  if (isString(body.website) && body.website.length > 0) {
    return { kind: 'spam' };
  }

  const fields: Record<string, string> = {};

  const nombre = isString(body.nombre) ? body.nombre.trim() : '';
  if (nombre.length < 2 || nombre.length > NAME_MAX) {
    fields.nombre = 'Nombre inválido.';
  }

  const email = isString(body.email) ? body.email.trim().toLowerCase() : '';
  if (!email || email.length > EMAIL_MAX || !EMAIL_REGEX.test(email)) {
    fields.email = 'Email inválido.';
  }

  const telefono = isString(body.telefono)
    ? body.telefono.replace(PHONE_FILLER_REGEX, '')
    : '';
  if (!PHONE_REGEX.test(telefono)) {
    fields.telefono = 'Teléfono inválido.';
  }

  const evento = isString(body.evento) ? body.evento.trim() : '';
  if (evento.length < EVENT_MIN || evento.length > EVENT_MAX) {
    fields.evento = 'Tipo de evento inválido.';
  }

  const fechaEventoRaw = isString(body.fechaEvento) ? body.fechaEvento.trim() : '';
  let fechaEventoPhp = '';
  if (!DATE_ISO_REGEX.test(fechaEventoRaw)) {
    fields.fechaEvento = 'Fecha inválida.';
  } else {
    const [year, month, day] = fechaEventoRaw.split('-').map(Number);
    const fechaLocal = new Date(year, month - 1, day);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (
      Number.isNaN(fechaLocal.getTime()) ||
      fechaLocal.getFullYear() !== year ||
      fechaLocal.getMonth() !== month - 1 ||
      fechaLocal.getDate() !== day ||
      fechaLocal <= hoy
    ) {
      fields.fechaEvento = 'La fecha debe ser posterior a hoy.';
    } else {
      fechaEventoPhp = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }
  }

  const numInvitadosRaw =
    typeof body.numInvitados === 'number'
      ? body.numInvitados
      : isString(body.numInvitados)
        ? Number(body.numInvitados)
        : NaN;
  if (
    !Number.isInteger(numInvitadosRaw) ||
    numInvitadosRaw < GUESTS_MIN ||
    numInvitadosRaw > GUESTS_MAX
  ) {
    fields.numInvitados = 'Número de invitados inválido.';
  }

  const mediaEdad = isString(body.mediaEdad) ? body.mediaEdad.trim() : '';
  if (mediaEdad.length < AGE_MIN || mediaEdad.length > AGE_MAX) {
    fields.mediaEdad = 'Media de edad inválida.';
  }

  const observaciones = isString(body.observaciones)
    ? body.observaciones.trim().slice(0, NOTES_MAX)
    : '';

  const mensaje = isString(body.mensaje) ? body.mensaje.trim() : '';
  if (mensaje.length < MESSAGE_MIN || mensaje.length > MESSAGE_MAX) {
    fields.mensaje = 'Mensaje inválido.';
  }

  if (Object.keys(fields).length > 0) {
    return { kind: 'invalid', fields };
  }

  return {
    kind: 'ok',
    data: {
      nombre,
      email,
      telefono,
      evento,
      fechaEvento: fechaEventoPhp,
      numInvitados: numInvitadosRaw,
      mediaEdad,
      observaciones,
      mensaje,
    },
  };
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return errorResponse('PAYLOAD_TOO_LARGE', 'La petición excede el tamaño permitido.', 413);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return errorResponse('INVALID_JSON', 'Cuerpo de la petición inválido.', 400);
  }

  if (!isPlainObject(raw)) {
    return errorResponse('INVALID_JSON', 'Cuerpo de la petición inválido.', 400);
  }

  const result = validate(raw);

  if (result.kind === 'spam') {
    return successResponse();
  }

  if (result.kind === 'invalid') {
    return errorResponse(
      'VALIDATION_ERROR',
      'Hay campos inválidos en el formulario.',
      422,
      result.fields
    );
  }

  try {
    const upstream = await fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return errorResponse(
        'UPSTREAM_ERROR',
        'No se pudo enviar el mensaje. Inténtalo más tarde.',
        502
      );
    }

    return successResponse();
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      return errorResponse(
        'UPSTREAM_TIMEOUT',
        'La petición tardó demasiado. Inténtalo más tarde.',
        504
      );
    }
    return errorResponse(
      'UPSTREAM_ERROR',
      'No se pudo enviar el mensaje. Inténtalo más tarde.',
      502
    );
  }
}
