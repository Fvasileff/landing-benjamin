'use client';

import Link from 'next/link';
import { ArrowLeft, RotateCcw, Scale } from 'lucide-react';

export default function Error({ reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="w-full max-w-lg text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-transparent">
          <Scale size={22} className="text-amber-400" />
        </span>
        <p className="mt-8 font-mono text-[11px] tracking-[0.32em] text-amber-500/80 uppercase">
          Error inesperado
        </p>
        <h1 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl">
          Algo salió mal
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          No pudimos cargar esta página. Podés intentar de nuevo o volver al inicio.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(245,158,11,0.6)]"
          >
            <RotateCcw size={16} />
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm text-slate-200 transition-colors hover:border-amber-500/30 hover:text-amber-200"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
