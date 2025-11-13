import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/main.css' // Mantener solo el CSS que sí necesitas
import App from './App.tsx'
import { SpeedInsights } from '@vercel/speed-insights/react'

// Inicializar AOS de forma dinámica
const initAOS = async () => {
  const AOS = await import('aos')
  await import('aos/dist/aos.css')
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
  })
}

initAOS()

// Renderizado de la app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>,
)
