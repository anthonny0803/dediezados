import { useState, useEffect, useRef } from "react";
import { loadGoogleMaps } from "../utils/loadGoogleMaps";

export interface Review {
  authorAttribution?: {
    displayName: string;
    photoUri: string;
  };
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: string;
  publishTime?: string;
}

export interface PlaceData {
  displayName?: string;
  formattedAddress?: string;
  location?: { lat: number; lng: number };
  nationalPhoneNumber?: string;
  websiteURI?: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: Review[];
  googleMapsUrl?: string;
}

interface UseGooglePlaceProps {
  apiKey: string;
  placeId: string;
}

export const useGooglePlace = ({ apiKey, placeId }: UseGooglePlaceProps) => {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!apiKey || !placeId) {
      setLoading(false);
      return;
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchPlaceData = async () => {
      try {
        await loadGoogleMaps(apiKey);

        // @ts-expect-error - Library import
        const { Place } = await google.maps.importLibrary("places");
        const place = new Place({ id: placeId });
        
        await place.fetchFields({
          fields: [
            "displayName",
            "formattedAddress",
            "location",
            "nationalPhoneNumber",
            "websiteURI",
            "rating",
            "userRatingCount",
            "reviews",
          ],
        });

        // Mapeo manual para evitar errores de tipos y inconsistencias de la API
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawReviews = (place.reviews as any[]) || [];
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cleanReviews: Review[] = rawReviews.map((r: any) => {
            // La API de JS a veces devuelve 'photoURI' y la REST 'photoUri'
            const auth = r.authorAttribution || {};
            return {
                authorAttribution: {
                    displayName: auth.displayName || "Usuario",
                    photoUri: auth.photoURI || auth.photoUri || "", 
                },
                rating: r.rating,
                relativePublishTimeDescription: r.relativePublishTimeDescription,
                text: typeof r.text === 'string' ? r.text : r.text?.text || "",
                publishTime: r.publishTime
            };
        });

        setPlaceData({
          displayName: place.displayName as string,
          formattedAddress: place.formattedAddress as string,
          location: place.location ? { lat: place.location.lat(), lng: place.location.lng() } : undefined,
          nationalPhoneNumber: place.nationalPhoneNumber as string,
          websiteURI: place.websiteURI as string,
          rating: place.rating as number,
          userRatingCount: place.userRatingCount as number,
          reviews: cleanReviews,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`
        });
        
        setLoading(false);

      } catch (err) {
        console.error("Error fetching Google Place:", err);
        setError("No se pudo cargar la información.");
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, [apiKey, placeId]);

  return { placeData, loading, error };
};