import { GoogleMaps } from '../widgets/GoogleMaps';
import '../../assets/css/sections/location.css';

export const Location = () => {
  return (
    <section id="location">
      <h2 className="section-title" data-aos="fade-up">
        Nuestra Ubicación
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Encuéntranos en el corazón de Madrid
      </p>
      <div data-aos="fade-up" data-aos-delay="200">
        <GoogleMaps />
      </div>
    </section>
  );
};