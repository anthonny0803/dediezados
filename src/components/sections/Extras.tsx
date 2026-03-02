import { SITE_CONFIG } from '../../config/siteConfig';

const EXTRA_ICONS = [
  // Karaoke - mic
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>,
  // PhotoMax 360 - camera
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3" /></svg>,
  // DJ Profesional - headphones
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /></svg>,
  // Mesa Dulce - cake/candy
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" /><path d="M2 21h20" /><path d="M7 8v3" /><path d="M12 8v3" /><path d="M17 8v3" /><path d="M7 4h.01" /><path d="M12 4h.01" /><path d="M17 4h.01" /></svg>,
  // Decoracion - palette/party
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 0 20 2 2 0 0 1-1.92-2.56l.44-1.32A2 2 0 0 0 8.62 16H6a2 2 0 0 1-2-2 10 10 0 0 1 8-12Z" /><circle cx="14" cy="8" r="1" /><circle cx="8" cy="10" r="1" /><circle cx="16" cy="12" r="1" /><circle cx="10" cy="6" r="1" /></svg>,
];

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
              <span className="extra-disponible-icon">{EXTRA_ICONS[index]}</span>
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
