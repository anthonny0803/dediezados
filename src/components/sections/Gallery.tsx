'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site.config';
import { Lightbox } from '@/components/ui/Lightbox';

interface GalleryPhotoContent {
  alt: string;
}

// Tall tiles (row-span-2) at these indices keep the 10-photo grid balanced on
// the md 3-column layout: 2 tall + 8 square tiles fill exactly 4 rows.
const TALL_TILE_INDICES = new Set([0, 4]);

export const Gallery = () => {
  const t = useTranslations('gallery');
  const photosContent = t.raw('photos') as GalleryPhotoContent[];
  const rooms = t.raw('rooms') as Record<string, string>;

  const photos = siteConfig.gallery.photos.map((config, index) => ({
    url: config.url,
    room: rooms[config.roomKey],
    alt: photosContent[index].alt,
  }));

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPhoto = selectedIndex === null ? null : photos[selectedIndex];

  return (
    <section id="gallery">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              — {t('label')}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              {t('title')}
            </h2>
          </div>
          <p className="max-w-md text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {photos.map((photo, index) => (
            <button
              key={photo.url}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={photo.alt}
              className={`group relative cursor-zoom-in appearance-none overflow-hidden rounded-2xl border border-solid border-border bg-transparent p-0 ${
                TALL_TILE_INDICES.has(index)
                  ? 'aspect-[3/4] md:row-span-2 md:aspect-[3/5]'
                  : 'aspect-square'
              }`}
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-smooth group-hover:scale-110"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/0 to-transparent opacity-60 transition-smooth group-hover:opacity-90" />
              <span className="absolute bottom-4 left-4 translate-y-2 font-display text-sm font-semibold transition-smooth group-hover:translate-y-0">
                {photo.room}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto !== null && (
        <Lightbox
          src={selectedPhoto.url}
          alt={selectedPhoto.alt}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
};
