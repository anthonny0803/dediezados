import { useState } from 'react';

export const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  const closeSidenav = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`sidenav-overlay ${isOpen ? 'active' : ''}`}
        id="sidenavOverlay"
        onClick={closeSidenav}
      />

      {/* Sidenav */}
      <div className={`sidenav ${isOpen ? 'open' : ''}`} id="sidenav">
        <div className="logo">
          De <span className="logo-accent">Diez</span> a <span className="logo-accent">Dos</span>
        </div>
        <ul>
          <li><a href="#hero" className="sidenav-link" onClick={closeSidenav}>Inicio</a></li>
          <li><a href="#services" className="sidenav-link" onClick={closeSidenav}>Servicios</a></li>
          <li><a href="#prices" className="sidenav-link" onClick={closeSidenav}>Precios</a></li>
          <li><a href="#memories" className="sidenav-link" onClick={closeSidenav}>Recuerdos</a></li>
          <li><a href="#contact" className="sidenav-link" onClick={closeSidenav}>Contacto</a></li>
          <li><a href="#location" className="sidenav-link" onClick={closeSidenav}>Ubicación</a></li>
          <li><a href="#reviews" className="sidenav-link" onClick={closeSidenav}>Reseñas</a></li>
        </ul>
      </div>

      {/* Botón toggle */}
      <div 
        className={`menu-toggle ${isOpen ? '' : 'show'}`}
        id="menuToggle"
        onClick={toggleSidenav}
        style={{ display: 'flex' }}
      >
        →
      </div>
    </>
  );
};