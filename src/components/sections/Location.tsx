import { lazy, Suspense } from "react";
import '../../assets/css/sections/location.css';

const GoogleMapsLazy = lazy(() => import('../widgets/GoogleMaps').then(m => ({ default: m.GoogleMaps })));

export const Location = () => {
  return (
    <section id="location">
      <h2 className="section-title" data-aos="fade-up">
        Nuestra Ubicación
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Encuéntranos en el corazón de Madrid
      </p>
      <Suspense fallback={<div style={{ minHeight: "300px" }}>Cargando mapa...</div>}>
        <div data-aos="fade-up" data-aos-delay="200">
          <GoogleMapsLazy />
        </div>
      </Suspense>
    </section>
  );
};
