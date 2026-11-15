import { setRequestLocale } from 'next-intl/server';
import { Faq } from '@/components/sections/Faq';
import { FaqJsonLd } from '@/components/providers/FaqJsonLd';
import { PageIntro } from '@/components/pages/PageIntro';
import { SectionPageShell } from '@/components/pages/SectionPageShell';
import { createSectionPageMetadata, type SectionPageProps } from '@/lib/section-page';

export const generateMetadata = createSectionPageMetadata('faq');

export default async function FaqPage({ params }: SectionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SectionPageShell>
      <PageIntro locale={locale} page="faq" />
      <Faq />
      <FaqJsonLd locale={locale} href="/faq" />
    </SectionPageShell>
  );
}
