// GoogleMaps.tsx
import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "../../config/siteConfig";
import { loadGoogleMaps } from "../../utils/loadGoogleMaps";

export const GoogleMaps = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

    if (!apiKey) {
      console.error("Google Maps API Key no encontrada");
      return;
    }

    if (!placeId) {
      console.error("Google Place ID no encontrado");
      return;
    }

    let mounted = true;

    loadGoogleMaps(apiKey)
      .then(() => {
        if (mounted) initializeMap(placeId);
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, []);

  const initializeMap = async (placeId: string) => {
    if (!mapRef.current || mapInstanceRef.current) return;

    try {
      // Importar librerías necesarias
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;
      // @ts-expect-error - Places es una librería válida
      const { Place } = await google.maps.importLibrary("places");

      const { lat, lng, zoom } = SITE_CONFIG.contacto.ubicacion;

      // Crear el mapa
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

      // Crear el marker
      const marker = new AdvancedMarkerElement({
        position: { lat, lng },
        map,
        title: SITE_CONFIG.empresa.nombre,
      });

      // Cargar información del Place
      const place = new Place({ id: placeId });

      await place.fetchFields({
        fields: [
          "displayName",
          "formattedAddress",
          "rating",
          "userRatingCount",
          "nationalPhoneNumber",
          "websiteURI",
        ],
      });

      // Crear contenido del InfoWindow
      const contentString = `
  <div style="padding: 6px 8px; max-width: 196px; font-family: 'Poppins', sans-serif;">
    <h3 style="margin: 0 0 4px 0; font-size: 0.77rem; color: #000; font-weight: 600; line-height: 1.2;">
      ${place.displayName?.text || SITE_CONFIG.empresa.nombre}
    </h3>
    
    ${
      place.formattedAddress
        ? `<p style="margin: 4px 0; color: #666; font-size: 0.63rem; line-height: 1.2;">
        📍 ${place.formattedAddress}
      </p>`
        : ""
    }
    
    ${
      place.rating
        ? `<div style="margin: 4px 0; font-size: 0.63rem;">
        <span style="color: #FFC107; font-weight: 600;">★ ${place.rating.toFixed(
          1
        )}</span>
        <span style="color: #666;"> (${
          place.userRatingCount || 0
        } reseñas)</span>
      </div>`
        : ""
    }
    
    ${
      place.nationalPhoneNumber
        ? `<p style="margin: 4px 0; color: #666; font-size: 0.63rem;">
        📞 ${place.nationalPhoneNumber}
      </p>`
        : ""
    }
    
    <div style="margin-top: 6px;">
      <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" 
         target="_blank" 
         rel="noopener noreferrer"
         style="display: inline-block; padding: 5px 11px; background: #A8D5D5; color: white; text-decoration: none; font-size: 0.6rem; font-weight: 600; transition: all 0.3s;">
        Cómo llegar
      </a>
    </div>
  </div>
`;

      // Crear InfoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      });

      // Abrir automáticamente al cargar
      infoWindow.open(map, marker);

      // También abrirlo al hacer clic en el marker
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      mapInstanceRef.current = map;
    } catch (error) {
      console.error("Error inicializando el mapa:", error);
    }
  };

  return (
    <div className="map-widget">
      <div ref={mapRef} className="map-container" />
    </div>
  );
};
