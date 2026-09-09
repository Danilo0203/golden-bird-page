import type { APIRoute } from 'astro';

import { getSiteContent } from '../../lib/site-content';

/**
 * Qué está sirviendo el sitio en este momento.
 *
 * Existe para que el dashboard pueda esperar a que una publicación llegue de
 * verdad hasta acá, en vez de mostrar un «esperá un minuto» y dejar a quien
 * publica sin saber si funcionó.
 *
 * Consultarlo también empuja la actualización: si la caché ya venció, esta
 * misma llamada trae el contenido nuevo. Así el dashboard, al preguntar, hace
 * que la respuesta se vuelva cierta.
 */
export const GET: APIRoute = async ({ request }) => {
  const expected = process.env.SITE_REVALIDATE_TOKEN;

  if (!expected) {
    return new Response('No configurado', { status: 503 });
  }

  if (request.headers.get('x-revalidate-token') !== expected) {
    return new Response('No autorizado', { status: 401 });
  }

  const content = await getSiteContent();

  return Response.json({
    publishedAt: content.publishedAt,
    source: content.source,
  });
};
