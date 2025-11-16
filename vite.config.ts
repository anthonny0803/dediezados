import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    // SOLUCIÓN 1: Rollup options para chunks más grandes y confiables
    rollupOptions: {
      output: {
        // Crear chunks manuales para evitar fragmentación excesiva
        manualChunks: {
          // Vendor chunk - todas las dependencias juntas
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          // AOS separado (se carga lazy)
          aos: ['aos'],
          // Google Maps separado
          maps: ['@googlemaps/js-api-loader'],
        },
        
        // Nombres de chunks predecibles
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    
    // SOLUCIÓN 2: Chunks más grandes = menos requests = más confiable
    chunkSizeWarningLimit: 1000,
    
    // SOLUCIÓN 3: Minificación con esbuild (más rápido y compatible)
    minify: 'esbuild',
    
    // SOLUCIÓN 4: Source maps para production debug
    sourcemap: false, // Cambiar a true solo si necesitas debug en producción
    
    // SOLUCIÓN 5: Target moderno = menos código = más rápido
    target: 'esnext',
    
    // SOLUCIÓN 6: Optimización de CSS
    cssCodeSplit: false, // Un solo CSS file = más confiable
  },
  
  // SOLUCIÓN 7: Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'aos',
      '@googlemaps/js-api-loader',
      '@supabase/supabase-js',
    ],
  },
  
  // SOLUCIÓN 8: Server config para desarrollo
  server: {
    port: 5173,
    strictPort: false,
    host: true,
  },
  
  // SOLUCIÓN 9: Preview config (para testing local de build)
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
  },
})