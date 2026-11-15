import { setRequestLocale } from 'next-intl/server';
import { Contact } from '@/components/sections/Contact';
import { PageIntro } from '@/components/pages/PageIntro';
import { SectionPageShell } from '@/components/pages/SectionPageShell';
import { createSectionPageMetadata, type SectionPageProps } from '@/lib/section-page';

export const generateMetadata = createSectionPageMetadata('contact');

export default async function ContactPage({ params }: SectionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SectionPageShell>
      <PageIntro locale={locale} page="contact" />
      <Contact />
    </SectionPageShell>
  );
}
