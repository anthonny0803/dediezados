import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Sidenav } from '@/components/layout/Sidenav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Events } from '@/components/sections/Events';
import { Space } from '@/components/sections/Space';
import { CateringExtras } from '@/components/sections/CateringExtras';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';
import { LocationReviewsSection } from '@/components/sections/LocationReviewsSection';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <Sidenav />
      <Hero />
      <Events />
      <Space />
      <CateringExtras />
      <Gallery />
      <Contact />
      <LocationReviewsSection />
      <Footer />
    </>
  );
}
