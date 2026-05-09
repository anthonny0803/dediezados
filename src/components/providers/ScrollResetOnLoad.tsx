'use client';

import { useEffect } from 'react';

export const ScrollResetOnLoad = () => {
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, []);

  return null;
};
