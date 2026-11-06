import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function requireAdmin({ permitirCambioPassword = false } = {}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/admin/login');
  }

  const admin = await prisma.admin.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      usuario: true,
      email: true,
      debeCambiarPassword: true,
    },
  });

  if (!admin) {
    redirect('/admin/login');
  }

  if (admin.debeCambiarPassword && !permitirCambioPassword) {
    redirect('/admin/cambiar-password');
  }

  return { session, admin };
}
