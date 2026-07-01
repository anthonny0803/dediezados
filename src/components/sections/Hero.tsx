'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface HeroSlideContent {
  title: string;
  description: string;
  primaryCta: string;
  outlineCta: string;
  alt: string;
}

interface HeroStatContent {
  label: string;
}

export const Hero = () => {
  const t = useTranslations('hero');
  const slidesContent = t.raw('slides') as HeroSlideContent[];
  const slidesConfig = siteConfig.heroSlides;
  const slides = slidesConfig.map((config, index) => ({
    ...config,
    ...slidesContent[index],
  }));

  const statsContent = t.raw('stats') as HeroStatContent[];
  const stats = siteConfig.heroStats.map((config, index) => ({
    ...config,
    ...statsContent[index],
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

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
        {slides.map((slide, index) => {
          const ctaTexts = [slide.primaryCta, slide.outlineCta];
          return (
            <div
              key={index}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="carousel-image"
              />
              <div className="carousel-overlay">
                <div className="hero-content">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary mb-6 backdrop-blur">
                    <MapPin className="h-4 w-4" />
                    {t('badge')}
                  </span>
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <div className="hero-buttons">
                    {slide.buttons.map((btn, btnIndex) => (
                      <a
                        key={btnIndex}
                        href={btn.link}
                        className={`btn ${btn.variant === 'outline' ? 'btn-outline' : ''}`}
                      >
                        {ctaTexts[btnIndex]}
                      </a>
                    ))}
                  </div>
                  <div className="mt-10 grid grid-cols-2 gap-8 max-w-md mx-auto">
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-4xl md:text-5xl leading-tight font-display font-bold text-gradient-primary">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/80 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="carousel-dots" id="carouselDots" role="tablist" aria-label={t('carouselLabel')}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={t('slideLabel', { index: index + 1 })}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
};
