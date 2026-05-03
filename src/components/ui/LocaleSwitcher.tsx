'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const LOCALE_LABELS: Record<string, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  ru: 'Русский',
};

interface LocaleSwitcherProps {
  variant?: 'navbar' | 'sidenav';
}

export const LocaleSwitcher = ({ variant = 'navbar' }: LocaleSwitcherProps) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (locale: string) => {
    setIsOpen(false);
    if (locale === currentLocale) return;
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    router.replace(`${pathname}${hash}`, { locale });
  };

  return (
    <div ref={containerRef} className={`locale-switcher locale-switcher-${variant}`}>
      <button
        type="button"
        className="locale-switcher-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={LOCALE_LABELS[currentLocale]}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/flags/${currentLocale}.svg`}
          alt=""
          className="locale-flag"
          width="24"
          height="18"
          loading="lazy"
        />
        <span className="locale-code">{currentLocale.toUpperCase()}</span>
        <svg
          className={`locale-chevron ${isOpen ? 'open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul className="locale-switcher-menu" role="listbox">
          {routing.locales.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === currentLocale}>
              <button
                type="button"
                className={`locale-option ${locale === currentLocale ? 'active' : ''}`}
                onClick={() => handleSelect(locale)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/flags/${locale}.svg`}
                  alt=""
                  className="locale-flag"
                  width="24"
                  height="18"
                  loading="lazy"
                />
                <span>{LOCALE_LABELS[locale]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
