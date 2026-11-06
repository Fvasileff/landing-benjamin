import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import { CONTACTO, SITE_NAME } from '@/lib/site';

export const metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de Privacidad del sitio de Santillán y Asociados: qué datos se recopilan, para qué se usan y cómo solicitar su eliminación.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacidad' },
};

const REVISION = '[REVISAR CON EL ABOGADO]';

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-amber-300"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-transparent">
            <Scale size={18} className="text-amber-400" />
          </span>
          <span className="font-serif text-lg tracking-wide text-white">{SITE_NAME}</span>
        </div>

        <p className="mt-10 font-mono text-[11px] tracking-[0.32em] text-amber-500/80 uppercase">
          Información legal
        </p>
        <h1 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
          Política de Privacidad
        </h1>
        <p className="mt-4 text-sm text-slate-500">Última actualización: {new Date().toLocaleDateString('es-AR')}</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="font-serif text-xl text-white">1. Responsable del tratamiento</h2>
            <p className="mt-3">
              El responsable de los datos personales recopilados en este sitio es{' '}
              <strong className="font-medium text-slate-100">{SITE_NAME}</strong>, con domicilio en{' '}
              {CONTACTO.localidad}, {CONTACTO.provincia}, Argentina. Contacto:{' '}
              <a
                href={`mailto:${CONTACTO.email}`}
                className="text-amber-300 underline underline-offset-2 hover:text-amber-200"
              >
                {CONTACTO.email}
              </a>{' '}
              o teléfono{' '}
              <a
                href={`tel:${CONTACTO.telefonoE164}`}
                className="text-amber-300 underline underline-offset-2 hover:text-amber-200"
              >
                {CONTACTO.telefono}
              </a>
              . <span className="font-mono text-[11px] text-amber-400">{REVISION}</span>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white">2. Qué datos se recopilan</h2>
            <p className="mt-3">A través del formulario de testimonios se guardan:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>El nombre o las iniciales que la persona ingresa.</li>
              <li>El texto del comentario y, de forma opcional, el tipo de caso.</li>
              <li>
                La dirección IP hasheada (SHA-256 con una clave secreta), que no permite conocer la
                IP original pero se usa para limitar envíos abusivos.
              </li>
              <li>Las fechas de creación y actualización del registro.</li>
            </ul>
            <p className="mt-3">
              No se solicitan datos sensibles ni documentación del caso.{' '}
              <span className="font-mono text-[11px] text-amber-400">{REVISION}</span>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white">3. Para qué se usan</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Revisar y, si corresponde, publicar el testimonio en este sitio.</li>
              <li>Contactar a la persona que dejó el comentario si fuera necesario.</li>
              <li>Prevenir envíos abusivos o automatizados mediante el límite por IP hasheada.</li>
            </ul>
            <p className="mt-3">
              Los datos no se venden ni se ceden a terceros ajenos al estudio, salvo obligación legal.{' '}
              <span className="font-mono text-[11px] text-amber-400">{REVISION}</span>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white">4. Base legal y consentimiento</h2>
            <p className="mt-3">
              El tratamiento se basa en el consentimiento de la persona, que se solicita de forma
              expresa antes de enviar el formulario, conforme a la Ley 25.326 de Protección de los
              Datos Personales.{' '}
              <span className="font-mono text-[11px] text-amber-400">{REVISION}</span>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white">5. Conservación</h2>
            <p className="mt-3">
              Los datos se conservan mientras el testimonio permanezca publicado o mientras sean
              necesarios para las finalidades indicadas. Luego se eliminan o anonimizan.{' '}
              <span className="font-mono text-[11px] text-amber-400">{REVISION}</span>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white">6. Cómo solicitar la eliminación</h2>
            <p className="mt-3">
              Para acceder, rectificar o solicitar la eliminación de un comentario o de los datos
              asociados, escribí a{' '}
              <a
                href={`mailto:${CONTACTO.email}`}
                className="text-amber-300 underline underline-offset-2 hover:text-amber-200"
              >
                {CONTACTO.email}
              </a>{' '}
              indicando el nombre o las iniciales usadas y el comentario a eliminar. El estudio
              responderá en el plazo que corresponda según la normativa aplicable.{' '}
              <span className="font-mono text-[11px] text-amber-400">{REVISION}</span>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white">7. Autoridad de control</h2>
            <p className="mt-3">
              La autoridad de aplicación en materia de protección de datos personales es la Agencia
              de Acceso a la Información Pública (AAIP).{' '}
              <span className="font-mono text-[11px] text-amber-400">{REVISION}</span>
            </p>
          </section>

          <p className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-5 text-xs leading-relaxed text-amber-200/90">
            Este texto es una base para revisión. Las secciones marcadas con{' '}
            <span className="font-mono">{REVISION}</span> deben ser validadas por el abogado antes de
            su publicación definitiva.
          </p>
        </div>
      </div>
    </main>
  );
}
