import type { SectionPageKey } from '@/config/pages.config';

export const MENU_SECTIONS = [
  'events',
  'services',
  'catering',
  'gallery',
  'contact',
  'location',
  'reviews',
] as const;

export const ABOUT_SECTION = 'footer';

export type MenuSectionId = (typeof MENU_SECTIONS)[number] | typeof ABOUT_SECTION;

export const pageBySectionId: Partial<Record<MenuSectionId, SectionPageKey>> = {
  events: 'events',
  services: 'services',
  catering: 'catering',
  gallery: 'rooms',
  contact: 'contact',
  location: 'location',
};
