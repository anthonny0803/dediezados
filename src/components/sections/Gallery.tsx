'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site.config';

interface GalleryPhotoContent {
  room: 'olas' | 'amazonias';
  alt: string;
}

export const Gallery = () => {
  const t = useTranslations('gallery');
  const photosContent = t.raw('photos') as GalleryPhotoContent[];
  const rooms = t.raw('rooms') as Record<string, string>;

  const photosBase = siteConfig.gallery.photos.map((config, index) => ({
    url: config.url,
    room: rooms[photosContent[index].room],
    alt: photosContent[index].alt,
  }));

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
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
    setSelectedImage('');
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const photos = [...photosBase, ...photosBase, ...photosBase];

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
    trackRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  };

  const scrollRightBy = () => {
    trackRef.current?.scrollBy({ left: 340, behavior: 'smooth' });
  };

  return (
    <>
      <section id="gallery">
        <h2 className="section-title" data-aos="fade-up">
          {t('title')}
        </h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          {t('subtitle')}
        </p>
      </section>

      <div className="gallery-section">
        <div
          className="gallery-carousel"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <button
            className="gallery-carousel-btn left"
            onClick={scrollLeftBy}
            aria-label={t('scrollLeftLabel')}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <div
            ref={trackRef}
            className={`gallery-track ${isDragging ? 'dragging' : ''}`}
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
                onClick={() => { if (!isDragging) openModal(photo.url); }}
                onDragStart={(e) => e.preventDefault()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.alt}
                  width="340"
                  height="340"
                  loading="lazy"
                  draggable="false"
                />
                <div className="gallery-photo-label">{photo.room}</div>
              </div>
            ))}
          </div>

          <button
            className="gallery-carousel-btn right"
            onClick={scrollRightBy}
            aria-label={t('scrollRightLabel')}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="image-modal active" onClick={closeModal}>
          <div className="modal-close" onClick={closeModal}>
            ×
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={selectedImage} alt={t('expandedAlt')} />
        </div>
      )}
    </>
  );
};
