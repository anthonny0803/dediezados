import { useState, useRef, useEffect } from "react";
import { SITE_CONFIG } from "../../config/siteConfig";

export const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  // Lock scroll while modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Triple photos for infinite scroll visual effect
  const photos = [
    ...SITE_CONFIG.gallery.photos,
    ...SITE_CONFIG.gallery.photos,
    ...SITE_CONFIG.gallery.photos,
  ];

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollLeftBy = () => {
    trackRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRightBy = () => {
    trackRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <>
      {/* Title and subtitle in centered section */}
      <section id="gallery">
        <h2 className="section-title" data-aos="fade-up">
          Salas
        </h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Descubre nuestras elegantes salas, diseñadas para crear el ambiente perfecto para tu evento especial
        </p>
      </section>

      {/* Carousel full-width outside section */}
      <div className="gallery-section">
        <div
          className="gallery-carousel"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Left button */}
          <button 
            className="gallery-carousel-btn left" 
            onClick={scrollLeftBy}
            aria-label="Desplazar galería a la izquierda"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          {/* Carousel track */}
          <div
            ref={trackRef}
            className="gallery-track"
            style={{
              display: "flex",
              gap: "20px",
              padding: "32px",
              overflowX: "scroll",
              scrollbarWidth: "none",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
              animation: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {photos.map((photo, index) => (
              <div
                key={index}
                className="gallery-photo"
                style={{ backgroundImage: `url('${photo.url}')` }}
                onClick={() => { if (!isDragging) openModal(photo.url); }}
                onDragStart={(e) => e.preventDefault()}
              >
                <div className="gallery-photo-label">{photo.sala}</div>
              </div>
            ))}
          </div>

          {/* Right button */}
          <button 
            className="gallery-carousel-btn right" 
            onClick={scrollRightBy}
            aria-label="Desplazar galería a la derecha"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="image-modal active" onClick={closeModal}>
          <div className="modal-close" onClick={closeModal}>
            ×
          </div>
          <img src={selectedImage} alt="Imagen expandida" />
        </div>
      )}

      <style>{`
        .gallery-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};