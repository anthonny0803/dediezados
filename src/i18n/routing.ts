import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru'],
  defaultLocale: 'es',
  localePrefix: 'always',
  // Hreflang lives in the page metadata with absolute canonical-host URLs;
  // the middleware Link header would rebuild it from the request host (wrong
  // on .vercel.app) and contradict the HTML x-default.
  alternateLinks: false,
  pathnames: {
    '/': '/',
    '/events': {
      es: '/eventos',
      en: '/events',
      fr: '/evenements',
      de: '/veranstaltungen',
      it: '/eventi',
      pt: '/eventos',
      nl: '/evenementen',
      pl: '/wydarzenia',
      ru: '/meropriyatiya',
    },
    '/services': {
      es: '/servicios',
      en: '/services',
      fr: '/services',
      de: '/leistungen',
      it: '/servizi',
      pt: '/servicos',
      nl: '/diensten',
      pl: '/uslugi',
      ru: '/uslugi',
    },
    '/catering': '/catering',
    '/rooms': {
      es: '/salas',
      en: '/rooms',
      fr: '/salles',
      de: '/raeume',
      it: '/sale',
      pt: '/salas',
      nl: '/zalen',
      pl: '/sale',
      ru: '/zaly',
    },
    '/contact': {
      es: '/contacto',
      en: '/contact',
      fr: '/contact',
      de: '/kontakt',
      it: '/contatti',
      pt: '/contacto',
      nl: '/contact',
      pl: '/kontakt',
      ru: '/kontakty',
    },
    '/location': {
      es: '/ubicacion',
      en: '/location',
      fr: '/acces',
      de: '/anfahrt',
      it: '/dove-siamo',
      pt: '/localizacao',
      nl: '/locatie',
      pl: '/lokalizacja',
      ru: '/kak-dobratsya',
    },
    '/faq': {
      es: '/preguntas-frecuentes',
      en: '/faq',
      fr: '/questions-frequentes',
      de: '/haeufige-fragen',
      it: '/domande-frequenti',
      pt: '/perguntas-frequentes',
      nl: '/veelgestelde-vragen',
      pl: '/czeste-pytania',
      ru: '/voprosy',
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
