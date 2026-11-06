import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="w-full max-w-lg text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-transparent">
          <Scale size={22} className="text-amber-400" />
        </span>
        <p className="mt-8 font-mono text-[11px] tracking-[0.32em] text-amber-500/80 uppercase">
          Error 404
        </p>
        <h1 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl">
          Página no encontrada
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          La página que estás buscando no existe o fue movida. Podés volver al inicio y continuar
          desde ahí.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(245,158,11,0.6)]"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
