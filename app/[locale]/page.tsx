import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Sidenav } from '@/components/layout/Sidenav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Catering } from '@/components/sections/Catering';
import { Extras } from '@/components/sections/Extras';
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
      <Services />
      <Catering />
      <Extras />
      <Gallery />
      <Contact />
      <LocationReviewsSection />
      <Footer />
    </>
  );
}
