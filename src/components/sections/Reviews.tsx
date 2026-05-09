'use client';

import { useTranslations } from 'next-intl';
import { GoogleReviews } from '@/components/widgets/GoogleReviews';
import type { PlaceData } from '@/hooks/useGooglePlace';

interface ReviewsProps {
  placeData: PlaceData | null;
  loading: boolean;
}

export const Reviews = ({ placeData, loading }: ReviewsProps) => {
  const t = useTranslations('reviews');

  return (
    <section id="reviews">
      <h2 className="section-title" data-aos="fade-up">
        {t('title')}
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        {t('subtitle')}
      </p>
      <div data-aos="fade-up" data-aos-delay="200">
        <GoogleReviews placeData={placeData} loading={loading} />
      </div>
    </section>
  );
};
