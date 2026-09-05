import type { SiteAccent } from './site-schema';

/**
 * Los colores de acento de las tarjetas, escritos como literales.
 *
 * El sitio guardaba estas clases dentro de los datos (`accentBg: 'bg-[#edf6ed]'`)
 * y funcionaba solo porque el literal estaba en un archivo que Tailwind
 * escanea. Con el contenido en la base eso deja de ser cierto: un color
 * elegido desde el dashboard no generaría CSS. Por eso el documento guarda un
 * nombre y la traducción a clases vive acá, donde Tailwind sí la ve.
 *
 * Los seis primeros son los colores que las tarjetas ya tenían.
 */
export const ACCENTS: Record<SiteAccent, { bg: string; border: string }> = {
  verde: { bg: 'bg-[#edf6ed]', border: 'border-[#cde5ca]' },
  arena: { bg: 'bg-[#fcf2e0]', border: 'border-[#ebd4ad]' },
  durazno: { bg: 'bg-[#f6e6dc]', border: 'border-[#eacbbc]' },
  miel: { bg: 'bg-[#fdf3e5]', border: 'border-[#f2d5b6]' },
  piedra: { bg: 'bg-[#f0ede6]', border: 'border-[#dcd5c8]' },
  lila: { bg: 'bg-[#f3eef8]', border: 'border-[#dfd3ee]' },
  rosa: { bg: 'bg-[#fdeeee]', border: 'border-[#f5d9d9]' },
  cielo: { bg: 'bg-[#e3f2fd]', border: 'border-[#c6e0f5]' },
};

export function accent(name: SiteAccent) {
  return ACCENTS[name] ?? ACCENTS.verde;
}
