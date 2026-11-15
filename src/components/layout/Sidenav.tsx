'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import { ABOUT_SECTION, MENU_SECTIONS, type MenuSectionId } from '@/config/navigation.config';
import { siteConfig } from '@/config/site.config';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Sidenav = () => {
  const t = useTranslations('nav');
  const tRoot = useTranslations();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { goToSection, goToTop, sectionHref } = useSectionNavigation();

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
    goToTop(e);
    handleClose();
  };

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: MenuSectionId,
  ) => {
    goToSection(e, sectionId);
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
            {MENU_SECTIONS.map((section) => (
              <li key={section}>
                <a href={sectionHref(section)} onClick={(e) => handleSectionClick(e, section)}>
                  {t(section)}
                </a>
              </li>
            ))}
            <li>
              <a href={sectionHref(ABOUT_SECTION)} onClick={(e) => handleSectionClick(e, ABOUT_SECTION)}>
                {t('about')}
              </a>
            </li>
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
