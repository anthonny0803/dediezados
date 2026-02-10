import { SITE_CONFIG } from '../../config/siteConfig';

export const Extras = () => {
  return (
    <section id="extras">
      <h2 className="section-title" data-aos="fade-up">
        Extras Disponibles
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Completa tu evento con servicios adicionales que marcan la diferencia
      </p>
      
      <div className="extras-disponibles-grid">
        {SITE_CONFIG.extrasDisponibles.map((extra, index) => (
          <article 
            key={index} 
            className="extra-disponible-card"
            data-aos="fade-up"
            data-aos-delay={index * 80}
          >
            <div 
              className="extra-disponible-image"
              style={{ backgroundImage: `url('${extra.imagen}')` }}
            >
              <span className="extra-disponible-icon">{extra.icono}</span>
            </div>
            
            <div className="extra-disponible-content">
              <h3>{extra.titulo}</h3>
              <p className="extra-disponible-desc">{extra.descripcion}</p>
              
              <ul className="extra-disponible-features">
                {extra.caracteristicas.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              
              <p className="extra-disponible-recommended">
                <strong>Recomendado para:</strong> {extra.recomendadoPara}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};