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
  keywords: readonly string[];
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
    { type: 'Place', name: 'Castellana, Madrid' },
    { type: 'Place', name: 'Concha Espina, Madrid' },
    { type: 'Place', name: 'Madrid Centro' },
    { type: 'Place', name: 'Zona Norte de Madrid' },
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
    'Fiestas de 15 años y quinceañeras',
    'Ver partidos de fútbol en privado cerca del Bernabéu',
    'Cenas de empresa y cenas de Navidad',
    'Reuniones de empresa y presentaciones',
    'Team building',
    'Aniversarios y graduaciones',
    'Sala con sistema audiovisual profesional',
    'Espacio privado para celebraciones especiales',
    'Event venue rental',
    'Birthday party organization',
    'Wedding celebrations',
    'Private parties',
    'Bachelorette and bachelor parties',
    'Corporate event hosting',
    'Event catering',
    'Open bar service',
    'Professional DJ for events',
    '15th birthday and quinceañera parties',
    'Sports viewing parties near Bernabéu',
    'Company dinners and Christmas parties',
    'Business meetings and presentations',
    'Anniversary and graduation celebrations',
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
    {
      name: 'Alquiler de sala para fiesta de 15 años en Madrid',
      description:
        'Sala privada en exclusiva para fiestas de 15 años y quinceañeras en Madrid, junto al Santiago Bernabéu, con decoración personalizada, catering, barra libre y DJ.',
      areaServed: 'Madrid',
    },
    {
      name: 'Alquiler de sala para ver partidos en Madrid',
      description:
        'Sala privada para ver partidos del Real Madrid y otros eventos deportivos junto al estadio Santiago Bernabéu, con pantalla, sistema audiovisual profesional, catering y barra libre.',
      areaServed: 'Madrid',
    },
    {
      name: 'Alquiler de sala para cenas de empresa en Madrid',
      description:
        'Espacio exclusivo para cenas de empresa, cenas de Navidad, reuniones corporativas y presentaciones junto al Santiago Bernabéu, con catering propio y servicio completo.',
      areaServed: 'Madrid',
    },
    {
      name: 'Alquiler de sala para reuniones en Madrid',
      description:
        'Sala privada para reuniones de empresa, presentaciones y team building en Madrid cerca del Santiago Bernabéu, con sistema audiovisual y catering disponible.',
      areaServed: 'Madrid',
    },
    {
      name: 'Alquiler de sala para aniversarios y graduaciones en Madrid',
      description:
        'Espacio privado para celebraciones de aniversario, graduaciones y homenajes especiales en Madrid, con catering personalizado y decoración a medida.',
      areaServed: 'Madrid',
    },
    {
      name: '15th birthday and quinceañera venue in Madrid',
      description:
        'Private exclusive venue for 15th birthday parties and quinceañeras in Madrid near Santiago Bernabéu, with personalized decoration, catering, open bar and DJ.',
      areaServed: 'Madrid',
    },
    {
      name: 'Sports viewing party venue near Santiago Bernabéu',
      description:
        'Private room to watch Real Madrid matches and sporting events near Santiago Bernabéu stadium, with professional AV system, catering and open bar.',
      areaServed: 'Madrid',
    },
    {
      name: 'Meeting room and corporate dinner venue in Madrid',
      description:
        'Private space for business meetings, company dinners, Christmas parties and corporate presentations next to Santiago Bernabéu, with full catering service.',
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
      keywords: [
        'alquiler sala 15 años madrid',
        'alquilar sala 15 años madrid',
        'sala para fiesta de 15 años madrid',
        'salón para 15 años madrid',
        'sala quinceañera madrid',
        'alquiler sala quince años madrid',
        'sala para ver partidos madrid',
        'alquilar sala para ver partidos madrid',
        'sala para ver partidos cerca del bernabéu',
        'sala privada ver partido bernabéu',
        'sala para ver fútbol madrid',
        'sala privada fútbol bernabéu',
        'sala vip ver partido madrid',
        'alquiler espacio ver partido bernabéu',
        'sala para ver partido real madrid bernabéu',
        'alquiler sala para reuniones madrid',
        'alquilar sala para reuniones madrid',
        'sala para reuniones de empresa madrid',
        'sala reuniones madrid centro',
        'sala reuniones cerca del bernabéu',
        'sala reuniones chamartín',
        'alquiler sala pequeña reuniones madrid',
        'espacio reuniones privado madrid',
        'sala para presentaciones empresa madrid',
        'sala para cenas de empresa madrid',
        'sala cena navidad empresa madrid',
        'sala para team building madrid',
        'espacio corporativo madrid bernabéu',
        'alquiler sala corporativa madrid',
        'alquilar sala corporativa madrid',
        'alquiler salón para cumpleaños madrid',
        'alquilar salón para cumpleaños madrid',
        'salón para cumpleaños adultos madrid',
        'alquiler salón para eventos madrid',
        'alquilar salón para eventos madrid',
        'alquiler salón para fiestas madrid',
        'salón privado madrid eventos',
        'salón para despedidas madrid',
        'alquiler salón bodas madrid',
        'alquiler sala eventos madrid centro',
        'sala eventos zona norte madrid',
        'sala para eventos cerca del bernabéu',
        'sala eventos travesía doctor fleming madrid',
        'alquiler sala privada madrid centro',
        'espacio privado eventos madrid norte',
        'sala para aniversarios madrid',
        'sala para graduaciones madrid',
        'sala graduación madrid',
        'alquiler sala aniversario madrid',
        'sala cumpleaños 30 años madrid',
        'sala cumpleaños 40 años madrid',
        'sala cumpleaños 50 años madrid',
        'sala para sorpresa de cumpleaños madrid',
        'alquiler local para fiestas privadas madrid',
        'alquiler local para cumpleaños madrid',
        'local para celebraciones madrid',
        'alquiler espacio privado chamartín',
        'sala eventos nuevos ministerios madrid',
        'sala para eventos zona castellana madrid',
      ],
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
      keywords: [
        'event venue rental madrid spain',
        'hire event venue madrid',
        'book event space madrid',
        'private event room rental madrid',
        'rent party room madrid',
        'rent event hall madrid',
        '15th birthday venue madrid',
        'quinceañera venue madrid',
        'sports viewing venue near bernabeu',
        'private room to watch real madrid',
        'watch football private room madrid',
        'private viewing party bernabeu madrid',
        'corporate event room madrid',
        'company dinner venue madrid',
        'christmas party venue madrid',
        'team building venue madrid',
        'meeting room rental madrid',
        'private meeting room madrid bernabeu',
        'anniversary celebration venue madrid',
        'graduation party venue madrid',
        'office party venue madrid',
        'birthday room rental madrid',
        'event hall madrid spain',
        'event space central madrid',
        'private event space near bernabeu',
        'venue hire near santiago bernabeu',
        'birthday party room rental madrid',
        'bachelorette party room madrid',
        'wedding reception venue madrid',
        'small event space madrid',
        'exclusive venue madrid',
      ],
    } satisfies LocaleMetadata,
    fr: {
      title:
        "De Diez a Dos - Location de Salles d'Événements Madrid | Tarifs Abordables Près du Santiago Bernabéu",
      description:
        "Location de salles pour événements à Madrid près du Santiago Bernabéu. Anniversaires, mariages, fêtes privées et événements d'entreprise avec traiteur, bar ouvert et DJ. Tarifs abordables et compétitifs. Plus de 200 avis 5 étoiles.",
      ogTitle:
        'De Diez a Dos - Salles pour Événements à Madrid | Santiago Bernabéu | Tarifs Abordables',
      ogDescription:
        "Location de salles pour événements à Madrid près du Santiago Bernabéu. Fêtes privées, anniversaires, mariages et événements d'entreprise avec traiteur inclus. Tarifs abordables et compétitifs. Plus de 200 avis 5 étoiles.",
      twitterTitle:
        'De Diez a Dos - Salles pour Événements à Madrid | Santiago Bernabéu | Tarifs Abordables',
      twitterDescription:
        'Location de salles pour événements à Madrid près du Santiago Bernabéu. Tarifs abordables et compétitifs. Plus de 200 avis 5 étoiles.',
      businessDescriptionSchema:
        "Location de salles pour événements privés à Madrid, à côté du stade Santiago Bernabéu, avec des tarifs abordables et compétitifs. Espace exclusif pour anniversaires, mariages, fêtes privées, enterrements de vie de garçon/jeune fille, communions, baby showers et événements d'entreprise, avec traiteur propre, bar ouvert, système audiovisuel et DJ professionnel. Plus de 14 ans d'expérience.",
      keywords: [
        'location salle événements madrid',
        'louer salle événements madrid',
        'louer salle pour fête madrid',
        'salle anniversaire adultes madrid',
        'location salle anniversaire madrid',
        'salle fête 15 ans madrid',
        'salle quinceañera madrid',
        'louer salle pour réunion madrid',
        'location salle réunion madrid',
        'salle événements entreprise madrid',
        'salle soirée entreprise madrid',
        'salle repas de noël entreprise madrid',
        'location salle mariage madrid',
        'salle événements près du bernabeu',
        'location salle privée madrid',
        'espace événements madrid centre',
        'salle pour voir un match madrid',
        'salle privée voir match bernabeu',
        'salle anniversaire 30 ans madrid',
        'salle graduation madrid',
        'location salle fête privée madrid',
      ],
    } satisfies LocaleMetadata,
    de: {
      title:
        'De Diez a Dos - Eventlocation Madrid mieten | Günstige Preise nahe Santiago Bernabéu',
      description:
        'Vermietung von Eventlocations in Madrid nahe dem Santiago Bernabéu. Geburtstage, Hochzeiten, Privatfeiern und Firmenveranstaltungen mit Catering, Open Bar und DJ. Günstige und wettbewerbsfähige Preise. Über 200 Fünf-Sterne-Bewertungen.',
      ogTitle:
        'De Diez a Dos - Eventlocations in Madrid | Santiago Bernabéu | Günstige Preise',
      ogDescription:
        'Vermietung von Eventlocations in Madrid nahe dem Santiago Bernabéu. Privatfeiern, Geburtstage, Hochzeiten und Firmenveranstaltungen mit inklusivem Catering. Günstige und wettbewerbsfähige Preise. Über 200 Fünf-Sterne-Bewertungen.',
      twitterTitle:
        'De Diez a Dos - Eventlocations in Madrid | Santiago Bernabéu | Günstige Preise',
      twitterDescription:
        'Vermietung von Eventlocations in Madrid nahe dem Santiago Bernabéu. Günstige und wettbewerbsfähige Preise. Über 200 Fünf-Sterne-Bewertungen.',
      businessDescriptionSchema:
        'Günstige private Eventlocation zur Miete in Madrid, neben dem Stadion Santiago Bernabéu, mit wettbewerbsfähigen Preisen. Exklusiver Raum für Geburtstage, Hochzeiten, Privatfeiern, Junggesellinnen-/Junggesellenabschiede, Kommunionen, Babypartys und Firmenveranstaltungen, mit eigenem Catering, Open Bar, professionellem AV-System und DJ. Über 14 Jahre Erfahrung.',
      keywords: [
        'eventlocation mieten madrid',
        'veranstaltungsraum mieten madrid',
        'saal mieten madrid',
        'geburtstagsfeier location madrid',
        'geburtstagssaal mieten madrid',
        'location 15 geburtstag madrid',
        'eventlocation geburtstag madrid',
        'firmenevent location madrid',
        'tagungsraum madrid mieten',
        'besprechungsraum madrid',
        'weihnachtsfeier location madrid',
        'eventlocation bernabeu madrid',
        'raum für fussballspiel madrid',
        'privatraum spiel bernabeu',
        'hochzeitslocation madrid',
        'junggesellinnenabschied location madrid',
        'veranstaltungsraum madrid zentrum',
        'privatveranstaltung madrid',
        'saal mieten geburtstag 30 madrid',
        'abschlussfeier location madrid',
      ],
    } satisfies LocaleMetadata,
    it: {
      title:
        'De Diez a Dos - Affitto Sale Eventi Madrid | Prezzi Convenienti Vicino al Santiago Bernabéu',
      description:
        'Affitto di sale per eventi a Madrid vicino al Santiago Bernabéu. Compleanni, matrimoni, feste private ed eventi aziendali con catering, open bar e DJ. Prezzi convenienti e competitivi. Oltre 200 recensioni 5 stelle.',
      ogTitle:
        'De Diez a Dos - Sale per Eventi a Madrid | Santiago Bernabéu | Prezzi Convenienti',
      ogDescription:
        'Affitto di sale per eventi a Madrid vicino al Santiago Bernabéu. Feste private, compleanni, matrimoni ed eventi aziendali con catering incluso. Prezzi convenienti e competitivi. Oltre 200 recensioni 5 stelle.',
      twitterTitle:
        'De Diez a Dos - Sale per Eventi a Madrid | Santiago Bernabéu | Prezzi Convenienti',
      twitterDescription:
        'Affitto di sale per eventi a Madrid vicino al Santiago Bernabéu. Prezzi convenienti e competitivi. Oltre 200 recensioni 5 stelle.',
      businessDescriptionSchema:
        "Affitto di sale per eventi privati a Madrid, accanto allo stadio Santiago Bernabéu, con prezzi convenienti e competitivi. Spazio esclusivo per compleanni, matrimoni, feste private, addii al nubilato/celibato, comunioni, baby shower ed eventi aziendali, con catering proprio, open bar, sistema audiovisivo e DJ professionale. Oltre 14 anni di esperienza.",
      keywords: [
        'affitto sala eventi madrid',
        'noleggio sala eventi madrid',
        'sala per compleanno madrid',
        'sala compleanno adulti madrid',
        'sala per 15 anni madrid',
        'sala quinceañera madrid',
        'sala per riunioni madrid',
        'sala aziendale madrid',
        'sala cena natale azienda madrid',
        'sala per vedere partita madrid',
        'sala privata vedere partita bernabeu',
        'sala per matrimonio madrid',
        'spazio eventi madrid bernabeu',
        'sala feste private madrid',
        'affitto sala privata madrid',
        'spazio eventi madrid centro',
        'sala anniversario madrid',
        'sala laurea madrid',
        'addio al nubilato madrid',
      ],
    } satisfies LocaleMetadata,
    pt: {
      title:
        'De Diez a Dos - Aluguer de Salas para Eventos Madrid | Preços Acessíveis Perto do Santiago Bernabéu',
      description:
        'Aluguer de salas para eventos em Madrid perto do Santiago Bernabéu. Aniversários, casamentos, festas privadas e eventos de empresa com catering, bar aberto e DJ. Preços acessíveis e competitivos. Mais de 200 avaliações 5 estrelas.',
      ogTitle:
        'De Diez a Dos - Salas para Eventos em Madrid | Santiago Bernabéu | Preços Acessíveis',
      ogDescription:
        'Aluguer de salas para eventos em Madrid perto do Santiago Bernabéu. Festas privadas, aniversários, casamentos e eventos corporativos com catering incluído. Preços acessíveis e competitivos. Mais de 200 avaliações 5 estrelas.',
      twitterTitle:
        'De Diez a Dos - Salas para Eventos em Madrid | Santiago Bernabéu | Preços Acessíveis',
      twitterDescription:
        'Aluguer de salas para eventos em Madrid perto do Santiago Bernabéu. Preços acessíveis e competitivos. Mais de 200 avaliações 5 estrelas.',
      businessDescriptionSchema:
        'Aluguer de salas para eventos privados em Madrid, junto ao estádio Santiago Bernabéu, com preços acessíveis e competitivos. Espaço exclusivo para aniversários, casamentos, festas privadas, despedidas de solteiro/solteira, comunhões, baby showers e eventos de empresa, com catering próprio, bar aberto, sistema audiovisual e DJ profissional. Mais de 14 anos de experiência.',
      keywords: [
        'aluguer sala eventos madrid',
        'alugar sala eventos madrid',
        'sala para festa de aniversário madrid',
        'sala aniversário adultos madrid',
        'sala para 15 anos madrid',
        'sala para reuniões madrid',
        'sala corporativa madrid',
        'sala jantar empresa madrid',
        'sala jantar natal empresa madrid',
        'sala para ver jogo madrid',
        'sala privada ver jogo bernabeu',
        'aluguer sala casamento madrid',
        'espaço eventos madrid bernabeu',
        'sala festas privadas madrid',
        'aluguer espaço privado madrid',
        'espaço eventos madrid centro',
        'sala para formatura madrid',
        'despedida de solteira madrid',
      ],
    } satisfies LocaleMetadata,
    nl: {
      title:
        'De Diez a Dos - Evenementenzaal Huren Madrid | Betaalbare Prijzen Nabij Santiago Bernabéu',
      description:
        'Verhuur van evenementenzalen in Madrid nabij Santiago Bernabéu. Verjaardagen, bruiloften, privéfeesten en bedrijfsevenementen met catering, open bar en DJ. Betaalbare en concurrerende prijzen. Meer dan 200 vijfsterren-beoordelingen.',
      ogTitle:
        'De Diez a Dos - Evenementenzalen in Madrid | Santiago Bernabéu | Betaalbare Prijzen',
      ogDescription:
        'Verhuur van evenementenzalen in Madrid nabij Santiago Bernabéu. Privéfeesten, verjaardagen, bruiloften en bedrijfsevenementen met inbegrepen catering. Betaalbare en concurrerende prijzen. Meer dan 200 vijfsterren-beoordelingen.',
      twitterTitle:
        'De Diez a Dos - Evenementenzalen in Madrid | Santiago Bernabéu | Betaalbare Prijzen',
      twitterDescription:
        'Verhuur van evenementenzalen in Madrid nabij Santiago Bernabéu. Betaalbare en concurrerende prijzen. Meer dan 200 vijfsterren-beoordelingen.',
      businessDescriptionSchema:
        'Betaalbare privé-evenementenlocatie te huur in Madrid, naast het Santiago Bernabéu-stadion, met concurrerende prijzen. Exclusieve ruimte voor verjaardagen, bruiloften, privéfeesten, vrijgezellenfeesten, communies, baby showers en bedrijfsevenementen, met eigen catering, open bar, professioneel AV-systeem en DJ. Meer dan 14 jaar ervaring.',
      keywords: [
        'evenementenruimte huren madrid',
        'zaal huren voor feest madrid',
        'verjaardagszaal huren madrid',
        'zaal huren verjaardag volwassenen madrid',
        'zaal voor 15e verjaardag madrid',
        'vergaderzaal huren madrid',
        'bedrijfsevenement madrid',
        'kerstborrel locatie madrid',
        'zaal huren voetbalwedstrijd madrid',
        'privéruimte wedstrijd bernabeu',
        'trouwlocatie madrid',
        'vrijgezellenfeest locatie madrid',
        'feestzaal huren madrid',
        'privé evenementenlocatie madrid',
        'evenementenlocatie madrid bernabeu',
        'ruimte huren jubileum madrid',
        'afstudeerfeest locatie madrid',
      ],
    } satisfies LocaleMetadata,
    pl: {
      title:
        'De Diez a Dos - Wynajem Sal na Wydarzenia Madryt | Przystępne Ceny w Pobliżu Santiago Bernabéu',
      description:
        'Wynajem sal na wydarzenia w Madrycie w pobliżu Santiago Bernabéu. Urodziny, śluby, prywatne imprezy i wydarzenia firmowe z cateringiem, otwartym barem i DJ-em. Przystępne i konkurencyjne ceny. Ponad 200 pięciogwiazdkowych opinii.',
      ogTitle:
        'De Diez a Dos - Sale na Wydarzenia w Madrycie | Santiago Bernabéu | Przystępne Ceny',
      ogDescription:
        'Wynajem sal na wydarzenia w Madrycie w pobliżu Santiago Bernabéu. Prywatne imprezy, urodziny, śluby i wydarzenia firmowe z wliczonym cateringiem. Przystępne i konkurencyjne ceny. Ponad 200 pięciogwiazdkowych opinii.',
      twitterTitle:
        'De Diez a Dos - Sale na Wydarzenia w Madrycie | Santiago Bernabéu | Przystępne Ceny',
      twitterDescription:
        'Wynajem sal na wydarzenia w Madrycie w pobliżu Santiago Bernabéu. Przystępne i konkurencyjne ceny. Ponad 200 pięciogwiazdkowych opinii.',
      businessDescriptionSchema:
        'Przystępna cenowo prywatna sala na wydarzenia do wynajęcia w Madrycie, obok stadionu Santiago Bernabéu, z konkurencyjnymi cenami. Ekskluzywna przestrzeń na urodziny, śluby, prywatne imprezy, wieczory panieńskie/kawalerskie, komunie, baby shower i wydarzenia firmowe, z własnym cateringiem, otwartym barem, profesjonalnym systemem AV i DJ-em. Ponad 14 lat doświadczenia.',
      keywords: [
        'wynajem sali na imprezy madryt',
        'wynajem sali urodzinowej madryt',
        'sala na urodziny dorosłych madryt',
        'wynajem sali na 15 urodziny madryt',
        'sala quinceañera madryt',
        'wynajem sali konferencyjnej madryt',
        'sala na imprezy firmowe madryt',
        'sala na kolację firmową madryt',
        'sala na wigilię firmową madryt',
        'sala do oglądania meczu madryt',
        'prywatna sala mecz bernabeu',
        'wynajem sali na ślub madryt',
        'sala eventowa madryt bernabeu',
        'prywatna sala na imprezy madryt',
        'wynajem przestrzeni eventowej madryt',
        'sala na rocznicę madryt',
        'wieczór panieński madryt',
      ],
    } satisfies LocaleMetadata,
    ru: {
      title:
        'De Diez a Dos - Аренда Залов для Мероприятий в Мадриде | Доступные Цены Рядом с Сантьяго Бернабеу',
      description:
        'Аренда залов для мероприятий в Мадриде рядом с Сантьяго Бернабеу. Дни рождения, свадьбы, частные вечеринки и корпоративные мероприятия с кейтерингом, открытым баром и DJ. Доступные и конкурентные цены. Более 200 пятизвёздочных отзывов.',
      ogTitle:
        'De Diez a Dos - Залы для Мероприятий в Мадриде | Сантьяго Бернабеу | Доступные Цены',
      ogDescription:
        'Аренда залов для мероприятий в Мадриде рядом с Сантьяго Бернабеу. Частные вечеринки, дни рождения, свадьбы и корпоративные мероприятия с включённым кейтерингом. Доступные и конкурентные цены. Более 200 пятизвёздочных отзывов.',
      twitterTitle:
        'De Diez a Dos - Залы для Мероприятий в Мадриде | Сантьяго Бернабеу | Доступные Цены',
      twitterDescription:
        'Аренда залов для мероприятий в Мадриде рядом с Сантьяго Бернабеу. Доступные и конкурентные цены. Более 200 пятизвёздочных отзывов.',
      businessDescriptionSchema:
        'Доступная по цене частная площадка для мероприятий в аренду в Мадриде, рядом со стадионом Сантьяго Бернабеу, с конкурентными ценами. Эксклюзивное пространство для дней рождения, свадеб, частных вечеринок, девичников/мальчишников, причастий, baby shower и корпоративных мероприятий, с собственным кейтерингом, открытым баром, профессиональной AV-системой и DJ. Более 14 лет опыта.',
      keywords: [
        'аренда зала для мероприятий мадрид',
        'снять зал для праздника мадрид',
        'зал для дня рождения мадрид',
        'зал для дня рождения взрослых мадрид',
        'аренда зала 15 лет мадрид',
        'аренда зала для корпоратива мадрид',
        'зал для корпоративного мероприятия мадрид',
        'аренда зала для встреч мадрид',
        'зал для переговоров мадрид',
        'зал для корпоратива на новый год мадрид',
        'зал смотреть футбол мадрид',
        'приватная комната матч бернабеу',
        'аренда зала для свадьбы мадрид',
        'зал для частной вечеринки мадрид',
        'аренда зала бернабеу мадрид',
        'зал для девичника мадрид',
        'зал для юбилея мадрид',
      ],
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
