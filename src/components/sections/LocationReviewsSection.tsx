'use client';

import { useEffect, useRef, useState } from 'react';
import { useGooglePlace } from '@/hooks/useGooglePlace';
import { Location } from './Location';
import { Reviews } from './Reviews';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? '';

export const LocationReviewsSection = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { placeData, loading } = useGooglePlace({
    apiKey: GOOGLE_MAPS_API_KEY,
    placeId: GOOGLE_PLACE_ID,
    enabled,
  });

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <Location placeData={placeData} />
      <Reviews placeData={placeData} loading={loading} />
    </>
  );
};
