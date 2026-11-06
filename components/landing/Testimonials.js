import { Quote } from 'lucide-react';
import FormularioTestimonio from '@/components/FormularioTestimonio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Testimonials({ testimonios }) {
  return (
    <section id="testimonios" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen los clientes"
          description="Experiencias reales de personas que confiaron su caso al estudio."
        />

        {testimonios.length > 0 ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonios.map((testimonio, index) => (
              <Reveal key={testimonio.id} delay={index * 80}>
                <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md transition-all duration-500 hover:border-amber-500/25 hover:bg-white/[0.05]">
                  <Quote
                    size={44}
                    className="absolute -right-1 top-4 text-white/[0.04] transition-colors duration-500 group-hover:text-amber-500/10"
                  />

                  <blockquote className="mt-5 flex-1">
                    <p className="text-base leading-relaxed text-slate-200">
                      “{testimonio.texto}”
                    </p>
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 font-mono text-xs text-amber-300">
                      {testimonio.autor?.charAt(0).toUpperCase() ?? 'C'}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{testimonio.autor}</p>
                      {testimonio.caso && (
                        <p className="mt-0.5 font-mono text-[11px] tracking-wider text-slate-500 uppercase">
                          {testimonio.caso}
                        </p>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
              Próximamente compartiremos opiniones de nuestros clientes.
            </p>
          </Reveal>
        )}

        <FormularioTestimonio />
      </div>
    </section>
  );
}
