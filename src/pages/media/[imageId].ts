import type { APIRoute } from 'astro';

/**
 * Sirve las fotos que administra el dashboard.
 *
 * El navegador del visitante no puede pedirlas directo al backend: haría falta
 * el secreto compartido, y un secreto que viaja al navegador deja de serlo. Así
 * que pasan por acá, que sí lo tiene.
 *
 * Las respuestas se guardan en memoria porque el mismo puñado de fotos se pide
 * en cada visita y salen de la base: sin esto, cada carga de la página serían
 * veinte consultas de bytes contra Postgres.
 */

/** Suficiente para todas las fotos del sitio con margen de sobra. */
const MAX_CACHE_BYTES = 64 * 1024 * 1024;
const ONE_YEAR = 31536000;

type Entry = { body: ArrayBuffer; contentType: string };

const cache = new Map<string, Entry>();
let cachedBytes = 0;

function remember(key: string, entry: Entry) {
  // Desalojo simple por orden de llegada: el Map de JS preserva el orden de
  // inserción, así que el primero es el más viejo. Con veinte fotos no llega a
  // usarse nunca; está para que un sitio que crezca no se coma la memoria.
  while (cachedBytes + entry.body.byteLength > MAX_CACHE_BYTES && cache.size > 0) {
    const oldest = cache.keys().next().value as string;
    cachedBytes -= cache.get(oldest)!.body.byteLength;
    cache.delete(oldest);
  }

  cache.set(key, entry);
  cachedBytes += entry.body.byteLength;
}

export const GET: APIRoute = async ({ params, url }) => {
  const imageId = params.imageId;

  if (!imageId) {
    return new Response('No encontrado', { status: 404 });
  }

  const apiUrl = process.env.SITE_API_URL;
  const token = process.env.SITE_API_TOKEN;
  const siteKey = process.env.SITE_KEY ?? 'golden-bird';

  if (!apiUrl || !token) {
    return new Response('El sitio no tiene backend configurado.', { status: 503 });
  }

  // La versión entra en la clave: reemplazar una foto genera una URL distinta,
  // así que lo cacheado nunca queda viejo.
  const key = `${imageId}@${url.searchParams.get('v') ?? ''}`;
  const hit = cache.get(key);

  if (hit) {
    return new Response(hit.body, {
      headers: {
        'content-type': hit.contentType,
        'cache-control': `public, max-age=${ONE_YEAR}, immutable`,
        'x-media-cache': 'hit',
      },
    });
  }

  try {
    const response = await fetch(
      `${apiUrl.replace(/\/$/, '')}/api/site/${siteKey}/images/${imageId}`,
      { headers: { 'x-site-token': token }, signal: AbortSignal.timeout(5000) },
    );

    if (!response.ok) {
      return new Response('No encontrada', { status: response.status === 404 ? 404 : 502 });
    }

    const body = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') ?? 'application/octet-stream';
    remember(key, { body, contentType });

    return new Response(body, {
      headers: {
        'content-type': contentType,
        'cache-control': `public, max-age=${ONE_YEAR}, immutable`,
        'x-media-cache': 'miss',
      },
    });
  } catch (error) {
    console.error(`[media] No se pudo traer la foto ${imageId}:`, error);
    return new Response('No disponible', { status: 502 });
  }
};
