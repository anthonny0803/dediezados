'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Star, Quote, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PlaceData, Review } from '@/hooks/useGooglePlace';

const MAX_PREVIEW_CHARS = 220;

const truncatePreview = (text: string) => {
  if (text.length <= MAX_PREVIEW_CHARS) return text;
  const slice = text.slice(0, MAX_PREVIEW_CHARS);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trimEnd()}…`;
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

const renderStars = (rating: number, size = 'h-4 w-4') =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`${size} ${
        i < Math.round(rating) ? 'fill-primary text-primary' : 'fill-transparent text-border'
      }`}
    />
  ));

const GoogleBadge = ({ title, className }: { title: string; className?: string }) => (
  <span className={className} title={title} aria-label="Google">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" role="img" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  </span>
);

const Avatar = ({ photo, name }: { photo?: string; name: string }) => {
  const [imgError, setImgError] = useState(false);

  if (photo && !imgError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        width={48}
        height={48}
        loading="lazy"
        onError={() => setImgError(true)}
        className="h-12 w-12 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-primary font-semibold text-primary-foreground">
      {getInitials(name)}
    </div>
  );
};

interface FeaturedReviewCardProps {
  review: Review;
  text: string;
  authorName: string;
  badgeTitle: string;
  readMoreLabel?: string;
  onReadMore?: () => void;
}

const FeaturedReviewCard = ({
  review,
  text,
  authorName,
  badgeTitle,
  readMoreLabel,
  onReadMore,
}: FeaturedReviewCardProps) => (
  <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-elegant md:p-14">
    <Quote className="absolute right-8 top-8 h-20 w-20 text-primary/10" />
    <GoogleBadge title={badgeTitle} className="absolute left-8 top-8 inline-flex" />

    <div className="mb-6 flex gap-1">{renderStars(review.rating || 0, 'h-5 w-5')}</div>

    <p
      className={`relative z-10 font-display text-xl leading-relaxed md:text-2xl ${
        onReadMore ? 'mb-4' : 'mb-8'
      }`}
    >
      {`“${text}”`}
    </p>

    {onReadMore && (
      <button
        type="button"
        onClick={onReadMore}
        className="relative z-10 mb-8 inline-flex cursor-pointer appearance-none border-0 bg-transparent p-0 text-sm font-medium text-primary transition-smooth hover:underline"
      >
        {readMoreLabel}
      </button>
    )}

    <div className="flex items-center gap-4">
      <Avatar photo={review.authorAttribution?.photoUri} name={authorName} />
      <div>
        <div className="font-semibold">{authorName}</div>
        <div className="text-sm text-muted-foreground">
          {review.relativePublishTimeDescription || ''}
        </div>
      </div>
    </div>
  </div>
);

interface GoogleReviewsProps {
  placeData: PlaceData | null;
  loading: boolean;
}

export const GoogleReviews = ({ placeData, loading }: GoogleReviewsProps) => {
  const t = useTranslations('reviews');
  const tCommon = useTranslations('common');
  const [index, setIndex] = useState(0);
  const [modalReview, setModalReview] = useState<Review | null>(null);

  useEffect(() => {
    if (!modalReview) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalReview(null);
    };
    document.addEventListener('keydown', onKeyDown);
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    root.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      root.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [modalReview]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-muted-foreground">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (!placeData?.reviews?.length) {
    return <p className="py-16 text-center text-muted-foreground">{t('empty')}</p>;
  }

  const reviews = placeData.reviews.slice(0, 5);
  const total = reviews.length;
  const safeIndex = index % total;
  const current = reviews[safeIndex];
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const authorName = (review: Review) => review.authorAttribution?.displayName || t('defaultUser');

  const fullText = current.text ?? '';
  const isLong = fullText.length > MAX_PREVIEW_CHARS;

  return (
    <div>
      <div className="relative mx-auto mb-12 max-w-4xl">
        <FeaturedReviewCard
          review={current}
          text={isLong ? truncatePreview(fullText) : fullText}
          authorName={authorName(current)}
          badgeTitle={t('googleBadgeTitle')}
          readMoreLabel={t('readMore')}
          onReadMore={isLong ? () => setModalReview(current) : undefined}
        />

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label={t('prevReview')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-smooth hover:bg-secondary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t('goToReview', { number: i + 1 })}
                aria-current={i === safeIndex}
                className={`h-2 appearance-none rounded-full border-0 p-0 transition-smooth ${
                  i === safeIndex ? 'w-8 bg-primary' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label={t('nextReview')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-smooth hover:bg-secondary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.slice(0, 3).map((review, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-border bg-card/50 p-6 transition-smooth hover:shadow-soft"
          >
            <GoogleBadge title={t('googleBadgeTitle')} className="absolute right-5 top-5 inline-flex" />
            <div className="mb-3 flex gap-1">{renderStars(review.rating || 0)}</div>
            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
              {`“${review.text ?? ''}”`}
            </p>
            <div className="text-sm font-semibold">{authorName(review)}</div>
            <div className="text-xs text-muted-foreground">
              {review.relativePublishTimeDescription || ''}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={placeData.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-smooth hover:border-primary/40 hover:bg-card"
        >
          {t('viewAll')}
        </a>
      </div>

      {modalReview &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={authorName(modalReview)}
            onClick={() => setModalReview(null)}
            className="fixed inset-0 z-[2000] flex items-center justify-center overscroll-contain bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              type="button"
              aria-label={tCommon('close')}
              onClick={() => setModalReview(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-smooth hover:bg-secondary sm:right-8 sm:top-8"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto overscroll-contain"
            >
              <FeaturedReviewCard
                review={modalReview}
                text={modalReview.text ?? ''}
                authorName={authorName(modalReview)}
                badgeTitle={t('googleBadgeTitle')}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
