import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CONTACTO } from '@/lib/site';
import Reveal from './Reveal';
import { TEL_URL, WHATSAPP_URL } from './site-links';

const DATOS = [
  { icon: Phone, label: 'Teléfono', value: CONTACTO.telefono, href: TEL_URL },
  { icon: Mail, label: 'Email', value: CONTACTO.email, href: `mailto:${CONTACTO.email}` },
  { icon: MapPin, label: 'Ubicación', value: `${CONTACTO.localidad}, ${CONTACTO.provincia}` },
  { icon: Clock, label: 'Horario', value: 'Lunes a viernes, 9 a 18 hs' },
];

export default function Contact() {
  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.07] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <div className="grid gap-12 p-8 lg:grid-cols-2 lg:p-14">
              <div>
                <p className="font-mono text-[11px] tracking-[0.32em] text-amber-500/80 uppercase">
                  Contacto
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                  Solicite su consulta
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
                  Cuéntenos brevemente su caso. Primera consulta 15 minutos sin costo y sin compromiso.
                </p>

                <div className="mt-10 space-y-3">
                  {DATOS.map(({ icon: Icon, label, value, href }) => {
                    const contenido = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-amber-400">
                          <Icon size={17} />
                        </span>
                        <span>
                          <span className="block font-mono text-[11px] tracking-[0.22em] text-slate-500 uppercase">
                            {label}
                          </span>
                          <span className="mt-1 block text-sm text-slate-200">{value}</span>
                        </span>
                      </>
                    );

                    return href ? (
                      <a
                        key={label}
                        href={href}
                        className="flex items-center gap-4 rounded-xl border border-transparent p-1 transition-colors hover:border-white/10 hover:bg-white/[0.03]"
                      >
                        {contenido}
                      </a>
                    ) : (
                      <div key={label} className="flex items-center gap-4 p-1">
                        {contenido}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.08] via-slate-950/40 to-transparent p-8">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />

                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-300">
                  <MessageCircle size={22} />
                </span>

                <h3 className="mt-6 font-serif text-2xl text-white">Hablemos de su caso</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Escríbanos por WhatsApp y le respondemos a la brevedad. Sin compromiso.
                </p>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(245,158,11,0.6)]"
                >
                  Escribir por WhatsApp
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href={TEL_URL}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm text-slate-200 transition-colors hover:border-amber-500/30 hover:text-amber-200"
                >
                  <Phone size={15} />
                  Llamar al estudio
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
