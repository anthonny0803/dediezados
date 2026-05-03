import { seoConfig } from '@/config/seo.config';
import { siteConfig } from '@/config/site.config';

const localeToBcp47: Record<string, string> = {
  es: 'es-ES',
  en: 'en-GB',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-PT',
  nl: 'nl-NL',
  pl: 'pl-PL',
  ru: 'ru-RU',
};

export function buildJsonLdGraph(locale: string) {
  const siteUrl = seoConfig.siteUrl;
  const inLanguage = localeToBcp47[locale] ?? locale;

  const business = {
    '@type': ['LocalBusiness', 'EventVenue'],
    '@id': seoConfig.schemaIds.business,
    name: seoConfig.organization.name,
    alternateName: seoConfig.organization.alternateNames,
    legalName: seoConfig.organization.legalName,
    description: seoConfig.businessDescriptionMultilingual.map((entry) => ({
      '@language': entry.language,
      '@value': entry.value,
    })),
    url: siteUrl,
    mainEntityOfPage: `${siteUrl}/`,
    telephone: siteConfig.contact.phone.replace(/\s+/g, ''),
    email: siteConfig.contact.email,
    priceRange: seoConfig.business.priceRange,
    currenciesAccepted: seoConfig.business.currenciesAccepted,
    paymentAccepted: seoConfig.business.paymentAccepted,
    image: seoConfig.assets.schemaImages,
    logo: {
      '@type': 'ImageObject',
      url: seoConfig.assets.logo.url,
      width: seoConfig.assets.logo.width,
      height: seoConfig.assets.logo.height,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: seoConfig.geo.streetAddress,
      addressLocality: seoConfig.geo.placeName,
      addressRegion: seoConfig.geo.regionName,
      postalCode: seoConfig.geo.postalCode,
      addressCountry: seoConfig.geo.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: seoConfig.geo.coordinates.latitude,
      longitude: seoConfig.geo.coordinates.longitude,
    },
    hasMap: seoConfig.geo.googleMapsCid,
    areaServed: seoConfig.areasServed.map((area) => ({
      '@type': area.type,
      name: area.name,
    })),
    knowsAbout: seoConfig.topicsCovered,
    maximumAttendeeCapacity: seoConfig.business.maximumAttendeeCapacity,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: seoConfig.business.openingHours.dayOfWeek,
      opens: seoConfig.business.openingHours.opens,
      closes: seoConfig.business.openingHours.closes,
      description: seoConfig.business.openingHours.description,
    },
    sameAs: [siteConfig.social.instagram.url, siteConfig.social.facebook.url],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(seoConfig.business.aggregateRating.ratingValue),
      ratingCount: String(seoConfig.business.aggregateRating.ratingCount),
      bestRating: String(seoConfig.business.aggregateRating.bestRating),
      worstRating: String(seoConfig.business.aggregateRating.worstRating),
    },
    amenityFeature: seoConfig.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.name,
      value: amenity.value,
    })),
    makesOffer: seoConfig.serviceOfferings.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        areaServed: service.areaServed,
      },
    })),
    contactPoint: seoConfig.contactPoints.map((contact) => ({
      '@type': 'ContactPoint',
      telephone: contact.telephone,
      contactType: contact.contactType,
      areaServed: contact.areaServed,
      availableLanguage: contact.availableLanguage,
    })),
  };

  const organization = {
    '@type': 'Organization',
    '@id': seoConfig.schemaIds.organization,
    name: seoConfig.organization.legalName,
    url: siteUrl,
    logo: seoConfig.assets.logo.url,
    sameAs: [siteConfig.social.instagram.url, siteConfig.social.facebook.url],
  };

  const website = {
    '@type': 'WebSite',
    '@id': seoConfig.schemaIds.website,
    url: siteUrl,
    name: seoConfig.organization.name,
    inLanguage,
    publisher: { '@id': seoConfig.schemaIds.organization },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [business, organization, website],
  };
}
