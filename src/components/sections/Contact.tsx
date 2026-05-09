'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site.config';
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

const NAME_MIN = 2;
const EMAIL_MAX = 254;
const EVENT_MIN = 4;
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

export const Contact = () => {
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');
  const tValidation = useTranslations('contact.validation');
  const tFields = useTranslations('contact.form.fields');
  const tInfo = useTranslations('contact.info');

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

  const isValidEvento = formData.evento.trim().length >= EVENT_MIN;

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
    if (value === '') return 'neutral';
    return isValid ? 'valid' : 'invalid';
  };

  const getCounterClass = (length: number, isValid: boolean) => {
    if (length === 0) return 'neutral';
    return isValid ? 'valid' : 'invalid';
  };

  return (
    <section id="contact">
      <h2 className="section-title" data-aos="fade-up">
        {t('title')}
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        {t('subtitle')}
      </p>

      <div className="contact-container">
        <div className="form-card" data-aos="fade-up" data-aos-delay="200">
          <form onSubmit={handleSubmit} noValidate>
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

            <div className="input-group">
              <span className="form-section-title">
                {tForm('sectionTitle')}
                <small className="form-helper">
                  {tForm('helperRequired')} <span className="required">*</span>
                </small>
              </span>
            </div>
            <hr />
            <br />

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="nombre">
                  {tFields('nombre.label')} <span className="required">*</span>
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
                  className={`input-capitalize ${getBorderClass(
                    formData.nombre,
                    isValidNombre
                  )}`}
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">
                  {tFields('email.label')} <span className="required">*</span>
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
                  className={`input-lowercase ${getBorderClass(
                    formData.email,
                    isValidEmail
                  )}`}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="telefono">
                  {tFields('telefono.label')} <span className="required">*</span>
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
                  className={getBorderClass(formData.telefono, isValidTelefono)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="evento">
                  {tFields('evento.label')} <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder={tFields('evento.placeholder')}
                  className={`input-capitalize ${getBorderClass(
                    formData.evento,
                    isValidEvento
                  )}`}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="fechaEvento">
                  {tFields('fechaEvento.label')} <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="fechaEvento"
                  name="fechaEvento"
                  value={formData.fechaEvento}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder={tFields('fechaEvento.placeholder')}
                  className={getBorderClass(
                    formData.fechaEvento,
                    isValidFechaEvento
                  )}
                />
              </div>

              <div className="input-group">
                <label htmlFor="numInvitados">
                  {tFields('numInvitados.label')} <span className="required">*</span>
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
                  className={getBorderClass(
                    formData.numInvitados,
                    isValidNumInvitados
                  )}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="mediaEdad">
                  {tFields('mediaEdad.label')} <span className="required">*</span>
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
                  className={getBorderClass(formData.mediaEdad, isValidMediaEdad)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="observaciones">
                  {tFields('observaciones.label')}{' '}
                  <span className="form-optional">{tForm('optional')}</span>
                </label>
                <input
                  type="text"
                  id="observaciones"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder={tFields('observaciones.placeholder')}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="textarea-wrapper">
                <label htmlFor="mensaje">
                  {tFields('mensaje.label')} <span className="required">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  minLength={MESSAGE_MIN}
                  maxLength={MESSAGE_MAX}
                  disabled={isSubmitting}
                  placeholder={tFields('mensaje.placeholder')}
                  className={getBorderClass(formData.mensaje, isValidMensaje)}
                />
                <small
                  className={`char-counter ${getCounterClass(
                    formData.mensaje.length,
                    isValidMensaje
                  )}`}
                >
                  {tForm('charCounter', { current: formData.mensaje.length })}
                </small>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tForm('submitting') : tForm('submit')}
            </button>

            {message && (
              <div
                role="alert"
                aria-live="polite"
                className={`form-message ${message.type} visible`}
              >
                {message.text}
              </div>
            )}
          </form>
        </div>

        <div
          className="contact-info-grid"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="info-item">
            <div className="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
            </div>
            <div>
              <strong>{tInfo('phoneLabel')}</strong>
              <span>{siteConfig.contact.phone}</span>
              <span className="contact-info-text">
                {siteConfig.contact.secondaryPhone}
              </span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </div>
            <div>
              <strong>{tInfo('emailLabel')}</strong>
              <span>{siteConfig.contact.email}</span>
              <span className="contact-info-text">
                {siteConfig.contact.secondaryEmail}
              </span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <div>
              <strong>{tInfo('addressLabel')}</strong>
              <span>{siteConfig.contact.address}</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <div>
              <strong>{tInfo('scheduleLabel')}</strong>
              <span>{tInfo('schedule')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
