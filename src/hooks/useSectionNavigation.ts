'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getPathname, usePathname } from '@/i18n/routing';
import { pageBySectionId, type MenuSectionId } from '@/config/navigation.config';
import { sectionPages } from '@/config/pages.config';

type AnchorClick = React.MouseEvent<HTMLAnchorElement>;

const PRIMARY_BUTTON = 0;

const opensElsewhere = (event: AnchorClick) =>
  event.button !== PRIMARY_BUTTON ||
  event.ctrlKey ||
  event.metaKey ||
  event.shiftKey ||
  event.altKey;

const clearHash = () => {
  if (!window.location.hash) return;
  history.replaceState(null, '', window.location.pathname);
};

export const useSectionNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const homePath = getPathname({ locale, href: '/' });

  const goToSection = useCallback(
    (event: AnchorClick, sectionId: MenuSectionId) => {
      if (opensElsewhere(event)) return;
      event.preventDefault();
      const target = document.getElementById(sectionId);
      if (!target) {
        router.push(`${homePath}#${sectionId}`);
        return;
      }
      target.scrollIntoView({ block: 'start' });
      clearHash();
    },
    [homePath, router],
  );

  const goToTop = useCallback(
    (event: AnchorClick) => {
      if (opensElsewhere(event)) return;
      event.preventDefault();
      if (pathname !== '/') {
        router.push(homePath);
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      clearHash();
    },
    [homePath, pathname, router],
  );

  // Crawlers follow the section's own page; a plain click still scrolls in place.
  const sectionHref = useCallback(
    (sectionId: MenuSectionId) => {
      const page = pageBySectionId[sectionId];
      return page
        ? getPathname({ locale, href: sectionPages[page].pathname })
        : `#${sectionId}`;
    },
    [locale],
  );

  return { goToSection, goToTop, sectionHref };
};
