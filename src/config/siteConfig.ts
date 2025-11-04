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
    direccion: string;
    horario: string;
    ubicacion: {
      lat: number;
      lng: number;
      zoom: number;
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
    email: "info@dediezados.com",
    emailIonos: "contacto@dediezados.com",
    telefono: "+34 XXX XXX XXX",
    direccion: "Madrid, España",
    horario: "Lun-Vie: 10:00-20:00",
    ubicacion: {
      lat: 40.455601,
      lng: -3.6878855,
      zoom: 20,
    },
  },
  heroSlides: [
    {
      imagen:
        "https://images.unsplash.com/photo-1519167758481-83f29da8c2b7?w=1920&h=1080&fit=crop",
      titulo: "Salones para Eventos Únicos",
      descripcion:
        "Espacios elegantes y completamente equipados para bodas, cumpleaños, eventos corporativos y celebraciones especiales en Madrid",
      botones: [
        { texto: "Solicitar Información", link: "#contact", tipo: "primary" },
        { texto: "Ver Salones", link: "#services", tipo: "outline" },
      ],
    },
    {
      imagen:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1080&fit=crop",
      titulo: "Bodas Inolvidables",
      descripcion:
        "El salón perfecto para el día más importante de tu vida. Espacios únicos con servicios personalizados para hacer de tu boda un evento memorable",
      botones: [
        { texto: "Ver Salones para Bodas", link: "#contact", tipo: "primary" },
        { texto: "Ver Paquetes", link: "#prices", tipo: "outline" },
      ],
    },
    {
      imagen:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&h=1080&fit=crop",
      titulo: "Eventos Corporativos",
      descripcion:
        "Salones profesionales para conferencias, presentaciones, team building y celebraciones empresariales con servicios completos de catering",
      botones: [
        { texto: "Reservar Salón", link: "#contact", tipo: "primary" },
        { texto: "Conocer Más", link: "#services", tipo: "outline" },
      ],
    },
  ],
  servicios: [
    {
      icono: "🏛️",
      titulo: "Alquiler de Salones",
      descripcion:
        "Espacios elegantes y versátiles para todo tipo de eventos. Salones totalmente equipados con capacidad desde 50 hasta 300 personas, con mobiliario de diseño incluido.",
    },
    {
      icono: "🍽️",
      titulo: "Catering Completo",
      descripcion:
        "Servicio gastronómico profesional con menús personalizados. Desde cócteles de bienvenida hasta banquetes de gala con chefs especializados.",
    },
    {
      icono: "🎨",
      titulo: "Decoración Personalizada",
      descripcion:
        "Diseño y montaje de decoración según tu estilo y temática. Centros de mesa, iluminación ambiental, flores y elementos decorativos a medida.",
    },
    {
      icono: "🎵",
      titulo: "Producción Audiovisual",
      descripcion:
        "Equipamiento completo de sonido profesional, proyectores, pantallas LED e iluminación escénica para presentaciones y entretenimiento.",
    },
    {
      icono: "👔",
      titulo: "Personal Profesional",
      descripcion:
        "Equipo completo de servicio: camareros, chefs, coordinadores de evento, personal de seguridad y valet parking según necesidades.",
    },
    {
      icono: "🎭",
      titulo: "Entretenimiento",
      descripcion:
        "DJs profesionales, bandas en vivo, animadores, fotomatón, shows personalizados y todo tipo de entretenimiento para hacer tu evento único.",
    },
  ],
  paquetes: [
    {
      nombre: "Salón Básico",
      precio: "Desde 800",
      moneda: "€",
      periodo: "por evento",
      destacado: false,
      caracteristicas: [
        "Alquiler de salón 6 horas",
        "Capacidad hasta 100 personas",
        "Mobiliario incluido",
        "Personal de servicio básico",
        "Montaje y desmontaje",
        "Sistema de sonido básico",
      ],
    },
    {
      nombre: "Paquete Premium",
      precio: "Desde 1,500",
      moneda: "€",
      periodo: "por evento",
      destacado: true,
      badge: "Más Popular",
      caracteristicas: [
        "Salón premium 8 horas",
        "Capacidad hasta 200 personas",
        "Catering menú 3 platos",
        "Barra libre 5 horas",
        "Decoración personalizada",
        "DJ profesional",
        "Coordinador de evento",
        "Fotografía básica",
      ],
    },
    {
      nombre: "Paquete Deluxe",
      precio: "Desde 3,000",
      moneda: "€",
      periodo: "por evento",
      destacado: false,
      caracteristicas: [
        "Salón VIP 10 horas",
        "Capacidad hasta 300 personas",
        "Catering alta cocina",
        "Barra libre premium ilimitada",
        "Decoración luxury completa",
        "Producción audiovisual",
        "Show en vivo / DJ",
        "Fotografía y vídeo profesional",
        "Valet parking",
      ],
    },
  ],
  gallery: {
    photos: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop",
    ],
  },
};
