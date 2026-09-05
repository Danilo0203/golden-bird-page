import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

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
