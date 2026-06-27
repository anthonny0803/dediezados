'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site.config';
import { escapeHtml } from '@/utils/escapeHtml';
import type { PlaceData } from '@/hooks/useGooglePlace';

interface GoogleMapsProps {
  placeData: PlaceData | null;
}

const isHttpUrl = (url: string): boolean => {
  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
};

export const GoogleMaps = ({ placeData }: GoogleMapsProps) => {
  const tBrand = useTranslations('brand');
  const tMap = useTranslations('location.map');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const brandName = tBrand('name');
  const directionsLabel = tMap('directions');
  const reviewsCountText = placeData?.userRatingCount
    ? tMap('reviewsCount', { count: placeData.userRatingCount })
    : '';

  useEffect(() => {
    if (!window.google?.maps) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let marker: google.maps.marker.AdvancedMarkerElement | undefined;

    const initMap = async () => {
      if (!mapRef.current) return;
      if (mapInstanceRef.current) return;

      try {
        const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

        if (cancelled) return;

        const location = placeData?.location
          ? { lat: placeData.location.lat, lng: placeData.location.lng }
          : siteConfig.contact.location;

        const map = new Map(mapRef.current, {
          center: location,
          zoom: siteConfig.contact.location.zoom,
          mapId: 'DEMO_MAP_ID',
          disableDefaultUI: false,
          streetViewControl: false,
          mapTypeControl: false,
          gestureHandling: 'cooperative',
        });

        mapInstanceRef.current = map;

        const displayName = placeData?.displayName || brandName;
        const address = placeData?.formattedAddress || siteConfig.contact.address;
        const phone = placeData?.nationalPhoneNumber || siteConfig.contact.phone;

        marker = new AdvancedMarkerElement({
          position: location,
          map,
          title: displayName,
        });

        const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
        const candidateUrl = placeData?.googleMapsUrl || fallbackUrl;
        const directionsUrl = escapeHtml(isHttpUrl(candidateUrl) ? candidateUrl : fallbackUrl);

        const contentString = `
          <div style="padding: 6px; max-width: 210px; font-family: 'Poppins', sans-serif; color: #333;">
            <h3 style="margin:0 0 4px 0; font-size: 0.9rem; font-weight: 700; color: #000; line-height: 1.2;">
              ${escapeHtml(displayName)}
            </h3>

            <p style="margin: 0 0 6px 0; font-size: 0.75rem; color: #555; line-height: 1.3;">
              📍 ${escapeHtml(address)}
            </p>

            ${placeData?.rating ? `
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 6px; font-size: 0.8rem;">
               <span style="color: #FFC107; font-size: 1rem;">★</span>
               <span style="font-weight: 700;">${placeData.rating.toFixed(1)}</span>
               <span style="color: #666; font-size: 0.75rem;">${escapeHtml(reviewsCountText)}</span>
            </div>
            ` : ''}

            <p style="margin: 0 0 8px 0; font-size: 0.8rem; color: #333; font-weight: 500;">
              📞 ${escapeHtml(phone)}
            </p>

            <a href="${directionsUrl}"
               target="_blank"
               style="display: block; width: 100%; text-align: center; padding: 6px 0; background: #3fb5a1; color: white; text-decoration: none; font-size: 0.8rem; font-weight: 600; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              ${escapeHtml(directionsLabel)}
            </a>
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
          ariaLabel: displayName,
          maxWidth: 230,
        });

        infoWindowRef.current = infoWindow;

        marker.addListener('click', () => infoWindow.open(map, marker));

        timeoutId = setTimeout(() => {
          infoWindow.open(map, marker);
        }, 800);
      } catch (error) {
        console.error('Error inicializando el mapa:', error);
      }
    };

    initMap();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (marker) google.maps.event.clearInstanceListeners(marker);
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
        infoWindowRef.current = null;
      }
    };
  }, [placeData, brandName, directionsLabel, reviewsCountText]);

  return <div ref={mapRef} className="map-container" />;
};
