import { SITE_CONFIG } from '../../config/siteConfig';

export const Footer = () => {
  return (
    <footer id="footer">
      {/* Logo with fade-in animation */}
      <div className="footer-logo" data-aos="fade-up">
        {/* <img src={logo} alt="De Diez a Dos Logo" className="logo-original" /> */}
        <img src="https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_150,h_95,c_fit/v1763036736/logo_nkxrbw.png" alt="De Diez a Dos Logo" className="logo-white" />
        <div className="logo-underline"></div>
      </div>
      
      <p className="footer-tagline" data-aos="fade-up" data-aos-delay="100">
        Tu espacio privado en el corazón de Madrid
      </p>

      <div className="footer-contact" data-aos="fade-up" data-aos-delay="200">
        <div className="contact-item">
          <span className="contact-icon">📞</span>
          {SITE_CONFIG.contacto.telefono} | {SITE_CONFIG.contacto.telefono2}
        </div>
        <div className="contact-item">
          <span className="contact-icon">📧</span>
          {SITE_CONFIG.contacto.email}
        </div>
        <div className="contact-item">
          <span className="contact-icon">📍</span>
          {SITE_CONFIG.contacto.direccion}
        </div>
      </div>

      <p className="footer-legal" data-aos="fade-up" data-aos-delay="300">
        De Diez a Dos Private Event, S.L.U.
      </p>

      <p className="footer-copyright" data-aos="fade-up" data-aos-delay="350">
        &copy; 2025 De Diez a Dos. Todos los derechos reservados.
      </p>
      
      <p className="footer-slogan" data-aos="fade-up" data-aos-delay="400">
        Más de una década creando eventos que se recuerdan
      </p>

      {/* SEO Keywords */}
      <p className="footer-keywords" data-aos="fade-up" data-aos-delay="450">
        Salones para eventos Madrid | Alquiler salón cumpleaños Madrid | Eventos privados económicos | Fiestas cerca Santiago Bernabéu | Salón cumpleaños barato Madrid | Catering eventos económico | Celebraciones baratas Madrid | Alquiler local fiestas Madrid | Eventos junto al Bernabéu | Salones para bodas baratos | Fiestas privadas precio económico | Reservar salón Madrid centro | Espacios para celebraciones Madrid | Eventos cerca estadio Santiago Bernabéu | Alquiler salón con catering barato | Evento de cumpleaños Madrid económico | Fiestas de empresa Madrid | Salón eventos precios competitivos | Celebraciones inolvidables Madrid | Sala para eventos Madrid Centro | De Diez a Dos Madrid
      </p>
    </footer>
  );
};