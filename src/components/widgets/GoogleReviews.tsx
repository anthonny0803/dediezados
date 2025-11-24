import { PlaceData } from "../../hooks/useGooglePlace";

const AVATAR_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="56" height="56"%3E%3Ccircle cx="28" cy="28" r="28" fill="%23A8D5D5"/%3E%3Ctext x="28" y="36" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';

interface GoogleReviewsProps {
  placeData: PlaceData | null;
  loading: boolean;
}

export const GoogleReviews = ({ placeData, loading }: GoogleReviewsProps) => {
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>★</span>
    ));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = AVATAR_PLACEHOLDER;
  };

  if (loading) {
    return (
      <div className="reviews-widget">
        <div className="reviews-loader">
          <div className="loader-spinner"></div>
          <p>Cargando reseñas...</p>
        </div>
      </div>
    );
  };

  if (!placeData?.reviews?.length) {
    return (
        <div className="reviews-widget">
            <p className="reviews-empty">No hay reseñas disponibles.</p>
        </div>
    );
  }

  const reviewsToShow = placeData.reviews.slice(0, 5);

  return (
    <div>
      <div className="reviews-container">
        {reviewsToShow.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <img
                src={review.authorAttribution?.photoUri || AVATAR_PLACEHOLDER}
                alt={review.authorAttribution?.displayName}
                className="review-avatar"
                width="56"
                height="56"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="review-info">
                <div className="review-author">
                  {review.authorAttribution?.displayName || "Usuario de Google"}
                </div>
                <div className="review-rating">
                  {renderStars(review.rating || 0)}
                </div>
                <div className="review-date">
                  {review.relativePublishTimeDescription || ""}
                </div>
              </div>
            </div>

            <div className="google-badge" title="Publicado en Google">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/225px-Google_%22G%22_logo.svg.png" 
                alt="Google"
                width="22"
                height="22"
                loading="lazy"
              />
            </div>

            <p className="review-text">
              {typeof review.text === 'string' ? review.text : ''}
            </p>
          </div>
        ))}
      </div>

      <div className="reviews-button-wrapper">
        <a
          href={placeData.googleMapsUrl}
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