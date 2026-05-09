'use client';

import { useTranslations } from 'next-intl';
import type { PlaceData } from '@/hooks/useGooglePlace';

const AVATAR_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="56" height="56"%3E%3Ccircle cx="28" cy="28" r="28" fill="%233fb5a1"/%3E%3Cpath d="M28 16a8 8 0 110 16 8 8 0 010-16zM14 44c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/%3E%3C/svg%3E';

interface GoogleReviewsProps {
  placeData: PlaceData | null;
  loading: boolean;
}

export const GoogleReviews = ({ placeData, loading }: GoogleReviewsProps) => {
  const t = useTranslations('reviews');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = AVATAR_PLACEHOLDER;
  };

  if (loading) {
    return (
      <div className="reviews-widget">
        <div className="reviews-loader">
          <div className="loader-spinner"></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!placeData?.reviews?.length) {
    return (
      <div className="reviews-widget">
        <p className="reviews-empty">{t('empty')}</p>
      </div>
    );
  }

  const reviewsToShow = placeData.reviews.slice(0, 5);

  return (
    <div>
      <div className="reviews-container">
        {reviewsToShow.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <img
                src={review.authorAttribution?.photoUri || AVATAR_PLACEHOLDER}
                alt={review.authorAttribution?.displayName}
                className="review-avatar"
                width="56"
                height="56"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="review-info">
                <div className="review-author">
                  {review.authorAttribution?.displayName || t('defaultUser')}
                </div>
                <div className="review-rating">
                  {renderStars(review.rating || 0)}
                </div>
                <div className="review-date">
                  {review.relativePublishTimeDescription || ''}
                </div>
              </div>
            </div>

            <div className="google-badge" title={t('googleBadgeTitle')} aria-label="Google">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22" role="img" aria-hidden="true">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
            </div>

            <p className="review-text">
              {typeof review.text === 'string' ? review.text : ''}
            </p>
          </div>
        ))}
      </div>

      <div className="reviews-button-wrapper">
        <a
          href={placeData.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ver-mas-reviews"
        >
          {t('viewAll')}
        </a>
      </div>
    </div>
  );
};
