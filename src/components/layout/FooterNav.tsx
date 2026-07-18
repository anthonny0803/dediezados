'use client';

import { useTranslations } from 'next-intl';

const SECTIONS = [
  { id: 'events', labelKey: 'events' },
  { id: 'space', labelKey: 'space' },
  { id: 'catering', labelKey: 'catering' },
  { id: 'gallery', labelKey: 'gallery' },
  { id: 'contact', labelKey: 'contact' },
  { id: 'location', labelKey: 'location' },
  { id: 'reviews', labelKey: 'reviews' },
] as const;

export const FooterNav = () => {
  const t = useTranslations('nav');

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
    <nav>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => handleSectionClick(e, section.id)}
              className="transition-smooth hover:text-primary"
            >
              {t(section.labelKey)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
