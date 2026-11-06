import LandingPage from '@/components/LandingPage';
import WhatsAppButton from '@/components/WhatsAppButton';
import { prisma } from '@/lib/prisma';
import {
  CONTACTO,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';

export const metadata = {
  alternates: { canonical: '/' },
};

export const revalidate = 3600;

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LegalService',
      '@id': `${SITE_URL}/#estudio`,
      name: SITE_NAME,
      alternateName: 'Estudio Jurídico Santillán y Asociados',
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      telephone: CONTACTO.telefonoE164,
      email: CONTACTO.email,
      priceRange: '$$',
      image: `${SITE_URL}/opengraph-image`,
      // TODO: agregar streetAddress (calle, número y código postal) cuando el estudio lo confirme.
      address: {
        '@type': 'PostalAddress',
        addressLocality: CONTACTO.localidad,
        addressRegion: CONTACTO.provincia,
        addressCountry: CONTACTO.pais,
      },
      // TODO: agregar geo con latitude/longitude cuando el estudio las confirme.
      // TODO: agregar sameAs con las URLs oficiales de redes sociales cuando existan.
      areaServed: [
        { '@type': 'City', name: CONTACTO.localidad },
        { '@type': 'AdministrativeArea', name: CONTACTO.provincia },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      founder: {
        '@type': 'Person',
        name: 'Benjamin Exequiel Diaz Barrera',
        jobTitle: 'Abogado',
      },
      knowsAbout: [
        'Derecho laboral',
        'Derecho de familia y sucesiones',
        'Derecho civil y contratos',
        'Defensa del consumidor',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'es-AR',
      publisher: { '@id': `${SITE_URL}/#estudio` },
    },
  ],
};

async function obtenerTestimonios() {
  const comentarios = await prisma.comentario.findMany({
    where: { estado: 'APROBADO' },
    orderBy: { createdAt: 'desc' },
    take: 12,
    select: {
      id: true,
      nombre: true,
      texto: true,
      caso: true,
    },
  });

  return comentarios.map((comentario) => ({
    id: comentario.id,
    autor: comentario.nombre,
    texto: comentario.texto,
    caso: comentario.caso,
  }));
}

export default async function Page() {
  const testimonios = await obtenerTestimonios();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <LandingPage testimonios={testimonios} />
      <WhatsAppButton />
    </>
  );
}
