'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  NEWS_AUTO_OPEN_DELAY_MS,
  NEWS_RELEASE_ID,
  NEWS_STORAGE_KEY,
} from '@/config/news.config';

/**
 * Visibility of the news modal and memory of the release already seen.
 *
 * The browser remembers the last release it was shown, so a visitor is
 * interrupted once per publication instead of once per visit. No account and
 * no tracking cookie: `localStorage` is per browser and never leaves it.
 *
 * Storage throws in private Safari and wherever site data is blocked, so every
 * access is guarded and a failure falls to the least annoying side: the modal
 * stays closed and the launcher still opens it.
 */

const readSeenRelease = (): string | null => {
  try {
    return window.localStorage.getItem(NEWS_STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeSeenRelease = () => {
  try {
    window.localStorage.setItem(NEWS_STORAGE_KEY, NEWS_RELEASE_ID);
  } catch {
    // Storage unavailable: the release simply stays unseen for this browser.
  }
};

export const useNews = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenRelease, setHasSeenRelease] = useState(true);

  const markAsSeen = useCallback(() => {
    writeSeenRelease();
    setHasSeenRelease(true);
  }, []);

  const open = useCallback(() => {
    markAsSeen();
    setIsOpen(true);
  }, [markAsSeen]);

  const close = useCallback(() => {
    markAsSeen();
    setIsOpen(false);
  }, [markAsSeen]);

  useEffect(() => {
    setIsMounted(true);

    const isSeen = readSeenRelease() === NEWS_RELEASE_ID;
    setHasSeenRelease(isSeen);
    if (isSeen) return;

    // The cleanup cancels the pending timer, so React's development double
    // mount still ends up with exactly one scheduled opening.
    const timeout = setTimeout(open, NEWS_AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [open]);

  return { isMounted, isOpen, hasSeenRelease, open, close };
};
