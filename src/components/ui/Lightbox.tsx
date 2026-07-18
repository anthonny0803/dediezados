'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const Lightbox = ({ src, alt, onClose }: LightboxProps) => {
  const t = useTranslations('common');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
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
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[2000] flex items-center justify-center overscroll-contain bg-black/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        aria-label={t('close')}
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-smooth hover:bg-muted sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" />
      </button>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="92vw"
        onClick={(event) => event.stopPropagation()}
        style={{ width: 'auto', height: 'auto' }}
        className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-elegant"
      />
    </div>,
    document.body,
  );
};
