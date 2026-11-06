import { Briefcase, Home, ShieldCheck, Users } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const AREAS = [
  {
    num: '01',
    icon: Briefcase,
    title: 'Derecho laboral',
    desc: 'Despidos, indemnizaciones, accidentes de trabajo y reclamos ante la autoridad laboral.',
  },
  {
    num: '02',
    icon: Users,
    title: 'Familia y sucesiones',
    desc: 'Divorcios, alimentos, régimen de visitas y trámites sucesorios.',
  },
  {
    num: '03',
    icon: Home,
    title: 'Civil y contratos',
    desc: 'Desalojos, incumplimientos contractuales, daños y perjuicios.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Defensa del consumidor',
    desc: 'Reclamos contra empresas, garantías y prácticas abusivas.',
  },
];

export default function PracticeAreas() {
  return (
    <section id="areas" className="relative scroll-mt-24 border-t border-white/5 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Áreas de práctica"
          title="Especialidades con mirada estratégica"
          description="Cuatro áreas, un mismo criterio: explicar cada paso, cuidar sus plazos y anticipar el conflicto antes de que escale."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {AREAS.map(({ num, icon: Icon, title, desc }, index) => (
            <Reveal key={num} delay={index * 90}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-white/[0.05] hover:shadow-[0_30px_60px_-30px_rgba(245,158,11,0.25)]">
                <span className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-500/0 blur-3xl transition-colors duration-500 group-hover:bg-amber-500/10" />

                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-[0.3em] text-amber-500/70">{num}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-amber-400 transition-all duration-300 group-hover:border-amber-500/30 group-hover:text-amber-300">
                    <Icon size={20} />
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-2xl text-white">{title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">{desc}</p>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-amber-500/50 via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
