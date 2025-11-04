import { SITE_CONFIG } from '../../config/siteConfig';

export const Prices = () => {
  return (
    <section id="prices">
      <h2 className="section-title">Paquetes Personalizados</h2>
      <p className="section-subtitle">
        Elige el paquete perfecto para tu evento o personalízalo a tu medida
      </p>
      <div className="pricing-grid">
        {SITE_CONFIG.paquetes.map((paquete, index) => (
          <div 
            key={index} 
            className={`card pricing-card ${paquete.destacado ? 'featured' : ''}`}
          >
            {paquete.badge && (
              <div className="pricing-badge">{paquete.badge}</div>
            )}
            <h3>{paquete.nombre}</h3>
            <div className="pricing-amount">
              {paquete.moneda}{paquete.precio}
            </div>
            <div className="pricing-period">{paquete.periodo}</div>
            <ul className="pricing-features">
              {paquete.caracteristicas.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <a href="#contacto" className="btn">
              Solicitar
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};