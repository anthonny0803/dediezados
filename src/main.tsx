import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/css/main.css'
import App from './App.tsx'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { SpeedInsights } from '@vercel/speed-insights/react' // 👈 Importación

// Inicializar AOS
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>,
)
