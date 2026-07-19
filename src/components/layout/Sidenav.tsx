'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/config/site.config';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Sidenav = () => {
  const t = useTranslations('nav');
  const tRoot = useTranslations();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleSidenav = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      document.body.classList.add('no-scroll');
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      document.body.classList.remove('no-scroll');
    }, 400);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    handleClose();
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
    handleClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidenav-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sidenav */}
      <div
        className={`sidenav ${isOpen ? 'open' : ''} ${
          isClosing ? 'closing' : ''
        }`}
      >
        {/* Logo mobile - top */}
        <div className="sidenav-logo sidenav-logo-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.logo.url}
            alt={tRoot('logoAlt')}
            data-theme-variant="dark"
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            loading="lazy"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.logo.urlLight}
            alt={tRoot('logoAlt')}
            data-theme-variant="light"
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            loading="lazy"
          />
        </div>

        {/* Spacer only for desktop */}
        <div className="sidenav-spacer"></div>

        <nav>
          <ul>
            <li><a href={`/${locale}`} onClick={handleHomeClick}>{t('home')}</a></li>
            <li><a href="#events" onClick={(e) => handleSectionClick(e, 'events')}>{t('events')}</a></li>
            <li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')}>{t('services')}</a></li>
            <li><a href="#catering" onClick={(e) => handleSectionClick(e, 'catering')}>{t('catering')}</a></li>
            <li><a href="#gallery" onClick={(e) => handleSectionClick(e, 'gallery')}>{t('gallery')}</a></li>
            <li><a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')}>{t('contact')}</a></li>
            <li><a href="#location" onClick={(e) => handleSectionClick(e, 'location')}>{t('location')}</a></li>
            <li><a href="#reviews" onClick={(e) => handleSectionClick(e, 'reviews')}>{t('reviews')}</a></li>
            <li><a href="#footer" onClick={(e) => handleSectionClick(e, 'footer')}>{t('about')}</a></li>
          </ul>
        </nav>

        <div className="sidenav-controls">
          <ThemeToggle variant="sidenav" />
          <LocaleSwitcher variant="sidenav" />
        </div>

        {/* Logo desktop - bottom */}
        <div className="sidenav-logo sidenav-logo-bottom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.logo.url}
            alt={tRoot('logoAlt')}
            data-theme-variant="dark"
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            loading="lazy"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.logo.urlLight}
            alt={tRoot('logoAlt')}
            data-theme-variant="light"
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            loading="lazy"
          />
        </div>
      </div>

      {/* Toggle button */}
      <button
        type="button"
        className={`menu-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleSidenav}
        aria-label={t('menuToggle')}
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
};
