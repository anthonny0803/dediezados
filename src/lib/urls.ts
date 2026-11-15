import { seoConfig } from '@/config/seo.config';
import { getPathname, routing, type AppPathname } from '@/i18n/routing';

export const absoluteUrl = (locale: string, href: AppPathname) =>
  `${seoConfig.siteUrl}${getPathname({ locale, href })}`;

export const buildLanguageAlternates = (href: AppPathname): Record<string, string> => ({
  ...Object.fromEntries(routing.locales.map((locale) => [locale, absoluteUrl(locale, href)])),
  'x-default': absoluteUrl(routing.defaultLocale, href),
});
