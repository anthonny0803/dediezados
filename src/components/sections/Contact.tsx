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
        Conversemos Sobre tu Evento
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Cuéntanos tu visión y te ayudamos a hacerla realidad
      </p>

      <div className="contact-container">
        <div className="form-card" data-aos="fade-up" data-aos-delay="200">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <h4>
                Datos de contacto
                <small className="form-helper">
                  Campos obligatorios <span className="required">*</span>
                </small>
              </h4>
            </div>
            <hr />
            <br />

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
                Observaciones <h5>Opcional</h5>
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
            <div className="info-icon">📞</div>
            <div>
              <strong>Teléfono</strong>
              <span>{SITE_CONFIG.contacto.telefono}</span>
              <span className="contact-info-text">
                {SITE_CONFIG.contacto.telefono2}
              </span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📧</div>
            <div>
              <strong>Correo</strong>
              <span>{SITE_CONFIG.contacto.email}</span>
              <span className="contact-info-text">
                {SITE_CONFIG.contacto.email2}
              </span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📍</div>
            <div>
              <strong>Ubicación</strong>
              <span>{SITE_CONFIG.contacto.direccion}</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📅</div>
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
