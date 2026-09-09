# Golden Bird

Sitio de Golden Bird, construido con Astro, TypeScript, Tailwind CSS y GSAP.

El contenido —textos y fotos— **no vive en este repo**: lo administra el dueño
desde el dashboard (`sgn-front`) y se guarda en el backend (`sgn-back`). El
sitio lo lee en cada visita, con caché, así que publicar desde el dashboard se
ve en el momento y no hace falta volver a desplegar.

Por eso renderiza en el servidor (`output: 'server'` con `@astrojs/node`) y no
como sitio estático.

## Estructura

```text
src/
├── components/
│   ├── common/             # Componentes visuales reutilizables
│   ├── layout/             # Header, footer y elementos globales
│   └── sections/           # Secciones agrupadas por página o dominio
│       ├── about/
│       ├── birds/
│       ├── catalog/
│       ├── categories/
│       ├── closing/
│       ├── food/
│       ├── hero/
│       ├── pets/
│       └── products/
├── data/                   # Respaldo del contenido (generado, no se edita a mano)
├── lib/                    # Carga del contenido, esquema y acentos
├── layouts/                # Estructura compartida entre páginas
├── pages/                  # Rutas públicas de Astro
├── scripts/                # Comportamiento del navegador
└── styles/                 # Estilos globales y Tailwind
```

Los archivos estáticos que no necesitan procesamiento viven en `public/`.

## Convenciones para crecer

- Cada página nueva se crea dentro de `src/pages/`.
- Las páginas deben componer componentes; no deben concentrar todo el HTML.
- Las secciones propias de una página se agrupan en `src/components/sections/<seccion>/`.
- Los componentes reutilizables entre varias páginas van en `src/components/common/`.
- La estructura compartida del sitio va en `src/components/layout/` y `src/layouts/`.
- El contenido llega del backend; `src/data/seed.ts` es solo su respaldo.
- `src/lib/site-schema.ts` es el espejo del esquema del backend: si allá cambia,
  acá también.
- El código que usa APIs del navegador se mantiene en `src/scripts/`.

## Comandos

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
```

`pnpm build` ejecuta primero la comprobación de TypeScript y después genera el
servidor en `dist/`. `pnpm start` lo levanta (`node ./dist/server/entry.mjs`).

## De dónde saca el contenido

| Variable | Para qué |
|---|---|
| `SITE_API_URL` | URL pública del backend. La usa el servidor del sitio, nunca el navegador. |
| `SITE_API_TOKEN` | Secreto compartido con el backend para leer el contenido publicado. |
| `SITE_KEY` | Qué sitio pedir. Para esta página, `golden-bird`. |
| `SITE_REVALIDATE_TOKEN` | Con qué secreto el backend avisa que hay contenido nuevo. |

**Sin `SITE_API_URL` ni `SITE_API_TOKEN`, el sitio funciona igual** y renderiza
el respaldo de `src/data/seed.ts`. Es lo que permite trabajar en el diseño sin
levantar el backend.

En producción hay una cadena de respaldo, en este orden: contenido fresco, el
último que sirvió, y el del repo. Una caída del backend no deja la página rota.

En desarrollo, copiá `.env.example` a `.env` y reiniciá `pnpm dev`. El servidor
lee `process.env`, que es lo que inyecta Railway; Astro por su cuenta solo carga
el `.env` en `import.meta.env`, así que `astro.config.ts` lo pasa a `process.env`
al arrancar. `pnpm start` no pasa por ese archivo de configuración: para probar
el modo producción en local, exportá las variables antes de levantarlo.

Para saber qué está sirviendo el sitio en este momento:

```sh
curl -H "x-revalidate-token: $SITE_REVALIDATE_TOKEN" localhost:4321/api/status
```

Responde con la fecha de la publicación que tiene en mano y de dónde salió:
`api` (recién traída), `cache` (la última buena) o `seed` (el respaldo del repo).
Si dice `seed` teniendo el backend arriba, el sitio no lo está alcanzando.

## Despliegue (Railway)

El servicio ya existe y está conectado a este repo. Al pasar de estático a
servidor hay que ajustarlo:

1. **Start command**: `pnpm start`. El build sigue siendo `pnpm build`.
2. Cargar las cuatro variables de arriba.
3. En el servicio del backend, cargar `SITE_API_TOKEN` (el mismo valor),
   `SITE_REVALIDATE_URL` (la URL pública de este sitio + `/api/revalidate`) y
   `SITE_REVALIDATE_TOKEN` (el mismo valor).

Los dos secretos van en direcciones opuestas: `SITE_API_TOKEN` protege
sitio → backend, `SITE_REVALIDATE_TOKEN` protege backend → sitio. El de
revalidación es opcional: sin él, publicar tarda hasta un minuto en verse.
