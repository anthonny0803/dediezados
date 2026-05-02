export interface HeroSlideButton {
  text: string;
  link: string;
  variant: 'primary' | 'outline';
}

export interface HeroSlide {
  image: string;
  title: string;
  description: string;
  buttons: HeroSlideButton[];
}

export interface Service {
  title: string;
  description: string;
}

export interface CateringItem {
  title: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface GalleryPhoto {
  url: string;
  room: string;
  alt: string;
}

export interface Extra {
  title: string;
  description: string;
  features: string[];
  recommendedFor: string;
  image: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    shortName: string;
    slogan: string;
    description: string;
  };
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    black: string;
    white: string;
  };
  contact: {
    email: string;
    secondaryEmail: string;
    phone: string;
    secondaryPhone: string;
    address: string;
    schedule: string;
    location: {
      lat: number;
      lng: number;
      zoom: number;
    };
  };
  social: {
    instagram: {
      url: string;
      handle: string;
    };
    facebook: {
      url: string;
    };
  };
  heroSlides: HeroSlide[];
  services: Service[];
  catering: CateringItem[];
  gallery: {
    photos: GalleryPhoto[];
  };
  extras: Extra[];
}

export const siteConfig: SiteConfig = {
  brand: {
    name: 'De Diez a Dos',
    shortName: 'De Diez a Dos',
    slogan: 'Madrid Events - Salas para Eventos',
    description:
      'Alquiler de salas elegantes y servicios integrales para todo tipo de eventos',
  },
  colors: {
    primary: '#A8D5D5',
    primaryDark: '#7FB8B8',
    primaryLight: '#C9E4E4',
    black: '#000000',
    white: '#ffffff',
  },
  contact: {
    email: 'juancarlos@dediezados.com',
    secondaryEmail: 'rafael@dediezados.com',
    phone: '+34 636 433 911',
    secondaryPhone: '+34 660 221 267',
    address: 'Travesía Doctor Fleming 16 Local 12, 28036 Madrid',
    schedule: 'Visitas con cita previa',
    location: {
      lat: 40.455601,
      lng: -3.6878855,
      zoom: 15,
    },
  },
  social: {
    instagram: {
      url: 'https://www.instagram.com/dediezados.eventos/',
      handle: '@dediezados.eventos',
    },
    facebook: {
      url: 'https://www.facebook.com/DediezadosSattua/?locale=es_ES',
    },
  },
  heroSlides: [
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763302071/hero-1_yylnej.webp',
      title: 'Tu espacio privado en el corazón de Madrid',
      description:
        'En De Diez a Dos transformamos cada celebración en una experiencia única. Un lugar exclusivo con catering elaborado, barra libre, sonido profesional y un equipo que se encarga de todo. Tú celebras. Nosotros cuidamos cada detalle.',
      buttons: [
        { text: 'Solicitar Información', link: '#contact', variant: 'primary' },
        { text: 'Ver Servicios', link: '#services', variant: 'outline' },
      ],
    },
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763214977/hero-2_cvdxyg.avif',
      title: 'Momentos Inolvidables',
      description:
        'La sala perfecta para el día más importante de tu vida. Espacios únicos con servicios personalizados para hacer de tu evento un día memorable',
      buttons: [
        { text: 'Ver Salas', link: '#gallery', variant: 'primary' },
        { text: 'Ver Extras', link: '#extras', variant: 'outline' },
      ],
    },
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763214977/hero-3_my3xwu.jpg',
      title: 'Eventos Corporativos',
      description:
        'Salas profesionales para conferencias, presentaciones, team building y celebraciones empresariales con servicios completos de catering',
      buttons: [
        { text: 'Reservar Sala', link: '#contact', variant: 'primary' },
        { text: 'Conocer Más', link: '#footer', variant: 'outline' },
      ],
    },
  ],
  services: [
    {
      title: 'Espacio en Exclusiva',
      description:
        'Local con dos espacios exclusivos, acceso privado y un ambiente totalmente reservado. Mobiliario, cómodo e iluminación adaptable. Trabajamos con seriedad y cercanía, coordinando cada detalle para que tu evento salga perfecto.',
    },
    {
      title: 'Sistema Audiovisual',
      description:
        'Sonido profesional y pantallas de alta calidad ya instalados en el local. Nuestro equipo técnico supervisa que todo funcione correctamente durante el evento. Iluminación adaptable y ambientes configurados según tu estilo: elegante, moderno o festivo. Calidad y comodidad, sin montajes ni complicaciones.',
    },
    {
      title: 'Catering De Diez a Dos',
      description:
        'Más de 14 años escuchando a nuestros clientes y afinando cada propuesta. El resultado: menús equilibrados y versátiles, pensados para funcionar en cualquier ocasión. Calidad, buena presentación y opciones que encajan con todo tipo de eventos.',
    },
    {
      title: 'Barra Libre',
      description:
        'Nuestra barra se adapta a cada evento. Ofrecemos diferentes opciones según el paquete contratado, para que elijas el formato que mejor encaje con tu celebración. Flexibilidad y servicio profesional en todo momento.',
    },
    {
      title: 'Personal Profesional',
      description:
        'Personal de barra, camareros y control de acceso que aseguran seguridad y comodidad. Un equipo eficaz y discreto. Ante cualquier imprevisto, damos soluciones rápidas y de calidad. Servicio sencillo y resolutivo.',
    },
    {
      title: 'Servicios Adicionales',
      description:
        'Disponemos de extras opcionales para completar tu evento: decoración personalizada, DJ, mesa dulce, carro de chuches y Fotomax 360. Tú eliges qué añadir según lo que quieras para ese día, siempre con precios claros y sin sorpresas.',
    },
  ],
  catering: [
    {
      title: 'Nos adaptamos a ti',
      description:
        'Diseñamos cada evento según tus gustos y necesidades, para que sientas que el espacio está hecho a tu medida.',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229850/jamon_qlgzng.webp',
      featured: false,
    },
    {
      title: 'Acompañamiento en todo momento',
      description:
        'Te guiamos antes, durante y después del evento, resolviendo dudas y ocupándonos de los detalles para que solo te preocupes de disfrutar.',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229716/pimientos_o4aq70.webp',
      featured: false,
    },
    {
      title: 'Cercanía y profesionalidad',
      description:
        'Te atendemos con la confianza de siempre y la seriedad que merece tu celebración, combinando calidez y organización.',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229285/brochetas_ffvlf4.webp',
      featured: false,
    },
    {
      title: 'Detalles que marcan la diferencia',
      description:
        'Desde la recepción de tus invitados hasta el cierre del evento, cada pequeño gesto está pensado para sorprender y agradar.',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763298364/fondue_v8hnw6.webp',
      featured: false,
    },
    {
      title: 'Ambiente cómodo y acogedor',
      description:
        'Creamos una atmósfera íntima y agradable donde tus invitados se sienten relajados, bienvenidos y atendidos en todo momento.',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763298364/fruta_sxbbbk.webp',
      featured: false,
    },
    {
      title: 'Atención proactiva',
      description:
        'Nos adelantamos a las necesidades de tu evento para que todo fluya de forma natural, sin improvisaciones ni sobresaltos.',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229477/atun_hu4kol.webp',
      featured: false,
    },
  ],
  gallery: {
    photos: [
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239541/olas-04_phqoqx.webp',
        room: 'Sala Olas',
        alt: 'Sala Olas para eventos privados en Madrid - vista principal',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239537/olas-02_rr6p4s.webp',
        room: 'Sala Olas',
        alt: 'Sala Olas - espacio para celebraciones y fiestas en Madrid',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239542/olas-06_bmubuf.webp',
        room: 'Sala Olas',
        alt: 'Sala Olas - ambiente elegante para eventos cerca del Bernabeu',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239538/olas-03_n4aotk.webp',
        room: 'Sala Olas',
        alt: 'Sala Olas - decoracion y mobiliario para eventos en Madrid',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-02_wuhjwa.webp',
        room: 'Sala Amazonias',
        alt: 'Sala Amazonias para eventos exclusivos en Madrid - vista principal',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-03_a07qc0.webp',
        room: 'Sala Amazonias',
        alt: 'Sala Amazonias - espacio para bodas y celebraciones en Madrid',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239528/amazonias-01_yadqyg.webp',
        room: 'Sala Amazonias',
        alt: 'Sala Amazonias - alquiler de sala para cumpleanos y fiestas',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239530/amazonias-06_mqwezx.webp',
        room: 'Sala Amazonias',
        alt: 'Sala Amazonias - ambiente premium para eventos corporativos',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-05_lnzwjl.webp',
        room: 'Sala Amazonias',
        alt: 'Sala Amazonias - iluminacion y decoracion para eventos privados',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239530/amazonias-07_sadnid.webp',
        room: 'Sala Amazonias',
        alt: 'Sala Amazonias - espacio completo para celebraciones en Madrid',
      },
    ],
  },
  extras: [
    {
      title: 'Karaoke',
      description:
        'Si quieres un evento divertido y participativo, el karaoke es perfecto para grupos de amigos, cumpleaños y celebraciones familiares.',
      features: [
        'Micrófonos y sistema de sonido',
        'Conexión a pantalla / TV para letras',
        'Ambiente tipo "concierto"',
        'Ideal para todas las edades',
      ],
      recommendedFor:
        'Cumpleaños, fiestas de adolescentes, despedidas y celebraciones mixtas',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769767945/Karaoke2_vwfooo.jpg',
    },
    {
      title: 'PhotoMax 360',
      description:
        'El PhotoMax 360 es uno de los extras más buscados: te subes a la plataforma y se graban vídeos con efecto espectacular, perfectos para redes sociales.',
      features: [
        'Vídeos súper llamativos (slow motion / efecto 360)',
        'Ideal para grupos grandes',
        'Se convierte en "la atracción" del evento',
        'Recuerdo top para invitados',
      ],
      recommendedFor:
        'Cumpleaños, fiestas privadas, eventos juveniles y celebraciones donde quieres "nivelazo"',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769763410/PhotoMaster_360_11zon_r4a9c6.jpg',
    },
    {
      title: 'DJ Profesional',
      description:
        'Si quieres que tu evento suene como una discoteca pero a tu estilo, puedes añadir DJ profesional con música adaptada a tu público.',
      features: [
        'Música adaptada al tipo de fiesta',
        'Control de volumen y ambiente',
        'Opciones de animación si lo deseas',
        'Entrada, subida y cierre del evento con temazos',
      ],
      recommendedFor:
        'Fiestas grandes, cumpleaños adultos, despedidas y eventos con baile',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769766951/Dj1_11zon_vjxw1y.jpg',
    },
    {
      title: 'Mesa Dulce / Candy Bar',
      description:
        'La mesa dulce es ideal si quieres una presentación bonita, cuidada y lista para disfrutar. Da un toque elegante y queda genial en fotos.',
      features: [
        'Decoración temática',
        'Chucherías variadas',
        'Presentación tipo buffet',
        'Opciones para niños o adultos',
      ],
      recommendedFor:
        'Cumpleaños infantiles, comuniones y eventos familiares',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769763102/Decoraciones6_11zon_gju7xg.jpg',
    },
    {
      title: 'Decoración Personalizada',
      description:
        'La decoración marca la diferencia. Puedes hacer tu evento más bonito y más "tuyo" con decoración personalizada: temática, colores, nombres, globos y más.',
      features: [
        'Globos (arcos, columnas, guirnaldas)',
        'Fondo para fotos / photocall',
        'Carteles personalizados',
        'Decoración por temática',
      ],
      recommendedFor:
        'Cumpleaños, despedidas, baby showers y todo tipo de celebraciones',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1770884340/Decoraciones8_rrjaho.jpg',
    },
  ],
};
