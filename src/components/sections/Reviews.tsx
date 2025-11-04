import { GoogleReviews } from '../widgets/GoogleReviews';
import '../../assets/css/sections/reviews.css';

export const Reviews = () => {
  return (
    <section id="reviews">
      <h2 className="section-title">Lo que dicen nuestros clientes</h2>
      <p className="section-subtitle">
        Experiencias reales de eventos inolvidables
      </p>
      <GoogleReviews />
    </section>
  );
};