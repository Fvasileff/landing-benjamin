'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/prisma';

const VISTAS = ['PENDIENTE', 'APROBADO', 'RECHAZADO', 'TODOS'];

const ACCIONES = {
  aprobar: 'APROBADO',
  rechazar: 'RECHAZADO',
  pendiente: 'PENDIENTE',
};

function volverA(formData) {
  const vista = String(formData.get('volver') ?? 'PENDIENTE');
  return VISTAS.includes(vista) ? vista : 'PENDIENTE';
}

export async function moderarComentario(formData) {
  await requireAdmin();

  const id = String(formData.get('id') ?? '');
  const accion = String(formData.get('accion') ?? '');
  const estado = ACCIONES[accion];
  const volver = volverA(formData);

  if (!id || !estado) {
    redirect(`/admin?estado=${volver}&error=accion`);
  }

  const resultado = await prisma.comentario.updateMany({
    where: { id },
    data: { estado },
  });

  if (resultado.count === 0) {
    redirect(`/admin?estado=${volver}&error=inexistente`);
  }

  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath('/', 'page');

  redirect(`/admin?estado=${volver}&ok=${accion}`);
}

export async function eliminarComentario(formData) {
  await requireAdmin();

  const id = String(formData.get('id') ?? '');
  const volver = volverA(formData);

  if (!id) {
    redirect(`/admin?estado=${volver}&error=inexistente`);
  }

  const resultado = await prisma.comentario.deleteMany({ where: { id } });

  if (resultado.count === 0) {
    redirect(`/admin?estado=${volver}&error=inexistente`);
  }

  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath('/', 'page');

  redirect(`/admin?estado=${volver}&ok=eliminar`);
}
