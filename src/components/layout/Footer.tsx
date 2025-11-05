import { SITE_CONFIG } from '../../config/siteConfig';

export const Footer = () => {
  return (
    <footer>
      <div className="logo">
        De <span style={{ color: 'var(--primary)' }}>Diez</span> a <span style={{ color: 'var(--primary)' }}>Dos</span>
      </div>
      
      <p style={{ fontSize: '1rem', marginTop: '16px', marginBottom: '24px' }}>
        Tu espacio privado en el corazón de Madrid
      </p>

      <div style={{ 
        display: 'flex', 
        gap: '32px', 
        justifyContent: 'center', 
        flexWrap: 'wrap',
        marginBottom: '24px',
        fontSize: '0.9rem'
      }}>
        <div>
          📞 {SITE_CONFIG.contacto.telefono} | {SITE_CONFIG.contacto.telefono2}
        </div>
        <div>
          📧 {SITE_CONFIG.contacto.email}
        </div>
        <div>
          📍 {SITE_CONFIG.contacto.direccion}
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
        De Diez a Dos Private Event, S.L.U.
      </p>

      <p style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '16px' }}>
        &copy; 2025 De Diez a Dos. Todos los derechos reservados.
      </p>
      
      <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '8px' }}>
        Más de una década creando eventos que se recuerdan
      </p>
    </footer>
  );
};