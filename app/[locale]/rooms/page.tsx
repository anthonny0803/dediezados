import { setRequestLocale } from 'next-intl/server';
import { Gallery } from '@/components/sections/Gallery';
import { PageIntro } from '@/components/pages/PageIntro';
import { SectionPageShell } from '@/components/pages/SectionPageShell';
import { createSectionPageMetadata, type SectionPageProps } from '@/lib/section-page';

export const generateMetadata = createSectionPageMetadata('rooms');

export default async function RoomsPage({ params }: SectionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SectionPageShell>
      <PageIntro locale={locale} page="rooms" />
      <Gallery />
    </SectionPageShell>
  );
}
