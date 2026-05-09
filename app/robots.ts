import type { MetadataRoute } from 'next';
import { seoConfig } from '@/config/seo.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/google39aec0de089fa458.html'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: `${seoConfig.siteUrl}/sitemap.xml`,
    host: seoConfig.siteUrl.replace(/^https?:\/\//, ''),
  };
}
