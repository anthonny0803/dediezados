'use client';

import { useEffect } from 'react';
import 'aos/dist/aos.css';

const AOS_LOAD_TIMEOUT_MS = 3000;

export const AosProvider = () => {
  useEffect(() => {
    let loaded = false;

    const loadAos = async () => {
      if (loaded) return;
      loaded = true;

      try {
        const AOS = await import('aos');

        AOS.init({
          duration: 500,
          easing: 'ease-out-cubic',
          once: true,
          offset: 50,
        });
      } catch (error) {
        console.warn('AOS failed to load:', error);
      }
    };

    const handleScroll = () => {
      loadAos();
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const timeout = setTimeout(loadAos, AOS_LOAD_TIMEOUT_MS);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return null;
};
