import { Scale } from 'lucide-react';
import { requireAdmin } from '@/lib/auth-guard';
import { logout } from '../logout-action';

export default async function AdminPanelLayout({ children }) {
  const { session } = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#F1ECDD] text-[#23241F]">
      <header className="bg-[#1C2333] text-[#F1ECDD] border-b border-[#2A3550]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scale size={20} className="text-[#C08A45]" />
            <span className="text-lg tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Santillán y Asociados
            </span>
            <span className="ml-3 text-xs text-[#9AA0B3]" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
              ADMIN
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-[#B9B4A2]">{session.user?.name}</span>
            <form action={logout}>
              <button
                type="submit"
                className="border border-[#4A5674] px-3 py-1.5 text-xs hover:border-[#C08A45] hover:text-[#C08A45] transition-colors"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
