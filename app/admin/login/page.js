import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Scale } from 'lucide-react';
import { auth } from '@/auth';
import { login } from './actions';

export const metadata = {
  title: 'Acceso administrador | Santillán y Asociados',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({ searchParams }) {
  const session = await auth();

  if (session?.user) {
    redirect('/admin');
  }

  const params = await searchParams;
  const hasError = params?.error === '1';

  return (
    <main className="min-h-screen bg-[#1C2333] text-[#F1ECDD] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <Scale size={22} className="text-[#C08A45]" />
          <span className="text-lg tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Santillán y Asociados
          </span>
        </div>

        <div className="bg-[#F1ECDD] text-[#23241F] p-8 border-t-4 border-[#C08A45]">
          <p className="text-xs tracking-widest text-[#9C3B2E] mb-2" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
            ADMINISTRACIÓN
          </p>
          <h1 className="text-2xl mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Acceso al panel
          </h1>
          <p className="text-sm text-[#5B5947] mb-6">
            Ingresá con la cuenta de administrador del estudio.
          </p>

          {hasError && (
            <p className="mb-5 border border-[#C0503F]/40 bg-[#C0503F]/10 px-4 py-3 text-sm text-[#9C3B2E]" role="alert">
              Usuario o contraseña incorrectos.
            </p>
          )}

          <form action={login} className="space-y-5">
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium mb-1.5">
                Usuario
              </label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                required
                autoComplete="username"
                autoFocus
                className="w-full border border-[#C9C2AC] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C08A45]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full border border-[#C9C2AC] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C08A45]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1C2333] text-[#F1ECDD] py-3 text-sm font-medium hover:bg-[#2A3550] transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>

        <Link href="/" className="mt-6 inline-block text-xs text-[#9AA0B3] hover:text-[#C08A45] transition-colors">
          Volver a la landing
        </Link>
      </div>
    </main>
  );
}
