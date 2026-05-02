'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site.config';

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = siteConfig.heroSlides;

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
            style={{ '--bg-image': `url('${slide.image}')` } as React.CSSProperties}
          >
            <div className="carousel-overlay">
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <div className="hero-buttons">
                  {slide.buttons.map((btn, btnIndex) => (
                    <a
                      key={btnIndex}
                      href={btn.link}
                      className={`btn ${btn.variant === 'outline' ? 'btn-outline' : ''}`}
                    >
                      {btn.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-dots" id="carouselDots" role="tablist" aria-label="Slides del carrusel">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
};
