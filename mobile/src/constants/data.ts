export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  images: string[];
  description: string;
  features: string[];
  sizes: string[];
  materials: string[];
  colors: ProductColor[];
  turnaround: string;
  rating: number;
  reviewCount: number;
  popular?: boolean;
  newArrival?: boolean;
  tag?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'In Production' | 'Shipped' | 'Delivered';
  total: number;
  items: { name: string; qty: number; size: string }[];
  trackingNumber?: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Banners',
    icon: 'flag',
    count: 24,
    image: 'https://picsum.photos/seed/banners-cat/300/200',
  },
  {
    id: '2',
    name: 'Yard Signs',
    icon: 'location-pin',
    count: 18,
    image: 'https://picsum.photos/seed/yardsigns-cat/300/200',
  },
  {
    id: '3',
    name: 'Posters',
    icon: 'image',
    count: 32,
    image: 'https://picsum.photos/seed/posters-cat/300/200',
  },
  {
    id: '4',
    name: 'Window Graphics',
    icon: 'storefront',
    count: 15,
    image: 'https://picsum.photos/seed/window-cat/300/200',
  },
  {
    id: '5',
    name: 'Trade Show',
    icon: 'business',
    count: 21,
    image: 'https://picsum.photos/seed/tradeshow-cat/300/200',
  },
  {
    id: '6',
    name: 'Vehicle',
    icon: 'directions-car',
    count: 12,
    image: 'https://picsum.photos/seed/vehicle-cat/300/200',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Vinyl Banner',
    category: 'Banners',
    basePrice: 29.99,
    images: [
      'https://picsum.photos/seed/vinyl-banner-1/800/600',
      'https://picsum.photos/seed/vinyl-banner-2/800/600',
      'https://picsum.photos/seed/vinyl-banner-3/800/600',
    ],
    description:
      'Make a bold statement with our premium full-color vinyl banners. Printed on 13 oz. scrim vinyl with vibrant UV-resistant inks, these banners are built for both indoor and outdoor use. Finished with reinforced hems and metal grommets every 2 feet for easy hanging.',
    features: [
      '13 oz. scrim vinyl material',
      'UV-resistant, waterproof inks',
      'Reinforced hemmed edges',
      'Rust-proof metal grommets every 2 ft',
      'Full bleed printing to the edge',
    ],
    sizes: ["2' × 4'", "2' × 6'", "3' × 6'", "3' × 8'", "4' × 8'", "4' × 10'"],
    materials: ['13 oz. Vinyl (Standard)', '18 oz. Heavy Duty', 'Mesh Vinyl (Wind-resistant)'],
    colors: [
      { name: 'Full Color Print', hex: '#E94560' },
      { name: 'White Base', hex: '#FFFFFF' },
      { name: 'Black Base', hex: '#111111' },
      { name: 'Blue Base', hex: '#1D4ED8' },
      { name: 'Red Base', hex: '#DC2626' },
      { name: 'Green Base', hex: '#16A34A' },
    ],
    turnaround: '2–3 business days',
    rating: 4.8,
    reviewCount: 1284,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '2',
    name: 'Retractable Banner Stand',
    category: 'Trade Show',
    basePrice: 89.99,
    images: [
      'https://picsum.photos/seed/retractable-1/800/600',
      'https://picsum.photos/seed/retractable-2/800/600',
      'https://picsum.photos/seed/retractable-3/800/600',
    ],
    description:
      'Professional retractable banner stands perfect for trade shows, retail environments, and events. The graphic retracts neatly into the durable aluminum base for easy transport and storage. Set up in under 60 seconds — no tools required.',
    features: [
      'Lightweight aluminum base',
      'Includes carry bag',
      'Sets up in under 60 seconds',
      'Adjustable height pole',
      'Full-color dye-sublimation print',
    ],
    sizes: ["24\" × 78\"", "33\" × 78\"", "36\" × 84\""],
    materials: ['Standard Vinyl', 'Premium Gloss'],
    colors: [
      { name: 'Full Color', hex: '#E94560' },
      { name: 'Silver Base', hex: '#9CA3AF' },
      { name: 'Black Base', hex: '#111111' },
    ],
    turnaround: '3–4 business days',
    rating: 4.9,
    reviewCount: 876,
    popular: true,
    tag: 'Top Rated',
  },
  {
    id: '3',
    name: 'Corrugated Yard Sign',
    category: 'Yard Signs',
    basePrice: 12.99,
    images: [
      'https://picsum.photos/seed/yardsign-1/800/600',
      'https://picsum.photos/seed/yardsign-2/800/600',
      'https://picsum.photos/seed/yardsign-3/800/600',
    ],
    description:
      'Double-sided corrugated plastic yard signs with H-wire stakes included. Ideal for real estate listings, political campaigns, events, and business promotions. Weather-resistant and reusable season after season.',
    features: [
      'Double-sided full-color print',
      'H-wire stake included',
      '4mm corrugated polypropylene',
      'Waterproof & UV-resistant',
      'Lightweight yet sturdy',
    ],
    sizes: ["12\" × 18\"", "18\" × 24\"", "24\" × 36\""],
    materials: ['4mm Coroplast', '6mm Heavy Duty'],
    colors: [
      { name: 'Full Color', hex: '#E94560' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Yellow', hex: '#FCD34D' },
      { name: 'Blue', hex: '#1D4ED8' },
      { name: 'Red', hex: '#DC2626' },
    ],
    turnaround: '2–3 business days',
    rating: 4.7,
    reviewCount: 2103,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '4',
    name: 'Foam Board Display',
    category: 'Posters',
    basePrice: 18.99,
    images: [
      'https://picsum.photos/seed/foamboard-1/800/600',
      'https://picsum.photos/seed/foamboard-2/800/600',
      'https://picsum.photos/seed/foamboard-3/800/600',
    ],
    description:
      'Rigid foam board prints for professional displays, presentations, and mounting. Our foam boards feature a smooth surface for vibrant print quality, and are lightweight yet surprisingly rigid. Perfect for point-of-purchase displays and trade show graphics.',
    features: [
      'High-gloss or matte finish',
      'Lightweight rigid core',
      'Smooth printable surface',
      'Easy to mount or prop up',
      'Available in 3/16" or 1/2" thickness',
    ],
    sizes: ["11\" × 14\"", "16\" × 20\"", "18\" × 24\"", "24\" × 36\""],
    materials: ['3/16" Foam Board', '1/2" Foam Board'],
    colors: [
      { name: 'Matte Finish', hex: '#F5F5F5' },
      { name: 'Gloss Finish', hex: '#FFFFFF' },
      { name: 'Black Border', hex: '#111111' },
    ],
    turnaround: '2–3 business days',
    rating: 4.6,
    reviewCount: 541,
    newArrival: false,
  },
  {
    id: '5',
    name: 'Window Cling Graphic',
    category: 'Window Graphics',
    basePrice: 14.99,
    images: [
      'https://picsum.photos/seed/windowcling-1/800/600',
      'https://picsum.photos/seed/windowcling-2/800/600',
      'https://picsum.photos/seed/windowcling-3/800/600',
    ],
    description:
      'Static cling window graphics that adhere without adhesive or glue — stick to any glass surface and remove cleanly without residue. Available in clear, white, and perforated see-through options. Perfect for storefronts, car windows, and office glass.',
    features: [
      'No adhesive — static cling',
      'Removes cleanly, no residue',
      'Repositionable and reusable',
      'Indoor & outdoor rated',
      'Perforated option for visibility',
    ],
    sizes: ["8\" × 10\"", "12\" × 12\"", "12\" × 24\"", "24\" × 24\""],
    materials: ['Clear Cling', 'White Cling', 'Perforated (See-Through)'],
    colors: [
      { name: 'Full Color', hex: '#E94560' },
      { name: 'Clear', hex: '#E0F2FE' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    turnaround: '2–3 business days',
    rating: 4.5,
    reviewCount: 318,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '6',
    name: 'Premium Table Throw',
    category: 'Trade Show',
    basePrice: 119.99,
    images: [
      'https://picsum.photos/seed/tablethrow-1/800/600',
      'https://picsum.photos/seed/tablethrow-2/800/600',
      'https://picsum.photos/seed/tablethrow-3/800/600',
    ],
    description:
      'Custom printed table throws elevate your booth or event table with a polished, professional look. Machine washable and wrinkle-resistant, our fabric table covers feature full-color dye sublimation printing for sharp, long-lasting results.',
    features: [
      'Machine washable & wrinkle-resistant',
      'Full-color dye sublimation print',
      'Open back for storage access',
      '3-sided or 4-sided coverage',
      'Fits 6 ft. and 8 ft. tables',
    ],
    sizes: ['6 ft. Table (3-sided)', '6 ft. Table (4-sided)', '8 ft. Table (3-sided)', '8 ft. Table (4-sided)'],
    materials: ['Polyester Fabric', 'Stretch Spandex'],
    colors: [
      { name: 'Full Color', hex: '#E94560' },
      { name: 'Black', hex: '#111111' },
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Royal Blue', hex: '#1D4ED8' },
      { name: 'Red', hex: '#DC2626' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    turnaround: '4–5 business days',
    rating: 4.9,
    reviewCount: 723,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '7',
    name: 'Large Format Poster',
    category: 'Posters',
    basePrice: 8.99,
    images: [
      'https://picsum.photos/seed/poster-1/800/600',
      'https://picsum.photos/seed/poster-2/800/600',
      'https://picsum.photos/seed/poster-3/800/600',
    ],
    description:
      'High-resolution poster printing on premium paper stock with vivid, accurate colors. Available in multiple finishes to suit any environment — matte for a sophisticated look, gloss for maximum vibrancy, or satin for a balance of both.',
    features: [
      '100 lb. paper stock',
      'Matte, gloss, or satin finish',
      'Accurate color reproduction',
      'Same-day production available',
      'Ships rolled in protective tube',
    ],
    sizes: ["11\" × 17\"", "18\" × 24\"", "24\" × 36\"", "36\" × 48\""],
    materials: ['Matte Paper', 'Gloss Paper', 'Satin Paper'],
    colors: [
      { name: 'Full Color', hex: '#E94560' },
      { name: 'Black & White', hex: '#555555' },
    ],
    turnaround: '1–2 business days',
    rating: 4.7,
    reviewCount: 3412,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '8',
    name: 'Custom Car Magnet',
    category: 'Vehicle',
    basePrice: 19.99,
    images: [
      'https://picsum.photos/seed/carmagnet-1/800/600',
      'https://picsum.photos/seed/carmagnet-2/800/600',
      'https://picsum.photos/seed/carmagnet-3/800/600',
    ],
    description:
      'Turn your vehicle into a moving billboard with our custom car magnets. Made from 30 mil magnetic material with a UV protective laminate, they attach securely to any metal vehicle surface and remove cleanly without scratching your paint.',
    features: [
      '30 mil magnetic backing',
      'UV protective laminate',
      'Attaches/removes without scratching',
      'Weatherproof & fade-resistant',
      'Rounded corners for secure hold',
    ],
    sizes: ["12\" × 12\"", "12\" × 24\"", "18\" × 24\"", "24\" × 24\""],
    materials: ['Standard 30 mil', 'Heavy Duty 45 mil'],
    colors: [
      { name: 'Full Color', hex: '#E94560' },
      { name: 'White Base', hex: '#FFFFFF' },
      { name: 'Black Base', hex: '#111111' },
    ],
    turnaround: '2–3 business days',
    rating: 4.6,
    reviewCount: 987,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '9',
    name: 'A-Frame Sidewalk Sign',
    category: 'Yard Signs',
    basePrice: 49.99,
    images: [
      'https://picsum.photos/seed/aframe-1/800/600',
      'https://picsum.photos/seed/aframe-2/800/600',
      'https://picsum.photos/seed/aframe-3/800/600',
    ],
    description:
      'Attention-grabbing A-frame sandwich boards for sidewalks, storefronts, and events. The sturdy aluminum frame holds double-sided insert panels that you can swap out as your promotions change. Weather-resistant and folds flat for easy storage.',
    features: [
      'Durable aluminum frame',
      'Double-sided interchangeable panels',
      'Folds flat for storage',
      'Non-slip rubber feet',
      'Replaceable panel inserts',
    ],
    sizes: ['18" × 24" Insert', '24" × 36" Insert'],
    materials: ['Aluminum Frame + Coroplast Insert', 'Aluminum Frame + Foam Board Insert'],
    colors: [
      { name: 'Silver Frame', hex: '#9CA3AF' },
      { name: 'Black Frame', hex: '#111111' },
      { name: 'White Frame', hex: '#FFFFFF' },
    ],
    turnaround: '3–4 business days',
    rating: 4.8,
    reviewCount: 456,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '10',
    name: 'Mesh Banner',
    category: 'Banners',
    basePrice: 39.99,
    images: [
      'https://picsum.photos/seed/meshbanner-1/800/600',
      'https://picsum.photos/seed/meshbanner-2/800/600',
      'https://picsum.photos/seed/meshbanner-3/800/600',
    ],
    description:
      'Wind-resistant mesh banners are ideal for outdoor fences, scaffolding, and building wraps where wind load is a concern. The open weave of mesh vinyl allows air to pass through while still delivering vibrant, eye-catching graphics.',
    features: [
      '65% open weave mesh vinyl',
      'Wind-resistant design',
      'Rust-proof grommets every 2 ft',
      'UV & weather resistant inks',
      'Ideal for fences & scaffolding',
    ],
    sizes: ["3' × 6'", "4' × 8'", "4' × 10'", "5' × 10'", "6' × 12'"],
    materials: ['9 oz. Mesh Vinyl'],
    colors: [
      { name: 'Full Color', hex: '#E94560' },
      { name: 'Black Base', hex: '#111111' },
      { name: 'White Base', hex: '#FFFFFF' },
    ],
    turnaround: '2–3 business days',
    rating: 4.7,
    reviewCount: 634,
    popular: true,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: 'Jan 28, 2024',
    status: 'Delivered',
    total: 89.97,
    items: [
      { name: 'Premium Vinyl Banner', qty: 2, size: "3' × 6'" },
      { name: 'Corrugated Yard Sign', qty: 5, size: '18" × 24"' },
    ],
    trackingNumber: '1Z999AA10123456784',
  },
  {
    id: 'ORD-2024-002',
    date: 'Feb 5, 2024',
    status: 'Shipped',
    total: 119.99,
    items: [{ name: 'Retractable Banner Stand', qty: 1, size: '33" × 78"' }],
    trackingNumber: '1Z999AA10123456785',
  },
  {
    id: 'ORD-2024-003',
    date: 'Feb 14, 2024',
    status: 'In Production',
    total: 45.98,
    items: [
      { name: 'Foam Board Display', qty: 3, size: '18" × 24"' },
      { name: 'Window Cling Graphic', qty: 2, size: '12" × 12"' },
    ],
  },
];
