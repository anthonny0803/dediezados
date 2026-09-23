'use client';

import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { NEWS_SWIPE_THRESHOLD_PX } from '@/config/news.config';
import { useNewsCarousel } from '@/hooks/useNewsCarousel';
import { NewsProgress } from '@/components/widgets/NewsProgress';
import { NEWS_TITLE_ID, NewsSlide } from '@/components/widgets/NewsSlide';
import type { NewsItem } from '@/types/news';

/**
 * Full screen news feed.
 *
 * A real modal, unlike the chatbot panel: it covers the page, so it locks the
 * background scroll, declares `aria-modal` and keeps Tab inside itself.
 *
 * Only the current item is mounted. Remounting on every move is what stops a
 * playing video when the visitor moves on, with no extra bookkeeping.
 */

export const NEWS_MODAL_ID = 'news-modal';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), video, iframe, [tabindex]:not([tabindex="-1"])';

/** Players own their own gestures and arrow keys; the carousel keeps out. */
const PLAYER_SELECTOR = 'video, iframe, [data-news-no-swipe]';

const NAV_BUTTON_CLASS =
  'flex h-11 w-11 cursor-pointer appearance-none items-center justify-center rounded-full border border-border bg-card text-foreground transition-smooth hover:bg-secondary disabled:pointer-events-none disabled:opacity-40';

interface NewsModalProps {
  items: NewsItem[];
  onClose: () => void;
  onInternalCta: (href: string) => void;
}

export const NewsModal = ({ items, onClose, onInternalCta }: NewsModalProps) => {
  const t = useTranslations('news');
  const { index, next, prev, goTo, isFirst, isLast } = useNewsCarousel(items.length);
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const trapTab = useCallback((event: KeyboardEvent) => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const goingBack = event.shiftKey;

    // Focus can end up outside after a slide swap unmounts whatever held it.
    if (!panel.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (goingBack && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }
    if (!goingBack && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'Tab') {
        trapTab(event);
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(PLAYER_SELECTOR)) return;

      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
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
  }, [next, onClose, prev, trapTab]);

  // Swapping the slide unmounts whatever was focused, dropping focus on the
  // body and letting the next Tab leave the dialog. Take it back.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (panel.contains(document.activeElement)) return;
    panel.focus();
  }, [index]);

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest(PLAYER_SELECTOR)) {
      touchStartRef.current = null;
      return;
    }
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    if (!start) return;
    touchStartRef.current = null;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < NEWS_SWIPE_THRESHOLD_PX) return;
    if (Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;

    if (deltaX < 0) next();
    else prev();
  };

  const item = items[index];

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[2000] flex items-center justify-center overscroll-contain bg-black/90 backdrop-blur-sm sm:p-6"
    >
      <div
        ref={panelRef}
        id={NEWS_MODAL_ID}
        role="dialog"
        aria-modal="true"
        aria-labelledby={NEWS_TITLE_ID}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
        className="relative flex h-[100dvh] w-full max-w-[460px] flex-col overflow-hidden bg-card outline-none sm:h-auto sm:max-h-[92dvh] sm:max-w-[600px] sm:rounded-3xl sm:shadow-elegant lg:max-w-[720px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center gap-3 bg-gradient-to-b from-black/70 to-transparent px-4 pb-10 pt-2">
          <div className="pointer-events-auto min-w-0 flex-1">
            <NewsProgress total={items.length} index={index} onSelect={goTo} />
          </div>
          <button
            type="button"
            aria-label={t('close')}
            onClick={onClose}
            className="pointer-events-auto flex h-10 w-10 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-black/40 text-white transition-smooth hover:bg-black/60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <NewsSlide key={item.id} item={item} onInternalCta={onInternalCta} />

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-4 py-3">
          <button
            type="button"
            aria-label={t('prevItem')}
            onClick={prev}
            disabled={isFirst}
            className={NAV_BUTTON_CLASS}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p aria-live="polite" aria-atomic="true" className="text-xs text-muted-foreground">
            {t('slideStatus', { current: index + 1, total: items.length })}
          </p>
          <button
            type="button"
            aria-label={t('nextItem')}
            onClick={next}
            disabled={isLast}
            className={NAV_BUTTON_CLASS}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
