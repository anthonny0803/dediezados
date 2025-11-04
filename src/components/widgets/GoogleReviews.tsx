import { useEffect, useState } from "react";

interface Review {
  authorAttribution?: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text: string };
  publishTime?: string;
}

interface PlaceData {
  displayName?: { text: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: Review[];
}

export const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [placeInfo, setPlaceInfo] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      setError("Configuración de Google Places no encontrada");
      setLoading(false);
      return;
    }

    const loadReviews = async () => {
      try {
        // Intentamos SDK JS primero
        if (typeof window.google?.maps?.importLibrary === "function") {
          // @ts-expect-error - nueva API
          const { Place } = await google.maps.importLibrary("places");

          const place = new Place({ id: placeId });

          await place.fetchFields({
            fields: ["displayName", "rating", "userRatingCount", "reviews"],
          });

          const placeData: PlaceData = {
            displayName: place.displayName,
            rating: place.rating,
            userRatingCount: place.userRatingCount,
            reviews: place.reviews || [],
          };

          setPlaceInfo(placeData);
          setReviews((place.reviews || []).slice(0, 3));
          setLoading(false);
        } else {
          // Fallback: REST API
          const res = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,rating,userRatingCount,reviews`,
            {
              headers: {
                "X-Goog-Api-Key": apiKey!,
                "X-Goog-FieldMask":
                  "displayName,rating,userRatingCount,reviews",
              },
            }
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          setPlaceInfo(data);
          setReviews(data.reviews?.slice(0, 10) || []);
          setLoading(false);
        }
      } catch (err: unknown) {
        console.error("Error cargando reseñas:", err);
        setError("No se pudieron cargar las reseñas");
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  if (loading)
    return (
      <div className="reviews-widget">
        <div className="reviews-loader">
          <div className="loader-spinner"></div>
          <p>Cargando reseñas...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="reviews-widget">
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="reviews-widget">
      {placeInfo?.rating && (
        <div style={{ textAlign: "center", marginBottom: "32px" }}></div>
      )}

      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              {review.authorAttribution?.photoUri && (
                <img
                  src={review.authorAttribution.photoUri}
                  alt={review.authorAttribution.displayName}
                  className="review-avatar"
                />
              )}
              <div className="review-info">
                <div className="review-author">
                  {review.authorAttribution?.displayName || "Usuario"}
                </div>
                <div className="review-rating">
                  {renderStars(review.rating || 0)}
                </div>
                <div className="review-date">
                  {review.relativePublishTimeDescription || ""}
                </div>
              </div>
            </div>
            <p className="review-text">{review.text?.text || ""}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <a
          href={`https://search.google.com/local/reviews?placeid=${
            import.meta.env.VITE_GOOGLE_PLACE_ID
          }`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ver-mas-reviews"
        >
          Ver todas las reseñas en Google
        </a>
      </div>
    </div>
  );
};
