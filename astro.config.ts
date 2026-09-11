import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// El servidor lee su configuración de `process.env`, que es lo que hay en
// Railway. En desarrollo no hay nadie que la inyecte: Astro carga el `.env` en
// `import.meta.env` y deja `process.env` vacío, así que sin esto el sitio local
// no encuentra el backend y sirve el respaldo sin decir por qué. Node no pisa
// las variables que ya existen, así que en Railway esto no hace nada (ahí ni
// siquiera hay archivo).
try {
  process.loadEnvFile();
} catch {
  // Sin `.env` no hay nada que cargar; es el caso normal en producción.
}

// https://astro.build/config
export default defineConfig({
  // El contenido lo administra el dashboard y se publica sin volver a
  // desplegar, así que la página se arma en cada visita (con caché) en vez de
  // en el build.
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: {
    // El adapter escucha en `localhost` si no se le dice otra cosa, y ahí el
    // proxy de Railway no lo alcanza. Va acá y no en una variable de entorno
    // para que no dependa de que alguien se acuerde de ponerla.
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
