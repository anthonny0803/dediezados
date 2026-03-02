import { useState, type FormEvent } from "react";
import { SITE_CONFIG } from "../../config/siteConfig";
import {
  sendContactForm,
  validateForm,
  type ContactFormData,
} from "../../services/contactService";

export const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: "",
    email: "",
    telefono: "",
    evento: "",
    fechaEvento: "",
    numInvitados: "",
    mediaEdad: "",
    observaciones: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const error = validateForm(formData);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const [year, month, day] = formData.fechaEvento.split("-");
      const fechaFormateada = `${day}/${month}/${year}`;

      const normalizedData: ContactFormData = {
        ...formData,
        nombre: formData.nombre
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        evento:
          formData.evento.charAt(0).toUpperCase() +
          formData.evento.slice(1).toLowerCase(),
        fechaEvento: fechaFormateada,
        email: formData.email.toLowerCase(),
      };

      const response = await sendContactForm(normalizedData);

      if (response.success) {
        setMessage({
          type: "success",
          text: "¡Mensaje enviado! En breve nos pondremos en contacto contigo.",
        });
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          evento: "",
          fechaEvento: "",
          numInvitados: "",
          mediaEdad: "",
          observaciones: "",
          mensaje: "",
        });
      } else {
        setMessage({
          type: "error",
          text: response.message || "Error al enviar el mensaje.",
        });
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Error de conexión. Por favor, verifica tu conexión e intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidNombre = formData.nombre.trim().length >= 2;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isValidTelefono = /^[+]{0,1}[0-9]{9,15}$/.test(formData.telefono);
  const isValidEvento = formData.evento.trim().length >= 4;

  let isValidFechaEvento = false;
  if (formData.fechaEvento) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaEvento = new Date(formData.fechaEvento);
    isValidFechaEvento = fechaEvento > hoy;
  }

  const isValidMediaEdad = formData.mediaEdad.trim().length >= 2;
  const numInvitadosTrimmed = formData.numInvitados.trim();
  const numInvitadosNumber = Number(numInvitadosTrimmed);

  const isValidNumInvitados =
    numInvitadosTrimmed.length >= 2 && // mínimo 2 caracteres
    numInvitadosTrimmed.length <= 3 && // máximo 3 caracteres
    /^\d+$/.test(numInvitadosTrimmed) && // solo dígitos
    !Number.isNaN(numInvitadosNumber) && // es un número
    numInvitadosNumber >= 10 && // mínimo 10
    numInvitadosNumber <= 100; // máximo 100

  const isValidMensaje =
    formData.mensaje.length >= 10 && formData.mensaje.length <= 200;

  const getBorderClass = (value: string, isValid: boolean) => {
    if (value === "") return "neutral";
    return isValid ? "valid" : "invalid";
  };

  const getCounterClass = (length: number, isValid: boolean) => {
    if (length === 0) return "neutral";
    return isValid ? "valid" : "invalid";
  };

  return (
    <section id="contact">
      <h2 className="section-title" data-aos="fade-up">
        Sin Compromiso hablemos de tu Evento
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Cuéntanos tu visión y te ayudamos a hacerla realidad
      </p>

      <div className="contact-container">
        <div className="form-card" data-aos="fade-up" data-aos-delay="200">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="form-section-title">
                Datos de contacto
                <small className="form-helper">
                  Campos obligatorios <span className="required">*</span>
                </small>
              </span>
            </div>
            <hr />
            <br />

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="nombre">
                  Nombre <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Juan Pérez"
                  className={`input-capitalize ${getBorderClass(
                    formData.nombre,
                    isValidNombre
                  )}`}
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">
                  Correo <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="true"
                  disabled={isSubmitting}
                  placeholder="juan@example.com"
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
                  Teléfono <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="+34 *** *** ***"
                  pattern="[+]{0,1}[0-9]{9,15}"
                  className={getBorderClass(formData.telefono, isValidTelefono)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="evento">
                  Tipo de Evento <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Boda, Corporativo, Cumpleaños"
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
                  Fecha de Evento <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="fechaEvento"
                  name="fechaEvento"
                  value={formData.fechaEvento}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="DD/MM/AAAA"
                  className={getBorderClass(
                    formData.fechaEvento,
                    isValidFechaEvento
                  )}
                />
              </div>

              <div className="input-group">
                <label htmlFor="numInvitados">
                  Número de Invitados <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="numInvitados"
                  name="numInvitados"
                  value={formData.numInvitados}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="50"
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
                  Media de edad <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="mediaEdad"
                  name="mediaEdad"
                  value={formData.mediaEdad}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="0-75 años"
                  className={getBorderClass(formData.mediaEdad, isValidMediaEdad)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="observaciones">
                  Observaciones <span className="form-optional">Opcional</span>
                </label>
                <input
                  type="text"
                  id="observaciones"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Detalles adicionales sobre el evento"
                />
              </div>
            </div>

            <div className="input-group">
              <div className="textarea-wrapper">
                <label htmlFor="mensaje">
                  Mensaje <span className="required">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={200}
                  disabled={isSubmitting}
                  placeholder="Cuéntanos sobre tu evento..."
                  className={getBorderClass(formData.mensaje, isValidMensaje)}
                />
                <small
                  className={`char-counter ${getCounterClass(
                    formData.mensaje.length,
                    isValidMensaje
                  )}`}
                >
                  Min:10 {formData.mensaje.length}/200
                </small>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
            </button>

            {message.text && (
              <div className={`form-message ${message.type} visible`}>
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
              <strong>Teléfono</strong>
              <span>{SITE_CONFIG.contacto.telefono}</span>
              <span className="contact-info-text">
                {SITE_CONFIG.contacto.telefono2}
              </span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </div>
            <div>
              <strong>Correo</strong>
              <span>{SITE_CONFIG.contacto.email}</span>
              <span className="contact-info-text">
                {SITE_CONFIG.contacto.email2}
              </span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <div>
              <strong>Ubicación</strong>
              <span>{SITE_CONFIG.contacto.direccion}</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <div>
              <strong>Horario</strong>
              <span>{SITE_CONFIG.contacto.horario}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
