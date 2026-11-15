import { getTranslations } from 'next-intl/server';
import type { AppPathname } from '@/i18n/routing';
import { buildFaqPageJsonLd, serializeJsonLd, type FaqItem } from '@/lib/json-ld';
import { absoluteUrl } from '@/lib/urls';

interface FaqJsonLdProps {
  locale: string;
  href: AppPathname;
}

export const FaqJsonLd = async ({ locale, href }: FaqJsonLdProps) => {
  const t = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = t.raw('items') as FaqItem[];
  const faqPage = buildFaqPageJsonLd(absoluteUrl(locale, href), faqItems);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqPage) }}
    />
  );
};
