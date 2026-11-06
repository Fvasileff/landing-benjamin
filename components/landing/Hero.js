import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import Reveal from './Reveal';

const STATS = [
  { valor: '15 min', label: 'Primera consulta sin costo', icon: Clock },
  { valor: 'Atención personalizada', icon: ShieldCheck },
  { valor: 'Equipo multidisciplinario', label: 'de profesionales', icon: Users },
  { valor: 'Presupuesto personalizado', label: 'según tu caso', icon: Wallet },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden scroll-mt-24 pt-32 pb-20 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="animate-pulse-soft absolute -top-40 left-1/4 h-[34rem] w-[34rem] rounded-full bg-amber-500/10 blur-[130px]" />
        <div className="animate-float-soft absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-slate-950" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.06] px-4 py-1.5 font-mono text-[11px] tracking-[0.28em] text-amber-300/90 uppercase">
                <Sparkles size={12} />
                Estudio jurídico · Tucumán
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-7xl">
                Su caso, resuelto con{' '}
                <span className="text-gradient-amber">criterio</span> y sin vueltas.
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                <span className="font-medium text-slate-200">Benjamin Exequiel Diaz Barrera</span>, abogado
                matriculado en Tucumán. Asesoramiento claro y estratégico en derecho laboral,
                familia, civil y defensa del consumidor.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#contacto"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-7 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_45px_-8px_rgba(245,158,11,0.65)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Primera consulta 15 minutos sin costo
                  <ArrowRight size={17} className="relative transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#areas"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.06] hover:text-amber-200"
                >
                  Ver áreas de práctica
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="relative">
            <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
              <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="absolute inset-0 rounded-full border border-amber-500/15" />
              <div className="animate-spin-slow absolute inset-2 rounded-full border border-dashed border-amber-500/30" />
              <div className="absolute inset-6 rounded-full bg-[conic-gradient(from_200deg,transparent_0deg,rgba(245,158,11,0.22)_90deg,transparent_180deg,rgba(245,158,11,0.1)_300deg,transparent_360deg)] blur-[1px]" />
              <div className="absolute inset-10 rounded-full border border-white/10 bg-slate-900/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md" />

              <div className="relative flex flex-col items-center text-center">
                <span className="font-mono text-[11px] tracking-[0.3em] text-slate-400">
                  MATRICULADO
                </span>
                <span className="mt-2 font-serif text-4xl text-gradient-amber">Fides</span>
                <span className="mt-2 max-w-[9rem] font-mono text-[11px] leading-relaxed tracking-[0.22em] text-slate-500 uppercase">
                  Colegio de Abogados de Tucumán
                </span>
              </div>

              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.9)]" />
              <span className="absolute bottom-4 right-8 h-1.5 w-1.5 rounded-full bg-amber-500/60" />
              <span className="absolute left-6 top-1/3 h-1 w-1 rounded-full bg-amber-300/70" />
            </div>

            <div className="mx-auto mt-8 w-fit rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 backdrop-blur-md">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-slate-300 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                Atendiendo consultas
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ valor, label, icon: Icon }, index) => (
            <Reveal key={valor} delay={index * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-colors duration-300 hover:border-amber-500/25">
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={
                      valor.length > 8
                        ? 'font-serif text-xl leading-snug text-white'
                        : 'font-serif text-4xl text-white'
                    }
                  >
                    {valor}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/15 bg-amber-500/[0.06] text-amber-400">
                    <Icon size={18} />
                  </span>
                </div>
                {label && (
                  <p className="mt-3 text-xs tracking-wide text-slate-400">{label}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
