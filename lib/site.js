function sinBarraFinal(url) {
  return url.replace(/\/+$/, '');
}

function resolverSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return sinBarraFinal(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}

export const SITE_URL = resolverSiteUrl();

export const SITE_NAME = 'Santillán y Asociados';

export const SITE_TITLE = 'Santillán y Asociados | Estudio Jurídico en Tucumán';

export const SITE_DESCRIPTION =
  'Santillán y Asociados es un estudio jurídico en Tucumán. Asesoramiento en derecho laboral, de familia, civil y defensa del consumidor.';

export const SITE_KEYWORDS = [
  'abogado Tucumán',
  'estudio jurídico Tucumán',
  'abogado laboral San Miguel de Tucumán',
  'abogado de familia Tucumán',
  'divorcio Tucumán',
  'despido Tucumán',
  'defensa del consumidor Tucumán',
  'consulta legal sin costo Tucumán',
];

export const CONTACTO = {
  telefono: '+54 381 200-9928',
  telefonoE164: '+5493812009928',
  email: 'benjaminliceo@hotmail.com',
  localidad: 'San Miguel de Tucumán',
  provincia: 'Tucumán',
  pais: 'AR',
};
