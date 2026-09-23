'use client';

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Newspaper, X } from 'lucide-react';
import { newsItems } from '@/config/news.config';
import { useNews } from '@/hooks/useNews';
import { NEWS_MODAL_ID, NewsModal } from '@/components/widgets/NewsModal';
import type { NewsItem, NewsItemContent } from '@/types/news';

/**
 * Entry point of the news widget: floating launcher plus modal.
 *
 * Config and messages meet here, matched by `contentKey` when the item shares
 * its text with others and by `id` otherwise. An item the locale has not
 * translated is dropped rather than rendered half empty, and with nothing left
 * to show the widget renders nothing at all.
 *
 * The launcher mirrors the chatbot on the opposite corner, so neither one
 * covers the other's panel.
 */

export const News = () => {
  const t = useTranslations('news');
  const { isMounted, isOpen, hasSeenRelease, open, close } = useNews();
  const launcherRef = useRef<HTMLButtonElement>(null);

  const closeModal = useCallback(() => {
    close();
    launcherRef.current?.focus();
  }, [close]);

  const goToSection = useCallback(
    (href: string) => {
      close();
      document.getElementById(href.replace('#', ''))?.scrollIntoView({ block: 'start' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    },
    [close],
  );

  const content = t.raw('items') as Record<string, NewsItemContent>;
  const items: NewsItem[] = newsItems.flatMap((item) => {
    const text = content[item.contentKey ?? item.id];
    return text ? [{ ...item, content: text }] : [];
  });

  if (!isMounted || items.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[1500]">
        {hasSeenRelease ? null : (
          <span
            aria-hidden="true"
            className="news-launcher-halo pointer-events-none absolute inset-0 hidden rounded-full bg-primary sm:block"
          />
        )}
        <button
          ref={launcherRef}
          type="button"
          aria-label={t('launcher')}
          aria-controls={isOpen ? NEWS_MODAL_ID : undefined}
          aria-expanded={isOpen}
          onClick={isOpen ? closeModal : open}
          className="relative flex h-14 w-14 cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-gradient-primary text-primary-foreground shadow-elegant transition-smooth hover:scale-105 sm:h-16 sm:w-16"
        >
          {isOpen ? (
            <X className="h-6 w-6 sm:h-7 sm:w-7" />
          ) : (
            <Newspaper className="h-6 w-6 sm:h-7 sm:w-7" />
          )}
          {hasSeenRelease ? null : (
            <span
              aria-hidden="true"
              className="absolute right-0.5 top-0.5 hidden h-3.5 w-3.5 rounded-full border-2 border-background bg-destructive sm:block"
            />
          )}
        </button>
      </div>

      {isOpen ? (
        <NewsModal items={items} onClose={closeModal} onInternalCta={goToSection} />
      ) : null}
    </>
  );
};
