'use client';

import { useTranslations } from 'next-intl';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import { MENU_SECTIONS } from '@/config/navigation.config';

export const FooterNav = () => {
  const t = useTranslations('nav');

  const { goToSection, sectionHref } = useSectionNavigation();

  return (
    <nav>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {MENU_SECTIONS.map((section) => (
          <li key={section}>
            <a
              href={sectionHref(section)}
              onClick={(e) => goToSection(e, section)}
              className="transition-smooth hover:text-primary"
            >
              {t(section)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
