import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "../../config/siteConfig";
import { PlaceData } from "../../hooks/useGooglePlace";

interface GoogleMapsProps {
  placeData: PlaceData | null;
}

export const GoogleMaps = ({ placeData }: GoogleMapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!window.google?.maps) return;

    const initMap = async () => {
      if (!mapRef.current) return;

      if (mapInstanceRef.current) return;

      try {
        const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

        const location = placeData?.location 
          ? { lat: placeData.location.lat, lng: placeData.location.lng }
          : SITE_CONFIG.contacto.ubicacion;

        const map = new Map(mapRef.current, {
          center: location,
          zoom: SITE_CONFIG.contacto.ubicacion.zoom,
          mapId: "DEMO_MAP_ID",
          disableDefaultUI: false,
          streetViewControl: false,
          mapTypeControl: false,
          gestureHandling: "cooperative"
        });

        mapInstanceRef.current = map;

        const marker = new AdvancedMarkerElement({
          position: location,
          map,
          title: placeData?.displayName || SITE_CONFIG.empresa.nombre,
        });

        // --- DISEÑO COMPACTO DE LA TARJETA ---
        const nombre = placeData?.displayName || SITE_CONFIG.empresa.nombre;
        const direccion = placeData?.formattedAddress || SITE_CONFIG.contacto.direccion;
        const telefono = placeData?.nationalPhoneNumber || SITE_CONFIG.contacto.telefono;
        
        const contentString = `
          <div style="padding: 6px; max-width: 210px; font-family: 'Poppins', sans-serif; color: #333;">
            <h3 style="margin:0 0 4px 0; font-size: 0.9rem; font-weight: 700; color: #000; line-height: 1.2;">
              ${nombre}
            </h3>
            
            <p style="margin: 0 0 6px 0; font-size: 0.75rem; color: #555; line-height: 1.3;">
              📍 ${direccion}
            </p>

            ${placeData?.rating ? `
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 6px; font-size: 0.8rem;">
               <span style="color: #FFC107; font-size: 1rem;">★</span>
               <span style="font-weight: 700;">${placeData.rating.toFixed(1)}</span>
               <span style="color: #666; font-size: 0.75rem;">(${placeData.userRatingCount} reseñas)</span>
            </div>
            ` : ''}

            <p style="margin: 0 0 8px 0; font-size: 0.8rem; color: #333; font-weight: 500;">
              📞 ${telefono}
            </p>

            <a href="${placeData?.googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}" 
               target="_blank" 
               style="display: block; width: 100%; text-align: center; padding: 6px 0; background: #3fb5a1; color: white; text-decoration: none; font-size: 0.8rem; font-weight: 600; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              Cómo llegar
            </a>
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({ 
            content: contentString,
            ariaLabel: nombre,
            maxWidth: 230 // Limite máximo del contenedor de Google
        });
        
        infoWindowRef.current = infoWindow;

        marker.addListener("click", () => infoWindow.open(map, marker));

        // Abrir automáticamente (simulación de click inicial)
        setTimeout(() => {
            infoWindow.open(map, marker);
        }, 800);

      } catch (error) {
        console.error("Error inicializando el mapa:", error);
      }
    };

    initMap();
  }, [placeData]);

  return (
    <div className="map-widget">
      <div ref={mapRef} className="map-container" style={{ height: '500px', width: '100%' }} />
    </div>
  );
};