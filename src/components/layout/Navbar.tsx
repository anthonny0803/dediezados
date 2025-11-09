import { useState, useEffect } from 'react';
import logo from '../../assets/images/logo/logo.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* LOGO FIJO INDEPENDIENTE */}
      <div className={`logo-fixed ${isScrolled ? 'hide' : ''}`}>
        <img src={logo} alt="Logo De Diez a Dos" />
      </div>

      {/* NAV CENTRADO */}
      <nav id="navbar" className={isScrolled ? 'hide' : ''}>
        <ul>
          <li><a href="#hero">Inicio</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#prices">Precios</a></li>
          <li><a href="#memories">Recuerdos</a></li>
          <li><a href="#contact">Contacto</a></li>
          <li><a href="#location">Ubicación</a></li>
          <li><a href="#reviews">Reseñas</a></li>
          <li><a href="#footer">Acerca de</a></li>
        </ul>
      </nav>
    </>
  );
};