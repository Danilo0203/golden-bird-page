export interface Bird {
  name: string;
  scientific: string;
  image: string;
  number: string;
  description: string;
}

export interface Pet {
  name: string;
  detail: string;
  photo: 'aves' | 'perros' | 'gatos' | 'conejos' | 'hamsteres';
}

export interface FoodItem {
  name: string;
  kind: string;
  photo: 'seeds' | 'pellets' | 'millet';
  description: string;
  price: string;
  originalPrice?: string;
  rating: string;
  reviewsCount?: number;
  badge?: string;
  weight: string;
  accentBg: string;
  accentBorder: string;
}

export interface CatalogItem {
  name: string;
  kind: string;
  photo: 'seeds' | 'pellets' | 'millet' | 'cage' | 'feeder' | 'toy';
  description: string;
}

export const birds = [
  {
    name: 'Periquitos',
    scientific: 'Melopsittacus undulatus',
    image: 'periquitos.jpg',
    number: '01',
    description: 'Pequeños, sociables y llenos de color. Una presencia alegre que convierte los días en compañía.',
  },
  {
    name: 'Ninfas',
    scientific: 'Nymphicus hollandicus',
    image: 'ninfa.jpg',
    number: '02',
    description: 'Una cresta inconfundible y mucha personalidad. Aves curiosas que disfrutan explorar e interactuar.',
  },
  {
    name: 'Agapornis',
    scientific: 'Agapornis',
    image: 'agapornis.jpg',
    number: '03',
    description: 'Colores intensos y energía en pequeño formato. Compañeros activos con un carácter muy especial.',
  },
] satisfies Bird[];

export const pets = [
  { name: 'Aves', detail: 'Plumas y personalidad', photo: 'aves' },
  { name: 'Perros', detail: 'Compañeros de aventuras', photo: 'perros' },
  { name: 'Gatos', detail: 'Curiosidad y compañía', photo: 'gatos' },
  { name: 'Conejos', detail: 'Pequeños y encantadores', photo: 'conejos' },
  { name: 'Hámsteres', detail: 'Un pequeño gran mundo', photo: 'hamsteres' },
] satisfies Pet[];

export const foods: FoodItem[] = [
  {
    name: 'Mezcla de Semillas Suprema',
    kind: 'SEMILLAS SELECTAS',
    photo: 'seeds',
    description: 'Alpiste, mijo y cereales seleccionados para periquitos y canarios.',
    price: 'Q85.00',
    originalPrice: 'Q110.00',
    rating: '5.0',
    reviewsCount: 28,
    badge: 'Popular',
    weight: '500g',
    accentBg: 'bg-[#edf6ed]',
    accentBorder: 'border-[#cde5ca]',
  },
  {
    name: 'Pellets Nutricionales Vita-Plus',
    kind: 'ALIMENTO COMPLETO',
    photo: 'pellets',
    description: 'Fórmula extrusionada rica en vitaminas y minerales esenciales.',
    price: 'Q145.00',
    originalPrice: 'Q180.00',
    rating: '5.0',
    reviewsCount: 34,
    badge: 'Recomendado',
    weight: '750g',
    accentBg: 'bg-[#fcf2e0]',
    accentBorder: 'border-[#ebd4ad]',
  },
  {
    name: 'Mijo Dorado en Espiga',
    kind: 'COMPLEMENTO NATURAL',
    photo: 'millet',
    description: 'Espigas naturales cultivadas al sol para picotear y entretenerse.',
    price: 'Q65.00',
    originalPrice: 'Q85.00',
    rating: '5.0',
    reviewsCount: 42,
    badge: '100% Natural',
    weight: 'Pack 5 uds',
    accentBg: 'bg-[#f6e6dc]',
    accentBorder: 'border-[#eacbbc]',
  },
  {
    name: 'Semillas con Fruta Deshidratada',
    kind: 'ENERGÍA Y SABOR',
    photo: 'seeds',
    description: 'Con trocitos de manzana, plátano y semillas para el plumaje.',
    price: 'Q120.00',
    originalPrice: 'Q155.00',
    rating: '4.9',
    reviewsCount: 19,
    badge: 'Oferta',
    weight: '600g',
    accentBg: 'bg-[#fdf3e5]',
    accentBorder: 'border-[#f2d5b6]',
  },
  {
    name: 'Pellets de Mantenimiento Aviar',
    kind: 'FÓRMULA BALANCEADA',
    photo: 'pellets',
    description: 'Aporte controlado de grasas para ninfas, agapornis y cotorras.',
    price: 'Q160.00',
    originalPrice: 'Q195.00',
    rating: '5.0',
    reviewsCount: 23,
    badge: 'Premium',
    weight: '1 kg',
    accentBg: 'bg-[#edf6ed]',
    accentBorder: 'border-[#cde5ca]',
  },
  {
    name: 'Espigas Campestres Silvestres',
    kind: 'FORRAJE Y ACTIVIDAD',
    photo: 'millet',
    description: 'Complemento tradicional para mantener el pico sano y activo.',
    price: 'Q75.00',
    originalPrice: 'Q95.00',
    rating: '4.8',
    reviewsCount: 16,
    badge: 'Especial',
    weight: 'Pack 8 uds',
    accentBg: 'bg-[#f0ede6]',
    accentBorder: 'border-[#dcd5c8]',
  },
];

