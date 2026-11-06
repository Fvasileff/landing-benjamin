import Link from 'next/link';
import {
  Check,
  CheckCircle2,
  Clock,
  MessageSquareQuote,
  RotateCcw,
  X,
  XCircle,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import BotonEliminar from '@/components/admin/BotonEliminar';
import { eliminarComentario, moderarComentario } from './actions';

export const metadata = {
  title: 'Moderación | Santillán y Asociados',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const FILTROS = [
  { valor: 'PENDIENTE', label: 'Pendientes', icon: Clock },
  { valor: 'APROBADO', label: 'Aprobados', icon: CheckCircle2 },
  { valor: 'RECHAZADO', label: 'Rechazados', icon: XCircle },
  { valor: 'TODOS', label: 'Todos', icon: MessageSquareQuote },
];

const ESTILO_ESTADO = {
  PENDIENTE: {
    barra: 'border-l-[#C08A45]',
    badge: 'border-[#C08A45]/40 bg-[#C08A45]/15 text-[#8A5A22]',
  },
  APROBADO: {
    barra: 'border-l-[#2F6B4F]',
    badge: 'border-[#2F6B4F]/30 bg-[#2F6B4F]/10 text-[#2F6B4F]',
  },
  RECHAZADO: {
    barra: 'border-l-[#C0503F]',
    badge: 'border-[#C0503F]/40 bg-[#C0503F]/10 text-[#9C3B2E]',
  },
};

const MENSAJES_OK = {
  aprobar: 'Comentario aprobado. Ya se muestra en la landing.',
  rechazar: 'Comentario rechazado. No se muestra en la landing.',
  pendiente: 'Comentario devuelto a pendientes.',
  eliminar: 'Comentario eliminado definitivamente.',
};

const MENSAJES_ERROR = {
  accion: 'La acción solicitada no es válida.',
  inexistente: 'El comentario ya no existe.',
};

const mono = { fontFamily: "var(--font-plex-mono), monospace" };
const serif = { fontFamily: "var(--font-playfair), serif" };

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(fecha);
}

function BotonAccion({ id, accion, volver, className, children }) {
  return (
    <form action={moderarComentario}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="accion" value={accion} />
      <input type="hidden" name="volver" value={volver} />
      <button
        type="submit"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${className}`}
      >
        {children}
      </button>
    </form>
  );
}

export default async function AdminPanelPage({ searchParams }) {
  const params = await searchParams;
  const filtro = FILTROS.some((item) => item.valor === params?.estado)
    ? params.estado
    : 'PENDIENTE';

  const [grupos, comentarios] = await Promise.all([
    prisma.comentario.groupBy({
      by: ['estado'],
      _count: { _all: true },
    }),
    prisma.comentario.findMany({
      where: filtro === 'TODOS' ? {} : { estado: filtro },
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
  ]);

  const conteos = { PENDIENTE: 0, APROBADO: 0, RECHAZADO: 0 };
  for (const grupo of grupos) {
    conteos[grupo.estado] = grupo._count._all;
  }
  const total = conteos.PENDIENTE + conteos.APROBADO + conteos.RECHAZADO;

  const mensajeOk = MENSAJES_OK[params?.ok];
  const mensajeError = MENSAJES_ERROR[params?.error];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p style={mono} className="text-xs tracking-widest text-[#9C3B2E] mb-2">
            MODERACIÓN
          </p>
          <h1 style={serif} className="text-3xl">
            Comentarios de clientes
          </h1>
          <p className="text-sm text-[#5B5947] mt-2">
            Revisá los testimonios antes de publicarlos en la landing.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="text-xs text-[#5B5947] hover:text-[#9C3B2E] underline underline-offset-4 transition-colors"
        >
          Ver landing
        </Link>
      </div>

      {mensajeOk && (
        <p className="mb-6 border border-[#2F6B4F]/30 bg-[#2F6B4F]/10 px-4 py-3 text-sm text-[#2F6B4F]" role="status">
          {mensajeOk}
        </p>
      )}

      {mensajeError && (
        <p className="mb-6 border border-[#C0503F]/40 bg-[#C0503F]/10 px-4 py-3 text-sm text-[#9C3B2E]" role="alert">
          {mensajeError}
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {FILTROS.map(({ valor, label, icon: Icon }) => {
          const cantidad = valor === 'TODOS' ? total : conteos[valor];
          const activo = filtro === valor;

          return (
            <Link
              key={valor}
              href={`/admin?estado=${valor}`}
              className={`bg-[#FAF7EF] border p-4 transition-colors ${
                activo
                  ? 'border-[#C08A45] shadow-[inset_0_3px_0_0_#C08A45]'
                  : 'border-[#C9C2AC] hover:border-[#C08A45]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span style={mono} className="text-[11px] tracking-wider text-[#5B5947] uppercase">
                  {label}
                </span>
                <Icon size={16} className={activo ? 'text-[#C08A45]' : 'text-[#8A876F]'} />
              </div>
              <p style={serif} className="text-2xl text-[#23241F]">
                {cantidad}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="space-y-4">
        {comentarios.length === 0 && (
          <div className="bg-[#FAF7EF] border border-[#C9C2AC] p-10 text-center">
            <p className="text-sm text-[#5B5947]">
              {filtro === 'PENDIENTE'
                ? 'No hay comentarios pendientes de moderación.'
                : 'No hay comentarios en esta lista.'}
            </p>
          </div>
        )}

        {comentarios.map((comentario) => {
          const estilo = ESTILO_ESTADO[comentario.estado];

          return (
            <article
              key={comentario.id}
              className={`bg-[#FAF7EF] border border-[#C9C2AC] border-l-4 ${estilo.barra} p-6`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span
                    style={mono}
                    className={`border px-2 py-1 text-[10px] tracking-wider uppercase ${estilo.badge}`}
                  >
                    {comentario.estado}
                  </span>
                  <span style={mono} className="text-xs text-[#8A876F]">
                    {formatearFecha(comentario.createdAt)}
                  </span>
                </div>
                <span className="text-xs text-[#5B5947]">
                  {comentario.nombre}
                  {comentario.caso ? ` · ${comentario.caso}` : ''}
                </span>
              </div>

              <p className="text-[#23241F] text-sm leading-relaxed whitespace-pre-line break-words mb-5">
                {comentario.texto}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E3DDC9]">
                {comentario.estado !== 'APROBADO' && (
                  <BotonAccion
                    id={comentario.id}
                    accion="aprobar"
                    volver={filtro}
                    className="bg-[#1C2333] text-[#F1ECDD] hover:bg-[#2A3550]"
                  >
                    <Check size={14} />
                    Aprobar
                  </BotonAccion>
                )}

                {comentario.estado !== 'RECHAZADO' && (
                  <BotonAccion
                    id={comentario.id}
                    accion="rechazar"
                    volver={filtro}
                    className="border border-[#C0503F] text-[#9C3B2E] hover:bg-[#C0503F] hover:text-white"
                  >
                    <X size={14} />
                    Rechazar
                  </BotonAccion>
                )}

                {comentario.estado !== 'PENDIENTE' && (
                  <BotonAccion
                    id={comentario.id}
                    accion="pendiente"
                    volver={filtro}
                    className="border border-[#C9C2AC] text-[#5B5947] hover:border-[#1C2333] hover:text-[#1C2333]"
                  >
                    <RotateCcw size={14} />
                    Volver a pendiente
                  </BotonAccion>
                )}

                <div className="ml-auto">
                  <BotonEliminar
                    id={comentario.id}
                    volver={filtro}
                    action={eliminarComentario}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {comentarios.length === 100 && (
        <p className="mt-6 text-xs text-[#5B5947]">
          Mostrando los últimos 100 comentarios de esta lista.
        </p>
      )}
    </div>
  );
}
