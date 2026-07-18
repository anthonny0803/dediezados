'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/config/site.config';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const SCROLL_THRESHOLD_PX = 20;

const SECTION_LINKS = [
  'events',
  'space',
  'catering',
  'gallery',
  'contact',
  'location',
  'reviews',
] as const;

export const Navbar = () => {
  const t = useTranslations('nav');
  const tLogo = useTranslations();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ block: 'start' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const linkClass = `group relative text-sm font-medium transition-smooth hover:text-primary ${
    isScrolled ? 'text-muted-foreground' : 'text-white/90'
  }`;

  const linkUnderline = (
    <span
      aria-hidden="true"
      className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-smooth group-hover:w-full"
    />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-smooth ${
        isScrolled
          ? 'navbar-scrolled border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <a
          href={`/${locale}`}
          onClick={handleHomeClick}
          className="navbar-logo shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.logo.url}
            alt={tLogo('logoAlt')}
            data-theme-variant="dark"
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            fetchPriority="high"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.logo.urlLight}
            alt={tLogo('logoAlt')}
            data-theme-variant="light"
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            loading="lazy"
          />
        </a>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6">
          <li>
            <a href={`/${locale}`} onClick={handleHomeClick} className={linkClass}>
              {t('home')}
              {linkUnderline}
            </a>
          </li>
          {SECTION_LINKS.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(e) => handleSectionClick(e, section)}
                className={linkClass}
              >
                {t(section)}
                {linkUnderline}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#footer"
              onClick={(e) => handleSectionClick(e, 'footer')}
              className={linkClass}
            >
              {t('about')}
              {linkUnderline}
            </a>
          </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle variant="navbar" />
          <LocaleSwitcher variant="navbar" />
        </div>
      </div>
    </header>
  );
};
