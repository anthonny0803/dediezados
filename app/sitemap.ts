import type { MetadataRoute } from 'next';
import { seoConfig } from '@/config/seo.config';
import { routing } from '@/i18n/routing';

const HOMEPAGE_IMAGES = [
  'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-02_jbajcz.jpg',
  'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239541/olas-04_phqoqx.webp',
  'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763302071/hero-1_yylnej.webp',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = seoConfig.siteUrl;
  const lastModified = new Date();

  const localeAlternates = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${siteUrl}/${loc}`])
  );

  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        ...localeAlternates,
        'x-default': `${siteUrl}/${routing.defaultLocale}`,
      },
    },
    images: HOMEPAGE_IMAGES,
  }));
}
