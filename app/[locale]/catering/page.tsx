import { setRequestLocale } from 'next-intl/server';
import { Catering } from '@/components/sections/Catering';
import { PageIntro } from '@/components/pages/PageIntro';
import { SectionPageShell } from '@/components/pages/SectionPageShell';
import { createSectionPageMetadata, type SectionPageProps } from '@/lib/section-page';

export const generateMetadata = createSectionPageMetadata('catering');

export default async function CateringPage({ params }: SectionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SectionPageShell>
      <PageIntro locale={locale} page="catering" />
      <Catering />
    </SectionPageShell>
  );
}
