import { useState, useEffect } from 'react';

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
        <img src="https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_150,h_95,c_fit/v1763054957/ChatGPT_Image_13_nov_2025_17_57_14_1_nutc4q.png" alt="Logo De Diez a Dos" />
      </div>

      {/* NAV CENTRADO */}
      <nav id="navbar" className={isScrolled ? 'hide' : ''}>
        <ul>
          <li><a href="#hero">Inicio</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#prices">Paquetes</a></li>
          <li><a href="#gallery">Salones</a></li>
          <li><a href="#contact">Contacto</a></li>
          <li><a href="#location">Ubicación</a></li>
          <li><a href="#reviews">Reseñas</a></li>
          <li><a href="#footer">Acerca de</a></li>
        </ul>
      </nav>
    </>
  );
};