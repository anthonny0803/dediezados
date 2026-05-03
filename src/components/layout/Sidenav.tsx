'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site.config';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Sidenav = () => {
  const t = useTranslations('nav');
  const tRoot = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const isMobile = window.innerWidth <= 1024;
      if (heroSection && !isMobile) {
        const heroBottom = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsInHero(scrollPosition < heroBottom - 100);
      } else {
        setIsInHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidenav-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleClose}
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
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            loading="lazy"
          />
        </div>

        {/* Spacer only for desktop */}
        <div className="sidenav-spacer"></div>

        <ul>
          <li><a href="#hero" onClick={handleClose}>{t('home')}</a></li>
          <li><a href="#services" onClick={handleClose}>{t('services')}</a></li>
          <li><a href="#catering" onClick={handleClose}>{t('catering')}</a></li>
          <li><a href="#extras" onClick={handleClose}>{t('extras')}</a></li>
          <li><a href="#gallery" onClick={handleClose}>{t('gallery')}</a></li>
          <li><a href="#contact" onClick={handleClose}>{t('contact')}</a></li>
          <li><a href="#location" onClick={handleClose}>{t('location')}</a></li>
          <li><a href="#reviews" onClick={handleClose}>{t('reviews')}</a></li>
          <li><a href="#footer" onClick={handleClose}>{t('about')}</a></li>
        </ul>

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
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            loading="lazy"
          />
        </div>
      </div>

      {/* Toggle button */}
      <div
        className={`menu-toggle ${isInHero ? 'hide' : 'show'} ${
          isOpen ? 'open' : ''
        }`}
        onClick={toggleSidenav}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};
