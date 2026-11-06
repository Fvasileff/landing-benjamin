# Contexto del proyecto — Landing Santillán y Asociados

## Estado actual (ya implementado)
- Marca: "Santillán y Asociados"; abogado: "Benjamin Exequiel Diaz Barrera".
- Landing completa: hero, áreas, bio con foto, testimonios, contacto.
- Copys de consulta unificados a "Primera consulta 15 minutos sin costo" / "Consulta 15 min sin costo".
- Eliminado "300+ casos", "Respuesta en el día", "sin cargo", "consulta gratuita".
- Cards del hero: 15 min, Atención personalizada, Equipo multidisciplinario, Presupuesto personalizado ("según tu caso").
- Testimonios: sin fallback hardcodeado, sin estrellas fijas, estado vacío neutral.
- Formulario de testimonios con consentimiento obligatorio + validación server-side.
- Página `/privacidad` creada, con marcas `[REVISAR CON EL ABOGADO]`.
- Home con ISR (`revalidate = 3600`) y `revalidatePath('/', 'page')` desde moderar/eliminar.
- Canonical propio en home y `/privacidad`; admin con `noindex`.
- Páginas `not-found`, `error` y `global-error`.
- `focus-visible` ámbar global; menú mobile cierra con Escape y devuelve foco.
- Links de navegación unificados en `site-links.js`.
- `IP_HASH_SALT` generado en `.env` local.

## Pendiente — Prioridad 1 (antes de publicar)
1. **Cargar `IP_HASH_SALT` en el hosting.** Sin esa variable, el envío de testimonios falla.
2. **Limpiar testimonios de prueba.**
   - `prisma/seed.js` todavía inserta 2 testimonios hardcodeados como `APROBADO`.
   - La DB actual tiene 3 testimonios aprobados de prueba.
   - Decidir si se borra el seed, se vacía la tabla o se reemplazan por testimonios reales.
3. **Revisión legal de `/privacidad`.** Validar todas las secciones `[REVISAR CON EL ABOGADO]`. Opcional: guardar fecha/versión del consentimiento (requiere migración Prisma).
4. **Datos faltantes para JSON-LD** (hay TODO en `app/page.js`):
   - Calle, número y código postal.
   - Latitud/longitud (si se quiere `geo`).
   - URLs de redes sociales oficiales (`sameAs`).
   - Revisar si se mantienen `priceRange` y `openingHoursSpecification`, que hoy están hardcodeados.
5. **Email profesional.** Hoy sigue `benjaminliceo@hotmail.com`; el cliente lo está consultando.

## Pendiente — Prioridad 2 (decisiones del cliente)
6. **Sello "Fides / Colegio de Abogados de Tucumán"** en el hero: quitar o reemplazar por matrícula real.
7. **Matrícula visible** en bio/footer.
8. **Badge "Atendiendo consultas"**: es estático; quitar o hacer dinámico.

## Pendiente — Prioridad 3 (pulido visual/UX)
9. **Foto de la bio:** revisar recorte (`object-position`) y que la tarjeta inferior no tape la cara.
10. **"Sobre mí" vs "Sobre nosotros"** en nav, footer, bio y site-links.
11. **Jerarquía de cards del hero:** unificar tamaño entre valores numéricos y frases.
12. **Contraste:** revisar `text-slate-500/600` sobre fondo oscuro (footer y notas).
13. **CTA largo del hero en mobile:** verificar que no rompa mal.
14. **Agregar `/privacidad` al sitemap** (opcional, recomendable).
15. **Estrellas:** si el cliente las quiere, agregar campo `calificacion` al modelo `Comentario` y migración.

## Datos que necesito del cliente
- Dirección completa y CP.
- Coordenadas, si quiere mapa.
- Redes sociales oficiales.
- Email profesional y matrícula.
- Validación del texto de privacidad.
- Decisión sobre sello, testimonios de prueba y "Atendiendo consultas".

## Archivos clave para retomar
- Datos del sitio: `lib/site.js`
- Home/JSON-LD/ISR: `app/page.js`
- Moderación: `app/admin/(panel)/actions.js`
- Testimonios: `app/page.js`, `components/landing/Testimonials.js`, `prisma/seed.js`, `prisma/schema.prisma`
- Privacidad: `app/privacidad/page.js`
- Formulario: `components/FormularioTestimonio.js`, `app/api/comentarios/route.js`
- Estilos: `app/globals.css`
- Navbar/Footer: `components/landing/Navbar.js`, `components/landing/Footer.js`

## Verificación al retomar
```bash
npm run lint
npm run build
```

Confirmar también:
- Home se revalida al aprobar/rechazar/eliminar un comentario.
- `/admin` sigue con `noindex`.
- `/privacidad` responde 200 y tiene canonical.
- Escape en menú mobile cierra y devuelve foco.
