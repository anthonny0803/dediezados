import { useState, useEffect } from 'react';

export const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const isMobile = window.innerWidth <= 1024; // versión móvil
      if (heroSection && !isMobile) {
        const heroBottom = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsInHero(scrollPosition < heroBottom - 100);
      } else {
        setIsInHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggleSidenav = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      document.body.classList.add('no-scroll'); // bloquear scroll al abrir
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      document.body.classList.remove('no-scroll'); // liberar scroll al cerrar
    }, 400); // igual a la duración de la animación en el CSS
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`sidenav-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleClose}
      />

      {/* Sidenav */}
      <div className={`sidenav ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
        <br /><br /><br />
        <ul>
          <li><a href="#hero" onClick={handleClose}>Inicio</a></li>
          <li><a href="#services" onClick={handleClose}>Servicios</a></li>
          <li><a href="#prices" onClick={handleClose}>Precios</a></li>
          <li><a href="#memories" onClick={handleClose}>Recuerdos</a></li>
          <li><a href="#contact" onClick={handleClose}>Contacto</a></li>
          <li><a href="#location" onClick={handleClose}>Ubicación</a></li>
          <li><a href="#reviews" onClick={handleClose}>Reseñas</a></li>
        </ul>
      </div>

      {/* Toggle button */}
      <div
        className={`menu-toggle ${isInHero ? 'hide' : 'show'} ${isOpen ? 'open' : ''}`}
        onClick={toggleSidenav}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};
