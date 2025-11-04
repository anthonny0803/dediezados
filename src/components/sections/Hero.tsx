import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = SITE_CONFIG.heroSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="hero">
      <div className="carousel" id="carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            style={{ '--bg-image': `url('${slide.imagen}')` } as React.CSSProperties}
          >
            <div className="carousel-overlay">
              <div className="hero-content">
                <h1>{slide.titulo}</h1>
                <p>{slide.descripcion}</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {slide.botones.map((btn, btnIndex) => (
                    <a
                      key={btnIndex}
                      href={btn.link}
                      className={`btn ${btn.tipo === 'outline' ? 'btn-outline' : ''}`}
                    >
                      {btn.texto}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots de navegación */}
      <div className="carousel-dots" id="carouselDots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};