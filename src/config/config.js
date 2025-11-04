// ============================================
// CONFIGURACIÓN GENERAL DEL SITIO
// ============================================
// Este archivo centraliza toda la configuración
// Para crear un sitio para otro cliente, solo cambia estos valores

const SITE_CONFIG = {
  // ==========================================
  // INFORMACIÓN DE LA EMPRESA
  // ==========================================
  empresa: {
    nombre: 'De Diez a Dos',
    nombreCorto: 'De Diez a Dos',
    slogan: 'Madrid Events - Salones para Eventos',
    descripcion: 'Alquiler de salones elegantes y servicios integrales para todo tipo de eventos',
    
    // Colores del logo
    colores: {
      primary: '#A8D5D5',      // Turquesa pastel del logo
      primaryDark: '#7FB8B8',   // Versión oscura
      primaryLight: '#C9E4E4',  // Versión clara
      black: '#000000',
      white: '#ffffff'
    }
  },

  // ==========================================
  // DATOS DE CONTACTO
  // ==========================================
  contacto: {
    email: 'info@dediezados.com',
    emailIonos: 'contacto@dediezados.com', // Email principal de Ionos
    telefono: '+34 636 43 39 11',
    direccion: 'Madrid, España',
    horario: 'Lun-Vie: 10:00-20:00',
    
    // Coordenadas para Google Maps
    ubicacion: {
      lat: 40.4168,  // Latitud de Madrid (cambiar por ubicación real)
      lng: -3.7038,  // Longitud de Madrid (cambiar por ubicación real)
      zoom: 15
    }
  },

  // ==========================================
  // CONFIGURACIÓN DE FORMULARIO
  // ==========================================
  formulario: {
    // OPCIÓN 1: Backend propio (PHP/Laravel)
    endpoint: 'https://tudominio.com/api/contacto',
    metodo: 'POST',
    
    // OPCIÓN 2: EmailJS (servicio gratuito)
    emailJS: {
      serviceID: 'service_xxxxxxx',
      templateID: 'template_xxxxxxx',
      publicKey: 'tu_public_key'
    },
    
    // Mensajes de respuesta
    mensajes: {
      exito: '¡Gracias por tu interés! En breve nos pondremos en contacto.',
      error: 'Hubo un error al enviar el formulario. Por favor, intenta de nuevo.',
      validacion: 'Por favor, completa todos los campos requeridos.'
    }
  },

  // ==========================================
  // GOOGLE MAPS API
  // ==========================================
  googleMaps: {
    apiKey: 'TU_API_KEY_AQUI', // Obtener en: https://console.cloud.google.com
    enabled: true,
    markerTitle: 'De Diez a Dos - Catering',
    infoWindow: '<strong>De Diez a Dos</strong><br>Madrid, España'
  },

  // ==========================================
  // GOOGLE REVIEWS (Place ID)
  // ==========================================
  googleReviews: {
    placeId: 'TU_PLACE_ID_AQUI', // Obtener en: https://developers.google.com/maps/documentation/places/web-service/place-id
    apiKey: 'TU_API_KEY_AQUI',
    enabled: true,
    maxReviews: 3 // Número de reseñas a mostrar
  },

  // ==========================================
  // REDES SOCIALES
  // ==========================================
  social: {
    instagram: {
      usuario: 'dediezados',
      url: 'https://instagram.com/dediezados',
      activo: true
    },
    facebook: {
      url: 'https://facebook.com/dediezados',
      activo: false
    },
    whatsapp: {
      numero: '34XXXXXXXXX',
      activo: false
    }
  },

  // ==========================================
  // SLIDES DEL HERO CAROUSEL
  // ==========================================
  heroSlides: [
    {
      imagen: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b7?w=1920&h=1080&fit=crop',
      titulo: 'Salones para Eventos Únicos',
      descripcion: 'Espacios elegantes y completamente equipados para bodas, cumpleaños, eventos corporativos y celebraciones especiales en Madrid',
      botones: [
        { texto: 'Solicitar Información', link: '#contact', tipo: 'primary' },
        { texto: 'Ver Salones', link: '#services', tipo: 'outline' }
      ]
    },
    {
      imagen: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1080&fit=crop',
      titulo: 'Bodas Inolvidables',
      descripcion: 'El salón perfecto para el día más importante de tu vida. Espacios únicos con servicios personalizados para hacer de tu boda un evento memorable',
      botones: [
        { texto: 'Ver Salones para Bodas', link: '#contact', tipo: 'primary' },
        { texto: 'Ver Paquetes', link: '#prices', tipo: 'outline' }
      ]
    },
    {
      imagen: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&h=1080&fit=crop',
      titulo: 'Eventos Corporativos',
      descripcion: 'Salones profesionales para conferencias, presentaciones, team building y celebraciones empresariales con servicios completos de catering',
      botones: [
        { texto: 'Reservar Salón', link: '#contact', tipo: 'primary' },
        { texto: 'Conocer Más', link: '#services', tipo: 'outline' }
      ]
    }
  ],

  // ==========================================
  // SERVICIOS
  // ==========================================
  servicios: [
    {
      icono: '🏛️',
      titulo: 'Alquiler de Salones',
      descripcion: 'Espacios elegantes y versátiles para todo tipo de eventos. Salones totalmente equipados con capacidad desde 50 hasta 300 personas, con mobiliario de diseño incluido.'
    },
    {
      icono: '🍽️',
      titulo: 'Catering Completo',
      descripcion: 'Servicio gastronómico profesional con menús personalizados. Desde cócteles de bienvenida hasta banquetes de gala con chefs especializados.'
    },
    {
      icono: '🎨',
      titulo: 'Decoración Personalizada',
      descripcion: 'Diseño y montaje de decoración según tu estilo y temática. Centros de mesa, iluminación ambiental, flores y elementos decorativos a medida.'
    },
    {
      icono: '🎵',
      titulo: 'Producción Audiovisual',
      descripcion: 'Equipamiento completo de sonido profesional, proyectores, pantallas LED e iluminación escénica para presentaciones y entretenimiento.'
    },
    {
      icono: '👔',
      titulo: 'Personal Profesional',
      descripcion: 'Equipo completo de servicio: camareros, chefs, coordinadores de evento, personal de seguridad y valet parking según necesidades.'
    },
    {
      icono: '🎭',
      titulo: 'Entretenimiento',
      descripcion: 'DJs profesionales, bandas en vivo, animadores, fotomatón, shows personalizados y todo tipo de entretenimiento para hacer tu evento único.'
    }
  ],

  // ==========================================
  // PAQUETES DE PRECIOS
  // ==========================================
  paquetes: [
    {
      nombre: 'Salón Básico',
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
        'Catering menú 3 platos',
        'Barra libre 5 horas',
        'Decoración personalizada',
        'DJ profesional',
        'Coordinador de evento',
        'Fotografía básica'
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
        'Show en vivo / DJ',
        'Fotografía y vídeo profesional',
        'Valet parking'
      ]
    }
  ],

  // ==========================================
  // GALERÍA DE FOTOS (RECUERDOS)
  // ==========================================
  galeria: {
    // OPCIÓN 1: URLs directas (actual)
    fotos: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop'
    ],
    
    // OPCIÓN 2: Integración futura con Instagram
    instagram: {
      enabled: false,
      usuario: 'dediezados',
      hashtag: '#dediezados'
    }
  }
};

// Exportar configuración (para uso en módulos ES6)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
