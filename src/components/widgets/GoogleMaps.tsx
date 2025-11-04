import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "../../config/siteConfig";
import { loadGoogleMaps } from "../../utils/loadGoogleMaps";

export const GoogleMaps = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Google Maps API Key no encontrada");
      return;
    }

    let mounted = true;

    loadGoogleMaps(apiKey)
      .then(() => {
        if (mounted) initializeMap();
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, []);

  const initializeMap = async () => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    const { lat, lng, zoom } = SITE_CONFIG.contacto.ubicacion;

    const map = new Map(mapRef.current, {
      center: { lat, lng },
      zoom,
      mapId: "DEMO_MAP_ID",
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#A8D5D5" }],
        },
      ],
    });

    new AdvancedMarkerElement({
      position: { lat, lng },
      map,
      title: SITE_CONFIG.empresa.nombre,
    });

    mapInstanceRef.current = map;
  };

  return (
    <div className="map-widget">
      <div ref={mapRef} className="map-container" />
    </div>
  );
};
