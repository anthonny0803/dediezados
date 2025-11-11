import { useState, useEffect } from "react";
import logo from '../../assets/images/logo/logo.png';

export const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const isMobile = window.innerWidth <= 1024;
      if (heroSection && !isMobile) {
        const heroBottom = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsInHero(scrollPosition < heroBottom - 100);
      } else {
        setIsInHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggleSidenav = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      document.body.classList.add("no-scroll");
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      document.body.classList.remove("no-scroll");
    }, 400);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidenav-overlay ${isOpen ? "active" : ""}`}
        onClick={handleClose}
      />

      {/* Sidenav */}
      <div
        className={`sidenav ${isOpen ? "open" : ""} ${
          isClosing ? "closing" : ""
        }`}
      >
        {/* Logo mobile - top */}
        <div className="sidenav-logo sidenav-logo-top">
          <img src={logo} alt="De Diez a Dos Logo" />
        </div>

        {/* Spacer only for desktop */}
        <div className="sidenav-spacer"></div>

        <ul>
          <li>
            <a href="#hero" onClick={handleClose}>
              Inicio
            </a>
          </li>
          <li>
            <a href="#services" onClick={handleClose}>
              Servicios
            </a>
          </li>
          <li>
            <a href="#prices" onClick={handleClose}>
              Paquetes
            </a>
          </li>
          <li>
            <a href="#gallery" onClick={handleClose}>
              Salones
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleClose}>
              Contacto
            </a>
          </li>
          <li>
            <a href="#location" onClick={handleClose}>
              Ubicación
            </a>
          </li>
          <li>
            <a href="#reviews" onClick={handleClose}>
              Reseñas
            </a>
          </li>
          <li>
            <a href="#footer" onClick={handleClose}>
              Acerca de
            </a>
          </li>
        </ul>

        {/* Logo desktop - bottom */}
        <div className="sidenav-logo sidenav-logo-bottom">
          <img src={logo} alt="De Diez a Dos Logo" />
        </div>
      </div>

      {/* Toggle button */}
      <div
        className={`menu-toggle ${isInHero ? "hide" : "show"} ${
          isOpen ? "open" : ""
        }`}
        onClick={toggleSidenav}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};