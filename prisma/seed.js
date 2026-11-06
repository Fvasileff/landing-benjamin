import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const testimonios = [
  {
    id: 'testimonio-inicial-1',
    nombre: 'M. Ledesma',
    texto:
      'Me acompañó en todo el proceso de mi divorcio con mucha claridad y sin vueltas. Siempre respondió a tiempo.',
    caso: 'Expte. Familia',
    estado: 'APROBADO',
  },
  {
    id: 'testimonio-inicial-2',
    nombre: 'R. Gómez',
    texto:
      'Ganamos el reclamo laboral en menos tiempo del que esperaba. Explica todo en criollo, sin tecnicismos.',
    caso: 'Expte. Laboral',
    estado: 'APROBADO',
  },
];

async function main() {
  for (const testimonio of testimonios) {
    await prisma.comentario.upsert({
      where: { id: testimonio.id },
      update: {},
      create: testimonio,
    });
  }

  console.log('Testimonios iniciales cargados como APROBADO.');
}

main()
  .catch((error) => {
    console.error('No se pudieron cargar los testimonios:', error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
