import { Scale } from 'lucide-react';
import { requireAdmin } from '@/lib/auth-guard';
import { logout } from '../logout-action';
import { cambiarPassword } from './actions';

export const metadata = {
  title: 'Cambiar contraseña | Santillán y Asociados',
  robots: { index: false, follow: false },
};

const ERRORES = {
  campos: 'Completá todos los campos.',
  longitud: 'La nueva contraseña debe tener al menos 10 caracteres.',
  coincide: 'La nueva contraseña y su repetición no coinciden.',
  actual: 'La contraseña actual no es correcta.',
  igual: 'La nueva contraseña debe ser distinta de la actual.',
};

export default async function CambiarPasswordPage({ searchParams }) {
  const { admin } = await requireAdmin({ permitirCambioPassword: true });
  const params = await searchParams;
  const error = ERRORES[params?.error];

  return (
    <main className="min-h-screen bg-[#1C2333] text-[#F1ECDD] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <Scale size={22} className="text-[#C08A45]" />
          <span className="text-lg tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Santillán y Asociados
          </span>
          <span className="ml-2 text-xs text-[#9AA0B3]" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
            ADMIN
          </span>
        </div>

        <div className="bg-[#F1ECDD] text-[#23241F] p-8 border-t-4 border-[#C08A45]">
          <p className="text-xs tracking-widest text-[#9C3B2E] mb-2" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
            SEGURIDAD
          </p>
          <h1 className="text-2xl mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Cambiar contraseña
          </h1>
          <p className="text-sm text-[#5B5947] mb-6">
            {admin.debeCambiarPassword
              ? 'Por seguridad, tenés que cambiar la contraseña inicial antes de usar el panel.'
              : `Actualizá la contraseña de acceso de "${admin.usuario}".`}
          </p>

          {error && (
            <p className="mb-5 border border-[#C0503F]/40 bg-[#C0503F]/10 px-4 py-3 text-sm text-[#9C3B2E]" role="alert">
              {error}
            </p>
          )}

          <form action={cambiarPassword} className="space-y-5">
            <div>
              <label htmlFor="actual" className="block text-sm font-medium mb-1.5">
                Contraseña actual
              </label>
              <input
                id="actual"
                name="actual"
                type="password"
                required
                autoComplete="current-password"
                className="w-full border border-[#C9C2AC] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C08A45]"
              />
            </div>

            <div>
              <label htmlFor="nueva" className="block text-sm font-medium mb-1.5">
                Nueva contraseña
              </label>
              <input
                id="nueva"
                name="nueva"
                type="password"
                required
                minLength={10}
                autoComplete="new-password"
                className="w-full border border-[#C9C2AC] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C08A45]"
              />
              <p className="mt-1 text-xs text-[#5B5947]">Mínimo 10 caracteres.</p>
            </div>

            <div>
              <label htmlFor="repetir" className="block text-sm font-medium mb-1.5">
                Repetir la nueva contraseña
              </label>
              <input
                id="repetir"
                name="repetir"
                type="password"
                required
                minLength={10}
                autoComplete="new-password"
                className="w-full border border-[#C9C2AC] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C08A45]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1C2333] text-[#F1ECDD] py-3 text-sm font-medium hover:bg-[#2A3550] transition-colors"
            >
              Guardar contraseña
            </button>
          </form>

          <form action={logout} className="mt-3">
            <button
              type="submit"
              className="w-full border border-[#1C2333] text-[#1C2333] py-3 text-sm hover:bg-[#1C2333] hover:text-[#F1ECDD] transition-colors"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
