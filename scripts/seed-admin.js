import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const usuario = String(process.env.ADMIN_USER ?? '').trim().toLowerCase();
const password = String(process.env.ADMIN_PASSWORD ?? '');
const email = String(process.env.ADMIN_EMAIL ?? '').trim().toLowerCase();

if (!usuario || !password) {
  console.error('Faltan ADMIN_USER y/o ADMIN_PASSWORD en el entorno.');
  process.exit(1);
}

if (usuario.length < 3 || usuario.length > 60) {
  console.error('ADMIN_USER debe tener entre 3 y 60 caracteres.');
  process.exit(1);
}

if (password.length < 8) {
  console.error('ADMIN_PASSWORD debe tener al menos 8 caracteres.');
  process.exit(1);
}

if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('ADMIN_EMAIL no tiene un formato válido.');
  process.exit(1);
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await prisma.admin.findUnique({
    where: { usuario },
    select: { id: true },
  });

  await prisma.admin.upsert({
    where: { usuario },
    update: {},
    create: {
      usuario,
      email: email || null,
      passwordHash,
      debeCambiarPassword: true,
    },
  });

  if (existing) {
    console.log(`El admin "${usuario}" ya existía. No se modificó la contraseña.`);
  } else {
    console.log(`Admin "${usuario}" creado correctamente.`);
  }
}

main()
  .catch((error) => {
    console.error('No se pudo crear el admin:', error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
