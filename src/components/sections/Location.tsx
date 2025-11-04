import { GoogleMaps } from '../widgets/GoogleMaps';
import '../../assets/css/sections/location.css';

export const Location = () => {
  return (
    <section id="location">
      <h2 className="section-title">Nuestra Ubicación</h2>
      <p className="section-subtitle">
        Encuéntranos en el corazón de Madrid
      </p>
      <GoogleMaps />
    </section>
  );
};