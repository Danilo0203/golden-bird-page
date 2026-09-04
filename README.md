# Golden Bird

Sitio estático construido con Astro, TypeScript, Tailwind CSS y GSAP.

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
├── data/                   # Datos y contratos TypeScript
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
- Los datos estáticos y sus tipos se mantienen en `src/data/`.
- El código que usa APIs del navegador se mantiene en `src/scripts/`.

## Comandos

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
```

`pnpm build` ejecuta primero la comprobación de TypeScript y después genera el sitio estático en `dist/`.
