'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { DatePicker } from '@/components/ui/DatePicker';
import {
  ContactError,
  sendContactForm,
  validateForm,
  type ContactFormData,
} from '@/services/contact.service';

const INITIAL_FORM_DATA: ContactFormData = {
  nombre: '',
  email: '',
  telefono: '',
  evento: '',
  fechaEvento: '',
  numInvitados: '',
  mediaEdad: '',
  observaciones: '',
  mensaje: '',
};

const HONEYPOT_STYLE: CSSProperties = {
  position: 'absolute',
  left: '-10000px',
  width: 0,
  height: 0,
  opacity: 0,
  overflow: 'hidden',
};

const INPUT_BASE_CLASS =
  'w-full rounded-xl border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-smooth focus:border-primary focus:outline-none';

const NAME_MIN = 2;
const EMAIL_MAX = 254;
const GUESTS_MIN = 10;
const GUESTS_MAX = 100;
const GUESTS_MIN_DIGITS = 2;
const GUESTS_MAX_DIGITS = 3;
const AGE_MIN = 2;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 200;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9]{9,15}$/;
const PHONE_FILLER_REGEX = /[\s\-()]/g;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const DIGITS_REGEX = /^\d+$/;

type FormMessage = { type: 'success' | 'error'; text: string } | null;

type EventType = { title: string };

