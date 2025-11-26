import { SITE_CONFIG } from "../../config/siteConfig";

export const Footer = () => {
  return (
    <footer id="footer">
      {/* Logo with fade-in animation */}
      <div className="footer-logo" data-aos="fade-up">
        <img
          src="https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_143,h_95,c_fit/v1763054957/ChatGPT_Image_13_nov_2025_17_57_14_1_nutc4q.png"
          alt="De Diez a Dos Logo"
          className="logo-white"
          width="143"
          height="95"
          loading="lazy"
        />
        <div className="logo-underline"></div>
      </div>

      <p className="footer-tagline" data-aos="fade-up" data-aos-delay="100">
        Tu espacio privado en el corazón de Madrid
      </p>

      <div className="footer-contact" data-aos="fade-up" data-aos-delay="200">
        <div className="contact-item">
          <span className="contact-icon">📞</span>
          {SITE_CONFIG.contacto.telefono}<br />{SITE_CONFIG.contacto.telefono2}
        </div>
        <div className="contact-item">
          <span className="contact-icon">📧</span>
          {SITE_CONFIG.contacto.email}<br />{SITE_CONFIG.contacto.email2}
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
        Salones para eventos Madrid | Alquiler salón cumpleaños Madrid | Eventos
        privados económicos | Fiestas cerca Santiago Bernabéu | Salón cumpleaños
        barato Madrid | Catering eventos económico | Celebraciones baratas
        Madrid | Alquiler local fiestas Madrid | Eventos junto al Bernabéu |
        Salones para bodas baratos | Fiestas privadas precio económico |
        Reservar salón Madrid centro | Espacios para celebraciones Madrid |
        Eventos cerca estadio Santiago Bernabéu | Alquiler salón con catering
        barato | Evento de cumpleaños Madrid económico | Fiestas de empresa
        Madrid | Salón eventos precios competitivos | Celebraciones inolvidables
        Madrid | Sala para eventos Madrid Centro | De Diez a Dos Madrid
      </p>

      <div 
        className="footer-credits" 
        style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.7 }}
        data-aos="fade-up" 
        data-aos-delay="380"
      >
        {/* Enlace al Socio (Capifix) */}
        <p style={{ marginBottom: '8px' }}>
          Aliados estratégicos:{" "}
          <a
            href="https://www.capifixlogistica.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#52d5bd', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Capifix | Logística Integral
          </a>
        </p>

        {/* Tu Firma (Developer) con SVG corregido para JSX */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem' }}>Dev:</span>
          <a
            href="https://www.ybanez.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontFamily: 'monospace', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontWeight: 600 
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              style={{ borderRadius: '4px' }}
            >
              <defs>
                <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <rect width="200" height="200" rx="16" fill="#000" />
              <rect x="2" y="2" width="196" height="196" rx="14" fill="none" stroke="#1e293b" strokeWidth="2" />
              <path d="M 38 40 L 26 40 L 26 88 L 16 100 L 26 112 L 26 160 L 38 160" stroke="#4ade80" strokeWidth="4" fill="none" strokeLinecap="square" />
              <path d="M 162 40 L 174 40 L 174 88 L 184 100 L 174 112 L 174 160 L 162 160" stroke="#4ade80" strokeWidth="4" fill="none" strokeLinecap="square" />
              <line x1="75" y1="55" x2="100" y2="95" stroke="url(#footerLogoGrad)" strokeWidth="5" strokeLinecap="round" />
              <path d="M 130 42 Q 118 75 100 95" stroke="url(#footerLogoGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
              <line x1="100" y1="95" x2="75" y2="158" stroke="url(#footerLogoGrad)" strokeWidth="5" strokeLinecap="round" />
              <rect x="67" y="47" width="16" height="16" rx="3" fill="#000" stroke="url(#footerLogoGrad)" strokeWidth="2.5" />
              <rect x="122" y="34" width="16" height="16" rx="3" fill="#000" stroke="url(#footerLogoGrad)" strokeWidth="2.5" />
              <rect x="91" y="86" width="18" height="18" rx="3" fill="url(#footerLogoGrad)" />
              <rect x="67" y="150" width="16" height="16" rx="3" fill="#000" stroke="url(#footerLogoGrad)" strokeWidth="2.5" />
            </svg>
            Anthonny Ybañez
          </a>
        </div>
      </div>
    </footer>
  );
};