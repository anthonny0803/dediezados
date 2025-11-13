import { lazy, Suspense } from "react";
import '../../assets/css/sections/reviews.css';

const GoogleReviewsLazy = lazy(() => import('../widgets/GoogleReviews').then(m => ({ default: m.GoogleReviews })));

export const Reviews = () => {
  return (
    <section id="reviews">
      <h2 className="section-title" data-aos="fade-up">
        Lo que dicen nuestros clientes
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Experiencias reales de eventos inolvidables
      </p>
      <Suspense fallback={<div style={{ minHeight: "300px" }}>Cargando reseñas...</div>}>
        <div data-aos="fade-up" data-aos-delay="200">
          <GoogleReviewsLazy />
        </div>
      </Suspense>
    </section>
  );
};
