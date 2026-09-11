import type { SiteDocument, SiteImage } from '../lib/site-schema';

/**
 * La página tal como está publicada hoy, incrustada en el propio sitio.
 *
 * Cumple dos papeles:
 *
 *  1. Desarrollo local sin backend: `pnpm dev` sin `SITE_API_URL` renderiza
 *     esto y la página se ve completa.
 *  2. Respaldo en producción: si la API no responde y la caché está vacía —un
 *     arranque en frío justo durante una caída— la página se sirve igual, con
 *     texto y fotos, en vez de devolver un error. Las fotos salen de
 *     `public/fallback`, que son los mismos archivos que se cargaron a la base.
 *
 * Generado desde el documento publicado; no se edita a mano. Para regenerarlo,
 * volver a volcar `published` de `website_content`.
 */

export const SEED_DOCUMENT: SiteDocument = {
  "nav": {
    "items": [
      {
        "label": "Inicio",
        "anchor": "#inicio"
      },
      {
        "label": "Mascotas",
        "anchor": "#mascotas"
      },
      {
        "label": "Nosotros",
        "anchor": "#nosotros"
      },
      {
        "label": "Aves",
        "anchor": "#aves"
      },
      {
        "label": "Alimentos",
        "anchor": "#alimentos"
      },
      {
        "label": "Productos",
        "anchor": "#productos"
      }
    ]
  },
  "seo": {
    "title": "Golden Bird — Aves, mascotas y más",
    "description": "Conoce el mundo de Golden Bird: aves de compañía, alimentos, jaulas y accesorios para tus mascotas."
  },
  "hero": {
    "note": {
      "lead": "Pequeñas compañías.",
      "highlight": "Grandes momentos."
    },
    "badge": {
      "lead": "PEQUEÑAS AVES",
      "highlight": "grandes alegrías"
    },
    "title": {
      "lead": "La alegría tiene",
      "highlight": "alas."
    },
    "photos": [
      {
        "imageId": "657fc97a-9d74-5fe9-8d85-f7be7c13af4b"
      },
      {
        "imageId": "6e977703-7976-51f9-bb37-4efe2b450c76"
      },
      {
        "imageId": "c8e778b6-1ac2-5255-8a23-a820f34aeaea"
      }
    ],
    "caption": "¡En buena compañía!",
    "eyebrow": "BIENVENIDO A GOLDEN BIRD",
    "ctaLabel": "Encuentra tu inspiración",
    "subtitle": "Aves, mascotas y todo lo que necesitas para llenar su mundo de bienestar.",
    "ctaAnchor": "#aves"
  },
  "pets": {
    "items": [
      {
        "id": "aves",
        "name": "Aves",
        "detail": "Plumas y personalidad",
        "imageId": "657fc97a-9d74-5fe9-8d85-f7be7c13af4b"
      },
      {
        "id": "perros",
        "name": "Perros",
        "detail": "Compañeros de aventuras",
        "imageId": "b8c06046-179f-5f90-af16-859f9cc7853d"
      },
      {
        "id": "gatos",
        "name": "Gatos",
        "detail": "Curiosidad y compañía",
        "imageId": "9a77780f-cd2c-5e7b-a8a4-cbd5a1940bce"
      },
      {
        "id": "conejos",
        "name": "Conejos",
        "detail": "Pequeños y encantadores",
        "imageId": "2a8a01bc-ce2d-572b-9490-bec54b2fd6e5"
      },
      {
        "id": "hamsteres",
        "name": "Hámsteres",
        "detail": "Un pequeño gran mundo",
        "imageId": "9b02912b-41bb-5f5e-9440-f421b1cbc064"
      }
    ],
    "title": {
      "lead": "Pequeños, grandes.",
      "highlight": "Todos especiales."
    },
    "eyebrow": "CADA COMPAÑERO TIENE SU MUNDO",
    "description": "Un vistazo al mundo de las mascotas y sus diferentes personalidades."
  },
  "about": {
    "title": {
      "lead": "Una compañía pequeña.",
      "highlight": "Un lugar enorme en tu vida."
    },
    "eyebrow": "EL MUNDO GOLDEN BIRD",
    "description": "En Golden Bird compartimos el gusto por las aves y las mascotas. Reunimos aves, alimentos, jaulas y accesorios para acompañarte en los detalles de cada día.",
    "logoImageId": "b951bb2e-51eb-51ba-907e-f788d8843cab"
  },
  "birds": {
    "items": [
      {
        "id": "periquitos",
        "name": "Periquitos",
        "number": "01",
        "imageId": "657fc97a-9d74-5fe9-8d85-f7be7c13af4b",
        "scientific": "Melopsittacus undulatus",
        "description": "Pequeños, sociables y llenos de color. Una presencia alegre que convierte los días en compañía."
      },
      {
        "id": "ninfas",
        "name": "Ninfas",
        "number": "02",
        "imageId": "c8e778b6-1ac2-5255-8a23-a820f34aeaea",
        "scientific": "Nymphicus hollandicus",
        "description": "Una cresta inconfundible y mucha personalidad. Aves curiosas que disfrutan explorar e interactuar."
      },
      {
        "id": "agapornis",
        "name": "Agapornis",
        "number": "03",
        "imageId": "6e977703-7976-51f9-bb37-4efe2b450c76",
        "scientific": "Agapornis",
        "description": "Colores intensos y energía en pequeño formato. Compañeros activos con un carácter muy especial."
      }
    ],
    "title": {
      "lead": "Pequeñas aves.",
      "highlight": "Grandes personalidades."
    },
    "eyebrow": "UN MUNDO POR DESCUBRIR",
    "description": "Conoce algunas aves de compañía y descubre qué las hace especiales."
  },
  "foods": {
    "items": [
      {
        "id": "mezcla-suprema",
        "kind": "SEMILLAS SELECTAS",
        "name": "Mezcla de Semillas Suprema",
        "badge": "Popular",
        "price": "Q85.00",
        "accent": "verde",
        "rating": "5.0",
        "weight": "500g",
        "imageId": "58c9ae04-d8db-583f-aea4-6962c8a5ee9d",
        "description": "Alpiste, mijo y cereales seleccionados para periquitos y canarios.",
        "reviewsCount": 28,
        "originalPrice": "Q110.00"
      },
      {
        "id": "pellets-vita-plus",
        "kind": "ALIMENTO COMPLETO",
        "name": "Pellets Nutricionales Vita-Plus",
        "badge": "Recomendado",
        "price": "Q145.00",
        "accent": "arena",
        "rating": "5.0",
        "weight": "750g",
        "imageId": "2115a876-58c5-57be-bce9-a2f1dc2b5737",
        "description": "Fórmula extrusionada rica en vitaminas y minerales esenciales.",
        "reviewsCount": 34,
        "originalPrice": "Q180.00"
      },
      {
        "id": "mijo-dorado",
        "kind": "COMPLEMENTO NATURAL",
        "name": "Mijo Dorado en Espiga",
        "badge": "100% Natural",
        "price": "Q65.00",
        "accent": "durazno",
        "rating": "5.0",
        "weight": "Pack 5 uds",
        "imageId": "db40e135-b434-5fe0-81f0-4c163a730199",
        "description": "Espigas naturales cultivadas al sol para picotear y entretenerse.",
        "reviewsCount": 42,
        "originalPrice": "Q85.00"
      },
      {
        "id": "semillas-fruta",
        "kind": "ENERGÍA Y SABOR",
        "name": "Semillas con Fruta Deshidratada",
        "badge": "Oferta",
        "price": "Q120.00",
        "accent": "miel",
        "rating": "4.9",
        "weight": "600g",
        "imageId": "58c9ae04-d8db-583f-aea4-6962c8a5ee9d",
        "description": "Con trocitos de manzana, plátano y semillas para el plumaje.",
        "reviewsCount": 19,
        "originalPrice": "Q155.00"
      },
      {
        "id": "pellets-mantenimiento",
        "kind": "FÓRMULA BALANCEADA",
        "name": "Pellets de Mantenimiento Aviar",
        "badge": "Premium",
        "price": "Q160.00",
        "accent": "verde",
        "rating": "5.0",
        "weight": "1 kg",
        "imageId": "2115a876-58c5-57be-bce9-a2f1dc2b5737",
        "description": "Aporte controlado de grasas para ninfas, agapornis y cotorras.",
        "reviewsCount": 23,
        "originalPrice": "Q195.00"
      },
      {
        "id": "espigas-silvestres",
        "kind": "FORRAJE Y ACTIVIDAD",
        "name": "Espigas Campestres Silvestres",
        "badge": "Especial",
        "price": "Q75.00",
        "accent": "piedra",
        "rating": "4.8",
        "weight": "Pack 8 uds",
        "imageId": "db40e135-b434-5fe0-81f0-4c163a730199",
        "description": "Complemento tradicional para mantener el pico sano y activo.",
        "reviewsCount": 16,
        "originalPrice": "Q95.00"
      }
    ],
    "title": {
      "lead": "Un mundo de sabor",
      "highlight": "para tus aves."
    },
    "caption": "¡A comer, pequeño!",
    "featuredImageId": "150138f4-669f-5eaa-8b17-4b23c0b2fd19"
  },
  "footer": {
    "tagline": "Aves, mascotas y más."
  },
  "closing": {
    "title": {
      "lead": "La vida se disfruta",
      "highlight": "en buena compañía."
    },
    "eyebrow": "AVES, MASCOTAS Y MÁS"
  },
  "version": 1,
  recentProducts: { title: { lead: "Productos recién agregados" }, items: [] },
  "products": {
    "items": [
      {
        "id": "prod-1",
        "tag": "Popular",
        "name": "Arnés Ajustable Confort Canino",
        "price": "Q120.00",
        "accent": "rosa",
        "imageId": "de725f0c-2f75-5355-a38e-a5b51911c56d",
        "categories": [
          "accessories"
        ],
        "originalPrice": "Q200.00"
      },
      {
        "id": "prod-2",
        "tag": "Destacado",
        "name": "Alimento Seco Premium Canino",
        "price": "Q240.00",
        "accent": "verde",
        "imageId": "c5fb8e26-0896-5b4b-ae7a-c0eaeace6b12",
        "categories": [
          "dog-food",
          "dry-food"
        ],
        "originalPrice": "Q295.00"
      },
      {
        "id": "prod-3",
        "tag": "Nuevo",
        "name": "Transportadora Pet Taxi de Viaje",
        "price": "Q310.00",
        "accent": "cielo",
        "imageId": "3c6fad68-ca80-518a-bb27-a404d9b9cd8f",
        "categories": [
          "accessories"
        ],
        "originalPrice": "Q385.00"
      },
      {
        "id": "prod-4",
        "tag": "Oferta",
        "name": "Mezcla Silvestre Especial Aves",
        "price": "Q95.00",
        "accent": "durazno",
        "imageId": "9baec54e-677b-5022-a2d2-cd207121cdf1",
        "categories": [
          "bird-food",
          "dry-food"
        ],
        "originalPrice": "Q130.00"
      },
      {
        "id": "prod-5",
        "tag": "Gourmet",
        "name": "Alimento Húmedo Gourmet Salmón",
        "price": "Q35.00",
        "accent": "miel",
        "imageId": "b4ba461a-a5d1-5b5a-a6d1-0138885249df",
        "categories": [
          "cat-food"
        ],
        "originalPrice": "Q50.00"
      },
      {
        "id": "prod-6",
        "tag": "Top Ventas",
        "name": "Comedero Antiderrame Acero Lunares",
        "price": "Q85.00",
        "accent": "lila",
        "imageId": "200961f3-3fa2-5639-b13f-b15876b6cf29",
        "categories": [
          "accessories"
        ],
        "originalPrice": "Q115.00"
      },
      {
        "id": "prod-7",
        "tag": "Salud",
        "name": "Multivitamínico Canino Esencial",
        "price": "Q165.00",
        "accent": "verde",
        "imageId": "42f47d43-3247-5266-9ee5-cc6fa548407c",
        "categories": [
          "dog-food"
        ],
        "originalPrice": "Q210.00"
      },
      {
        "id": "prod-8",
        "tag": "Natural",
        "name": "Bocaditos Horneados Naturales",
        "price": "Q65.00",
        "accent": "verde",
        "imageId": "0b9f4ea0-ca95-5c70-8f7e-577bc3a16973",
        "categories": [
          "dog-food",
          "cat-food",
          "dry-food"
        ],
        "originalPrice": "Q90.00"
      }
    ],
    "title": {
      "lead": "Productos disponibles"
    },
    "filters": [
      {
        "id": "all",
        "label": "Todos"
      },
      {
        "id": "dog-food",
        "label": "Comida de Perros"
      },
      {
        "id": "cat-food",
        "label": "Comida de Gatos"
      },
      {
        "id": "bird-food",
        "label": "Comida de Aves"
      },
      {
        "id": "dry-food",
        "label": "Alimento Seco"
      },
      {
        "id": "accessories",
        "label": "Accesorios"
      }
    ]
  },
  "categories": {
    "items": [
      {
        "label": "Aves de compañía",
        "anchor": "#aves"
      },
      {
        "label": "Alimentos",
        "anchor": "#alimentos"
      },
      {
        "label": "Jaulas y accesorios",
        "anchor": "#productos"
      }
    ]
  }
};

