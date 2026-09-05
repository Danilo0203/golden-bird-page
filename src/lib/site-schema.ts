import { z } from 'zod';

/**
 * Espejo del esquema que el backend usa para guardar el documento
 * (`src/modules/website/document.ts` en sgn-back).
 *
 * Está duplicado a propósito: son dos repos que se despliegan por separado, y
 * si uno se adelanta al otro conviene que el sitio lo note y caiga a su
 * respaldo, en vez de renderizar un documento que no entiende. `version` es lo
 * que hace visible esa divergencia.
 *
 * Si cambia el esquema del backend, este archivo cambia con él.
 */

export const SITE_DOCUMENT_VERSION = 1;

/**
 * Acentos de color como enum cerrado, no como color libre.
 *
 * El sitio guardaba clases arbitrarias de Tailwind (`bg-[#edf6ed]`) dentro de
 * los datos, y eso solo funcionaba porque el literal estaba escrito en un
 * archivo que Tailwind escanea. Un color elegido desde el dashboard no genera
 * CSS. Con un enum, el mapa a clases vive en el código del sitio y Tailwind
 * sigue viendo literales.
 */
export const SITE_ACCENTS = [
  "verde",
  "arena",
  "durazno",
  "miel",
  "piedra",
  "lila",
  "rosa",
  "cielo",
] as const;

export type SiteAccent = (typeof SITE_ACCENTS)[number];

const accentSchema = z.enum(SITE_ACCENTS);

const imageIdSchema = z.string().uuid();

/** Texto visible: se recorta y no puede quedar vacío. */
const line = (max: number) => z.string().trim().min(1).max(max);
/** Texto visible opcional: ausente o con contenido, nunca cadena vacía. */
const optionalLine = (max: number) => line(max).optional();

/** Ancla interna del menú de una sola página: `#aves`. */
const anchorSchema = z
  .string()
  .trim()
  .regex(/^#[a-z0-9-]+$/, "El ancla debe verse como #seccion.");

/** Identificador estable de un ítem dentro de su colección. */
const itemIdSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9][a-z0-9-]{0,47}$/, "El identificador solo admite minúsculas, números y guiones.");

/**
 * Los títulos del sitio son de dos partes: una entrada y un remate resaltado
 * («Pequeñas aves.» / «Grandes personalidades.»). El componente les da estilos
 * distintos, así que llegan separadas en vez de con marcado adentro del texto.
 * El remate es opcional porque no todos los títulos lo tienen.
 */
const headlineSchema = z.object({
  lead: line(120),
  highlight: optionalLine(120),
});

const navItemSchema = z.object({
  label: line(40),
  anchor: anchorSchema,
});

const heroSchema = z.object({
  eyebrow: line(80),
  title: headlineSchema,
  subtitle: line(400),
  ctaLabel: line(40),
  ctaAnchor: anchorSchema,
  /** La nota al pie del hero, con el mismo corte que los títulos. */
  note: headlineSchema.optional(),
  /** El pie de la foto del medio del collage. */
  caption: optionalLine(80),
  /** El globito decorativo sobre el collage: «PEQUEÑAS AVES / grandes alegrías». */
  badge: headlineSchema.optional(),
  /**
   * Exactamente tres: el collage tiene CSS propio por ranura (blob, rotación,
   * offset). Cambiar la cantidad es un cambio de diseño, no de contenido.
   */
  photos: z.array(z.object({ imageId: imageIdSchema })).length(3),
});

const petSchema = z.object({
  id: itemIdSchema,
  name: line(60),
  detail: line(120),
  imageId: imageIdSchema,
});

const birdSchema = z.object({
  id: itemIdSchema,
  name: line(60),
  scientific: line(80),
  number: line(4),
  description: line(400),
  imageId: imageIdSchema,
});

/** Precio con moneda adentro (`Q85.00`), como lo escribe hoy el sitio. */
const priceSchema = line(20);

const foodSchema = z.object({
  id: itemIdSchema,
  name: line(120),
  kind: line(60),
  description: line(400),
  price: priceSchema,
  originalPrice: priceSchema.optional(),
  rating: line(4),
  reviewsCount: z.number().int().min(0).max(100000).optional(),
  badge: optionalLine(40),
  weight: line(40),
  accent: accentSchema,
  imageId: imageIdSchema,
});

const catalogFilterSchema = z.object({
  id: itemIdSchema,
  label: line(40),
});

const catalogProductSchema = z.object({
  id: itemIdSchema,
  name: line(120),
  /** Se validan contra `filters` al parsear. */
  categories: z.array(itemIdSchema).min(1).max(8),
  price: priceSchema,
  originalPrice: priceSchema.optional(),
  tag: optionalLine(40),
  accent: accentSchema,
  imageId: imageIdSchema,
});

/**
 * Cada sección declara los campos que su diseño realmente muestra.
 *
 * No hay un encabezado común: «Alimentos» y «Productos» no tienen antetítulo ni
 * bajada, y «Cierre» no tiene bajada. Darles los campos igual llenaría el
 * formulario de casillas que no se ven en ningún lado.
 */
export const siteDocumentSchema = z.object({
  version: z.literal(SITE_DOCUMENT_VERSION),
  seo: z.object({
    title: line(120),
    description: line(320),
  }),
  nav: z.object({
    items: z.array(navItemSchema).min(1).max(10),
  }),
  hero: heroSchema,
  categories: z.object({
    items: z.array(navItemSchema).min(1).max(10),
  }),
  pets: z.object({
    eyebrow: line(80),
    title: headlineSchema,
    description: line(400),
    items: z.array(petSchema).min(1).max(12),
  }),
  about: z.object({
    eyebrow: line(80),
    title: headlineSchema,
    description: line(600),
    logoImageId: imageIdSchema,
  }),
  birds: z.object({
    eyebrow: line(80),
    title: headlineSchema,
    description: line(400),
    items: z.array(birdSchema).min(1).max(12),
  }),
  foods: z.object({
    title: headlineSchema,
    /** El cartelito sobre la foto destacada: «¡A comer, pequeño!». */
    caption: optionalLine(80),
    featuredImageId: imageIdSchema,
    items: z.array(foodSchema).min(1).max(24),
  }),
  products: z.object({
    title: headlineSchema,
    filters: z.array(catalogFilterSchema).min(1).max(12),
    items: z.array(catalogProductSchema).min(1).max(60),
  }),
  closing: z.object({
    eyebrow: line(80),
    title: headlineSchema,
  }),
  footer: z.object({
    tagline: line(160),
  }),
});

export type SiteDocument = z.infer<typeof siteDocumentSchema>;

/** Lo que el backend devuelve en `GET /api/site/:siteKey`. */
export const sitePayloadSchema = z.object({
  siteKey: z.string(),
  publishedAt: z.string(),
  document: siteDocumentSchema,
  images: z.array(
    z.object({
      id: z.string(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      alt: z.string(),
      updatedAt: z.string(),
    }),
  ),
});

export type SitePayload = z.infer<typeof sitePayloadSchema>;
export type SiteImage = SitePayload['images'][number];

/** Atajos para los componentes, derivados del documento. */
export type SiteBird = SiteDocument['birds']['items'][number];
export type SitePet = SiteDocument['pets']['items'][number];
export type SiteFood = SiteDocument['foods']['items'][number];
export type SiteProduct = SiteDocument['products']['items'][number];
export type SiteHeadline = SiteDocument['closing']['title'];
