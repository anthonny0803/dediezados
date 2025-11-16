import { lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidenav } from './components/layout/Sidenav';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';

// Lazy load heavy sections
const Extras = lazy(() => import('./components/sections/Extras').then(m => ({ default: m.Extras })));
const Gallery = lazy(() => import('./components/sections/Gallery').then(m => ({ default: m.Gallery })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));
const Location = lazy(() => import('./components/sections/Location').then(m => ({ default: m.Location })));
const Reviews = lazy(() => import('./components/sections/Reviews').then(m => ({ default: m.Reviews })));
const Footer = lazy(() => import('./components/layout/Footer').then(m => ({ default: m.Footer })));

// Simple loading fallback
const SectionLoader = () => (
  <div style={{ 
    minHeight: '300px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    <div style={{ 
      width: '40px', 
      height: '40px', 
      border: '3px solid var(--primary)',
      borderTop: '3px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

function App() {
  useEffect(() => {
    let loaded = false;
    
    const loadAOS = async () => {
      if (loaded) return;
      loaded = true;
      
      try {
        const AOS = await import('aos');
        await import('aos/dist/aos.css');
        
        AOS.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: true,
          offset: 100,
        });
      } catch (error) {
        console.warn('AOS failed to load:', error);
      }
    };

    // Load AOS on first scroll
    const handleScroll = () => {
      loadAOS();
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Fallback: load after 3 seconds if no scroll
    const timeout = setTimeout(loadAOS, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Sidenav />
      <Hero />
      <Services />
      
      <Suspense fallback={<SectionLoader />}>
        <Extras />
        <Gallery />
        <Contact />
        <Location />
        <Reviews />
        <Footer />
      </Suspense>
    </>
  );
}

export default App;