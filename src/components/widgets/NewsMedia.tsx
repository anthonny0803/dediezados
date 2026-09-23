'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Play } from 'lucide-react';
import type { NewsMedia as NewsMediaType } from '@/types/news';

/**
 * Frame and player for one news item.
 *
 * The frame takes the aspect ratio the item declares, so portrait, square and
 * landscape assets all fit whatever device is looking at them. A very tall
 * asset is capped in height instead of being cropped: `object-contain` keeps
 * the whole picture and the backdrop absorbs the difference.
 *
 * That backdrop is the same picture, blown up and blurred, so portrait media
 * on a wide card has no dead black bars. It is requested at a tiny size: once
 * blurred nobody can tell, and it costs a couple of kilobytes.
 *
 * Neither player fetches anything before the visitor asks for it: the video
 * tag preloads nothing and the YouTube embed only exists after the click.
 */

const FRAME_CLASS =
  'relative w-full shrink-0 overflow-hidden bg-black max-h-[60dvh] sm:max-h-[62vh]';

const MEDIA_CLASS = 'relative h-full w-full object-contain';

const IMAGE_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 600px, 720px';

const BACKDROP_SIZES = '64px';

const YOUTUBE_EMBED_PARAMS = 'autoplay=1&rel=0&modestbranding=1&playsinline=1';

/** Blurred fill behind the media. Decorative, so it stays out of the a11y tree. */
const Backdrop = ({ src }: { src: string }) => (
  <Image
    src={src}
    alt=""
    aria-hidden="true"
    fill
    sizes={BACKDROP_SIZES}
    className="scale-125 object-cover opacity-70 blur-2xl"
  />
);

interface NewsMediaProps {
  media: NewsMediaType;
  alt: string;
  title: string;
}

interface YoutubeMediaProps {
  videoId: string;
  poster: string;
  alt: string;
  title: string;
}

const YoutubeMedia = ({ videoId, poster, alt, title }: YoutubeMediaProps) => {
  const t = useTranslations('news');
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className={FRAME_CLASS} style={{ aspectRatio: '16 / 9' }} data-news-no-swipe>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${YOUTUBE_EMBED_PARAMS}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className={FRAME_CLASS} style={{ aspectRatio: '16 / 9' }}>
      <Backdrop src={poster} />
      <Image src={poster} alt={alt} fill sizes={IMAGE_SIZES} className="object-contain" />
      <button
        type="button"
        aria-label={t('playVideo')}
        onClick={() => setIsPlaying(true)}
        className="absolute inset-0 flex cursor-pointer appearance-none items-center justify-center border-0 bg-black/30 transition-smooth hover:bg-black/40"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant">
          <Play aria-hidden="true" className="h-7 w-7 translate-x-0.5" />
        </span>
      </button>
    </div>
  );
};

export const NewsMedia = ({ media, alt, title }: NewsMediaProps) => {
  if (media.kind === 'youtube') {
    return <YoutubeMedia videoId={media.videoId} poster={media.poster} alt={alt} title={title} />;
  }

  const frameStyle = { aspectRatio: `${media.width} / ${media.height}` };

  if (media.kind === 'cloudinaryVideo') {
    return (
      <div className={FRAME_CLASS} style={frameStyle} data-news-no-swipe>
        <Backdrop src={media.poster} />
        <video
          src={media.src}
          poster={media.poster}
          controls
          playsInline
          preload="none"
          aria-label={alt}
          className={MEDIA_CLASS}
        />
      </div>
    );
  }

  return (
    <div className={FRAME_CLASS} style={frameStyle}>
      <Backdrop src={media.url} />
      <Image src={media.url} alt={alt} fill sizes={IMAGE_SIZES} className="object-contain" />
    </div>
  );
};
