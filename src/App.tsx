import { Navbar } from './components/layout/Navbar';
import { Sidenav } from './components/layout/Sidenav';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Prices } from './components/sections/Prices';
import { Gallery } from './components/sections/Gallery';
import { Contact } from './components/sections/Contact';
import { Location } from './components/sections/Location';
import { Reviews } from './components/sections/Reviews';

function App() {
  return (
    <>
      <Navbar />
      <Sidenav />
      <Hero />
      <Services />
      <Prices />
      <Gallery />
      <Contact />
      <Location />
      <Reviews />
      <Footer />
    </>
  );
}

export default App;