export const Contact = () => {
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');
  const tValidation = useTranslations('contact.validation');
  const tFields = useTranslations('contact.form.fields');
  const tEvents = useTranslations('events');
  const locale = useLocale();

  const eventTypes = tEvents.raw('items') as EventType[];

  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (message) {
      setMessage(null);
    }
  };

  const handleSelectEvento = (evento: string) => {
    setFormData({ ...formData, evento });
    if (message) {
      setMessage(null);
    }
  };

  const handleFechaChange = (fechaEvento: string) => {
    setFormData({ ...formData, fechaEvento });
    if (message) {
      setMessage(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errorKey = validateForm(formData);
    if (errorKey) {
      setMessage({ type: 'error', text: tValidation(errorKey) });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const normalizedData: ContactFormData = {
      ...formData,
      nombre: formData.nombre
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      evento:
        formData.evento.charAt(0).toUpperCase() +
        formData.evento.slice(1).toLowerCase(),
      email: formData.email.toLowerCase(),
    };

    try {
      await sendContactForm(
        normalizedData,
        tValidation('noObservations'),
        honeypot
      );
      setMessage({ type: 'success', text: tForm('success') });
      setFormData(INITIAL_FORM_DATA);
      setHoneypot('');
    } catch (error) {
      if (error instanceof ContactError && error.message) {
        setMessage({ type: 'error', text: error.message });
      } else if (
        error instanceof ContactError &&
        (error.code === 'CLIENT_TIMEOUT' || error.code === 'NETWORK_ERROR')
      ) {
        setMessage({ type: 'error', text: tForm('errorConnection') });
      } else {
        setMessage({ type: 'error', text: tForm('errorDefault') });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidNombre = formData.nombre.trim().length >= NAME_MIN;

  const trimmedEmail = formData.email.trim();
  const isValidEmail =
    trimmedEmail.length > 0 &&
    trimmedEmail.length <= EMAIL_MAX &&
    EMAIL_REGEX.test(trimmedEmail);

  const isValidTelefono = PHONE_REGEX.test(
    formData.telefono.replace(PHONE_FILLER_REGEX, '')
  );

  let isValidFechaEvento = false;
  if (ISO_DATE_REGEX.test(formData.fechaEvento)) {
    const [year, month, day] = formData.fechaEvento.split('-').map(Number);
    const fechaEvento = new Date(year, month - 1, day);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    isValidFechaEvento =
      !Number.isNaN(fechaEvento.getTime()) && fechaEvento > hoy;
  }

  const isValidMediaEdad = formData.mediaEdad.trim().length >= AGE_MIN;
  const numInvitadosTrimmed = formData.numInvitados.trim();
  const numInvitadosNumber = Number(numInvitadosTrimmed);

  const isValidNumInvitados =
    numInvitadosTrimmed.length >= GUESTS_MIN_DIGITS &&
    numInvitadosTrimmed.length <= GUESTS_MAX_DIGITS &&
    DIGITS_REGEX.test(numInvitadosTrimmed) &&
    !Number.isNaN(numInvitadosNumber) &&
    numInvitadosNumber >= GUESTS_MIN &&
    numInvitadosNumber <= GUESTS_MAX;

  const isValidMensaje =
    formData.mensaje.length >= MESSAGE_MIN &&
    formData.mensaje.length <= MESSAGE_MAX;

  const getBorderClass = (value: string, isValid: boolean) => {
    if (value === '') return 'border-border';
    return isValid ? 'border-primary' : 'border-destructive';
  };

  const getCounterClass = (length: number, isValid: boolean) => {
    if (length === 0) return 'text-muted-foreground';
    return isValid ? 'text-primary' : 'text-destructive';
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-60"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            — {t('label')}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
            {t('title')}
            <span className="block italic leading-tight text-gradient-primary">
              {t('titleAccent')}
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-border bg-card/80 p-8 shadow-elegant backdrop-blur-xl md:p-12"
        >
          <div style={HONEYPOT_STYLE} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="mb-5">
            <span className="mb-3 block text-sm font-medium">
              {tFields('evento.label')}{' '}
              <span className="text-destructive">*</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((item) => {
                const isActive = formData.evento === item.title;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSelectEvento(item.title)}
                    disabled={isSubmitting}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
                      isActive
                        ? 'border-transparent bg-gradient-primary text-primary-foreground shadow-soft'
                        : 'border-border bg-background/50 hover:border-primary/40'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="nombre"
                className="mb-2 block text-sm font-medium"
              >
                {tFields('nombre.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                autoComplete="name"
                disabled={isSubmitting}
                placeholder={tFields('nombre.placeholder')}
                className={`${INPUT_BASE_CLASS} capitalize ${getBorderClass(
                  formData.nombre,
                  isValidNombre
                )}`}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                {tFields('email.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                disabled={isSubmitting}
                placeholder={tFields('email.placeholder')}
                className={`${INPUT_BASE_CLASS} lowercase ${getBorderClass(
                  formData.email,
                  isValidEmail
                )}`}
              />
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="mb-2 block text-sm font-medium"
              >
                {tFields('telefono.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                autoComplete="tel"
                disabled={isSubmitting}
                placeholder={tFields('telefono.placeholder')}
                className={`${INPUT_BASE_CLASS} ${getBorderClass(
                  formData.telefono,
                  isValidTelefono
                )}`}
              />
            </div>

            <div>
              <label
                htmlFor="fechaEvento"
                className="mb-2 block text-sm font-medium"
              >
                {tFields('fechaEvento.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <DatePicker
                id="fechaEvento"
                value={formData.fechaEvento}
                onChange={handleFechaChange}
                locale={locale}
                disabled={isSubmitting}
                placeholder={tFields('fechaEvento.placeholder')}
                className={`${INPUT_BASE_CLASS} ${getBorderClass(
                  formData.fechaEvento,
                  isValidFechaEvento
                )}`}
              />
            </div>

            <div>
              <label
                htmlFor="numInvitados"
                className="mb-2 block text-sm font-medium"
              >
                {tFields('numInvitados.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                id="numInvitados"
                name="numInvitados"
                value={formData.numInvitados}
                onChange={handleChange}
                required
                min={GUESTS_MIN}
                max={GUESTS_MAX}
                disabled={isSubmitting}
                placeholder={tFields('numInvitados.placeholder')}
                className={`${INPUT_BASE_CLASS} ${getBorderClass(
                  formData.numInvitados,
                  isValidNumInvitados
                )}`}
              />
            </div>

            <div>
              <label
                htmlFor="mediaEdad"
                className="mb-2 block text-sm font-medium"
              >
                {tFields('mediaEdad.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="mediaEdad"
                name="mediaEdad"
                value={formData.mediaEdad}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder={tFields('mediaEdad.placeholder')}
                className={`${INPUT_BASE_CLASS} ${getBorderClass(
                  formData.mediaEdad,
                  isValidMediaEdad
                )}`}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="observaciones"
                className="mb-2 block text-sm font-medium"
              >
                {tFields('observaciones.label')}{' '}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  {tForm('optional')}
                </span>
              </label>
              <input
                type="text"
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder={tFields('observaciones.placeholder')}
                className={`${INPUT_BASE_CLASS} border-border`}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="mensaje" className="mb-2 block text-sm font-medium">
              {tFields('mensaje.label')}{' '}
              <span className="text-destructive">*</span>
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows={4}
              minLength={MESSAGE_MIN}
              maxLength={MESSAGE_MAX}
              disabled={isSubmitting}
              placeholder={tFields('mensaje.placeholder')}
              className={`${INPUT_BASE_CLASS} min-h-[110px] resize-y ${getBorderClass(
                formData.mensaje,
                isValidMensaje
              )}`}
            />
            <small
              className={`mt-1 block text-right text-xs ${getCounterClass(
                formData.mensaje.length,
                isValidMensaje
              )}`}
            >
              {tForm('charCounter', { current: formData.mensaje.length })}
            </small>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-elegant transition-smooth hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              tForm('submitting')
            ) : (
              <>
                {tForm('submit')}
                <Send className="h-4 w-4" />
              </>
            )}
          </button>

          {message && (
            <div
              role="alert"
              aria-live="polite"
              className={`mt-6 rounded-xl px-4 py-3 text-center text-sm ${
                message.type === 'success'
                  ? 'border border-primary/30 bg-primary/10 text-primary'
                  : 'border border-destructive/30 bg-destructive/10 text-destructive'
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
