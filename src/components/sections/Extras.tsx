import { SITE_CONFIG } from '../../config/siteConfig';

export const Extras = () => {
  return (
    <section id="extras">
      <h2 className="section-title" data-aos="fade-up">
        Catering De Diez a Dos
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Disfruta de la maravillosa atención y trato personalizado que ofrecemos en cada evento. Nuestro equipo se dedica a hacer de tu ocasión especial un momento inolvidable, cuidando cada detalle para que tú y tus invitados se sientan como en casa.
      </p>
      <div className="gastronomia-grid">
        {SITE_CONFIG.gastronomia.map((item, index) => (
          <div 
            key={index} 
            className={`gastro-card ${item.destacado ? 'destacado' : ''}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="gastro-image" style={{ backgroundImage: `url('${item.imagen}')` }}>
              {item.destacado && (
                <div className="gastro-badge">Especialidad</div>
              )}
            </div>
            <div className="gastro-content">
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};