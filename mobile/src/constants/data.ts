export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  verified: boolean;
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
  tag?: 'Best Seller' | 'New' | 'Top Rated' | 'Sale';
  discount?: number;
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
  { id: '1', name: 'Banners',        icon: 'flag',           count: 18, image: 'https://picsum.photos/seed/cat-banners/400/260' },
  { id: '2', name: 'Yard Signs',     icon: 'signpost',       count: 14, image: 'https://picsum.photos/seed/cat-yardsign/400/260' },
  { id: '3', name: 'Posters',        icon: 'image',          count: 22, image: 'https://picsum.photos/seed/cat-posters/400/260' },
  { id: '4', name: 'Window Graphics', icon: 'storefront',     count: 12, image: 'https://picsum.photos/seed/cat-window/400/260' },
  { id: '5', name: 'Trade Show',     icon: 'business-center',count: 16, image: 'https://picsum.photos/seed/cat-trade/400/260' },
  { id: '6', name: 'Vehicle',        icon: 'directions-car', count: 10, image: 'https://picsum.photos/seed/cat-vehicle/400/260' },
  { id: '7', name: 'Floor Graphics',  icon: 'layers',         count: 8,  image: 'https://picsum.photos/seed/cat-floor/400/260' },
  { id: '8', name: 'Flags',          icon: 'tour',           count: 9,  image: 'https://picsum.photos/seed/cat-flags/400/260' },
];

