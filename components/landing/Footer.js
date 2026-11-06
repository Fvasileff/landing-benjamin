import { Scale } from 'lucide-react';
import { CONTACTO } from '@/lib/site';
import { NAV_LINKS } from './site-links';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#inicio" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-transparent">
                <Scale size={16} className="text-amber-400" />
              </span>
              <span className="font-serif text-lg text-white">Santillán y Asociados</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Estudio jurídico en {CONTACTO.localidad}, {CONTACTO.provincia}. Asesoramiento claro,
              estratégico y cercano.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                className="text-sm text-slate-400 transition-colors hover:text-amber-300"
              >
                {enlace.label}
              </a>
            ))}
          </nav>

          <div className="text-sm text-slate-500">
            <a
              href={`mailto:${CONTACTO.email}`}
              className="transition-colors hover:text-amber-300"
            >
              {CONTACTO.email}
            </a>
            <p className="mt-2">{CONTACTO.telefono}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Santillán y Asociados. Todos los derechos reservados.</span>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
            Benjamin Exequiel Diaz Barrera · Abogado matriculado
          </span>
        </div>
      </div>
    </footer>
  );
}