export const accessories = [
  {
    name: 'Jaula para aves',
    kind: 'SU ESPACIO',
    photo: 'cage',
    description: 'Un ejemplo de jaula con perchas y acceso para la limpieza.',
  },
  {
    name: 'Comedero y bebedero',
    kind: 'CUIDADO DIARIO',
    photo: 'feeder',
    description: 'Recipientes prácticos para servir agua y alimento.',
  },
  {
    name: 'Juguetes y escaleras',
    kind: 'JUEGO Y ACTIVIDAD',
    photo: 'toy',
    description: 'Accesorios de madera para explorar y enriquecer su entorno.',
  },
] satisfies CatalogItem[];

export interface RecentProduct {
  name: string;
  category: string;
  photo: 'cage' | 'feeder' | 'toy' | 'seeds' | 'pellets' | 'millet';
  description: string;
  price: string;
  originalPrice?: string;
  accentBg: string;
  accentBorder: string;
  tag?: string;
}

export const recentProducts: RecentProduct[] = [
  {
    name: 'Jaula Confort Panorámica',
    category: 'ACCESORIOS Y HÁBITAT',
    photo: 'cage',
    description: 'Estructura amplia con perchas de madera natural y bandeja extraíble.',
    price: 'Q285.00',
    originalPrice: 'Q350.00',
    accentBg: 'bg-[#edf6ed]',
    accentBorder: 'border-[#cde5ca]',
    tag: 'Nuevo',
  },
  {
    name: 'Comedero Automático Doble',
    category: 'ALIMENTACIÓN',
    photo: 'feeder',
    description: 'Diseño antigoteo y dispensador hermético para agua y semillas.',
    price: 'Q65.00',
    originalPrice: 'Q85.00',
    accentBg: 'bg-[#fcf2e0]',
    accentBorder: 'border-[#ebd4ad]',
    tag: 'Popular',
  },
  {
    name: 'Parque de Escaleras y Columpio',
    category: 'JUGUETES Y ACTIVIDAD',
    photo: 'toy',
    description: 'Madera natural no tratada para estimular el ejercicio y juego.',
    price: 'Q95.00',
    originalPrice: 'Q125.00',
    accentBg: 'bg-[#f3eef8]',
    accentBorder: 'border-[#dfd3ee]',
    tag: 'Destacado',
  },
  {
    name: 'Mezcla Silvestre Selección',
    category: 'NUTRICIÓN COMPLETA',
    photo: 'seeds',
    description: 'Semillas frescas con frutas deshidratadas para aves de compañía.',
    price: 'Q120.00',
    originalPrice: 'Q150.00',
    accentBg: 'bg-[#fdf3e5]',
    accentBorder: 'border-[#f2d5b6]',
    tag: 'Oferta',
  },
];

export interface CatalogFilter {
  id: string;
  label: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  categories: string[];
  price: string;
  originalPrice: string;
  image: string;
  canvasBg: string;
  tag?: string;
}

