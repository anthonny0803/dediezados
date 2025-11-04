import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="navbar" className={isScrolled ? 'hide' : ''}>
      <div className="logo">
        De <span className="logo-accent">Diez</span> a <span className="logo-accent">Dos</span>
      </div>
      <ul>
        <li><a href="#hero">Inicio</a></li>
        <li><a href="#services">Servicios</a></li>
        <li><a href="#prices">Precios</a></li>
        <li><a href="#memories">Recuerdos</a></li>
        <li><a href="#contact">Contacto</a></li>
        <li><a href="#location">Ubicación</a></li>
        <li><a href="#reviews">Reseñas</a></li>
      </ul>
    </nav>
  );
};