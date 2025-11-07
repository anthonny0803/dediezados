import { GoogleReviews } from '../widgets/GoogleReviews';
import '../../assets/css/sections/reviews.css';

export const Reviews = () => {
  return (
    <section id="reviews">
      <h2 className="section-title" data-aos="fade-up">
        Lo que dicen nuestros clientes
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Experiencias reales de eventos inolvidables
      </p>
      <div data-aos="fade-up" data-aos-delay="200">
        <GoogleReviews />
      </div>
    </section>
  );
};