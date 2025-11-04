import { useState, useRef, useEffect } from "react";
import { SITE_CONFIG } from "../../config/siteConfig";

export const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  // Triplicar fotos para scroll infinito
  const photos = [
    ...SITE_CONFIG.gallery.photos,
    ...SITE_CONFIG.gallery.photos,
    ...SITE_CONFIG.gallery.photos,
  ];

  // Auto-scroll continuo sin saltos
  useEffect(() => {
    const animate = () => {
      if (!trackRef.current || isDragging) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const timeSinceInteraction = Date.now() - lastInteractionRef.current;
      if (timeSinceInteraction > 3000) {
        trackRef.current.scrollLeft += 1; // Ajusta la velocidad aquí

        // Scroll infinito suave: cuando llega a 1/3, vuelve al inicio sin salto
        const scrollWidth = trackRef.current.scrollWidth;
        const clientWidth = trackRef.current.clientWidth;
        const oneThirdScroll = (scrollWidth - clientWidth) / 3;

        // Si ha scrolleado más de 1/3 del contenido total, resetear suavemente
        if (trackRef.current.scrollLeft >= oneThirdScroll * 2) {
          trackRef.current.scrollLeft = oneThirdScroll;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

  // Drag con mouse
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
    const walk = (x - startX) * 2; // Multiplicador de velocidad
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastInteractionRef.current = Date.now();
  };

  // Drag táctil
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

  // Pausar en hover
  const handleMouseEnter = () => {
    lastInteractionRef.current = Date.now();
  };

  return (
    <>
      <section id="memories" className="memories-section">
        <div style={{ textAlign: "left", padding: "0 5% 48px" }}>
          <h2 className="section-title">Momentos Inolvidables</h2>
          <p className="section-subtitle">
            Algunos de los eventos que hemos tenido el honor de crear
          </p>
        </div>
        <div className="memories-carousel" onMouseEnter={handleMouseEnter}>
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
              animation: "none", // Desactivar animación CSS
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
                style={{
                  backgroundImage: `url('${photo}')`,
                  minWidth: "340px",
                  height: "340px",
                }}
                onClick={() => {
                  if (!isDragging) {
                    openModal(photo.replace("w=600", "w=1200"));
                  }
                }}
                onDragStart={(e) => e.preventDefault()}
              />
            ))}
          </div>
        </div>
      </section>

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
