export interface HeroSlide {
  imagen: string;
  titulo: string;
  descripcion: string;
  botones: Array<{
    texto: string;
    link: string;
    tipo: "primary" | "outline";
  }>;
}

export interface Servicio {
  titulo: string;
  descripcion: string;
}

export interface CateringItem {
  titulo: string;
  descripcion: string;
  imagen: string;
  destacado?: boolean;
}

export interface GalleryPhoto {
  url: string;
  sala: string;
  alt: string;
}

export interface ExtraDisponible {
  titulo: string;
  descripcion: string;
  caracteristicas: string[];
  recomendadoPara: string;
  imagen: string;
}

export interface SiteConfig {
  empresa: {
    nombre: string;
    nombreCorto: string;
    slogan: string;
    descripcion: string;
    colores: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      black: string;
      white: string;
    };
  };
  contacto: {
    email: string;
    email2: string;
    telefono: string;
    telefono2: string;
    direccion: string;
    horario: string;
    ubicacion: {
      lat: number;
      lng: number;
      zoom: number;
    };
  };
  social: {
    instagram: {
      url: string;
      usuario: string;
    };
    facebook: {
      url: string;
    };
  };
  heroSlides: HeroSlide[];
  servicios: Servicio[];
  catering: CateringItem[];
  gallery: {
    photos: GalleryPhoto[];
  };
  extrasDisponibles: ExtraDisponible[];
}

