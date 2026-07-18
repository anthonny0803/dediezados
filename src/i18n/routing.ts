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
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
