import { SITE_CONFIG } from '../../config/siteConfig';
import logo from '../../assets/images/logo/logo.png';

export const Footer = () => {
  return (
    <footer id="footer">
      {/* Logo with fade-in animation */}
      <div className="footer-logo" data-aos="fade-up">
        {/* <img src={logo} alt="De Diez a Dos Logo" className="logo-original" /> */}
        <img src={logo} alt="De Diez a Dos Logo" className="logo-white" />
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
    </footer>
  );
};