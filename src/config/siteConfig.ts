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
  icono: string;
  titulo: string;
  descripcion: string;
}

export interface Paquete {
  nombre: string;
  precio: string;
  moneda: string;
  periodo: string;
  destacado: boolean;
  badge?: string;
  caracteristicas: string[];
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
    emailIonos: string;
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
  paquetes: Paquete[];
  gallery: {
    photos: string[];
  };
}

export const SITE_CONFIG: SiteConfig = {
  empresa: {
    nombre: "De Diez a Dos",
    nombreCorto: "De Diez a Dos",
    slogan: "Madrid Events - Salones para Eventos",
    descripcion:
      "Alquiler de salones elegantes y servicios integrales para todo tipo de eventos",
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
    emailIonos: 'contacto@dediezados.com',
    telefono: '+34 636 433 911',
    telefono2: '+34 666 463 067',
    direccion: 'Travesía Doctor Fleming 16, Madrid',
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
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786314/olas-01_qdrqnv.jpg',
      titulo: 'Tu espacio privado en el corazón de Madrid',
      descripcion: 'En De Diez a Dos transformamos cada celebración en una experiencia única. Un lugar exclusivo con catering elaborado, barra libre, sonido profesional y un equipo que se encarga de todo. Tú celebras. Nosotros cuidamos cada detalle.',
      botones: [
        { texto: 'Solicitar Información', link: '#contact', tipo: 'primary' },
        { texto: 'Ver Servicios', link: '#services', tipo: 'outline' }
      ],
    },
    {
      imagen: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762853895/hero-02_yfecic.avif",
      titulo: "Momentos Inolvidables",
      descripcion: "El salón perfecto para el día más importante de tu vida. Espacios únicos con servicios personalizados para hacer de tu evento un día memorable",
      botones: [
        { texto: "Ver Salones", link: "#gallery", tipo: "primary" },
        { texto: "Ver Paquetes", link: "#prices", tipo: "outline" },
      ],
    },
    {
      imagen: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762853895/hero-03_ji0tw1.jpg",
      titulo: "Eventos Corporativos",
      descripcion: "Salones profesionales para conferencias, presentaciones, team building y celebraciones empresariales con servicios completos de catering",
      botones: [
        { texto: "Reservar Salón", link: "#contact", tipo: "primary" },
        { texto: "Conocer Más", link: "#footer", tipo: "outline" },
      ],
    },
  ],
  servicios: [
    {
      icono: '🏢',
      titulo: 'Espacio en Exclusiva',
      descripcion: 'Local elegante en Travesía Doctor Fleming con acceso privado y ambiente totalmente reservado. Mobiliario cómodo, iluminación adaptable y decoración personalizable. Desde el primer contacto hasta el final del evento, nuestro equipo coordina cada detalle para que tú solo tengas que disfrutar.'
    },
    {
      icono: '🎵',
      titulo: 'Sistema Audiovisual',
      descripcion: 'Equipo de sonido profesional, pantallas y proyector ideales para ambientar la fiesta o proyectar presentaciones. Calidad de audio e iluminación supervisada por personal técnico. Ambiente elegante, moderno o festivo según tu estilo.'
    },
    {
      icono: '🍽️',
      titulo: 'Catering De Diez a Dos',
      descripcion: '14 años de experiencia perfeccionando cada menú. Paquetes equilibrados con tablas ibéricas, quesos, brochetas, canapés, empanadas, fondue, mini hamburguesas, perritos, tortillas y postres. Todo con ingredientes de primera y presentación cuidada.'
    },
    {
      icono: '🍹',
      titulo: 'Barra Libre',
      descripcion: 'Bebidas seleccionadas que acompañan perfectamente el catering. Refrescos, cervezas, vinos, agua y zumos en el servicio base. Opción de bebidas premium y combinados de primeras marcas, servidos por personal profesional de barra.'
    },
    {
      icono: '👥',
      titulo: 'Personal Profesional',
      descripcion: 'Personal de barra, camareros y control de acceso garantizando seguridad y comodidad. Equipo formado para atender con amabilidad, eficiencia y discreción. Siempre ofrecemos alternativas iguales o superiores ante cualquier imprevisto.'
    },
    {
      icono: '✨',
      titulo: 'Servicios Adicionales',
      descripcion: 'Decoración personalizada con flores e iluminación ambiental. DJ profesional con música adaptada. Carro de chuches y mesa dulce. Fotomax 360 con vídeos espectaculares en boomerang y slow motion listos para compartir en redes.'
    }
  ],
  paquetes: [
    {
      nombre: 'Paquete Básico',
      precio: 'Desde 800',
      moneda: '€',
      periodo: 'por evento',
      destacado: false,
      caracteristicas: [
        'Alquiler de salón 6 horas',
        'Capacidad hasta 100 personas',
        'Mobiliario incluido',
        'Personal de servicio básico',
        'Montaje y desmontaje',
        'Sistema de sonido básico'
      ]
    },
    {
      nombre: 'Paquete Premium',
      precio: 'Desde 1,500',
      moneda: '€',
      periodo: 'por evento',
      destacado: true,
      badge: 'Más Popular',
      caracteristicas: [
        'Salón premium 8 horas',
        'Capacidad hasta 200 personas',
        'Catering menú completo',
        'Barra libre 5 horas',
        'Decoración personalizada',
        'DJ profesional',
        'Coordinador de evento',
        'Fotografía básica',
        'Sistema audiovisual completo'
      ]
    },
    {
      nombre: 'Paquete Deluxe',
      precio: 'Desde 3,000',
      moneda: '€',
      periodo: 'por evento',
      destacado: false,
      caracteristicas: [
        'Salón VIP 10 horas',
        'Capacidad hasta 300 personas',
        'Catering alta cocina',
        'Barra libre premium ilimitada',
        'Decoración luxury completa',
        'Producción audiovisual',
        'Show en vivo / DJ profesional',
        'Fotografía y vídeo profesional',
        'Fotomax 360 con atrezzo',
        'Valet parking',
        'Personal de seguridad'
      ]
    }
  ],
  gallery: {
    photos: [
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786317/olas-04_hysthh.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786316/olas-02_haxhsm.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-02_jbajcz.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786317/olas-06_nr52b9.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786316/olas-03_bxoopd.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786286/amazonias-03_kbbnmn.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-01_g50eji.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-06_btvnve.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-04_wzezty.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786286/amazonias-05_qctdqv.jpg",
      "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786287/amazonias-07_wxzmoe.jpg"
    ],
  },
};