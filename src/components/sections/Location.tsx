import { lazy, Suspense } from "react";
import '../../assets/css/sections/location.css';
import { PlaceData } from "../../hooks/useGooglePlace";

const GoogleMapsLazy = lazy(() => import('../widgets/GoogleMaps').then(m => ({ default: m.GoogleMaps })));

interface LocationProps {
  placeData: PlaceData | null;
}

export const Location = ({ placeData }: LocationProps) => {
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
          {/* Pasamos la data al widget */}
          <GoogleMapsLazy placeData={placeData} />
        </div>
      </Suspense>
    </section>
  );
};