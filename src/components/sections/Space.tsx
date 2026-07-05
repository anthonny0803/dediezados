'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Music,
  Utensils,
  Wine,
  Lightbulb,
  Camera,
  Car,
  X,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface CardContent {
  title: string;
  description: string;
}

const iconMap: Record<string, LucideIcon> = {
  music: Music,
  utensils: Utensils,
  wine: Wine,
  lightbulb: Lightbulb,
  camera: Camera,
  car: Car,
};

// Coverflow geometry, in viewport-width fractions. The centered card sits on
// top at full size; neighbours are pushed out by STEP_FRAC (< CARD_FRAC) so the
// central card overlaps and hides their inner edge, leaving a sliver peeking on
// the sides. Non-centered cards are scaled down and dimmed. Tunable.
const CARD_FRAC = 0.72;
const STEP_FRAC = 0.2;
const SIDE_SCALE = 0.8;
const SIDE_OPACITY = 0.45;
const VISIBLE_RANGE = 1.6;
const AUTOPLAY_MS = 5000;

export const Space = () => {
  const t = useTranslations('space');
  const imagesContent = t.raw('images') as { alt: string }[];
  const cardsContent = t.raw('cards') as CardContent[];

  const slides = siteConfig.space.images.map((image, index) => ({
    image,
    alt: imagesContent[index]?.alt ?? '',
  }));
  const cards = siteConfig.space.cards.map((config, index) => ({
    ...config,
    ...cardsContent[index],
  }));
  const total = slides.length;

  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragMoved = useRef(false);
  const autoplayDir = useRef(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setViewportWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    root.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      root.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (isHovered || isDragging || lightboxOpen) return;
    const id = setInterval(() => {
      setActiveIndex((current) => {
        let next = current + autoplayDir.current;
        if (next > total - 1) {
          next = total - 2;
          autoplayDir.current = -1;
        } else if (next < 0) {
          next = 1;
          autoplayDir.current = 1;
        }
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isHovered, isDragging, lightboxOpen, total]);

  const stepPx = viewportWidth * STEP_FRAC;
  // Fractional index at the viewport center (integer when settled; shifts while
  // dragging). Drives both the snap target and each slide's placement.
  const centerPos =
    stepPx > 0 ? activeIndex - dragDeltaX / stepPx : activeIndex;

  const getSlideStyle = (relative: number): CSSProperties => {
    const distance = Math.min(Math.abs(relative), 1);
    const centerFraction = 0.5 + relative * STEP_FRAC;
    return {
      width: `${CARD_FRAC * 100}%`,
      left: `${(centerFraction - CARD_FRAC / 2) * 100}%`,
      transform: `scale(${1 - (1 - SIDE_SCALE) * distance})`,
      opacity:
        Math.abs(relative) > VISIBLE_RANGE
          ? 0
          : 1 - (1 - SIDE_OPACITY) * distance,
      zIndex: Math.round(30 - Math.abs(relative) * 10),
    };
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    dragMoved.current = false;
    setIsDragging(true);
    setDragDeltaX(0);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = event.clientX - dragStartX.current;
    // Capture the pointer only once it is really a drag, so a plain tap still
    // dispatches a click on the slide (pointer capture would swallow it).
    if (!dragMoved.current && Math.abs(delta) > 6) {
      dragMoved.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDragDeltaX(delta);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const target = Math.max(0, Math.min(total - 1, Math.round(centerPos)));
    setActiveIndex(target);
    setDragDeltaX(0);
  };

  // A tap on a side card brings it to the centre; a tap on the centred card
  // expands it in the lightbox. Ignored when the pointer was actually dragging.
  const handleSlideClick = (index: number) => {
    if (dragMoved.current) return;
    if (index === activeIndex) {
      setLightboxOpen(true);
      return;
    }
    setActiveIndex(index);
  };

  return (
    <section id="space">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mt-8 lg:mt-64">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-full bg-gradient-primary opacity-20 blur-3xl"
            />

            <div
              ref={viewportRef}
              className="relative h-[380px] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing sm:h-[440px] lg:h-[520px]"
              onPointerDown={startDrag}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {slides.map((slide, index) => {
                const relative = index - centerPos;
                const isCenter = Math.abs(relative) < 0.5;
                const isHidden = Math.abs(relative) > VISIBLE_RANGE;
                return (
                  <button
                    key={slide.image}
                    type="button"
                    aria-label={slide.alt}
                    aria-hidden={isHidden}
                    tabIndex={isHidden ? -1 : 0}
                    onClick={() => handleSlideClick(index)}
                    style={getSlideStyle(relative)}
                    className={`absolute top-0 h-full overflow-hidden rounded-3xl border border-border ${
                      isCenter ? 'cursor-zoom-in shadow-elegant' : 'cursor-pointer'
                    } ${
                      isDragging
                        ? ''
                        : 'transition-[left,transform,opacity] duration-500 ease-out'
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1024px) 70vw, 34vw"
                      draggable={false}
                      className="pointer-events-none select-none object-cover"
                    />
                    {!isCenter && (
                      <span className="pointer-events-none absolute inset-0 bg-background/30" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pointer-events-none absolute -bottom-5 right-[10%] z-40 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="font-display text-3xl font-bold leading-tight text-gradient-primary">
                {t('badge.value')}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {t('badge.label')}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`dot-${slide.image}`}
                  type="button"
                  aria-label={slide.alt}
                  aria-current={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 appearance-none rounded-full border-0 p-0 transition-smooth ${
                    isActive
                      ? 'w-8 bg-gradient-primary'
                      : 'w-2 bg-border hover:bg-primary/50'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            — {t('label')}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            {t('title')}{' '}
            <span className="italic leading-tight text-gradient-primary">
              {t('titleAccent')}
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t('description')}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {cards.map((card) => {
              const Icon = iconMap[card.icon];
              return (
                <div
                  key={card.title}
                  className="group rounded-xl border border-border bg-card/50 p-5 transition-smooth hover:border-primary/40 hover:bg-card"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </span>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={slides[activeIndex].alt}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center overscroll-contain bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-smooth hover:bg-muted sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </button>
          <Image
            src={slides[activeIndex].image}
            alt={slides[activeIndex].alt}
            width={0}
            height={0}
            sizes="90vw"
            onClick={(event) => event.stopPropagation()}
            style={{ width: 'auto', height: 'auto' }}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-elegant"
          />
        </div>
      )}
    </section>
  );
};
