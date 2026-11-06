'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guard';

const PANTALLA = '/admin/cambiar-password';

export async function cambiarPassword(formData) {
  const { admin } = await requireAdmin({ permitirCambioPassword: true });

  const actual = String(formData.get('actual') ?? '');
  const nueva = String(formData.get('nueva') ?? '');
  const repetir = String(formData.get('repetir') ?? '');

  if (!actual || !nueva || !repetir) {
    redirect(`${PANTALLA}?error=campos`);
  }

  if (nueva.length < 10) {
    redirect(`${PANTALLA}?error=longitud`);
  }

  if (nueva !== repetir) {
    redirect(`${PANTALLA}?error=coincide`);
  }

  const adminActual = await prisma.admin.findUnique({
    where: { id: admin.id },
    select: { passwordHash: true },
  });

  if (!adminActual) {
    redirect('/admin/login');
  }

  const actualOk = await bcrypt.compare(actual, adminActual.passwordHash);
  if (!actualOk) {
    redirect(`${PANTALLA}?error=actual`);
  }

  const igualALaActual = await bcrypt.compare(nueva, adminActual.passwordHash);
  if (igualALaActual) {
    redirect(`${PANTALLA}?error=igual`);
  }

  const passwordHash = await bcrypt.hash(nueva, 12);

  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      passwordHash,
      debeCambiarPassword: false,
    },
  });

  await signOut({ redirectTo: '/admin/login' });
}
