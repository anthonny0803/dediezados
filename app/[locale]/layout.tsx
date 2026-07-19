import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Playfair_Display, Inter } from 'next/font/google';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';
import { seoConfig } from '@/config/seo.config';
import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/providers/JsonLd';
import { AosProvider } from '@/components/providers/AosProvider';
import { ScrollResetOnLoad } from '@/components/providers/ScrollResetOnLoad';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/styles/main.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  preload: false,
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale);
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#A8D5D5',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <JsonLd locale={locale} />
      </head>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <AosProvider />
          <ScrollResetOnLoad />
          <SpeedInsights />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${seoConfig.analytics.gaId}`}
            strategy="lazyOnload"
          />
          <Script id="ga-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${seoConfig.analytics.gaId}');
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}
