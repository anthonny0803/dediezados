export interface HeroSlideButtonConfig {
  link: string;
  variant: 'primary' | 'outline';
}

export interface HeroSlideConfig {
  image: string;
  buttons: HeroSlideButtonConfig[];
}

export interface HeroStatConfig {
  value: string;
}

export interface CateringItemConfig {
  image: string;
  featured?: boolean;
}

export interface GalleryPhotoConfig {
  url: string;
  roomKey: 'olas' | 'amazonias';
}

export interface ExtraConfig {
  icon: string;
  image: string;
}

export interface EventConfig {
  icon: string;
  image: string;
}

export interface ServiceItemConfig {
  icon: string;
  image: string;
}

export interface ServicesConfig {
  included: ServiceItemConfig[];
}

export interface FaqItemConfig {
  icon: string;
}

export interface SiteConfig {
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
  partners: {
    capifix: string;
  };
  developer: {
    name: string;
    url: string;
  };
  logo: {
    url: string;
    urlLight: string;
    width: number;
    height: number;
  };
  heroSlides: HeroSlideConfig[];
  heroStats: HeroStatConfig[];
  catering: CateringItemConfig[];
  gallery: {
    photos: GalleryPhotoConfig[];
  };
  extras: ExtraConfig[];
  events: EventConfig[];
  services: ServicesConfig;
  faq: FaqItemConfig[];
}

export const siteConfig: SiteConfig = {
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
  partners: {
    capifix: 'https://www.capifixlogistica.com',
  },
  developer: {
    name: 'Anthonny Ybañez',
    url: 'https://www.ybanez.dev',
  },
  logo: {
    url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_143,h_95,c_fit/v1763054957/ChatGPT_Image_13_nov_2025_17_57_14_1_nutc4q.png',
    urlLight: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_143,h_95,c_fit/v1778354211/descarga_ese7xb.png',
    width: 143,
    height: 95,
  },
  heroSlides: [
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763302071/hero-1_yylnej.webp',
      buttons: [
        { link: '#contact', variant: 'primary' },
        { link: '#services', variant: 'outline' },
      ],
    },
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763214977/hero-2_cvdxyg.avif',
      buttons: [
        { link: '#gallery', variant: 'primary' },
        { link: '#services', variant: 'outline' },
      ],
    },
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763214977/hero-3_my3xwu.jpg',
      buttons: [
        { link: '#contact', variant: 'primary' },
        { link: '#footer', variant: 'outline' },
      ],
    },
  ],
  heroStats: [{ value: '+200' }, { value: '24/7' }],
  catering: [
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229850/jamon_qlgzng.webp',
      featured: false,
    },
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229716/pimientos_o4aq70.webp',
      featured: false,
    },
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229285/brochetas_ffvlf4.webp',
      featured: false,
    },
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763298364/fondue_v8hnw6.webp',
      featured: false,
    },
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763298364/fruta_sxbbbk.webp',
      featured: false,
    },
    {
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1763229477/atun_hu4kol.webp',
      featured: false,
    },
  ],
  gallery: {
    photos: [
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239541/olas-04_phqoqx.webp',
        roomKey: 'olas',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239537/olas-02_rr6p4s.webp',
        roomKey: 'olas',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239542/olas-06_bmubuf.webp',
        roomKey: 'olas',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239538/olas-03_n4aotk.webp',
        roomKey: 'olas',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-02_wuhjwa.webp',
        roomKey: 'amazonias',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-03_a07qc0.webp',
        roomKey: 'amazonias',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239528/amazonias-01_yadqyg.webp',
        roomKey: 'amazonias',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239530/amazonias-06_mqwezx.webp',
        roomKey: 'amazonias',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239529/amazonias-05_lnzwjl.webp',
        roomKey: 'amazonias',
      },
      {
        url: 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1920/v1763239530/amazonias-07_sadnid.webp',
        roomKey: 'amazonias',
      },
    ],
  },
  extras: [
    {
      icon: 'mic',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769767945/Karaoke2_vwfooo.jpg',
    },
    {
      icon: 'camera',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769763410/PhotoMaster_360_11zon_r4a9c6.jpg',
    },
    {
      icon: 'headphones',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769766951/Dj1_11zon_vjxw1y.jpg',
    },
    {
      icon: 'cake',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1769763102/Decoraciones6_11zon_gju7xg.jpg',
    },
    {
      icon: 'palette',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_600/v1770884340/Decoraciones8_rrjaho.jpg',
    },
  ],
  events: [
    {
      icon: 'heart',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1784449907/event-wedding_qhpdrp.jpg',
    },
    {
      icon: 'cake',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1784449907/event-birthday_l97b1k.jpg',
    },
    {
      icon: 'crown',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1784449908/event-quince_kxvsyv.jpg',
    },
    {
      icon: 'briefcase',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1784449907/event-corporate_q0j6rc.jpg',
    },
    {
      icon: 'trophy',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1784449907/event-sports_q54ygr.jpg',
    },
    {
      icon: 'users',
      image:
        'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1784449907/event-meeting_zap2hh.jpg',
    },
  ],
  // Detail images reuse real room photos (olas/amazonias) as provisional
  // assets. Item copy lives in i18n.
  services: {
    included: [
      {
        icon: 'building',
        image:
          'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1763239528/amazonias-01_yadqyg.webp',
      },
      {
        icon: 'music',
        image:
          'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1763239541/olas-04_phqoqx.webp',
      },
      {
        icon: 'utensils',
        image:
          'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1763229285/brochetas_ffvlf4.webp',
      },
      {
        icon: 'wine',
        image:
          'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1763239530/amazonias-06_mqwezx.webp',
      },
      {
        icon: 'users',
        image:
          'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_1200/v1784449908/service-staff_fnfito.jpg',
      },
    ],
  },
  faq: [
    { icon: 'utensils' },
    { icon: 'mapPin' },
    { icon: 'party' },
    { icon: 'sparkles' },
    { icon: 'calendar' },
    { icon: 'tv' },
  ],
};
