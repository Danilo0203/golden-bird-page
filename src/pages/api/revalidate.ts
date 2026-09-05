import type { APIRoute } from 'astro';

import { invalidateSiteContent } from '../../lib/site-content';

/**
 * El backend avisa por acá que se publicó contenido nuevo.
 *
 * Es un atajo, no un requisito: la caché vence sola en un minuto, así que si
 * esto no llega el cambio aparece igual, apenas más tarde. Por eso el backend
 * tampoco falla la publicación cuando no puede avisar.
 */
export const POST: APIRoute = async ({ request }) => {
  const expected = process.env.SITE_REVALIDATE_TOKEN;

  if (!expected) {
    return new Response('No configurado', { status: 503 });
  }

  if (request.headers.get('x-revalidate-token') !== expected) {
    return new Response('No autorizado', { status: 401 });
  }

  invalidateSiteContent();

  return Response.json({ revalidated: true });
};
