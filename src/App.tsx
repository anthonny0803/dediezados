import { lazy, Suspense, useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidenav } from './components/layout/Sidenav';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';

// Importamos el hook
import { useGooglePlace } from './hooks/useGooglePlace';

// Lazy load de secciones
const Catering = lazy(() => import('./components/sections/Catering').then(m => ({ default: m.Catering })));
const Extras = lazy(() => import('./components/sections/Extras').then(m => ({ default: m.Extras })));
const Gallery = lazy(() => import('./components/sections/Gallery').then(m => ({ default: m.Gallery })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));
const Location = lazy(() => import('./components/sections/Location').then(m => ({ default: m.Location })));
const Reviews = lazy(() => import('./components/sections/Reviews').then(m => ({ default: m.Reviews })));
const Footer = lazy(() => import('./components/layout/Footer').then(m => ({ default: m.Footer })));

// Loader simple
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
  // Control para activar la carga de Google Place
  const [shouldLoadGooglePlace, setShouldLoadGooglePlace] = useState(false);

  // Hook con control de activación
  const { placeData, loading } = useGooglePlace({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    placeId: import.meta.env.VITE_GOOGLE_PLACE_ID,
    enabled: shouldLoadGooglePlace, // Solo ejecuta cuando sea true
  });

  // Intersection Observer para detectar cuando Location está cerca
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadGooglePlace(true);
            observer.disconnect(); // Ya no necesitamos observar más
          }
        });
      },
      {
        rootMargin: '300px', // Activa 300px antes de que Location entre al viewport
      }
    );

    // Esperar a que el DOM esté listo
    const timer = setTimeout(() => {
      const locationSection = document.getElementById('location');
      if (locationSection) {
        observer.observe(locationSection);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Lazy load de AOS
  useEffect(() => {
    let loaded = false;
    
    const loadAOS = async () => {
      if (loaded) return;
      loaded = true;
      
      try {
        const AOS = await import('aos');
        await import('aos/dist/aos.css');
        
        AOS.init({
          duration: 500,
          easing: 'ease-out-cubic',
          once: true,
          offset: 50,
        });
      } catch (error) {
        console.warn('AOS failed to load:', error);
      }
    };

    const handleScroll = () => {
      loadAOS();
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
        <Catering />
        <Extras />
        <Gallery />
        <Contact />
        <Location placeData={placeData} />
        <Reviews placeData={placeData} loading={loading} />
        
        <Footer />
      </Suspense>
    </>
  );
}

export default App;