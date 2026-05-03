'use client';

import { useTranslations } from 'next-intl';
import { GoogleMaps } from '@/components/widgets/GoogleMaps';
import type { PlaceData } from '@/hooks/useGooglePlace';

interface LocationProps {
  placeData: PlaceData | null;
}

export const Location = ({ placeData }: LocationProps) => {
  const t = useTranslations('location');

  return (
    <section id="location">
      <h2 className="section-title" data-aos="fade-up">
        {t('title')}
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        {t('subtitle')}
      </p>
      <div data-aos="fade-up" data-aos-delay="200">
        <GoogleMaps placeData={placeData} />
      </div>
    </section>
  );
};
