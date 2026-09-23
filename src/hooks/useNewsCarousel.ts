'use client';

import { useCallback, useState } from 'react';

/**
 * Position within the news feed.
 *
 * Stories run start to end and stop there: no wrap-around, so reaching the
 * last item is a visible ending rather than a silent loop back to the first.
 * There is no timed auto-advance either, because items mix images and videos
 * and a countdown would either cut a video short or stall on a photo.
 */
export const useNewsCarousel = (total: number) => {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (target: number) => {
      setIndex(Math.min(Math.max(target, 0), Math.max(total - 1, 0)));
    },
    [total],
  );

  const next = useCallback(() => {
    setIndex((current) => Math.min(current + 1, total - 1));
  }, [total]);

  const prev = useCallback(() => {
    setIndex((current) => Math.max(current - 1, 0));
  }, []);

  return {
    index,
    next,
    prev,
    goTo,
    isFirst: index === 0,
    isLast: index >= total - 1,
  };
};
