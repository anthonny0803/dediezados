import { setRequestLocale } from 'next-intl/server';
import { Services } from '@/components/sections/Services';
import { PageIntro } from '@/components/pages/PageIntro';
import { SectionPageShell } from '@/components/pages/SectionPageShell';
import { createSectionPageMetadata, type SectionPageProps } from '@/lib/section-page';

export const generateMetadata = createSectionPageMetadata('services');

export default async function ServicesPage({ params }: SectionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SectionPageShell>
      <PageIntro locale={locale} page="services" />
      <Services />
    </SectionPageShell>
  );
}
