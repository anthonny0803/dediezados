'use client';

import { useTranslations } from 'next-intl';

/**
 * Segmented position bar, one segment per news item.
 *
 * Segments are buttons, not decoration: they show how far the feed goes and
 * jump straight to any item. Each one sits in a taller transparent hit area so
 * a 4px bar is still comfortable to tap.
 *
 * Colours are fixed white because the bar is laid over the media scrim, not
 * over the card background.
 */

interface NewsProgressProps {
  total: number;
  index: number;
  onSelect: (target: number) => void;
}

export const NewsProgress = ({ total, index, onSelect }: NewsProgressProps) => {
  const t = useTranslations('news');

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }, (_, position) => (
        <button
          key={position}
          type="button"
          onClick={() => onSelect(position)}
          aria-label={t('goToItem', { number: position + 1 })}
          aria-current={position === index ? 'true' : undefined}
          className="flex flex-1 cursor-pointer appearance-none items-center border-0 bg-transparent px-0 py-2.5"
        >
          <span className="block h-1 w-full overflow-hidden rounded-full bg-white/35">
            <span
              className="block h-full rounded-full bg-white transition-smooth"
              style={{ width: position <= index ? '100%' : '0%' }}
            />
          </span>
        </button>
      ))}
    </div>
  );
};
