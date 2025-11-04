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

    // Limpiar mensaje cuando el usuario empieza a escribir
    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validar frontend
    const error = validateForm(formData);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Normalizar los datos antes de enviar
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

  // Validadores visuales simples
  const isValidNombre = formData.nombre.trim().length >= 2;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isValidTelefono = /^[+]{0,1}[0-9]{9,15}$/.test(formData.telefono);
  const isValidEvento = formData.evento.trim().length >= 4;

  let isValidFechaEvento = false;
  if (formData.fechaEvento) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Ignorar horas
    const fechaEvento = new Date(formData.fechaEvento);
    isValidFechaEvento = fechaEvento > hoy;
  }

  const isValidMediaEdad = formData.mediaEdad.trim().length >= 2;
  const isValidMensaje =
    formData.mensaje.length >= 10 && formData.mensaje.length <= 200;

  return (
    <section id="contact">
      <h2 className="section-title">Conversemos Sobre tu Evento</h2>
      <p className="section-subtitle">
        Cuéntanos tu visión y te ayudamos a hacerla realidad
      </p>

      <div className="contact-container">
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <h4>
                Datos de contacto{" "}
                <small
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    color: "#666",
                    marginTop: "4px",
                  }}
                >
                  Campos obligatorios <span style={{ color: "red" }}>*</span>
                </small>
              </h4>
            </div>
            <hr />
            <br />

            <div className="input-group">
              <label htmlFor="nombre">
                Nombre <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={{
                  textTransform: "capitalize",
                  borderColor:
                    formData.nombre === ""
                      ? "#ccc"
                      : isValidNombre
                      ? "green"
                      : "red",
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">
                Correo <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={{
                  textTransform: "lowercase",
                  borderColor:
                    formData.email === ""
                      ? "#ccc"
                      : isValidEmail
                      ? "green"
                      : "red",
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="telefono">
                Teléfono <span style={{ color: "red" }}>*</span>
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
                style={{
                  borderColor:
                    formData.telefono === ""
                      ? "#ccc"
                      : isValidTelefono
                      ? "green"
                      : "red",
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="evento">
                Tipo de Evento <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="evento"
                name="evento"
                value={formData.evento}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Ej: Boda, Corporativo, Cumpleaños"
                style={{
                  textTransform: "capitalize",
                  borderColor:
                    formData.evento === ""
                      ? "#ccc"
                      : isValidEvento
                      ? "green"
                      : "red",
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="fechaEvento">
                Fecha de Evento <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                id="fechaEvento"
                name="fechaEvento"
                value={formData.fechaEvento}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={{
                  borderColor:
                    formData.fechaEvento === ""
                      ? "#ccc"
                      : isValidFechaEvento
                      ? "green"
                      : "red",
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="mediaEdad">
                Media de edad <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="mediaEdad"
                name="mediaEdad"
                value={formData.mediaEdad}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Ej: 25-35 años"
                style={{
                  borderColor:
                    formData.mediaEdad === ""
                      ? "#ccc"
                      : isValidMediaEdad
                      ? "green"
                      : "red",
                }}
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

            <div className="input-group" style={{ position: "relative" }}>
              <label htmlFor="mensaje">
                Mensaje <span style={{ color: "red" }}>*</span>
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
                style={{
                  borderColor:
                    formData.mensaje.length > 0 && !isValidMensaje
                      ? "red"
                      : formData.mensaje.length === 0
                      ? "#ccc"
                      : "green",
                  resize: "vertical",
                }}
              />

              <small
                style={{
                  display: "block",
                  textAlign: "right",
                  marginTop: "4px",
                  fontSize: "0.8rem",
                  color:
                    formData.mensaje.length === 0
                      ? "#888"
                      : isValidMensaje
                      ? "green"
                      : "red",
                }}
              >
                Min:10 {formData.mensaje.length}/200
              </small>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
            </button>

            {message.text && (
              <div
                className={`form-message ${message.type}`}
                style={{ display: "block" }}
              >
                {message.text}
              </div>
            )}
          </form>
        </div>

        {/* Información de Contacto */}
        <div className="contact-info-grid">
          <div className="info-item card">
            <div className="info-icon">📞</div>
            <div>
              <strong>Teléfono</strong>
              <span>{SITE_CONFIG.contacto.telefono}</span>
            </div>
          </div>

          <div className="info-item card">
            <div className="info-icon">📧</div>
            <div>
              <strong>Email</strong>
              <span>{SITE_CONFIG.contacto.email}</span>
            </div>
          </div>

          <div className="info-item card">
            <div className="info-icon">📍</div>
            <div>
              <strong>Ubicación</strong>
              <span>{SITE_CONFIG.contacto.direccion}</span>
            </div>
          </div>

          <div className="info-item card">
            <div className="info-icon">🕐</div>
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
