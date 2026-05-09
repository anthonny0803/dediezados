import Link from 'next/link';
import { routing } from '@/i18n/routing';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        background: '#0a0a0a',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.25rem', margin: '12px 0 24px' }}>
        Página no encontrada
      </p>
      <Link
        href={`/${routing.defaultLocale}`}
        style={{
          color: '#A8D5D5',
          textDecoration: 'none',
          fontWeight: 600,
          border: '1px solid #A8D5D5',
          padding: '10px 24px',
          borderRadius: '6px',
        }}
      >
        Volver al inicio
      </Link>
    </main>
  );
}
