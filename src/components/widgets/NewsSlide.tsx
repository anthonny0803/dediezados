'use client';

import { ArrowRight, ExternalLink } from 'lucide-react';
import { NewsMedia } from '@/components/widgets/NewsMedia';
import type { NewsCta as NewsCtaConfig, NewsItem } from '@/types/news';

/**
 * One news item: its media, its text and an optional call to action.
 *
 * The heading keeps a fixed id because the dialog is labelled by it and only
 * one item is mounted at a time. The call to action is rendered only when the
 * config declares a link and the locale provides a label, so a missing
 * translation never leaves a nameless button on screen.
 */

export const NEWS_TITLE_ID = 'news-title';

const CTA_CLASS =
  'mt-5 inline-flex items-center gap-2 rounded-full border-0 bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:opacity-90';

interface NewsCtaProps {
  cta: NewsCtaConfig;
  label: string;
  onInternal: (href: string) => void;
}

const NewsCta = ({ cta, label, onInternal }: NewsCtaProps) => {
  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={CTA_CLASS}>
        {label}
        <ExternalLink aria-hidden="true" className="h-4 w-4" />
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onInternal(cta.href)}
      className={`${CTA_CLASS} cursor-pointer appearance-none`}
    >
      {label}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </button>
  );
};

interface NewsSlideProps {
  item: NewsItem;
  onInternalCta: (href: string) => void;
}

export const NewsSlide = ({ item, onInternalCta }: NewsSlideProps) => {
  const { media, cta, content } = item;
  const ctaLabel = content.ctaLabel;

  return (
    <article className="news-slide flex min-h-0 flex-1 flex-col">
      <NewsMedia media={media} alt={content.alt} title={content.title} />

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-7">
        <h2 id={NEWS_TITLE_ID} className="font-display text-xl font-semibold leading-tight sm:text-2xl">
          {content.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {content.body}
        </p>

        {cta && ctaLabel ? (
          <NewsCta cta={cta} label={ctaLabel} onInternal={onInternalCta} />
        ) : null}
      </div>
    </article>
  );
};
