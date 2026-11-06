'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageSquareQuote, Send } from 'lucide-react';

const MAX = {
  nombre: 60,
  caso: 80,
  texto: 500,
};

const inputClass =
  'w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10';

export default function FormularioTestimonio() {
  const [estado, setEstado] = useState('idle');
  const [error, setError] = useState('');
  const [texto, setTexto] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (estado === 'enviando') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setEstado('enviando');
    setError('');

    try {
      const response = await fetch('/api/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.get('nombre'),
          caso: data.get('caso'),
          texto: data.get('texto'),
          sitio: data.get('sitio'),
          consentimiento: data.get('consentimiento') === 'on',
        }),
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(json.error ?? 'No pudimos enviar tu testimonio. Intentá de nuevo.');
        setEstado('idle');
        return;
      }

      form.reset();
      setTexto('');
      setEstado('ok');
    } catch {
      setError('No pudimos enviar tu testimonio. Revisá tu conexión e intentá de nuevo.');
      setEstado('idle');
    }
  }

  if (estado === 'ok') {
    return (
      <div className="mt-16 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.08] via-white/[0.03] to-transparent p-8 backdrop-blur-md lg:p-10">
        <div className="flex items-start gap-5" role="status">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-300">
            <CheckCircle2 size={24} />
          </span>
          <div>
            <h3 className="font-serif text-2xl text-white">¡Gracias por tu testimonio!</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
              Lo recibimos correctamente. El estudio lo revisará y, si está aprobado, se publicará
              en esta sección.
            </p>
            <button
              type="button"
              onClick={() => setEstado('idle')}
              className="mt-6 rounded-full border border-white/10 bg-white/[0.03] px-6 py-2.5 text-sm text-slate-200 transition-colors hover:border-amber-500/30 hover:text-amber-200"
            >
              Enviar otro testimonio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 grid gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
      <div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 text-amber-400">
          <MessageSquareQuote size={22} />
        </span>
        <p className="mt-6 font-mono text-[11px] tracking-[0.3em] text-amber-500/80 uppercase">
          Tu experiencia
        </p>
        <h3 className="mt-3 font-serif text-2xl text-white">Dejá tu testimonio</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          Si trabajamos juntos, tu opinión ayuda a otras personas a dar el primer paso. Todos los
          comentarios se revisan antes de publicarse.
        </p>
        <p className="mt-4 max-w-md text-xs leading-relaxed text-slate-500">
          No incluyas datos sensibles del caso (nombres de terceros, documentos, montos).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="testimonio-nombre" className="mb-2 block text-sm text-slate-300">
              Nombre o iniciales
            </label>
            <input
              id="testimonio-nombre"
              name="nombre"
              type="text"
              required
              maxLength={MAX.nombre}
              autoComplete="name"
              placeholder="Ej.: M. Ledesma"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="testimonio-caso" className="mb-2 block text-sm text-slate-300">
              Tipo de caso <span className="font-normal text-slate-500">(opcional)</span>
            </label>
            <input
              id="testimonio-caso"
              name="caso"
              type="text"
              maxLength={MAX.caso}
              placeholder="Ej.: Laboral"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="testimonio-texto" className="block text-sm text-slate-300">
              Tu testimonio
            </label>
            <span className="font-mono text-xs text-slate-600">
              {texto.length}/{MAX.texto}
            </span>
          </div>
          <textarea
            id="testimonio-texto"
            name="texto"
            required
            minLength={20}
            maxLength={MAX.texto}
            rows={5}
            value={texto}
            onChange={(event) => setTexto(event.target.value)}
            placeholder="Contanos brevemente cómo fue tu experiencia."
            className={`${inputClass} resize-y leading-relaxed`}
          />
          <p className="mt-2 text-xs text-slate-500">Entre 20 y 500 caracteres.</p>
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="testimonio-sitio">No completar este campo</label>
          <input
            id="testimonio-sitio"
            name="sitio"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="testimonio-consentimiento"
            name="consentimiento"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-slate-950/60 accent-amber-500 outline-none focus:ring-2 focus:ring-amber-500/30"
          />
          <div className="text-xs leading-relaxed text-slate-400">
            <label htmlFor="testimonio-consentimiento">
              Acepto que mis datos se usen para publicar mi comentario y para fines de contacto,
              conforme a la Ley 25.326.
            </label>{' '}
            <Link
              href="/privacidad"
              className="text-amber-300 underline underline-offset-2 transition-colors hover:text-amber-200"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.6)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
          {estado === 'enviando' ? 'Enviando…' : 'Enviar testimonio'}
        </button>
      </form>
    </div>
  );
}
