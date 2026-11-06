import Image from 'next/image';
import { ArrowRight, BadgeCheck, Landmark, MapPin } from 'lucide-react';
import Reveal from './Reveal';

const PUNTOS = [
  'EFECTIVIDAD Y EFICIENCIA',
  'ACOMPAÑAMIENTO Y LENGUAJE CLARO',
  'Nuestro estudio jurídico cuenta con más de 15 años de trayectoria',
];

export default function About() {
  return (
    <section
      id="abogado"
      className="relative scroll-mt-24 border-y border-white/5 bg-slate-900/30 py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <Reveal className="relative">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-amber-500/10 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-800/70 via-slate-900 to-slate-950">
              <div className="absolute inset-0 bg-grid-fade opacity-60" />
              <div className="absolute -right-16 top-10 h-48 w-48 rounded-full bg-amber-500/15 blur-3xl" />

              <Image
                src="/img1.jpeg"
                alt="Benjamin Exequiel Diaz Barrera"
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 384px, 90vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-slate-950/30" />

              <Landmark
                size={220}
                strokeWidth={0.5}
                className="absolute -right-10 -bottom-8 text-white/[0.04]"
              />

              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur-md">
                <p className="font-serif text-xl text-white">Benjamin Exequiel Diaz Barrera</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                  <BadgeCheck size={14} className="text-amber-500" />
                  Abogado matriculado
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.32em] text-amber-500/80 uppercase">
              Sobre mí
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-xl leading-snug font-semibold text-white sm:text-2xl lg:text-[1.7rem]">
              Acompañamiento <span className="text-amber-300">REAL</span> y{' '}
              <span className="text-amber-300">CERCANO</span> en el ejercicio profesional: con
              compromiso de detallar y explicar cada paso del proceso en lenguaje claro, sin
              promesas vacías y{' '}
              <span className="text-amber-300">ENFOQUE ALTAMENTE ESTRATÉGICO</span>.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck size={16} className="text-amber-500" />
                Abogado matriculado en Tucumán
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-amber-500/80" />
                San Miguel de Tucumán
              </span>
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-8 space-y-3">
              {PUNTOS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <BadgeCheck size={17} className="mt-0.5 shrink-0 text-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <a
              href="#contacto"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-medium text-amber-300 transition-colors hover:text-amber-200"
            >
              Primera consulta 15 minutos sin costo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
