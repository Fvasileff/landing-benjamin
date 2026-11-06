import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const LIMITES = {
  nombre: { min: 2, max: 60 },
  texto: { min: 20, max: 500 },
  caso: { max: 80 },
};

const VENTANA_RATE_LIMIT_MS = 60 * 60 * 1000;
const MAX_ENVIOS_POR_VENTANA = 3;

function normalizar(valor) {
  return String(valor ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .trim();
}

function obtenerIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('cf-connecting-ip') ??
    'desconocida'
  );
}

function hashIp(ip) {
  const salt = process.env.IP_HASH_SALT;
  if (!salt) {
    throw new Error('La variable de entorno IP_HASH_SALT es obligatoria.');
  }
  return createHash('sha256').update(`${ip}:${salt}`).digest('hex');
}

function error(mensaje, status) {
  return NextResponse.json({ error: mensaje }, { status });
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return error('El envío no es válido.', 400);
  }

  if (!body || typeof body !== 'object') {
    return error('El envío no es válido.', 400);
  }

  if (normalizar(body.sitio)) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (body.consentimiento !== true) {
    return error('Tenés que aceptar la Política de Privacidad para enviar tu testimonio.', 400);
  }

  const nombre = normalizar(body.nombre).replace(/\s+/g, ' ');
  const texto = normalizar(body.texto);
  const caso = normalizar(body.caso).replace(/\s+/g, ' ') || null;

  if (!nombre || !texto) {
    return error('Completá tu nombre y tu testimonio.', 400);
  }

  if (nombre.length < LIMITES.nombre.min || nombre.length > LIMITES.nombre.max) {
    return error(`El nombre debe tener entre ${LIMITES.nombre.min} y ${LIMITES.nombre.max} caracteres.`, 400);
  }

  if (texto.length < LIMITES.texto.min || texto.length > LIMITES.texto.max) {
    return error(`El testimonio debe tener entre ${LIMITES.texto.min} y ${LIMITES.texto.max} caracteres.`, 400);
  }

  if (caso && caso.length > LIMITES.caso.max) {
    return error(`El tipo de caso no puede superar los ${LIMITES.caso.max} caracteres.`, 400);
  }

  try {
    const ipHash = hashIp(obtenerIp(request));

    const enviosRecientes = await prisma.comentario.count({
      where: {
        ipHash,
        createdAt: { gte: new Date(Date.now() - VENTANA_RATE_LIMIT_MS) },
      },
    });

    if (enviosRecientes >= MAX_ENVIOS_POR_VENTANA) {
      return error('Ya enviaste varios testimonios en la última hora. Probá más tarde.', 429);
    }

    await prisma.comentario.create({
      data: {
        nombre,
        texto,
        caso,
        ipHash,
        estado: 'PENDIENTE',
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (dbError) {
    console.error('No se pudo guardar el testimonio:', dbError);
    return error('No pudimos guardar tu testimonio. Intentá de nuevo en unos minutos.', 500);
  }
}
