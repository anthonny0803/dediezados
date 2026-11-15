import type { MetadataRoute } from 'next';
import { sectionPageKeys, sectionPages } from '@/config/pages.config';
import { routing, type AppPathname } from '@/i18n/routing';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/urls';

const HOMEPAGE_IMAGES = [
  'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-02_jbajcz.jpg',
  'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239541/olas-04_phqoqx.webp',
  'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763302071/hero-1_yylnej.webp',
];

const HOME_PRIORITY = 1.0;
const SECTION_PAGE_PRIORITY = 0.8;

interface SitemapPage {
  href: AppPathname;
  priority: number;
  images: string[];
}

const toEntries = ({ href, priority, images }: SitemapPage): MetadataRoute.Sitemap => {
  const languages = buildLanguageAlternates(href);

  return routing.locales.map((locale) => ({
    url: absoluteUrl(locale, href),
    changeFrequency: 'weekly',
    priority,
    alternates: { languages },
    images,
  }));
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: SitemapPage[] = [
    { href: '/', priority: HOME_PRIORITY, images: HOMEPAGE_IMAGES },
    ...sectionPageKeys.map((key) => ({
      href: sectionPages[key].pathname,
      priority: SECTION_PAGE_PRIORITY,
      images: [sectionPages[key].coverImage],
    })),
  ];

  return pages.flatMap(toEntries);
}
