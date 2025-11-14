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

// Placeholder SVG for failed avatars (inline to avoid extra request)
const AVATAR_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="56" height="56"%3E%3Ccircle cx="28" cy="28" r="28" fill="%23A8D5D5"/%3E%3Ctext x="28" y="36" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';

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

  // Simple error handler - no retries, just placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = AVATAR_PLACEHOLDER;
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
                  width="56"
                  height="56"
                  loading="lazy"
                  onError={handleImageError}
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

            {/* Google badge - optimized */}
            <div className="google-badge" title="Publicado en Google">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/225px-Google_%22G%22_logo.svg.png" 
                alt="Google"
                width="22"
                height="22"
                loading="lazy"
              />
            </div>

            <p className="review-text">{review.text?.text || ""}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <a
          href={`https://www.google.com/maps/place/De+Diez+A+Dos+-+Sattua/@40.455601,-3.6904604,16z/data=!4m8!3m7!1s0xd42291ddc320085:0x1e02930724190242!8m2!3d40.455601!4d-3.6878855!9m1!1b1!16s%2Fg%2F1tfdfs6b?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D`}
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