import { setRequestLocale } from 'next-intl/server';
import { LocationReviewsSection } from '@/components/sections/LocationReviewsSection';
import { PageIntro } from '@/components/pages/PageIntro';
import { SectionPageShell } from '@/components/pages/SectionPageShell';
import { createSectionPageMetadata, type SectionPageProps } from '@/lib/section-page';

export const generateMetadata = createSectionPageMetadata('location');

export default async function LocationPage({ params }: SectionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SectionPageShell>
      <PageIntro locale={locale} page="location" />
      <LocationReviewsSection />
    </SectionPageShell>
  );
}