export const catalogFilters: CatalogFilter[] = [
  { id: 'all', label: 'Todos' },
  { id: 'dog-food', label: 'Comida de Perros' },
  { id: 'cat-food', label: 'Comida de Gatos' },
  { id: 'bird-food', label: 'Comida de Aves' },
  { id: 'dry-food', label: 'Alimento Seco' },
  { id: 'accessories', label: 'Accesorios' },
];

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'prod-1',
    name: 'Arnés Ajustable Confort Canino',
    categories: ['accessories'],
    price: 'Q120.00',
    originalPrice: 'Q200.00',
    image: '/images/products/dog-harness.jpg',
    canvasBg: 'bg-[#fdeeee]',
    tag: 'Popular',
  },
  {
    id: 'prod-2',
    name: 'Alimento Seco Premium Canino',
    categories: ['dog-food', 'dry-food'],
    price: 'Q240.00',
    originalPrice: 'Q295.00',
    image: '/images/products/dog-food-bag.jpg',
    canvasBg: 'bg-[#ebf8e1]',
    tag: 'Destacado',
  },
  {
    id: 'prod-3',
    name: 'Transportadora Pet Taxi de Viaje',
    categories: ['accessories'],
    price: 'Q310.00',
    originalPrice: 'Q385.00',
    image: '/images/products/pet-carrier.jpg',
    canvasBg: 'bg-[#e3f2fd]',
    tag: 'Nuevo',
  },
  {
    id: 'prod-4',
    name: 'Mezcla Silvestre Especial Aves',
    categories: ['bird-food', 'dry-food'],
    price: 'Q95.00',
    originalPrice: 'Q130.00',
    image: '/images/products/bird-seed-pouch.jpg',
    canvasBg: 'bg-[#fbe8e0]',
    tag: 'Oferta',
  },
  {
    id: 'prod-5',
    name: 'Alimento Húmedo Gourmet Salmón',
    categories: ['cat-food'],
    price: 'Q35.00',
    originalPrice: 'Q50.00',
    image: '/images/products/canned-food.jpg',
    canvasBg: 'bg-[#fff9e6]',
    tag: 'Gourmet',
  },
  {
    id: 'prod-6',
    name: 'Comedero Antiderrame Acero Lunares',
    categories: ['accessories'],
    price: 'Q85.00',
    originalPrice: 'Q115.00',
    image: '/images/products/pet-bowl.jpg',
    canvasBg: 'bg-[#f3e5f5]',
    tag: 'Top Ventas',
  },
  {
    id: 'prod-7',
    name: 'Multivitamínico Canino Esencial',
    categories: ['dog-food'],
    price: 'Q165.00',
    originalPrice: 'Q210.00',
    image: '/images/products/pet-vitamins.jpg',
    canvasBg: 'bg-[#e8f5e9]',
    tag: 'Salud',
  },
  {
    id: 'prod-8',
    name: 'Bocaditos Horneados Naturales',
    categories: ['dog-food', 'cat-food', 'dry-food'],
    price: 'Q65.00',
    originalPrice: 'Q90.00',
    image: '/images/products/paper-bag-food.jpg',
    canvasBg: 'bg-[#ebf8e1]',
    tag: 'Natural',
  },
];

export interface NewProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  accentBg: string;
  accentBorder: string;
  tag?: string;
}

export const newProducts: NewProduct[] = [
  {
    id: 'new-1',
    name: 'Beef & Veggie Mix Dry Dog Food',
    category: 'DOG FOOD',
    description: 'Fórmula nutritiva de carne y vegetales para perros activos.',
    price: 'Q120.00',
    originalPrice: 'Q200.00',
    image: '/images/products/dog-food-bag.jpg',
    accentBg: 'bg-[#edf6ed]',
    accentBorder: 'border-[#cde5ca]',
    tag: 'Nuevo',
  },
  {
    id: 'new-2',
    name: 'Balanced Chicken & Veggies Food',
    category: 'DOG FOOD',
    description: 'Pollo y verduras frescas con aporte controlado de granos.',
    price: 'Q120.00',
    originalPrice: 'Q200.00',
    image: '/images/products/yellow-food-bag.jpg',
    accentBg: 'bg-[#fcf2e0]',
    accentBorder: 'border-[#ebd4ad]',
    tag: 'Popular',
  },
  {
    id: 'new-3',
    name: 'Salmon & Sweet Potato Adult Food',
    category: 'DOG FOOD',
    description: 'Rico en Omega-3 para soporte articular y digestivo.',
    price: 'Q120.00',
    originalPrice: 'Q200.00',
    image: '/images/products/blue-food-bag.jpg',
    accentBg: 'bg-[#f3eef8]',
    accentBorder: 'border-[#dfd3ee]',
    tag: 'Destacado',
  },
  {
    id: 'new-4',
    name: 'Savory Chicken & Sweet Potato Treats',
    category: 'DOG FOOD',
    description: 'Premios crujientes 100% naturales horneados al sol.',
    price: 'Q120.00',
    originalPrice: 'Q200.00',
    image: '/images/products/paper-bag-food.jpg',
    accentBg: 'bg-[#fdf3e5]',
    accentBorder: 'border-[#f2d5b6]',
    tag: 'Oferta',
  },
];

