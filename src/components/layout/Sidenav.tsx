import { useState, useEffect } from "react";

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
          <img
            src="https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_143,h_95,c_fit/v1763054957/ChatGPT_Image_13_nov_2025_17_57_14_1_nutc4q.png"
            alt="De Diez a Dos Logo"
            width="143"
            height="95"
            loading="lazy"
          />
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
            <a href="#catering" onClick={handleClose}>
              Catering
            </a>
          </li>
          <li>
            <a href="#extras" onClick={handleClose}>
              Extras
            </a>
          </li>
          <li>
            <a href="#gallery" onClick={handleClose}>
              Salas
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
          <img
            src="https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_143,h_95,c_fit/v1763054957/ChatGPT_Image_13_nov_2025_17_57_14_1_nutc4q.png"
            alt="De Diez a Dos Logo"
            width="143"
            height="95"
            loading="lazy"
          />
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