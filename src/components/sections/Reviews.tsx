'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { GoogleReviews } from '@/components/widgets/GoogleReviews';
import type { PlaceData } from '@/hooks/useGooglePlace';

interface ReviewsProps {
  placeData: PlaceData | null;
  loading: boolean;
}

export const Reviews = ({ placeData, loading }: ReviewsProps) => {
  const t = useTranslations('reviews');
  const locale = useLocale();

  const formattedRating = placeData?.rating?.toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section id="reviews">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            — {t('label')}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            {t('title')}{' '}
            <span className="italic leading-tight text-gradient-primary">
              {t('titleAccent')}
            </span>
          </h2>
          {formattedRating ? (
            <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm">
                {t('ratingSummary', {
                  rating: formattedRating,
                  count: placeData?.userRatingCount ?? 0,
                })}
              </span>
            </div>
          ) : null}
        </div>

        <GoogleReviews placeData={placeData} loading={loading} />
      </div>
    </section>
  );
};
