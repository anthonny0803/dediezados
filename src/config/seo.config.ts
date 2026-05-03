export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dediezados.com';

export interface ImageAsset {
  url: string;
  width: number;
  height: number;
}

export interface AreaServed {
  type: 'City' | 'AdministrativeArea' | 'Place';
  name: string;
}

export interface ContactPointSeo {
  telephone: string;
  contactType: string;
  areaServed: string;
  availableLanguage: string[];
}

export interface AmenityFeature {
  name: string;
  value: boolean;
}

export interface ServiceOffering {
  name: string;
  description: string;
  areaServed: string;
}

export interface AggregateRating {
  ratingValue: number;
  ratingCount: number;
  bestRating: number;
  worstRating: number;
}

export interface LocaleMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  businessDescriptionSchema: string;
}

export interface MultilingualText {
  language: string;
  value: string;
}

export const seoConfig = {
  siteUrl: SITE_URL,

  organization: {
    name: 'De Diez a Dos',
    legalName: 'De Diez a Dos Private Event, S.L.U.',
    alternateNames: [
      'De Diez a Dos Private Event',
      'Dediezados',
      'De Diez a Dos Madrid Events',
      'De Diez a Dos Event Venue',
    ],
  },

  schemaIds: {
    business: `${SITE_URL}/#business`,
    organization: `${SITE_URL}/#organization`,
    website: `${SITE_URL}/#website`,
  },

  assets: {
    logo: {
      url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_150,h_95,c_fit/v1763054957/ChatGPT_Image_13_nov_2025_17_57_14_1_nutc4q.png',
      width: 150,
      height: 95,
    } satisfies ImageAsset,
    defaultOgImage: {
      url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-02_jbajcz.jpg',
      width: 1920,
      height: 1080,
    } satisfies ImageAsset,
    schemaImages: [
      'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-02_jbajcz.jpg',
      'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239541/olas-04_phqoqx.webp',
      'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-02_wuhjwa.webp',
    ],
  },

  geo: {
    country: 'ES',
    countryName: 'España',
    region: 'ES-M',
    regionName: 'Comunidad de Madrid',
    placeName: 'Madrid',
    postalCode: '28036',
    streetAddress: 'Travesía Doctor Fleming 16, Local 12',
    coordinates: {
      latitude: 40.455601,
      longitude: -3.6878855,
    },
    googleMapsCid: 'https://www.google.com/maps?cid=dediezados',
  },

  areasServed: [
    { type: 'City', name: 'Madrid' },
    { type: 'AdministrativeArea', name: 'Comunidad de Madrid' },
    { type: 'Place', name: 'Chamartín, Madrid' },
    { type: 'Place', name: 'Santiago Bernabéu, Madrid' },
    { type: 'Place', name: 'Nuevos Ministerios, Madrid' },
  ] satisfies AreaServed[],

  business: {
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted:
      'Efectivo, Tarjeta de crédito, Transferencia bancaria, Bizum',
    maximumAttendeeCapacity: 100,
    yearsOfExperience: 14,
    aggregateRating: {
      ratingValue: 5,
      ratingCount: 200,
      bestRating: 5,
      worstRating: 1,
    } satisfies AggregateRating,
    openingHours: {
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
      description: 'Visitas con cita previa',
    },
  },

  robots: {
    index: true,
    follow: true,
    maxImagePreview: 'large' as const,
    maxSnippet: -1,
  },

  analytics: {
    gaId: 'G-6TM3Q4GG5J',
  },

  // ============================================================
  // Capa SEO invisible — EXPANDIBLE EN FASE 5
  // ============================================================

  keywords: [
    'alquiler sala eventos madrid',
    'alquilar sala eventos madrid',
    'sala de eventos madrid',
    'salas para eventos madrid',
    'alquilar sala cumpleaños madrid',
    'sala cumpleaños adultos madrid',
    'alquilar sala fiesta madrid',
    'sala eventos privados madrid',
    'sala para bodas madrid',
    'sala eventos empresa madrid',
    'sala eventos cerca santiago bernabéu',
    'alquilar sala eventos bernabéu',
    'sala eventos chamartín',
    'alquilar local eventos madrid',
    'salón eventos madrid',
    'salones celebraciones madrid',
    'espacio eventos madrid',
    'sala con catering madrid',
    'sala con barra libre madrid',
    'alquilar sala privada madrid',
    'sala privada cumpleaños madrid',
    'sala para fiestas privadas madrid',
    'sala despedidas soltera madrid',
    'sala comuniones madrid',
    'sala baby shower madrid',
    'alquiler sala reuniones empresa madrid',
    'sala eventos corporativos madrid',
    'fiestas privadas madrid',
    'celebraciones inolvidables madrid',
    'eventos junto bernabéu',
    'alquiler sala fleming madrid',
    'alquiler sala eventos económico',
    'sala eventos precio competitivo',
    'sala eventos barato madrid',
    'de diez a dos madrid',
    'event venue rental madrid',
    'event hall rental madrid',
    'event space madrid',
    'rent event space madrid',
    'party venue madrid',
    'private party venue madrid',
    'birthday venue madrid',
    'birthday party venue madrid',
    'wedding venue madrid',
    'small wedding venue madrid',
    'corporate event venue madrid',
    'corporate event space madrid',
    'private event space madrid',
    'event venue near santiago bernabeu',
    'venue for hire madrid',
    'function room madrid',
    'celebration venue madrid',
    'party hall madrid',
    'event space with catering madrid',
    'private room rental madrid events',
    'baby shower venue madrid',
    'bachelorette party venue madrid',
    'communion venue madrid',
    'chamartin event venue',
    'affordable event venue madrid',
    'cheap event venue madrid',
  ],

  topicsCovered: [
    'Alquiler de salas para eventos',
    'Organización de cumpleaños',
    'Bodas y celebraciones',
    'Fiestas privadas',
    'Despedidas de soltera y soltero',
    'Baby showers',
    'Comuniones',
    'Eventos corporativos',
    'Catering para eventos',
    'Barra libre',
    'DJ profesional para eventos',
    'Event venue rental',
    'Birthday party organization',
    'Wedding celebrations',
    'Private parties',
    'Bachelorette and bachelor parties',
    'Corporate event hosting',
    'Event catering',
    'Open bar service',
    'Professional DJ for events',
  ],

  amenities: [
    { name: 'Catering completo incluido', value: true },
    { name: 'Barra libre', value: true },
    { name: 'Sistema audiovisual profesional', value: true },
    { name: 'Decoración personalizada', value: true },
    { name: 'DJ profesional', value: true },
    { name: 'Karaoke disponible', value: true },
    { name: 'PhotoMax 360', value: true },
    { name: 'Mesa dulce / Candy Bar', value: true },
    { name: 'Personal profesional de barra y sala', value: true },
    { name: 'Espacio en exclusiva', value: true },
    { name: 'Dos salas privadas', value: true },
  ] satisfies AmenityFeature[],

  serviceOfferings: [
    {
      name: 'Alquiler de sala para cumpleaños en Madrid',
      description:
        'Sala privada en exclusiva para cumpleaños de adultos, jóvenes e infantiles junto al Santiago Bernabéu, con catering, barra libre y DJ.',
      areaServed: 'Madrid',
    },
    {
      name: 'Alquiler de sala para bodas en Madrid',
      description:
        'Espacio íntimo y elegante para bodas y postbodas en Madrid, con menú personalizado y servicio integral.',
      areaServed: 'Madrid',
    },
    {
      name: 'Alquiler de sala para eventos de empresa en Madrid',
      description:
        'Salas para presentaciones, team building, cenas de empresa y eventos corporativos junto al Santiago Bernabéu.',
      areaServed: 'Madrid',
    },
    {
      name: 'Alquiler de sala para fiestas privadas en Madrid',
      description:
        'Local privado en exclusiva para fiestas, despedidas de soltera/soltero, celebraciones y eventos privados en Madrid.',
      areaServed: 'Madrid',
    },
    {
      name: 'Sala para baby shower y comuniones en Madrid',
      description:
        'Espacio familiar para baby showers, comuniones y celebraciones especiales con mesa dulce y decoración personalizada.',
      areaServed: 'Madrid',
    },
    {
      name: 'Catering para eventos en Madrid',
      description:
        'Catering propio con más de 14 años de experiencia. Menús personalizados para todo tipo de celebraciones.',
      areaServed: 'Madrid',
    },
    {
      name: 'Event venue rental in Madrid',
      description:
        'Private event venue for hire in Madrid, near Santiago Bernabéu stadium. In-house catering, open bar, DJ and professional AV system included.',
      areaServed: 'Madrid',
    },
    {
      name: 'Birthday party venue in Madrid',
      description:
        'Exclusive private room for birthday parties in Madrid (adults, teens, kids) near Santiago Bernabéu, with catering, open bar and DJ.',
      areaServed: 'Madrid',
    },
    {
      name: 'Wedding venue in Madrid',
      description:
        'Intimate and elegant venue for weddings and post-wedding celebrations in Madrid, with personalized menu and full-service hosting.',
      areaServed: 'Madrid',
    },
    {
      name: 'Corporate event venue in Madrid',
      description:
        'Venues for presentations, team building, company dinners and corporate events next to Santiago Bernabéu.',
      areaServed: 'Madrid',
    },
  ] satisfies ServiceOffering[],

  contactPoints: [
    {
      telephone: '+34636433911',
      contactType: 'reservations',
      areaServed: 'ES',
      availableLanguage: ['Spanish', 'es'],
    },
    {
      telephone: '+34660221267',
      contactType: 'customer service',
      areaServed: 'ES',
      availableLanguage: ['Spanish', 'es'],
    },
  ] satisfies ContactPointSeo[],

  // ============================================================
  // Metadata base por locale — Fase 3 añade EN, FR, DE, IT, PT, NL, PL, RU
  // ============================================================

  localeMetadata: {
    es: {
      title:
        'De Diez a Dos - Alquiler Salas Eventos Madrid | Precios Económicos Cerca del Santiago Bernabéu',
      description:
        'Alquiler de salas para eventos en Madrid cerca del Santiago Bernabéu. Cumpleaños, bodas, fiestas privadas y eventos de empresa con catering, barra libre y DJ. Precios económicos y competitivos. +200 reseñas 5 estrellas.',
      ogTitle:
        'De Diez a Dos - Salas para Eventos en Madrid | Santiago Bernabéu | Precios Económicos',
      ogDescription:
        'Alquiler de salas para eventos en Madrid cerca del Santiago Bernabéu. Fiestas privadas, cumpleaños, bodas y eventos corporativos con catering incluido. Precios económicos y competitivos. +200 reseñas de 5 estrellas.',
      twitterTitle:
        'De Diez a Dos - Salas para Eventos en Madrid | Santiago Bernabéu | Precios Económicos',
      twitterDescription:
        'Alquiler de salas para eventos en Madrid cerca del Santiago Bernabéu. Precios económicos y competitivos. +200 reseñas de 5 estrellas.',
      businessDescriptionSchema:
        'Alquiler de salas para eventos privados en Madrid, junto al estadio Santiago Bernabéu, con precios económicos y competitivos. Espacio exclusivo para cumpleaños, bodas, fiestas privadas, despedidas, comuniones, baby showers y eventos de empresa, con catering propio, barra libre, sistema audiovisual y DJ profesional. Más de 14 años de experiencia.',
    } satisfies LocaleMetadata,
    en: {
      title:
        'De Diez a Dos - Event Venue Rental Madrid | Affordable Pricing Near Santiago Bernabéu',
      description:
        'Event venue rental in Madrid near Santiago Bernabéu. Birthdays, weddings, private parties and corporate events with in-house catering, open bar and DJ. Affordable, competitive pricing. 200+ five-star reviews.',
      ogTitle:
        'De Diez a Dos - Event Venues in Madrid | Santiago Bernabéu | Affordable Pricing',
      ogDescription:
        'Event venue rental in Madrid near Santiago Bernabéu. Private parties, birthdays, weddings and corporate events with included catering. Affordable, competitive pricing. 200+ five-star reviews.',
      twitterTitle:
        'De Diez a Dos - Event Venues in Madrid | Santiago Bernabéu | Affordable Pricing',
      twitterDescription:
        'Event venue rental in Madrid near Santiago Bernabéu. Affordable, competitive pricing. 200+ five-star reviews.',
      businessDescriptionSchema:
        'Affordable private event venue for hire in Madrid, next to Santiago Bernabéu stadium, with competitive pricing. Exclusive space for birthdays, weddings, private parties, bachelorette/bachelor parties, communions, baby showers and corporate events, with in-house catering, open bar, professional AV system and DJ. Over 14 years of experience.',
    } satisfies LocaleMetadata,
  },

  // Descripción de negocio multilingüe que ya existía en Schema.org
  // (se preservará en JSON-LD; Fase 3 expande con más idiomas)
  businessDescriptionMultilingual: [
    {
      language: 'es',
      value:
        'Alquiler de salas para eventos privados en Madrid, junto al estadio Santiago Bernabéu, con precios económicos y competitivos. Espacio exclusivo para cumpleaños, bodas, fiestas privadas, despedidas, comuniones, baby showers y eventos de empresa, con catering propio, barra libre, sistema audiovisual y DJ profesional. Más de 14 años de experiencia.',
    },
    {
      language: 'en',
      value:
        'Affordable private event venue for hire in Madrid, next to Santiago Bernabéu stadium, with competitive pricing. Exclusive space for birthdays, weddings, private parties, bachelorette/bachelor parties, communions, baby showers and corporate events, with in-house catering, open bar, professional AV system and DJ. Over 14 years of experience.',
    },
  ] satisfies MultilingualText[],
} as const;
