import { ImageResponse } from 'next/og';

export const alt = 'Santillán y Asociados — Estudio Jurídico en Tucumán';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1C2333',
          padding: '72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#C08A45',
            fontSize: '24px',
            letterSpacing: '6px',
          }}
        >
          ESTUDIO JURÍDICO · TUCUMÁN
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#F1ECDD', fontSize: '76px', lineHeight: 1.1 }}>
            Santillán y Asociados
          </div>
          <div style={{ color: '#C08A45', fontSize: '38px', marginTop: '20px' }}>
            Su caso, resuelto con criterio y sin vueltas.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#9AA0B3',
            fontSize: '24px',
            borderTop: '1px solid #2A3550',
            paddingTop: '24px',
          }}
        >
          <span>Laboral · Familia · Civil · Consumidor</span>
          <span>Primera consulta 15 minutos sin costo</span>
        </div>
      </div>
    ),
    size
  );
}
