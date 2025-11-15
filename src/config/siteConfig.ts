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

export interface GastronomiaItem {
  titulo: string;
  descripcion: string;
  imagen: string;
  destacado?: boolean;
}

export interface GalleryPhoto {
  url: string;
  sala: string;
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
  gastronomia: GastronomiaItem[];
  gallery: {
    photos: GalleryPhoto[];
  };
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
    emailIonos: 'contacto@dediezados.com',
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
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786314/olas-01_qdrqnv.jpg',
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
  gastronomia: [
    {
      titulo: 'Tablas Ibéricas Premium',
      descripcion: 'Selección de jamón ibérico de bellota, lomo, chorizo y quesos artesanales curados. Presentación elegante con frutos secos y mermeladas.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229850/jamon_qlgzng.webp',
      destacado: false
    },
    {
      titulo: 'Canapés Gourmet',
      descripcion: 'Variedad de canapés con salmón ahumado, foie, tartar de atún, mousse de pimientos y creaciones del chef. Presentación impecable.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229716/pimientos_o4aq70.webp',
      destacado: false
    },
    {
      titulo: 'Brochetas y Pinchos',
      descripcion: 'Brochetas de pollo teriyaki, cerdo agridulce, verduras asadas. Pinchos de tortilla, croquetas caseras y mini hamburguesas gourmet.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229285/brochetas_ffvlf4.webp',
      destacado: false
    },
    {
      titulo: 'Fondue y Especialidades',
      descripcion: 'Fondue de quesos suizos con pan artesano. Empanadas caseras de carne y verduras. Mini perritos gourmet con salsas premium.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763226696/fondue_hqrcrj.jpg',
      destacado: false
    },
    {
      titulo: 'Postres y Dulces',
      descripcion: 'Mesa dulce con tartas artesanales, mini pasteles, macarons franceses, frutas frescas y chocolate belga. Todo elaborado por nuestro pastelero.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229025/fruta_p1p8xj.jpg',
      destacado: false
    },
    {
      titulo: 'Estaciones Temáticas',
      descripcion: 'Estaciones en vivo: sushi, pasta fresca, tacos mexicanos, o paella valenciana. El chef prepara al momento según tu elección.',
      imagen: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229477/atun_hu4kol.webp',
      destacado: false
    }
  ],
  gallery: {
    photos: [
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786317/olas-04_hysthh.jpg", sala: "Sala Olas" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786316/olas-02_haxhsm.jpg", sala: "Sala Olas" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786317/olas-06_nr52b9.jpg", sala: "Sala Olas" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786316/olas-03_bxoopd.jpg", sala: "Sala Olas" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-02_jbajcz.jpg", sala: "Sala Amazonias" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786286/amazonias-03_kbbnmn.jpg", sala: "Sala Amazonias" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-01_g50eji.jpg", sala: "Sala Amazonias" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-06_btvnve.jpg", sala: "Sala Amazonias" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786285/amazonias-04_wzezty.jpg", sala: "Sala Amazonias" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786286/amazonias-05_qctdqv.jpg", sala: "Sala Amazonias" },
      { url: "https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1762786287/amazonias-07_wxzmoe.jpg", sala: "Sala Amazonias" }
    ],
  },
};