export const SITE_CONFIG: SiteConfig = {
  empresa: {
    nombre: "De Diez a Dos",
    nombreCorto: "De Diez a Dos",
    slogan: "Madrid Events - Salas para Eventos",
    descripcion:
      "Alquiler de salas elegantes y servicios integrales para todo tipo de eventos",
    colores: {
      primary: "#A8D5D5",
      primaryDark: "#7FB8B8",
      primaryLight: "#C9E4E4",
      black: "#000000",
      white: "#ffffff",
    },
  },
  contacto: {
    email: 'juancarlos@dediezados.com',
    email2: 'rafael@dediezados.com',
    telefono: '+34 636 433 911',
    telefono2: '+34 660 221 267',
    direccion: 'Travesía Doctor Fleming 16 Local 12, 28036 Madrid',
    horario: 'Visitas con cita previa',
    ubicacion: {
      lat: 40.455601,
      lng: -3.6878855,
      zoom: 15
    }
  },
  social: {
    instagram: {
      url: 'https://www.instagram.com/dediezados.eventos/',
      usuario: '@dediezados.eventos'
    },
    facebook: {
      url: 'https://www.facebook.com/DediezadosSattua/?locale=es_ES'
    }
  },
  heroSlides: [
    {
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763302071/hero-1_yylnej.webp',
      titulo: 'Tu espacio privado en el corazón de Madrid',
      descripcion: 'En De Diez a Dos transformamos cada celebración en una experiencia única. Un lugar exclusivo con catering elaborado, barra libre, sonido profesional y un equipo que se encarga de todo. Tú celebras. Nosotros cuidamos cada detalle.',
      botones: [
        { texto: 'Solicitar Información', link: '#contact', tipo: 'primary' },
        { texto: 'Ver Servicios', link: '#services', tipo: 'outline' }
      ],
    },
    {
      imagen: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763214977/hero-2_cvdxyg.avif",
      titulo: "Momentos Inolvidables",
      descripcion: "La sala perfecta para el día más importante de tu vida. Espacios únicos con servicios personalizados para hacer de tu evento un día memorable",
      botones: [
        { texto: "Ver Salas", link: "#gallery", tipo: "primary" },
        { texto: "Ver Extras", link: "#extras", tipo: "outline" },
      ],
    },
    {
      imagen: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763214977/hero-3_my3xwu.jpg",
      titulo: "Eventos Corporativos",
      descripcion: "Salas profesionales para conferencias, presentaciones, team building y celebraciones empresariales con servicios completos de catering",
      botones: [
        { texto: "Reservar Sala", link: "#contact", tipo: "primary" },
        { texto: "Conocer Más", link: "#footer", tipo: "outline" },
      ],
    },
  ],
  servicios: [
    {
      titulo: 'Espacio en Exclusiva',
      descripcion: 'Local con dos espacios exclusivos, acceso privado y un ambiente totalmente reservado. Mobiliario, cómodo e iluminación adaptable. Trabajamos con seriedad y cercanía, coordinando cada detalle para que tu evento salga perfecto.'
    },
    {
      titulo: 'Sistema Audiovisual',
      descripcion: 'Sonido profesional y pantallas de alta calidad ya instalados en el local. Nuestro equipo técnico supervisa que todo funcione correctamente durante el evento. Iluminación adaptable y ambientes configurados según tu estilo: elegante, moderno o festivo. Calidad y comodidad, sin montajes ni complicaciones.'
    },
    {
      titulo: 'Catering De Diez a Dos',
      descripcion: 'Más de 14 años escuchando a nuestros clientes y afinando cada propuesta. El resultado: menús equilibrados y versátiles, pensados para funcionar en cualquier ocasión. Calidad, buena presentación y opciones que encajan con todo tipo de eventos.'
    },
    {
      titulo: 'Barra Libre',
      descripcion: 'Nuestra barra se adapta a cada evento. Ofrecemos diferentes opciones según el paquete contratado, para que elijas el formato que mejor encaje con tu celebración. Flexibilidad y servicio profesional en todo momento.'
    },
    {
      titulo: 'Personal Profesional',
      descripcion: 'Personal de barra, camareros y control de acceso que aseguran seguridad y comodidad. Un equipo eficaz y discreto. Ante cualquier imprevisto, damos soluciones rápidas y de calidad. Servicio sencillo y resolutivo.'
    },
    {
      titulo: 'Servicios Adicionales',
      descripcion: 'Disponemos de extras opcionales para completar tu evento: decoración personalizada, DJ, mesa dulce, carro de chuches y Fotomax 360. Tú eliges qué añadir según lo que quieras para ese día, siempre con precios claros y sin sorpresas.'
    }
  ],
  catering: [
    {
      titulo: 'Nos adaptamos a ti',
      descripcion: 'Diseñamos cada evento según tus gustos y necesidades, para que sientas que el espacio está hecho a tu medida.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229850/jamon_qlgzng.webp',
      destacado: false
    },
    {
      titulo: 'Acompañamiento en todo momento',
      descripcion: 'Te guiamos antes, durante y después del evento, resolviendo dudas y ocupándonos de los detalles para que solo te preocupes de disfrutar.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229716/pimientos_o4aq70.webp',
      destacado: false
    },
    {
      titulo: 'Cercanía y profesionalidad',
      descripcion: 'Te atendemos con la confianza de siempre y la seriedad que merece tu celebración, combinando calidez y organización.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229285/brochetas_ffvlf4.webp',
      destacado: false
    },
    {
      titulo: 'Detalles que marcan la diferencia',
      descripcion: 'Desde la recepción de tus invitados hasta el cierre del evento, cada pequeño gesto está pensado para sorprender y agradar.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763298364/fondue_v8hnw6.webp',
      destacado: false
    },
    {
      titulo: 'Ambiente cómodo y acogedor',
      descripcion: 'Creamos una atmósfera íntima y agradable donde tus invitados se sienten relajados, bienvenidos y atendidos en todo momento.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763298364/fruta_sxbbbk.webp',
      destacado: false
    },
    {
      titulo: 'Atención proactiva',
      descripcion: 'Nos adelantamos a las necesidades de tu evento para que todo fluya de forma natural, sin improvisaciones ni sobresaltos.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229477/atun_hu4kol.webp',
      destacado: false
    }
  ],
  gallery: {
    photos: [
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239541/olas-04_phqoqx.webp", sala: "Sala Olas", alt: "Sala Olas para eventos privados en Madrid - vista principal" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239537/olas-02_rr6p4s.webp", sala: "Sala Olas", alt: "Sala Olas - espacio para celebraciones y fiestas en Madrid" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239542/olas-06_bmubuf.webp", sala: "Sala Olas", alt: "Sala Olas - ambiente elegante para eventos cerca del Bernabeu" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239538/olas-03_n4aotk.webp", sala: "Sala Olas", alt: "Sala Olas - decoracion y mobiliario para eventos en Madrid" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-02_wuhjwa.webp", sala: "Sala Amazonias", alt: "Sala Amazonias para eventos exclusivos en Madrid - vista principal" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-03_a07qc0.webp", sala: "Sala Amazonias", alt: "Sala Amazonias - espacio para bodas y celebraciones en Madrid" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239528/amazonias-01_yadqyg.webp", sala: "Sala Amazonias", alt: "Sala Amazonias - alquiler de sala para cumpleanos y fiestas" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239530/amazonias-06_mqwezx.webp", sala: "Sala Amazonias", alt: "Sala Amazonias - ambiente premium para eventos corporativos" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-05_lnzwjl.webp", sala: "Sala Amazonias", alt: "Sala Amazonias - iluminacion y decoracion para eventos privados" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239530/amazonias-07_sadnid.webp", sala: "Sala Amazonias", alt: "Sala Amazonias - espacio completo para celebraciones en Madrid" }
    ],
  },
  extrasDisponibles: [
    {
      titulo: 'Karaoke',
      descripcion: 'Si quieres un evento divertido y participativo, el karaoke es perfecto para grupos de amigos, cumpleaños y celebraciones familiares.',
      caracteristicas: [
        'Micrófonos y sistema de sonido',
        'Conexión a pantalla / TV para letras',
        'Ambiente tipo "concierto"',
        'Ideal para todas las edades'
      ],
      recomendadoPara: 'Cumpleaños, fiestas de adolescentes, despedidas y celebraciones mixtas',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769767945/Karaoke2_vwfooo.jpg'
    },
    {
      titulo: 'PhotoMax 360',
      descripcion: 'El PhotoMax 360 es uno de los extras más buscados: te subes a la plataforma y se graban vídeos con efecto espectacular, perfectos para redes sociales.',
      caracteristicas: [
        'Vídeos súper llamativos (slow motion / efecto 360)',
        'Ideal para grupos grandes',
        'Se convierte en "la atracción" del evento',
        'Recuerdo top para invitados'
      ],
      recomendadoPara: 'Cumpleaños, fiestas privadas, eventos juveniles y celebraciones donde quieres "nivelazo"',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769763410/PhotoMaster_360_11zon_r4a9c6.jpg'
    },
    {
      titulo: 'DJ Profesional',
      descripcion: 'Si quieres que tu evento suene como una discoteca pero a tu estilo, puedes añadir DJ profesional con música adaptada a tu público.',
      caracteristicas: [
        'Música adaptada al tipo de fiesta',
        'Control de volumen y ambiente',
        'Opciones de animación si lo deseas',
        'Entrada, subida y cierre del evento con temazos'
      ],
      recomendadoPara: 'Fiestas grandes, cumpleaños adultos, despedidas y eventos con baile',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769766951/Dj1_11zon_vjxw1y.jpg'
    },
    {
      titulo: 'Mesa Dulce / Candy Bar',
      descripcion: 'La mesa dulce es ideal si quieres una presentación bonita, cuidada y lista para disfrutar. Da un toque elegante y queda genial en fotos.',
      caracteristicas: [
        'Decoración temática',
        'Chucherías variadas',
        'Presentación tipo buffet',
        'Opciones para niños o adultos'
      ],
      recomendadoPara: 'Cumpleaños infantiles, comuniones y eventos familiares',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769763102/Decoraciones6_11zon_gju7xg.jpg'
    },
    {
      titulo: 'Decoración Personalizada',
      descripcion: 'La decoración marca la diferencia. Puedes hacer tu evento más bonito y más "tuyo" con decoración personalizada: temática, colores, nombres, globos y más.',
      caracteristicas: [
        'Globos (arcos, columnas, guirnaldas)',
        'Fondo para fotos / photocall',
        'Carteles personalizados',
        'Decoración por temática'
      ],
      recomendadoPara: 'Cumpleaños, despedidas, baby showers y todo tipo de celebraciones',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1770884340/Decoraciones8_rrjaho.jpg'
    }
  ]
};