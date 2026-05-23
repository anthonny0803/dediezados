import type { Metadata } from 'next';
import { seoConfig } from '@/config/seo.config';
import { siteConfig } from '@/config/site.config';
import { routing } from '@/i18n/routing';

const localeToOgLocale: Record<string, string> = {
  es: 'es_ES',
  en: 'en_GB',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
  pt: 'pt_PT',
  nl: 'nl_NL',
  pl: 'pl_PL',
  ru: 'ru_RU',
};

export function buildMetadata(locale: string): Metadata {
  const localeData =
    seoConfig.localeMetadata[locale as keyof typeof seoConfig.localeMetadata] ??
    seoConfig.localeMetadata.es;

  const siteUrl = seoConfig.siteUrl;
  const canonical = `${siteUrl}/${locale}`;

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${siteUrl}/${loc}`])
  );
  languages['x-default'] = siteUrl;

  const currentOgLocale = localeToOgLocale[locale] ?? locale;
  const alternateOgLocales = routing.locales
    .filter((loc) => loc !== locale)
    .map((loc) => localeToOgLocale[loc] ?? loc);

  return {
    metadataBase: new URL(siteUrl),
    title: localeData.title,
    description: localeData.description,
    keywords: [...seoConfig.keywords],
    authors: [{ name: seoConfig.organization.legalName }],
    alternates: {
      canonical,
      languages,
    },
    robots: {
      index: seoConfig.robots.index,
      follow: seoConfig.robots.follow,
      googleBot: {
        index: seoConfig.robots.index,
        follow: seoConfig.robots.follow,
        'max-image-preview': seoConfig.robots.maxImagePreview,
        'max-snippet': seoConfig.robots.maxSnippet,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: seoConfig.organization.name,
      title: localeData.ogTitle,
      description: localeData.ogDescription,
      locale: currentOgLocale,
      alternateLocale: alternateOgLocales,
      images: [
        {
          url: seoConfig.assets.defaultOgImage.url,
          width: seoConfig.assets.defaultOgImage.width,
          height: seoConfig.assets.defaultOgImage.height,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localeData.twitterTitle,
      description: localeData.twitterDescription,
      images: [seoConfig.assets.defaultOgImage.url],
    },
    other: {
      'geo.region': seoConfig.geo.region,
      'geo.placename': seoConfig.geo.placeName,
      'geo.position': `${seoConfig.geo.coordinates.latitude};${seoConfig.geo.coordinates.longitude}`,
      ICBM: `${seoConfig.geo.coordinates.latitude}, ${seoConfig.geo.coordinates.longitude}`,
      'business:contact_data:street_address': seoConfig.geo.streetAddress,
      'business:contact_data:locality': seoConfig.geo.placeName,
      'business:contact_data:postal_code': seoConfig.geo.postalCode,
      'business:contact_data:country_name': seoConfig.geo.countryName,
      'business:contact_data:email': siteConfig.contact.email,
      'business:contact_data:phone_number': siteConfig.contact.phone.replace(/\s+/g, ''),
      'business:contact_data:website': siteUrl,
    },
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/site.webmanifest',
  };
}