/**
 * El manifiesto del respaldo. `file` apunta a `public/fallback/`, y es lo que
 * hace que las fotos también funcionen sin backend.
 */
export const SEED_IMAGES: Array<SiteImage & { file: string }> = [
  {
    "id": "657fc97a-9d74-5fe9-8d85-f7be7c13af4b",
    "width": 1600,
    "height": 1191,
    "alt": "Periquitos de compañía posados juntos",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "periquitos.webp"
  },
  {
    "id": "c8e778b6-1ac2-5255-8a23-a820f34aeaea",
    "width": 1066,
    "height": 1600,
    "alt": "Ninfa de cresta amarilla mirando a cámara",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "ninfa.webp"
  },
  {
    "id": "6e977703-7976-51f9-bb37-4efe2b450c76",
    "width": 1600,
    "height": 1066,
    "alt": "Agapornis de colores intensos",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "agapornis.webp"
  },
  {
    "id": "b951bb2e-51eb-51ba-907e-f788d8843cab",
    "width": 1254,
    "height": 1254,
    "alt": "Golden Bird — Mascotas y más",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "logo.webp"
  },
  {
    "id": "150138f4-669f-5eaa-8b17-4b23c0b2fd19",
    "width": 1024,
    "height": 1536,
    "alt": "Ninfa junto al alimento destacado",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "cockatiel.webp"
  },
  {
    "id": "de725f0c-2f75-5355-a38e-a5b51911c56d",
    "width": 1024,
    "height": 1024,
    "alt": "Arnés ajustable para perro",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "prod-dog-harness.webp"
  },
  {
    "id": "c5fb8e26-0896-5b4b-ae7a-c0eaeace6b12",
    "width": 1024,
    "height": 1024,
    "alt": "Bolsa de alimento seco para perro",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "prod-dog-food-bag.webp"
  },
  {
    "id": "3c6fad68-ca80-518a-bb27-a404d9b9cd8f",
    "width": 1024,
    "height": 1024,
    "alt": "Transportadora de viaje para mascotas",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "prod-pet-carrier.webp"
  },
  {
    "id": "9baec54e-677b-5022-a2d2-cd207121cdf1",
    "width": 1024,
    "height": 1024,
    "alt": "Bolsa de mezcla de semillas para aves",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "prod-bird-seed-pouch.webp"
  },
  {
    "id": "b4ba461a-a5d1-5b5a-a6d1-0138885249df",
    "width": 1024,
    "height": 1024,
    "alt": "Lata de alimento húmedo para gato",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "prod-canned-food.webp"
  },
  {
    "id": "200961f3-3fa2-5639-b13f-b15876b6cf29",
    "width": 1024,
    "height": 1024,
    "alt": "Comedero de acero con lunares",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "prod-pet-bowl.webp"
  },
  {
    "id": "42f47d43-3247-5266-9ee5-cc6fa548407c",
    "width": 1024,
    "height": 1024,
    "alt": "Frasco de multivitamínico canino",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "prod-pet-vitamins.webp"
  },
  {
    "id": "0b9f4ea0-ca95-5c70-8f7e-577bc3a16973",
    "width": 1024,
    "height": 1024,
    "alt": "Bolsa de papel con bocaditos horneados",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "prod-paper-bag-food.webp"
  },
  {
    "id": "b8c06046-179f-5f90-af16-859f9cc7853d",
    "width": 496,
    "height": 793,
    "alt": "Perro de compañía",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "pet-perros.webp"
  },
  {
    "id": "9a77780f-cd2c-5e7b-a8a4-cbd5a1940bce",
    "width": 496,
    "height": 793,
    "alt": "Gato de compañía",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "pet-gatos.webp"
  },
  {
    "id": "2a8a01bc-ce2d-572b-9490-bec54b2fd6e5",
    "width": 495,
    "height": 793,
    "alt": "Conejo de compañía",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "pet-conejos.webp"
  },
  {
    "id": "9b02912b-41bb-5f5e-9440-f421b1cbc064",
    "width": 496,
    "height": 793,
    "alt": "Hámster de compañía",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "pet-hamsteres.webp"
  },
  {
    "id": "58c9ae04-d8db-583f-aea4-6962c8a5ee9d",
    "width": 512,
    "height": 512,
    "alt": "Mezcla de semillas seleccionadas",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "food-seeds.webp"
  },
  {
    "id": "2115a876-58c5-57be-bce9-a2f1dc2b5737",
    "width": 512,
    "height": 512,
    "alt": "Pellets nutricionales para aves",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "food-pellets.webp"
  },
  {
    "id": "db40e135-b434-5fe0-81f0-4c163a730199",
    "width": 512,
    "height": 512,
    "alt": "Espigas de mijo dorado",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "file": "food-millet.webp"
  }
];
