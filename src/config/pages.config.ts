import type { AppPathname } from '@/i18n/routing';
import { siteConfig } from '@/config/site.config';

export type SectionPageKey =
  | 'events'
  | 'services'
  | 'catering'
  | 'rooms'
  | 'contact'
  | 'location'
  | 'faq';

export interface SectionPageConfig {
  pathname: Exclude<AppPathname, '/'>;
  coverImage: string;
}

const heroCover = siteConfig.heroSlides[0].image;

export const sectionPages: Record<SectionPageKey, SectionPageConfig> = {
  events: { pathname: '/events', coverImage: siteConfig.events[0].image },
  services: { pathname: '/services', coverImage: siteConfig.services.included[0].image },
  catering: { pathname: '/catering', coverImage: siteConfig.catering[0].image },
  rooms: { pathname: '/rooms', coverImage: siteConfig.gallery.photos[0].url },
  contact: { pathname: '/contact', coverImage: heroCover },
  location: { pathname: '/location', coverImage: heroCover },
  faq: { pathname: '/faq', coverImage: heroCover },
};

export const sectionPageKeys = Object.keys(sectionPages) as SectionPageKey[];

export const pageCopyValues = {
  phone: siteConfig.contact.phone,
  secondaryPhone: siteConfig.contact.secondaryPhone,
};
