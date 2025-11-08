import { useState, useRef, useEffect } from "react";
import { SITE_CONFIG } from "../../config/siteConfig";

export const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  // Bloquear scroll mientras el modal esté abierto
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

  // Triplicar fotos para scroll infinito visual
  const photos = [
    ...SITE_CONFIG.gallery.photos,
    ...SITE_CONFIG.gallery.photos,
    ...SITE_CONFIG.gallery.photos,
  ];

  // --- Drag con mouse ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    lastInteractionRef.current = Date.now();
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
    lastInteractionRef.current = Date.now();
  };

  // --- Drag táctil ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    lastInteractionRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastInteractionRef.current = Date.now();
  };

  const handleMouseEnter = () => {
    lastInteractionRef.current = Date.now();
  };

  const scrollLeftBy = () => {
    trackRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRightBy = () => {
    trackRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <>
      <section id="memories" className="memories-section">
        <div style={{ textAlign: "left", padding: "0 5% 48px" }}>
          <h2 className="section-title" data-aos="fade-up">
            Momentos Inolvidables
          </h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Algunos de los eventos que hemos tenido el honor de crear
          </p>
        </div>

        <div
          className="memories-carousel"
          onMouseEnter={handleMouseEnter}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Botón izquierdo */}
          <button className="memories-carousel-btn left" onClick={scrollLeftBy}>
            <svg viewBox="0 0 24 24">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          {/* Carrusel */}
          <div
            ref={trackRef}
            className="memories-track"
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
                className="memory-photo"
                style={{ backgroundImage: `url('${photo}')` }}
                onClick={() => { if (!isDragging) openModal(photo.replace("w=600", "w=1200")); }}
                onDragStart={(e) => e.preventDefault()}
              />
            ))}
          </div>

          {/* Botón derecho */}
          <button className="memories-carousel-btn right" onClick={scrollRightBy}>
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </button>
        </div>
      </section>

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
        .memories-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};
