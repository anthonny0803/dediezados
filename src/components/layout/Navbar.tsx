'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/config/site.config';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Navbar = () => {
  const t = useTranslations('nav');
  const tLogo = useTranslations();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

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

  return (
    <>
      {/* LOGO FIJO INDEPENDIENTE */}
      <div className={`logo-fixed ${isScrolled ? 'hide' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.logo.url}
          alt={tLogo('logoAlt')}
          width={siteConfig.logo.width}
          height={siteConfig.logo.height}
          fetchPriority="high"
        />
      </div>

      {/* NAV CENTRADO */}
      <nav id="navbar" className={isScrolled ? 'hide' : ''}>
        <ul>
          <li><a href={`/${locale}`} onClick={handleHomeClick}>{t('home')}</a></li>
          <li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')}>{t('services')}</a></li>
          <li><a href="#catering" onClick={(e) => handleSectionClick(e, 'catering')}>{t('catering')}</a></li>
          <li><a href="#extras" onClick={(e) => handleSectionClick(e, 'extras')}>{t('extras')}</a></li>
          <li><a href="#gallery" onClick={(e) => handleSectionClick(e, 'gallery')}>{t('gallery')}</a></li>
          <li><a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')}>{t('contact')}</a></li>
          <li><a href="#location" onClick={(e) => handleSectionClick(e, 'location')}>{t('location')}</a></li>
          <li><a href="#reviews" onClick={(e) => handleSectionClick(e, 'reviews')}>{t('reviews')}</a></li>
          <li><a href="#footer" onClick={(e) => handleSectionClick(e, 'footer')}>{t('about')}</a></li>
          <li className="navbar-theme-toggle">
            <ThemeToggle variant="navbar" />
          </li>
          <li className="navbar-locale-switcher">
            <LocaleSwitcher variant="navbar" />
          </li>
        </ul>
      </nav>
    </>
  );
};
