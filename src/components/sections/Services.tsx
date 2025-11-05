import { SITE_CONFIG } from '../../config/siteConfig';

export const Services = () => {
  return (
    <section id="services">
      <h2 className="section-title" data-aos="fade-up">
        Servicios Profesionales
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Paquetes completos que incluyen todo lo necesario para tu evento
      </p>
      <div className="services-grid">
        {SITE_CONFIG.servicios.map((servicio, index) => (
          <div 
            key={index} 
            className="card service-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="service-icon">{servicio.icono}</div>
            <h3>{servicio.titulo}</h3>
            <p>{servicio.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};