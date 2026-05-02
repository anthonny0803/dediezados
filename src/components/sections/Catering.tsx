import { siteConfig } from '@/config/site.config';

export const Catering = () => {
  return (
    <section id="catering">
      <h2 className="section-title" data-aos="fade-up">
        Catering De Diez a Dos
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Disfruta de la maravillosa atención y trato personalizado que ofrecemos en cada evento. Nuestro equipo se dedica a hacer de tu ocasión especial un momento inolvidable, cuidando cada detalle para que tú y tus invitados se sientan como en casa.
      </p>
      <div className="catering-grid">
        {siteConfig.catering.map((item, index) => (
          <article
            key={index}
            className={`catering-card ${item.featured ? 'destacado' : ''}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="catering-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                width="600"
                height="240"
                loading="lazy"
              />
              {item.featured && (
                <div className="catering-badge">Especialidad</div>
              )}
            </div>
            <div className="catering-content">
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
