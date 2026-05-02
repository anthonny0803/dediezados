'use client';

import { GoogleReviews } from '@/components/widgets/GoogleReviews';
import type { PlaceData } from '@/hooks/useGooglePlace';

interface ReviewsProps {
  placeData: PlaceData | null;
  loading: boolean;
}

export const Reviews = ({ placeData, loading }: ReviewsProps) => {
  return (
    <section id="reviews">
      <h2 className="section-title" data-aos="fade-up">
        Lo que dicen nuestros clientes
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        Experiencias reales de eventos inolvidables
      </p>
      <div data-aos="fade-up" data-aos-delay="200">
        <GoogleReviews placeData={placeData} loading={loading} />
      </div>
    </section>
  );
};
