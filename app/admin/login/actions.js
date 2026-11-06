'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

export async function login(formData) {
  try {
    await signIn('credentials', {
      usuario: String(formData.get('usuario') ?? ''),
      password: String(formData.get('password') ?? ''),
      redirectTo: '/admin',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect('/admin/login?error=1');
    }

    throw error;
  }
}
