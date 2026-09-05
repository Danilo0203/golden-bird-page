import { SEED_DOCUMENT, SEED_IMAGES } from '../data/seed';
import { sitePayloadSchema, type SiteDocument, type SitePayload } from './site-schema';

/**
 * De dónde sale el contenido de la página, en orden de preferencia.
 *
 * Con el sitio renderizando en cada visita, una caída de la API dejaría de ser
 * un problema del dashboard para pasar a ser una página rota. Por eso hay una
 * cadena de respaldo y no un solo intento: contenido fresco, si no el último
 * que sirvió, si no el que viene incrustado en el repo. Nunca un error.
 */
export type ContentSource = 'api' | 'cache' | 'seed';

/** Cuánto vale la pena reusar una respuesta antes de volver a pedirla. */
const TTL_MS = 60_000;
/** Si la API falla, no la castigamos en cada visita. */
const RETRY_AFTER_ERROR_MS = 10_000;

export type ResolvedImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type SiteContent = {
  document: SiteDocument;
  /** Las fotos ya resueltas a una URL servible; los componentes no saben de dónde salen. */
  images: Map<string, ResolvedImage>;
  source: ContentSource;
};

let cached: { payload: SitePayload; at: number } | null = null;
let lastError: { at: number; message: string } | null = null;

/**
 * Se lee de `process.env` y no de `import.meta.env` porque este es un servidor
 * de verdad: `import.meta.env` se resuelve al construir, y en Railway las
 * variables las inyecta el contenedor al arrancar.
 */
function config() {
  return {
    apiUrl: process.env.SITE_API_URL,
    token: process.env.SITE_API_TOKEN,
    siteKey: process.env.SITE_KEY ?? 'golden-bird',
  };
}

/** Tira la caché para que la próxima visita traiga lo recién publicado. */
export function invalidateSiteContent() {
  cached = null;
  lastError = null;
}

async function fetchPayload(): Promise<SitePayload> {
  const { apiUrl, token, siteKey } = config();

  if (!apiUrl || !token) {
    throw new Error('SITE_API_URL o SITE_API_TOKEN no están definidas.');
  }

  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/api/site/${siteKey}`, {
    headers: { 'x-site-token': token },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`La API respondió ${response.status}.`);
  }

  const parsed = sitePayloadSchema.safeParse(await response.json());

  if (!parsed.success) {
    // Casi siempre significa que los dos repos quedaron desfasados. Servir el
    // respaldo es mejor que renderizar medio sitio con campos faltantes.
    throw new Error(`El documento recibido no coincide con el esquema: ${parsed.error.issues[0]?.message}`);
  }

  return parsed.data;
}

function fromPayload(payload: SitePayload, source: ContentSource): SiteContent {
  const images = new Map<string, ResolvedImage>();

  for (const image of payload.images) {
    images.set(image.id, {
      // La URL lleva la marca de tiempo para que reemplazar una foto genere una
      // dirección distinta y el navegador no siga mostrando la anterior.
      src: `/media/${image.id}?v=${encodeURIComponent(image.updatedAt)}`,
      width: image.width,
      height: image.height,
      alt: image.alt,
    });
  }

  return { document: payload.document, images, source };
}

function fromSeed(): SiteContent {
  const images = new Map<string, ResolvedImage>();

  for (const image of SEED_IMAGES) {
    // Los archivos del respaldo se sirven estáticos: no pasan por `/media`,
    // que necesitaría justamente la API que no está respondiendo.
    images.set(image.id, {
      src: `/fallback/${image.file}`,
      width: image.width,
      height: image.height,
      alt: image.alt,
    });
  }

  return { document: SEED_DOCUMENT, images, source: 'seed' };
}

export async function getSiteContent(): Promise<SiteContent> {
  const { apiUrl, token } = config();

  // Sin API configurada es desarrollo local: el respaldo es el contenido.
  if (!apiUrl || !token) {
    return fromSeed();
  }

  const now = Date.now();

  if (cached && now - cached.at < TTL_MS) {
    return fromPayload(cached.payload, 'cache');
  }

  if (lastError && now - lastError.at < RETRY_AFTER_ERROR_MS && cached) {
    return fromPayload(cached.payload, 'cache');
  }

  try {
    const payload = await fetchPayload();
    cached = { payload, at: now };
    lastError = null;
    return fromPayload(payload, 'api');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    lastError = { at: now, message };
    console.error(`[sitio] No se pudo traer el contenido: ${message}`);

    // Lo último que sirvió sigue siendo mejor que el respaldo del repo, que
    // puede tener meses.
    if (cached) {
      return fromPayload(cached.payload, 'cache');
    }

    return fromSeed();
  }
}

/** Busca una foto ya resuelta; nunca rompe el render si falta. */
export function image(content: SiteContent, imageId: string): ResolvedImage {
  return (
    content.images.get(imageId) ?? {
      src: '',
      width: 1,
      height: 1,
      alt: '',
    }
  );
}
