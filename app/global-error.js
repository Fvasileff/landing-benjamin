'use client';

import Link from 'next/link';

export default function GlobalError({ reset }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020617',
          color: '#f1f5f9',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '32rem', textAlign: 'center' }}>
          <p
            style={{
              margin: 0,
              fontSize: '11px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#f59e0b',
            }}
          >
            Error inesperado
          </p>
          <h1
            style={{
              margin: '16px 0 0',
              fontFamily: 'Georgia, serif',
              fontSize: '2rem',
              lineHeight: 1.2,
              color: '#ffffff',
            }}
          >
            Algo salió mal
          </h1>
          <p style={{ margin: '16px 0 0', fontSize: '14px', lineHeight: 1.7, color: '#94a3b8' }}>
            No pudimos cargar el sitio. Podés intentar de nuevo o volver al inicio.
          </p>
          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                border: 0,
                borderRadius: '9999px',
                padding: '14px 24px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                color: '#020617',
                background: 'linear-gradient(90deg, #fcd34d, #f59e0b)',
              }}
            >
              Reintentar
            </button>
            <Link
              href="/"
              style={{
                borderRadius: '9999px',
                padding: '13px 24px',
                fontSize: '14px',
                textDecoration: 'none',
                color: '#e2e8f0',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