export const products: Product[] = [
  // ─── BANNERS ───────────────────────────────────────────────────────────────
  {
    id: '1',
    name: 'Premium Vinyl Banner',
    category: 'Banners',
    basePrice: 29.99,
    images: [
      'https://picsum.photos/seed/vbanner-a/800/600',
      'https://picsum.photos/seed/vbanner-b/800/600',
      'https://picsum.photos/seed/vbanner-c/800/600',
    ],
    description:
      'Our best-selling vinyl banner is printed on durable 13 oz. scrim vinyl with UV-resistant inks that stay vivid outdoors for years. Reinforced hemmed edges and rust-proof grommets every 2 feet make installation effortless.',
    features: [
      '13 oz. outdoor scrim vinyl',
      'UV & waterproof inks',
      'Hemmed edges + grommets every 2 ft',
      'Vibrant full-bleed printing',
      'Indoor & outdoor rated',
    ],
    sizes: ["2' × 4'", "2' × 6'", "3' × 6'", "3' × 8'", "4' × 8'", "4' × 10'"],
    materials: ['13 oz. Vinyl', '18 oz. Heavy Duty', 'Mesh Vinyl'],
    colors: [
      { name: 'Full Color',  hex: '#E8334A' },
      { name: 'White Base',  hex: '#FFFFFF' },
      { name: 'Black Base',  hex: '#1A1A1A' },
      { name: 'Navy Blue',   hex: '#1E3A5F' },
      { name: 'Forest Green',hex: '#1A5C38' },
      { name: 'Red',         hex: '#DC2626' },
    ],
    turnaround: '2–3 business days',
    rating: 4.8,
    reviewCount: 3241,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '2',
    name: 'Mesh Fence Banner',
    category: 'Banners',
    basePrice: 39.99,
    images: [
      'https://picsum.photos/seed/meshb-a/800/600',
      'https://picsum.photos/seed/meshb-b/800/600',
      'https://picsum.photos/seed/meshb-c/800/600',
    ],
    description:
      'Wind-resistant mesh banners are engineered for fences, scaffolding, and stadium railings where airflow is critical. The 65% open-weave mesh lets wind pass through while your graphics stay sharp and secure.',
    features: [
      '9 oz. open-weave mesh vinyl',
      '65% wind pass-through',
      'Rust-proof corner grommets',
      'UV-stable outdoor inks',
      'Ideal for fences & building wraps',
    ],
    sizes: ["3' × 6'", "4' × 8'", "4' × 10'", "5' × 10'", "6' × 12'"],
    materials: ['9 oz. Mesh Vinyl'],
    colors: [
      { name: 'Full Color',  hex: '#E8334A' },
      { name: 'Black Base',  hex: '#1A1A1A' },
      { name: 'White Base',  hex: '#FFFFFF' },
      { name: 'Navy',        hex: '#1E3A5F' },
    ],
    turnaround: '2–3 business days',
    rating: 4.7,
    reviewCount: 876,
    popular: true,
  },

  // ─── FLAGS ─────────────────────────────────────────────────────────────────
  {
    id: '3',
    name: 'Feather Flag',
    category: 'Flags',
    basePrice: 49.99,
    images: [
      'https://picsum.photos/seed/feather-a/800/600',
      'https://picsum.photos/seed/feather-b/800/600',
      'https://picsum.photos/seed/feather-c/800/600',
    ],
    description:
      'Eye-catching feather flags soar up to 13 feet tall, making your business impossible to miss from the road. Dye-sublimation printing delivers vivid double-sided graphics that look great from every angle.',
    features: [
      'Double-sided dye-sublimation print',
      'Fiberglass & aluminum pole kit',
      'Ground spike, cross base or water base',
      'Machine washable knit polyester',
      'Assembles in under 2 minutes',
    ],
    sizes: ['Small (8 ft)', 'Medium (11 ft)', 'Large (13 ft)', 'XL (15 ft)'],
    materials: ['Knit Polyester', 'Satin Polyester'],
    colors: [
      { name: 'Full Color',  hex: '#E8334A' },
      { name: 'White',       hex: '#FFFFFF' },
      { name: 'Black',       hex: '#1A1A1A' },
      { name: 'Royal Blue',  hex: '#1D4ED8' },
      { name: 'Red',         hex: '#DC2626' },
    ],
    turnaround: '3–4 business days',
    rating: 4.9,
    reviewCount: 1543,
    popular: true,
    tag: 'Top Rated',
  },
  {
    id: '4',
    name: 'Teardrop Flag',
    category: 'Flags',
    basePrice: 54.99,
    images: [
      'https://picsum.photos/seed/teardrop-a/800/600',
      'https://picsum.photos/seed/teardrop-b/800/600',
      'https://picsum.photos/seed/teardrop-c/800/600',
    ],
    description:
      'Teardrop flags maintain their shape in any wind thanks to a curved top design that keeps the graphic taut and readable. Perfect for car dealerships, grand openings, and permanent outdoor signage.',
    features: [
      'Wind-stabilized teardrop shape',
      'Vibrant dye-sublimation print',
      'Sturdy fiberglass pole included',
      'Multiple base options available',
      'Double-sided printing available',
    ],
    sizes: ['Small (7 ft)', 'Medium (9 ft)', 'Large (11 ft)'],
    materials: ['Knit Polyester', 'Premium Satin'],
    colors: [
      { name: 'Full Color',  hex: '#E8334A' },
      { name: 'White',       hex: '#FFFFFF' },
      { name: 'Black',       hex: '#1A1A1A' },
      { name: 'Green',       hex: '#16A34A' },
      { name: 'Orange',      hex: '#EA580C' },
    ],
    turnaround: '3–4 business days',
    rating: 4.7,
    reviewCount: 692,
    newArrival: true,
    tag: 'New',
  },

  // ─── TRADE SHOW ────────────────────────────────────────────────────────────
  {
    id: '5',
    name: 'Retractable Banner Stand',
    category: 'Trade Show',
    basePrice: 89.99,
    images: [
      'https://picsum.photos/seed/retract-a/800/600',
      'https://picsum.photos/seed/retract-b/800/600',
      'https://picsum.photos/seed/retract-c/800/600',
    ],
    description:
      'A trade show staple. Our retractable banner stand sets up in under 60 seconds and folds away just as fast. The premium aluminum base houses a precision spring mechanism that keeps your graphic perfectly tensioned every time.',
    features: [
      'Tool-free 60-second setup',
      'Precision spring-loaded mechanism',
      'Lightweight premium aluminum base',
      'Padded carry bag included',
      'Replacement graphic available',
    ],
    sizes: ['24" × 78"', '33" × 78"', '36" × 84"'],
    materials: ['Standard Vinyl', 'Premium Gloss', 'Matte Film'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'Silver Base', hex: '#9CA3AF' },
      { name: 'Black Base', hex: '#1A1A1A' },
      { name: 'Gold Base', hex: '#D4AF37' },
    ],
    turnaround: '3–4 business days',
    rating: 4.9,
    reviewCount: 2187,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '6',
    name: 'Premium Table Throw',
    category: 'Trade Show',
    basePrice: 119.99,
    images: [
      'https://picsum.photos/seed/tablethrow-a/800/600',
      'https://picsum.photos/seed/tablethrow-b/800/600',
      'https://picsum.photos/seed/tablethrow-c/800/600',
    ],
    description:
      'Transform any event table into a branded display with our custom-printed table throws. Machine washable, wrinkle-resistant polyester fabric ensures you always look professional, even after a long day at the show.',
    features: [
      'Machine washable & wrinkle-resistant',
      'Full-color dye sublimation',
      'Open back for storage access',
      'Fits 6 ft and 8 ft tables',
      '3-sided or full coverage options',
    ],
    sizes: ['6 ft (3-sided)', '6 ft (4-sided)', '8 ft (3-sided)', '8 ft (4-sided)'],
    materials: ['Polyester Fabric', 'Stretch Spandex'],
    colors: [
      { name: 'Full Color',  hex: '#E8334A' },
      { name: 'Black',       hex: '#1A1A1A' },
      { name: 'Navy',        hex: '#1E3A5F' },
      { name: 'Royal Blue',  hex: '#1D4ED8' },
      { name: 'Red',         hex: '#DC2626' },
      { name: 'White',       hex: '#FFFFFF' },
    ],
    turnaround: '4–5 business days',
    rating: 4.8,
    reviewCount: 934,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '7',
    name: 'Pop-Up Display',
    category: 'Trade Show',
    basePrice: 249.99,
    images: [
      'https://picsum.photos/seed/popup-a/800/600',
      'https://picsum.photos/seed/popup-b/800/600',
      'https://picsum.photos/seed/popup-c/800/600',
    ],
    description:
      'Make a massive impression at your next trade show with our 10-foot curved pop-up display. The magnetic frame snaps together in minutes and the fabric graphic stretches taut for a seamless, professional backdrop.',
    features: [
      'Magnetic snap-together frame',
      '10 ft wide curved backdrop',
      'Wrinkle-free stretch fabric graphic',
      'Includes rolling travel case',
      'LED spotlights available as add-on',
    ],
    sizes: ['8 ft Straight', '10 ft Curved', '10 ft Straight', '12 ft Curved'],
    materials: ['Stretch Fabric', 'High-Gloss Fabric'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'Black Frame', hex: '#1A1A1A' },
      { name: 'Silver Frame', hex: '#9CA3AF' },
    ],
    turnaround: '5–7 business days',
    rating: 4.8,
    reviewCount: 421,
    tag: 'Top Rated',
  },
  {
    id: '8',
    name: 'Step & Repeat Banner',
    category: 'Trade Show',
    basePrice: 159.99,
    images: [
      'https://picsum.photos/seed/steprepeat-a/800/600',
      'https://picsum.photos/seed/steprepeat-b/800/600',
      'https://picsum.photos/seed/steprepeat-c/800/600',
    ],
    description:
      'The classic red-carpet backdrop for events, press days, and photo opportunities. Our step and repeat banners feature a repeating logo pattern printed on premium vinyl with an adjustable telescoping frame.',
    features: [
      'Adjustable telescoping frame',
      'Full-color vinyl printing',
      'Sets up in under 5 minutes',
      'Carry bag included',
      'Multiple size options',
    ],
    sizes: ['4 ft × 8 ft', '6 ft × 8 ft', '8 ft × 8 ft', '8 ft × 10 ft'],
    materials: ['13 oz. Vinyl', '8 oz. Fabric'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'White Base', hex: '#FFFFFF' },
      { name: 'Black Base', hex: '#1A1A1A' },
    ],
    turnaround: '3–5 business days',
    rating: 4.7,
    reviewCount: 578,
    newArrival: true,
    tag: 'New',
  },

  // ─── YARD SIGNS ────────────────────────────────────────────────────────────
  {
    id: '9',
    name: 'Corrugated Yard Sign',
    category: 'Yard Signs',
    basePrice: 12.99,
    images: [
      'https://picsum.photos/seed/yardsign-a/800/600',
      'https://picsum.photos/seed/yardsign-b/800/600',
      'https://picsum.photos/seed/yardsign-c/800/600',
    ],
    description:
      'The go-to choice for real estate, elections, and local promotions. Double-sided corrugated plastic yard signs include H-wire stakes and are printed in full color on both sides. Weather-resistant and reusable season after season.',
    features: [
      'Double-sided full-color print',
      'H-wire stake included',
      '4mm corrugated polypropylene',
      'Waterproof & UV-resistant',
      'Reusable & lightweight',
    ],
    sizes: ['12" × 18"', '18" × 24"', '24" × 36"'],
    materials: ['4mm Coroplast', '6mm Heavy Duty'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'White',      hex: '#FFFFFF' },
      { name: 'Yellow',     hex: '#FCD34D' },
      { name: 'Blue',       hex: '#1D4ED8' },
      { name: 'Red',        hex: '#DC2626' },
      { name: 'Green',      hex: '#16A34A' },
    ],
    turnaround: '2–3 business days',
    rating: 4.7,
    reviewCount: 4821,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '10',
    name: 'A-Frame Sidewalk Sign',
    category: 'Yard Signs',
    basePrice: 49.99,
    images: [
      'https://picsum.photos/seed/aframe-a/800/600',
      'https://picsum.photos/seed/aframe-b/800/600',
      'https://picsum.photos/seed/aframe-c/800/600',
    ],
    description:
      'Double-sided A-frame sandwich boards draw foot traffic into your storefront with bold, swappable panel inserts. The powder-coated aluminum frame folds flat for compact storage and has non-slip rubber feet.',
    features: [
      'Powder-coated aluminum frame',
      'Swappable double-sided panels',
      'Non-slip rubber feet',
      'Folds flat for storage',
      'Weather-resistant design',
    ],
    sizes: ['18" × 24" panel', '24" × 36" panel'],
    materials: ['Aluminum Frame + Coroplast', 'Aluminum Frame + Foam Board'],
    colors: [
      { name: 'Silver Frame', hex: '#9CA3AF' },
      { name: 'Black Frame',  hex: '#1A1A1A' },
      { name: 'White Frame',  hex: '#FFFFFF' },
    ],
    turnaround: '3–4 business days',
    rating: 4.6,
    reviewCount: 712,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '11',
    name: 'Real Estate Rider Sign',
    category: 'Yard Signs',
    basePrice: 9.99,
    images: [
      'https://picsum.photos/seed/rider-a/800/600',
      'https://picsum.photos/seed/rider-b/800/600',
      'https://picsum.photos/seed/rider-c/800/600',
    ],
    description:
      'Affordable full-color rider signs attach to any standard real estate yard sign frame to add "Open House," "For Rent," or custom messaging. Double-sided printing included.',
    features: [
      'Double-sided full-color print',
      'Fits all standard sign frames',
      'Corrugated plastic material',
      'Waterproof & UV-resistant',
      'Fast 1–2 day turnaround',
    ],
    sizes: ['6" × 24"', '6" × 30"', '9" × 24"'],
    materials: ['4mm Coroplast'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'White',      hex: '#FFFFFF' },
      { name: 'Yellow',     hex: '#FCD34D' },
      { name: 'Red',        hex: '#DC2626' },
    ],
    turnaround: '1–2 business days',
    rating: 4.5,
    reviewCount: 2103,
    tag: 'Sale',
    discount: 20,
  },

  // ─── POSTERS ───────────────────────────────────────────────────────────────
  {
    id: '12',
    name: 'Large Format Poster',
    category: 'Posters',
    basePrice: 8.99,
    images: [
      'https://picsum.photos/seed/poster-a/800/600',
      'https://picsum.photos/seed/poster-b/800/600',
      'https://picsum.photos/seed/poster-c/800/600',
    ],
    description:
      'High-resolution poster printing on 100 lb. premium paper stock. Choose from matte, gloss, or satin finishes to match your brand. Ships rolled in a protective cardboard tube to arrive in perfect condition.',
    features: [
      '100 lb. premium paper',
      'Matte, gloss, or satin finish',
      'Sharp color reproduction',
      'Ships in protective tube',
      'Same-day production available',
    ],
    sizes: ['11" × 17"', '18" × 24"', '24" × 36"', '36" × 48"'],
    materials: ['Matte Paper', 'Gloss Paper', 'Satin Paper', 'Adhesive-Backed'],
    colors: [
      { name: 'Full Color',  hex: '#E8334A' },
      { name: 'Black & White', hex: '#555555' },
    ],
    turnaround: '1–2 business days',
    rating: 4.7,
    reviewCount: 5210,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '13',
    name: 'Foam Board Display',
    category: 'Posters',
    basePrice: 18.99,
    images: [
      'https://picsum.photos/seed/foamboard-a/800/600',
      'https://picsum.photos/seed/foamboard-b/800/600',
      'https://picsum.photos/seed/foamboard-c/800/600',
    ],
    description:
      'Rigid foam board prints stand on their own for point-of-purchase displays, presentations, and lobby graphics. Lightweight yet sturdy, with a smooth surface that delivers brilliant color accuracy.',
    features: [
      'Rigid lightweight foam core',
      'Smooth high-gloss printable surface',
      '3/16" or 1/2" thickness options',
      'Easy to mount or stand upright',
      'Great for POP displays',
    ],
    sizes: ['11" × 14"', '16" × 20"', '18" × 24"', '24" × 36"'],
    materials: ['3/16" Foam Board', '1/2" Foam Board'],
    colors: [
      { name: 'Matte Finish',  hex: '#F5F5F5' },
      { name: 'Gloss Finish',  hex: '#FFFFFF' },
      { name: 'Black Border',  hex: '#1A1A1A' },
    ],
    turnaround: '2–3 business days',
    rating: 4.6,
    reviewCount: 1087,
  },
  {
    id: '14',
    name: 'Canvas Print',
    category: 'Posters',
    basePrice: 34.99,
    images: [
      'https://picsum.photos/seed/canvas-a/800/600',
      'https://picsum.photos/seed/canvas-b/800/600',
      'https://picsum.photos/seed/canvas-c/800/600',
    ],
    description:
      'Gallery-quality canvas prints give your brand the premium feel of fine art. Stretched over a solid pine frame and coated with a UV-protective finish, these prints look stunning in offices, lobbies, and retail spaces.',
    features: [
      'Gallery-quality stretch canvas',
      'Solid pine stretcher frame',
      'UV-protective coating',
      'Arrives ready to hang',
      'Available with or without frame',
    ],
    sizes: ['12" × 12"', '16" × 20"', '20" × 24"', '24" × 36"', '30" × 40"'],
    materials: ['Poly-Cotton Canvas', 'Premium Cotton Canvas'],
    colors: [
      { name: 'Full Color',    hex: '#E8334A' },
      { name: 'Black Frame',   hex: '#1A1A1A' },
      { name: 'Natural Frame', hex: '#C4A35A' },
      { name: 'White Frame',   hex: '#FFFFFF' },
    ],
    turnaround: '3–4 business days',
    rating: 4.8,
    reviewCount: 1632,
    newArrival: true,
    tag: 'New',
  },

  // ─── WINDOW GRAPHICS ───────────────────────────────────────────────────────
  {
    id: '15',
    name: 'Window Cling',
    category: 'Window Graphics',
    basePrice: 14.99,
    images: [
      'https://picsum.photos/seed/cling-a/800/600',
      'https://picsum.photos/seed/cling-b/800/600',
      'https://picsum.photos/seed/cling-c/800/600',
    ],
    description:
      'Static-cling window graphics require no adhesive — they stick to any smooth glass surface and remove cleanly without leaving residue. Repositionable and reusable, perfect for promotions that change regularly.',
    features: [
      'No adhesive — static cling',
      'Removable with zero residue',
      'Repositionable & reusable',
      'Clear, white, or perforated options',
      'UV-rated for outdoor windows',
    ],
    sizes: ['8" × 10"', '12" × 12"', '12" × 24"', '24" × 24"'],
    materials: ['Clear Cling', 'White Cling', 'Perforated See-Through'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'Clear',      hex: '#BAE6FD' },
      { name: 'White',      hex: '#FFFFFF' },
    ],
    turnaround: '2–3 business days',
    rating: 4.5,
    reviewCount: 843,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '16',
    name: 'Perforated Window Film',
    category: 'Window Graphics',
    basePrice: 24.99,
    images: [
      'https://picsum.photos/seed/perfwindow-a/800/600',
      'https://picsum.photos/seed/perfwindow-b/800/600',
      'https://picsum.photos/seed/perfwindow-c/800/600',
    ],
    description:
      'See-through perforated window film lets you cover your storefront windows with bold graphics while maintaining visibility from inside. The 50/50 micro-perforation pattern looks solid from outside but transparent from within.',
    features: [
      '50/50 micro-perf pattern',
      'See-through from inside',
      'Pressure-sensitive adhesive',
      'UV-resistant outdoor inks',
      'Easy to install & remove',
    ],
    sizes: ['12" × 24"', '24" × 36"', '36" × 48"', '48" × 72"'],
    materials: ['50/50 Perf Film'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'Black Base', hex: '#1A1A1A' },
      { name: 'White Base', hex: '#FFFFFF' },
    ],
    turnaround: '2–3 business days',
    rating: 4.6,
    reviewCount: 429,
  },
  {
    id: '17',
    name: 'Frosted Window Decal',
    category: 'Window Graphics',
    basePrice: 19.99,
    images: [
      'https://picsum.photos/seed/frosted-a/800/600',
      'https://picsum.photos/seed/frosted-b/800/600',
      'https://picsum.photos/seed/frosted-c/800/600',
    ],
    description:
      'Add privacy and elegance with frosted window decals that mimic etched glass. Perfect for office partitions, conference rooms, and shower doors. Peel-and-stick installation with no tools required.',
    features: [
      'Frosted etched-glass appearance',
      'Peel-and-stick installation',
      'Provides privacy without blocking light',
      'Easy to reposition during install',
      'Cut to any custom shape',
    ],
    sizes: ['Custom sizes available', '12" × 12"', '12" × 36"', '24" × 36"'],
    materials: ['Frosted Vinyl', 'Etched Glass Film'],
    colors: [
      { name: 'Frosted Clear',  hex: '#E0F2FE' },
      { name: 'Frosted White',  hex: '#F0F9FF' },
      { name: 'Frosted Tint',   hex: '#CBD5E1' },
    ],
    turnaround: '2–3 business days',
    rating: 4.7,
    reviewCount: 567,
    newArrival: true,
    tag: 'New',
  },

  // ─── VEHICLE ───────────────────────────────────────────────────────────────
  {
    id: '18',
    name: 'Custom Car Magnet',
    category: 'Vehicle',
    basePrice: 19.99,
    images: [
      'https://picsum.photos/seed/carmagnet-a/800/600',
      'https://picsum.photos/seed/carmagnet-b/800/600',
      'https://picsum.photos/seed/carmagnet-c/800/600',
    ],
    description:
      'Turn any vehicle into a rolling billboard with our custom car magnets. Made from 30 mil magnetic material with a UV-protective laminate, they attach and remove without scratching your paint.',
    features: [
      '30 mil flexible magnetic backing',
      'UV-protective gloss laminate',
      'Attaches to any metal vehicle',
      'Weatherproof & fade-resistant',
      'Rounded corners for better hold',
    ],
    sizes: ['12" × 12"', '12" × 24"', '18" × 24"', '24" × 24"'],
    materials: ['Standard 30 mil', 'Heavy Duty 45 mil'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'White Base', hex: '#FFFFFF' },
      { name: 'Black Base', hex: '#1A1A1A' },
    ],
    turnaround: '2–3 business days',
    rating: 4.6,
    reviewCount: 1876,
    popular: true,
  },
  {
    id: '19',
    name: 'Truck Side Banner',
    category: 'Vehicle',
    basePrice: 89.99,
    images: [
      'https://picsum.photos/seed/truckbanner-a/800/600',
      'https://picsum.photos/seed/truckbanner-b/800/600',
      'https://picsum.photos/seed/truckbanner-c/800/600',
    ],
    description:
      'Maximize your fleet advertising with full-color truck side banners. Printed on heavy-duty 18 oz. vinyl with UV inks, these banners mount to truck rails and panels to transform your delivery vehicles into mobile billboards.',
    features: [
      '18 oz. heavy-duty vinyl',
      'Reinforced grommets every 18"',
      'Bungee cord mounting kit included',
      'High-visibility UV inks',
      'Custom sizes available',
    ],
    sizes: ["2' × 8'", "2' × 10'", "3' × 8'", "3' × 10'"],
    materials: ['18 oz. Vinyl'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'White Base', hex: '#FFFFFF' },
      { name: 'Black Base', hex: '#1A1A1A' },
    ],
    turnaround: '3–4 business days',
    rating: 4.7,
    reviewCount: 312,
    tag: 'Sale',
    discount: 15,
  },

  // ─── FLOOR GRAPHICS ────────────────────────────────────────────────────────
  {
    id: '20',
    name: 'Floor Decal',
    category: 'Floor Graphics',
    basePrice: 24.99,
    images: [
      'https://picsum.photos/seed/floordecal-a/800/600',
      'https://picsum.photos/seed/floordecal-b/800/600',
      'https://picsum.photos/seed/floordecal-c/800/600',
    ],
    description:
      'Custom floor decals transform your floors into a marketing canvas. Printed on ultra-durable vinyl with a non-skid laminate, they adhere firmly to tile, concrete, and hardwood floors while staying slip-resistant and safe.',
    features: [
      'Anti-skid textured laminate',
      'Adheres to tile, wood & concrete',
      'Removable without floor damage',
      'Indoor-rated up to 6 months',
      'Full-bleed custom printing',
    ],
    sizes: ['12" × 12"', '18" × 18"', '24" × 24"', '24" × 36"', '36" × 36"'],
    materials: ['Gloss Vinyl + Anti-Slip Laminate'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'White Base', hex: '#FFFFFF' },
      { name: 'Black Base', hex: '#1A1A1A' },
      { name: 'Clear',      hex: '#BAE6FD' },
    ],
    turnaround: '2–3 business days',
    rating: 4.5,
    reviewCount: 689,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '21',
    name: 'Anti-Slip Floor Sign',
    category: 'Floor Graphics',
    basePrice: 34.99,
    images: [
      'https://picsum.photos/seed/floorslip-a/800/600',
      'https://picsum.photos/seed/floorslip-b/800/600',
      'https://picsum.photos/seed/floorslip-c/800/600',
    ],
    description:
      'Safety meets branding with our anti-slip floor signs. Ideal for wet floor warnings, directional arrows, and social distancing markers. Meets ADA and safety compliance standards with a certified slip-resistant surface.',
    features: [
      'ADA-compliant slip-resistant surface',
      'R10 safety rating',
      'Adheres to all floor types',
      'Custom shapes available',
      'UV-stable full-color print',
    ],
    sizes: ['12" Round', '12" × 12"', '18" × 18"', '24" × 24"'],
    materials: ['Anti-Slip Vinyl (R10 rated)'],
    colors: [
      { name: 'Full Color',   hex: '#E8334A' },
      { name: 'Yellow Safety',hex: '#FCD34D' },
      { name: 'White',        hex: '#FFFFFF' },
      { name: 'Black',        hex: '#1A1A1A' },
    ],
    turnaround: '2–3 business days',
    rating: 4.7,
    reviewCount: 445,
  },
  {
    id: '22',
    name: 'Roll-Up Poster Stand',
    category: 'Trade Show',
    basePrice: 74.99,
    images: [
      'https://picsum.photos/seed/rollup-a/800/600',
      'https://picsum.photos/seed/rollup-b/800/600',
      'https://picsum.photos/seed/rollup-c/800/600',
    ],
    description:
      'A budget-friendly alternative to traditional banner stands. The roll-up poster stand features a slim aluminum base and telescoping support pole, perfect for retail environments, offices, and smaller events.',
    features: [
      'Slim aluminum base',
      'Telescoping height adjustment',
      'Lightweight carry bag included',
      'Easy graphic replacement',
      'Ideal for retail & office use',
    ],
    sizes: ['20" × 60"', '24" × 70"', '24" × 80"'],
    materials: ['Gloss Vinyl', 'Matte Vinyl'],
    colors: [
      { name: 'Full Color',   hex: '#E8334A' },
      { name: 'Silver Base',  hex: '#9CA3AF' },
      { name: 'Black Base',   hex: '#1A1A1A' },
    ],
    turnaround: '2–3 business days',
    rating: 4.6,
    reviewCount: 823,
    tag: 'Sale',
    discount: 10,
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1', productId: '1',
    userName: 'Sarah Mitchell', userAvatar: 'S',
    rating: 5, date: 'Mar 12, 2024',
    text: 'Absolutely stunning quality. The colors are way more vibrant than I expected and the material feels super premium. Shipped two days early too!',
    helpful: 47, verified: true,
  },
  {
    id: 'r2', productId: '1',
    userName: 'James Rodriguez', userAvatar: 'J',
    rating: 5, date: 'Mar 8, 2024',
    text: 'Used these for our grand opening. Every single person who walked in complimented the banners. Will definitely be a repeat customer.',
    helpful: 32, verified: true,
  },
  {
    id: 'r3', productId: '1',
    userName: 'Lisa Thompson', userAvatar: 'L',
    rating: 4, date: 'Feb 28, 2024',
    text: 'Really happy with the purchase. The banner looks great and was easy to hang. Only giving 4 stars because one grommet was slightly off-center, but customer service was quick to respond.',
    helpful: 18, verified: true,
  },
  {
    id: 'r4', productId: '5',
    userName: 'David Park', userAvatar: 'D',
    rating: 5, date: 'Mar 15, 2024',
    text: 'Set up in literally 45 seconds. My team was impressed. The print quality is exceptional — we\'ve had people at trade shows specifically ask where we got our banner stand.',
    helpful: 61, verified: true,
  },
  {
    id: 'r5', productId: '9',
    userName: 'Amanda Chen', userAvatar: 'A',
    rating: 5, date: 'Mar 1, 2024',
    text: 'Ordered 50 signs for a real estate campaign. Every single one came out perfect. The turnaround was incredible and the bulk discount saved us a ton.',
    helpful: 29, verified: true,
  },
  {
    id: 'r6', productId: '12',
    userName: 'Mike Johnson', userAvatar: 'M',
    rating: 4, date: 'Feb 20, 2024',
    text: 'Great paper quality and the colors matched my design file almost perfectly. Shipping was fast. The tube packaging kept everything pristine.',
    helpful: 14, verified: true,
  },
  {
    id: 'r7', productId: '3',
    userName: 'Rachel Green', userAvatar: 'R',
    rating: 5, date: 'Mar 18, 2024',
    text: 'These feather flags are incredible for our car dealership. They wave beautifully even in light wind and the double-sided print looks amazing from both directions.',
    helpful: 38, verified: true,
  },
  {
    id: 'r8', productId: '18',
    userName: 'Carlos Mendez', userAvatar: 'C',
    rating: 4, date: 'Mar 5, 2024',
    text: 'Magnets are strong and the print quality is great. They\'ve held up through rain and a car wash. Easy to put on and take off. Very satisfied.',
    helpful: 22, verified: true,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-0089',
    date: 'Mar 5, 2024',
    status: 'Delivered',
    total: 124.96,
    items: [
      { name: 'Premium Vinyl Banner', qty: 2, size: "3' × 6'" },
      { name: 'Corrugated Yard Sign', qty: 10, size: '18" × 24"' },
    ],
    trackingNumber: '1Z999AA10123456784',
  },
  {
    id: 'ORD-2024-0112',
    date: 'Mar 14, 2024',
    status: 'Shipped',
    total: 209.98,
    items: [
      { name: 'Retractable Banner Stand', qty: 2, size: '33" × 78"' },
      { name: 'Large Format Poster', qty: 4, size: '24" × 36"' },
    ],
    trackingNumber: '1Z999AA10123456785',
  },
  {
    id: 'ORD-2024-0134',
    date: 'Mar 20, 2024',
    status: 'In Production',
    total: 299.99,
    items: [
      { name: 'Pop-Up Display', qty: 1, size: '10 ft Curved' },
      { name: 'Premium Table Throw', qty: 1, size: '8 ft (3-sided)' },
    ],
  },
];
