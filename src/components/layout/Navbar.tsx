'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site.config';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Navbar = () => {
  const t = useTranslations('nav');
  const tLogo = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <li><a href="#hero">{t('home')}</a></li>
          <li><a href="#services">{t('services')}</a></li>
          <li><a href="#catering">{t('catering')}</a></li>
          <li><a href="#extras">{t('extras')}</a></li>
          <li><a href="#gallery">{t('gallery')}</a></li>
          <li><a href="#contact">{t('contact')}</a></li>
          <li><a href="#location">{t('location')}</a></li>
          <li><a href="#reviews">{t('reviews')}</a></li>
          <li><a href="#footer">{t('about')}</a></li>
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
