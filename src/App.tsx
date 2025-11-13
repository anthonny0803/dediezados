import { lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidenav } from './components/layout/Sidenav';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Prices } from './components/sections/Prices';

// Lazy load heavy sections
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
  // Initialize AOS after component mount
  useEffect(() => {
    const loadAOS = async () => {
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

    // Wait for DOM to be ready
    if (document.readyState === 'complete') {
      loadAOS();
    } else {
      window.addEventListener('load', loadAOS);
      return () => window.removeEventListener('load', loadAOS);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Sidenav />
      <Hero />
      <Services />
      <Prices />
      
      <Suspense fallback={<SectionLoader />}>
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