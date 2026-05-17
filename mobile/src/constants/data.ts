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
  { id: '1', name: 'Neon Signs',       icon: 'highlight',       count: 8,  image: 'https://picsum.photos/seed/cat-neon/400/260' },
  { id: '2', name: 'LED Signs',        icon: 'lightbulb',       count: 6,  image: 'https://picsum.photos/seed/cat-led/400/260' },
  { id: '3', name: 'Channel Letters',  icon: 'text-fields',     count: 5,  image: 'https://picsum.photos/seed/cat-channel/400/260' },
  { id: '4', name: 'Outdoor Signs',    icon: 'storefront',      count: 7,  image: 'https://picsum.photos/seed/cat-outdoor/400/260' },
  { id: '5', name: 'Indoor Signs',     icon: 'meeting-room',    count: 6,  image: 'https://picsum.photos/seed/cat-indoor/400/260' },
  { id: '6', name: 'Lobby & Office',   icon: 'business',        count: 5,  image: 'https://picsum.photos/seed/cat-lobby/400/260' },
  { id: '7', name: 'Illuminated',      icon: 'wb-incandescent', count: 4,  image: 'https://picsum.photos/seed/cat-illuminated/400/260' },
  { id: '8', name: 'Custom Shapes',    icon: 'category',        count: 3,  image: 'https://picsum.photos/seed/cat-shapes/400/260' },
];

export const products: Product[] = [
  // ─── NEON SIGNS ───────────────────────────────────────────────────────────
  {
    id: '1',
    name: 'Custom LED Neon Sign',
    category: 'Neon Signs',
    basePrice: 89.99,
    images: [
      'https://picsum.photos/seed/neon1-a/800/600',
      'https://picsum.photos/seed/neon1-b/800/600',
      'https://picsum.photos/seed/neon1-c/800/600',
    ],
    description:
      'Make your space unforgettable with a fully custom LED neon sign. Built with flexible LED neon flex tubing on a clear or black acrylic backing, these signs deliver the iconic glow of traditional neon at a fraction of the energy cost. Perfect for bars, restaurants, studios, retail stores, and events.',
    features: [
      'Flexible LED neon flex tubing',
      'Clear or black acrylic backing',
      'Dimmable with included remote',
      '80% more energy efficient than glass neon',
      'Custom text, logo, or shape',
    ],
    sizes: ['12" × 6"', '18" × 9"', '24" × 12"', '36" × 18"', '48" × 24"'],
    materials: ['LED Neon Flex', 'Glass Neon Tube'],
    colors: [
      { name: 'Warm White',  hex: '#FFD580' },
      { name: 'Cool White',  hex: '#E0F0FF' },
      { name: 'Neon Red',    hex: '#FF3B3B' },
      { name: 'Neon Pink',   hex: '#FF6EB4' },
      { name: 'Neon Blue',   hex: '#00BFFF' },
      { name: 'Neon Green',  hex: '#39FF14' },
    ],
    turnaround: '5–7 business days',
    rating: 4.9,
    reviewCount: 2841,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '2',
    name: 'Bar & Restaurant Neon Sign',
    category: 'Neon Signs',
    basePrice: 119.99,
    images: [
      'https://picsum.photos/seed/neon2-a/800/600',
      'https://picsum.photos/seed/neon2-b/800/600',
      'https://picsum.photos/seed/neon2-c/800/600',
    ],
    description:
      'Draw in customers from the street with a vivid bar or restaurant neon sign. Pre-designed layouts include Open, Bar, Coffee, Beer, and Wine, or go fully custom. Includes wall-mount hardware and a 6-foot power cord.',
    features: [
      'Pre-designed & custom options',
      'Wall-mount hardware included',
      '6 ft power cord',
      'Weatherproof for window display',
      'Energy-saving LED technology',
    ],
    sizes: ['16" × 8"', '24" × 12"', '32" × 16"', '40" × 20"'],
    materials: ['LED Neon Flex'],
    colors: [
      { name: 'Neon Red',    hex: '#FF3B3B' },
      { name: 'Neon Yellow', hex: '#FFE600' },
      { name: 'Neon Blue',   hex: '#00BFFF' },
      { name: 'Neon Pink',   hex: '#FF6EB4' },
      { name: 'Warm White',  hex: '#FFD580' },
    ],
    turnaround: '5–7 business days',
    rating: 4.8,
    reviewCount: 1524,
    popular: true,
    tag: 'Top Rated',
  },
  {
    id: '3',
    name: 'Wedding & Event Neon Sign',
    category: 'Neon Signs',
    basePrice: 99.99,
    images: [
      'https://picsum.photos/seed/neon3-a/800/600',
      'https://picsum.photos/seed/neon3-b/800/600',
      'https://picsum.photos/seed/neon3-c/800/600',
    ],
    description:
      'Create a show-stopping focal point for weddings, birthdays, and corporate events. Choose from romantic script phrases or upload your own design. Lightweight, safe for indoor use, and battery-operable for venues without nearby outlets.',
    features: [
      'Script font or custom design',
      'Battery or plug-in power options',
      'Lightweight acrylic backing',
      'Hanging wire & stand options',
      'Ideal for photo backdrops',
    ],
    sizes: ['18" × 9"', '24" × 12"', '36" × 18"', '48" × 24"'],
    materials: ['LED Neon Flex'],
    colors: [
      { name: 'Warm White',  hex: '#FFD580' },
      { name: 'Neon Pink',   hex: '#FF6EB4' },
      { name: 'Neon Gold',   hex: '#FFD700' },
      { name: 'Neon Purple', hex: '#BF5FFF' },
      { name: 'Cool White',  hex: '#E0F0FF' },
    ],
    turnaround: '5–7 business days',
    rating: 4.9,
    reviewCount: 987,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '4',
    name: 'Logo Neon Sign',
    category: 'Neon Signs',
    basePrice: 149.99,
    images: [
      'https://picsum.photos/seed/neon4-a/800/600',
      'https://picsum.photos/seed/neon4-b/800/600',
      'https://picsum.photos/seed/neon4-c/800/600',
    ],
    description:
      'Turn your brand logo into a glowing neon masterpiece. Our designers hand-trace your artwork and craft each piece to match your exact logo shape. Available in multi-color configurations for complex logos.',
    features: [
      'Precision logo tracing by designers',
      'Multi-color configurations available',
      'UV-resistant acrylic backing',
      'Remote dimmer included',
      'Indoor & outdoor rated versions',
    ],
    sizes: ['18" × 12"', '24" × 16"', '36" × 24"', '48" × 32"'],
    materials: ['LED Neon Flex', 'Glass Neon Tube'],
    colors: [
      { name: 'Neon Red',    hex: '#FF3B3B' },
      { name: 'Neon Blue',   hex: '#00BFFF' },
      { name: 'Neon Green',  hex: '#39FF14' },
      { name: 'Warm White',  hex: '#FFD580' },
      { name: 'Multi-Color', hex: '#E8334A' },
    ],
    turnaround: '7–10 business days',
    rating: 4.8,
    reviewCount: 632,
    tag: 'Sale',
    discount: 15,
  },

  // ─── LED SIGNS ─────────────────────────────────────────────────────────────
  {
    id: '5',
    name: 'LED Lightbox Sign',
    category: 'LED Signs',
    basePrice: 179.99,
    images: [
      'https://picsum.photos/seed/led1-a/800/600',
      'https://picsum.photos/seed/led1-b/800/600',
      'https://picsum.photos/seed/led1-c/800/600',
    ],
    description:
      'Slim-profile LED lightbox signs create even, edge-to-edge illumination that makes your graphics pop day and night. The snap-open aluminum frame allows graphic changes in seconds without tools — ideal for menus, promotions, and directories.',
    features: [
      'Snap-open aluminum frame',
      'Even edge-to-edge LED backlighting',
      'Graphic swap in under 60 seconds',
      'Ultra-slim 1.2" depth profile',
      'Single & double-sided options',
    ],
    sizes: ['18" × 24"', '24" × 36"', '24" × 48"', '36" × 48"', '48" × 72"'],
    materials: ['Aluminum Frame + LED Panel', 'Stainless Steel Frame'],
    colors: [
      { name: 'Silver Frame', hex: '#9CA3AF' },
      { name: 'Black Frame',  hex: '#1A1A1A' },
      { name: 'White Frame',  hex: '#FFFFFF' },
    ],
    turnaround: '4–6 business days',
    rating: 4.8,
    reviewCount: 1893,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '6',
    name: 'Programmable LED Message Board',
    category: 'LED Signs',
    basePrice: 139.99,
    images: [
      'https://picsum.photos/seed/led2-a/800/600',
      'https://picsum.photos/seed/led2-b/800/600',
      'https://picsum.photos/seed/led2-c/800/600',
    ],
    description:
      'Update your message anytime with a programmable LED scrolling sign. High-brightness LEDs are visible from 150+ feet in direct sunlight. Program via USB or free smartphone app with 200+ animation effects.',
    features: [
      '200+ animation effects',
      'Visible 150+ ft in sunlight',
      'USB & smartphone app programming',
      'Weatherproof outdoor housing',
      'Auto-brightness adjustment',
    ],
    sizes: ['12" × 4"', '24" × 6"', '40" × 8"', '60" × 8"'],
    materials: ['High-Brightness LED Matrix'],
    colors: [
      { name: 'Red LEDs',    hex: '#FF3B3B' },
      { name: 'Green LEDs',  hex: '#39FF14' },
      { name: 'Blue LEDs',   hex: '#00BFFF' },
      { name: 'Full Color',  hex: '#E8334A' },
    ],
    turnaround: '3–5 business days',
    rating: 4.6,
    reviewCount: 754,
    newArrival: true,
    tag: 'New',
  },

  // ─── CHANNEL LETTERS ───────────────────────────────────────────────────────
  {
    id: '7',
    name: 'Illuminated Channel Letters',
    category: 'Channel Letters',
    basePrice: 299.99,
    images: [
      'https://picsum.photos/seed/channel1-a/800/600',
      'https://picsum.photos/seed/channel1-b/800/600',
      'https://picsum.photos/seed/channel1-c/800/600',
    ],
    description:
      'Front-lit channel letters are the gold standard for storefront signage. Each letter is individually fabricated from aluminum with a colored acrylic face and internal LED modules that provide brilliant, even illumination visible from a distance.',
    features: [
      'Individual aluminum letter fabrication',
      'Colored acrylic face options',
      'Internal LED module illumination',
      'Raceway or direct-mount installation',
      'UL-listed for commercial use',
    ],
    sizes: ['6" letter height', '8" letter height', '12" letter height', '18" letter height', '24" letter height'],
    materials: ['Aluminum + Acrylic Face', 'Stainless Steel + Acrylic'],
    colors: [
      { name: 'White Face',  hex: '#FFFFFF' },
      { name: 'Red Face',    hex: '#DC2626' },
      { name: 'Blue Face',   hex: '#1D4ED8' },
      { name: 'Green Face',  hex: '#16A34A' },
      { name: 'Yellow Face', hex: '#FCD34D' },
      { name: 'Custom Color',hex: '#E8334A' },
    ],
    turnaround: '10–14 business days',
    rating: 4.9,
    reviewCount: 412,
    popular: true,
    tag: 'Top Rated',
  },
  {
    id: '8',
    name: 'Halo-Lit Channel Letters',
    category: 'Channel Letters',
    basePrice: 349.99,
    images: [
      'https://picsum.photos/seed/channel2-a/800/600',
      'https://picsum.photos/seed/channel2-b/800/600',
      'https://picsum.photos/seed/channel2-c/800/600',
    ],
    description:
      'Halo-lit (reverse-lit) channel letters project a dramatic glowing halo onto the mounting wall, creating a luxurious, upscale look. Favored by high-end retail, hotels, and corporate headquarters.',
    features: [
      'Reverse-lit halo glow effect',
      'Brushed or painted aluminum face',
      'Multiple halo color options',
      'Wall standoff for even halo spread',
      'Premium upscale appearance',
    ],
    sizes: ['8" letter height', '12" letter height', '18" letter height', '24" letter height'],
    materials: ['Aluminum + Open Back', 'Stainless Steel Face'],
    colors: [
      { name: 'White Halo',  hex: '#FFFFFF' },
      { name: 'Warm Halo',   hex: '#FFD580' },
      { name: 'Blue Halo',   hex: '#00BFFF' },
      { name: 'Red Halo',    hex: '#FF3B3B' },
      { name: 'Custom Halo', hex: '#E8334A' },
    ],
    turnaround: '10–14 business days',
    rating: 4.8,
    reviewCount: 289,
    tag: 'Sale',
    discount: 10,
  },

  // ─── OUTDOOR SIGNS ─────────────────────────────────────────────────────────
  {
    id: '9',
    name: 'Aluminum Monument Sign',
    category: 'Outdoor Signs',
    basePrice: 399.99,
    images: [
      'https://picsum.photos/seed/outdoor1-a/800/600',
      'https://picsum.photos/seed/outdoor1-b/800/600',
      'https://picsum.photos/seed/outdoor1-c/800/600',
    ],
    description:
      'Make a bold first impression at your property entrance with a custom aluminum monument sign. Powder-coated for maximum weather resistance, these signs are built to withstand years of outdoor exposure without fading, rusting, or cracking.',
    features: [
      'Heavy-gauge aluminum construction',
      'Powder-coated for weather resistance',
      'UV-stable full-color printing',
      'Post-mount or ground-mount options',
      '10-year warranty against fading',
    ],
    sizes: ['24" × 18"', '36" × 24"', '48" × 32"', '60" × 36"'],
    materials: ['0.080" Aluminum', '0.125" Heavy Gauge Aluminum', 'Dibond Composite'],
    colors: [
      { name: 'Full Color',    hex: '#E8334A' },
      { name: 'Bronze Finish', hex: '#8B6914' },
      { name: 'Black',         hex: '#1A1A1A' },
      { name: 'Brushed Silver',hex: '#9CA3AF' },
      { name: 'White',         hex: '#FFFFFF' },
    ],
    turnaround: '5–7 business days',
    rating: 4.8,
    reviewCount: 1021,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '10',
    name: 'Outdoor Pylon Sign Panel',
    category: 'Outdoor Signs',
    basePrice: 259.99,
    images: [
      'https://picsum.photos/seed/outdoor2-a/800/600',
      'https://picsum.photos/seed/outdoor2-b/800/600',
      'https://picsum.photos/seed/outdoor2-c/800/600',
    ],
    description:
      'High-visibility pylon sign panels are engineered for pole-mounted roadside signage. The .080" aluminum substrate resists wind loads and UV degradation, keeping your message vivid and readable from highway speeds.',
    features: [
      '.080" aluminum for wind resistance',
      'UV-stable digital print',
      'Pre-drilled mounting holes',
      'Suitable for single & double-faced cabinets',
      'Reflective options for night visibility',
    ],
    sizes: ['24" × 24"', '36" × 36"', '48" × 48"', '48" × 96"'],
    materials: ['0.080" Aluminum', 'Reflective Aluminum', 'ACM Composite'],
    colors: [
      { name: 'Full Color',  hex: '#E8334A' },
      { name: 'White Base',  hex: '#FFFFFF' },
      { name: 'Black Base',  hex: '#1A1A1A' },
    ],
    turnaround: '4–6 business days',
    rating: 4.7,
    reviewCount: 563,
    newArrival: true,
    tag: 'New',
  },
  {
    id: '11',
    name: 'Dibond Outdoor Business Sign',
    category: 'Outdoor Signs',
    basePrice: 79.99,
    images: [
      'https://picsum.photos/seed/outdoor3-a/800/600',
      'https://picsum.photos/seed/outdoor3-b/800/600',
      'https://picsum.photos/seed/outdoor3-c/800/600',
    ],
    description:
      'Dibond aluminum composite signs combine the rigidity of aluminum with a lightweight core, making them perfect for outdoor storefronts, fences, and post-mount applications. Flat-panel design with a sleek professional finish.',
    features: [
      'Aluminum composite material (ACM)',
      'Rigid & lightweight',
      'Pre-drilled mounting holes',
      'UV-laminated digital print',
      'Rust-proof & weatherproof',
    ],
    sizes: ['12" × 18"', '18" × 24"', '24" × 36"', '36" × 48"'],
    materials: ['3mm Dibond ACM', '6mm Dibond ACM'],
    colors: [
      { name: 'Full Color',    hex: '#E8334A' },
      { name: 'Brushed Silver',hex: '#9CA3AF' },
      { name: 'Matte Black',   hex: '#1A1A1A' },
      { name: 'White',         hex: '#FFFFFF' },
    ],
    turnaround: '3–5 business days',
    rating: 4.7,
    reviewCount: 2134,
    popular: true,
    tag: 'Sale',
    discount: 20,
  },

  // ─── INDOOR SIGNS ──────────────────────────────────────────────────────────
  {
    id: '12',
    name: 'ADA Compliant Room Sign',
    category: 'Indoor Signs',
    basePrice: 49.99,
    images: [
      'https://picsum.photos/seed/indoor1-a/800/600',
      'https://picsum.photos/seed/indoor1-b/800/600',
      'https://picsum.photos/seed/indoor1-c/800/600',
    ],
    description:
      'Meet ADA compliance requirements with our tactile room identification signs. Features Grade 2 Braille, raised lettering, and non-glare finishes as required by the Americans with Disabilities Act. Ideal for offices, hospitals, schools, and public buildings.',
    features: [
      'ADA & ANSI A117.1 compliant',
      'Grade 2 Braille included',
      'Raised tactile lettering',
      'Non-glare matte finish',
      'Adhesive or screw-mount options',
    ],
    sizes: ['6" × 8"', '6" × 9"', '8" × 8"', '9" × 6"'],
    materials: ['Acrylic', 'Aluminum', 'PVC Foam'],
    colors: [
      { name: 'Black on White',  hex: '#1A1A1A' },
      { name: 'White on Black',  hex: '#FFFFFF' },
      { name: 'Blue on White',   hex: '#1D4ED8' },
      { name: 'Custom Colors',   hex: '#E8334A' },
    ],
    turnaround: '3–4 business days',
    rating: 4.8,
    reviewCount: 876,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '13',
    name: 'Wayfinding Directional Sign',
    category: 'Indoor Signs',
    basePrice: 69.99,
    images: [
      'https://picsum.photos/seed/indoor2-a/800/600',
      'https://picsum.photos/seed/indoor2-b/800/600',
      'https://picsum.photos/seed/indoor2-c/800/600',
    ],
    description:
      'Guide visitors effortlessly through your facility with custom wayfinding signs. Modular systems allow you to stack multiple directional arrows and department names on a single post, keeping your space organized and professional.',
    features: [
      'Modular stackable design',
      'Directional arrow options',
      'Post-mount or wall-mount',
      'Consistent brand look across facility',
      'Easy panel swap for updates',
    ],
    sizes: ['4" × 18"', '4" × 24"', '6" × 24"', '6" × 36"'],
    materials: ['Aluminum', 'Acrylic', 'PVC'],
    colors: [
      { name: 'Full Color',    hex: '#E8334A' },
      { name: 'Black',         hex: '#1A1A1A' },
      { name: 'White',         hex: '#FFFFFF' },
      { name: 'Brushed Metal', hex: '#9CA3AF' },
    ],
    turnaround: '3–5 business days',
    rating: 4.7,
    reviewCount: 541,
    newArrival: true,
    tag: 'New',
  },

  // ─── LOBBY & OFFICE ────────────────────────────────────────────────────────
  {
    id: '14',
    name: 'Dimensional Lobby Logo Sign',
    category: 'Lobby & Office',
    basePrice: 249.99,
    images: [
      'https://picsum.photos/seed/lobby1-a/800/600',
      'https://picsum.photos/seed/lobby1-b/800/600',
      'https://picsum.photos/seed/lobby1-c/800/600',
    ],
    description:
      'Make a lasting impression in your reception area with a stunning 3D dimensional lobby sign. Precision-cut from brushed aluminum or acrylic and mounted with standoffs for a floating effect, these signs radiate professionalism and brand pride.',
    features: [
      'Precision CNC-cut letters & logos',
      'Standoff mounting for floating effect',
      'Brushed aluminum or painted acrylic',
      'Easy installation with template',
      'Custom logo or text',
    ],
    sizes: ['18" × 6"', '24" × 9"', '36" × 12"', '48" × 18"', '60" × 18"'],
    materials: ['Brushed Aluminum', 'Painted Acrylic', 'Brushed Gold', 'Chrome'],
    colors: [
      { name: 'Brushed Silver', hex: '#9CA3AF' },
      { name: 'Brushed Gold',   hex: '#D4AF37' },
      { name: 'Matte Black',    hex: '#1A1A1A' },
      { name: 'Chrome',         hex: '#C0C0C0' },
      { name: 'Custom Color',   hex: '#E8334A' },
    ],
    turnaround: '7–10 business days',
    rating: 4.9,
    reviewCount: 734,
    popular: true,
    tag: 'Top Rated',
  },
  {
    id: '15',
    name: 'Acrylic Office Nameplate',
    category: 'Lobby & Office',
    basePrice: 24.99,
    images: [
      'https://picsum.photos/seed/lobby2-a/800/600',
      'https://picsum.photos/seed/lobby2-b/800/600',
      'https://picsum.photos/seed/lobby2-c/800/600',
    ],
    description:
      'Sleek and modern acrylic nameplates for desks, doors, and walls. Available in clear, frosted, or colored acrylic with engraved or UV-printed text. Magnetic backing or adhesive options allow tool-free installation.',
    features: [
      'Clear, frosted, or colored acrylic',
      'Engraved or UV-printed text',
      'Desk stand, wall mount, or door mount',
      'Magnetic backing for easy updates',
      'Premium polished edges',
    ],
    sizes: ['3" × 8"', '4" × 10"', '4" × 12"', '6" × 10"'],
    materials: ['Clear Acrylic', 'Frosted Acrylic', 'Black Acrylic'],
    colors: [
      { name: 'Clear',         hex: '#BAE6FD' },
      { name: 'Frosted',       hex: '#E0F2FE' },
      { name: 'Black',         hex: '#1A1A1A' },
      { name: 'Gold',          hex: '#D4AF37' },
      { name: 'Silver',        hex: '#9CA3AF' },
    ],
    turnaround: '2–3 business days',
    rating: 4.7,
    reviewCount: 1289,
    newArrival: true,
    tag: 'New',
  },

  // ─── ILLUMINATED ───────────────────────────────────────────────────────────
  {
    id: '16',
    name: 'Backlit Fabric Display',
    category: 'Illuminated',
    basePrice: 319.99,
    images: [
      'https://picsum.photos/seed/illum1-a/800/600',
      'https://picsum.photos/seed/illum1-b/800/600',
      'https://picsum.photos/seed/illum1-c/800/600',
    ],
    description:
      'Backlit SEG (Silicone Edge Graphic) fabric displays create a stunning illuminated wall of imagery perfect for trade shows, retail environments, and event backdrops. The dye-sublimation fabric graphic snaps into the aluminum frame for a seamless, wrinkle-free look.',
    features: [
      'SEG silicone edge graphic system',
      'Even LED backlighting',
      'Wrinkle-free dye-sublimation fabric',
      'Lightweight aluminum frame',
      'Graphic swap in under 2 minutes',
    ],
    sizes: ['3 ft × 4 ft', '4 ft × 8 ft', '6 ft × 8 ft', '8 ft × 10 ft', '10 ft × 10 ft'],
    materials: ['Backlit Fabric + LED Frame'],
    colors: [
      { name: 'Full Color', hex: '#E8334A' },
      { name: 'Silver Frame', hex: '#9CA3AF' },
      { name: 'Black Frame',  hex: '#1A1A1A' },
    ],
    turnaround: '5–7 business days',
    rating: 4.8,
    reviewCount: 467,
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: '17',
    name: 'Illuminated Cabinet Sign',
    category: 'Illuminated',
    basePrice: 489.99,
    images: [
      'https://picsum.photos/seed/illum2-a/800/600',
      'https://picsum.photos/seed/illum2-b/800/600',
      'https://picsum.photos/seed/illum2-c/800/600',
    ],
    description:
      'Single and double-faced illuminated cabinet signs are the most versatile commercial sign product available. Welded aluminum cabinets house energy-efficient LED packs behind translucent acrylic faces printed with your graphics.',
    features: [
      'Welded aluminum cabinet construction',
      'Energy-efficient LED interior',
      'Translucent acrylic face',
      'Single or double-faced',
      'UL-listed electrical components',
    ],
    sizes: ['24" × 18"', '36" × 24"', '48" × 36"', '60" × 48"'],
    materials: ['Aluminum Cabinet + Acrylic', 'Stainless Cabinet + Acrylic'],
    colors: [
      { name: 'White Cabinet', hex: '#FFFFFF' },
      { name: 'Black Cabinet', hex: '#1A1A1A' },
      { name: 'Aluminum',      hex: '#9CA3AF' },
    ],
    turnaround: '10–14 business days',
    rating: 4.7,
    reviewCount: 198,
    tag: 'Sale',
    discount: 12,
  },

  // ─── CUSTOM SHAPES ─────────────────────────────────────────────────────────
  {
    id: '18',
    name: 'Custom Shape Acrylic Sign',
    category: 'Custom Shapes',
    basePrice: 59.99,
    images: [
      'https://picsum.photos/seed/shape1-a/800/600',
      'https://picsum.photos/seed/shape1-b/800/600',
      'https://picsum.photos/seed/shape1-c/800/600',
    ],
    description:
      'Go beyond the rectangle with a custom-cut acrylic sign in any shape you can imagine. CNC-routed from premium cast acrylic with polished edges, these signs are perfect for logo cutouts, mascots, unique store décor, and branded installations.',
    features: [
      'CNC-routed to any custom shape',
      'Polished or painted edges',
      'UV-printed or engraved graphics',
      'Standoff or adhesive mounting',
      'Multiple acrylic colors & finishes',
    ],
    sizes: ['Up to 12" × 12"', 'Up to 24" × 24"', 'Up to 36" × 36"', 'Up to 48" × 48"'],
    materials: ['Clear Cast Acrylic', 'Colored Cast Acrylic', 'Frosted Acrylic', 'Mirror Acrylic'],
    colors: [
      { name: 'Clear',        hex: '#BAE6FD' },
      { name: 'Frosted',      hex: '#E0F2FE' },
      { name: 'Black',        hex: '#1A1A1A' },
      { name: 'White',        hex: '#FFFFFF' },
      { name: 'Mirror Gold',  hex: '#D4AF37' },
      { name: 'Mirror Silver',hex: '#9CA3AF' },
    ],
    turnaround: '4–6 business days',
    rating: 4.8,
    reviewCount: 892,
    popular: true,
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1', productId: '1',
    userName: 'Sarah Mitchell', userAvatar: 'S',
    rating: 5, date: 'Mar 12, 2024',
    text: 'Absolutely stunning quality. We put the custom neon sign in our coffee shop window and foot traffic increased noticeably. Every customer comments on it!',
    helpful: 52, verified: true,
  },
  {
    id: 'r2', productId: '1',
    userName: 'James Rodriguez', userAvatar: 'J',
    rating: 5, date: 'Mar 8, 2024',
    text: 'The LED neon sign for our bar has been on 12+ hours a day for 6 months and still looks perfect. Way brighter than I expected and the remote dimmer is a great touch.',
    helpful: 38, verified: true,
  },
  {
    id: 'r3', productId: '5',
    userName: 'Lisa Thompson', userAvatar: 'L',
    rating: 4, date: 'Feb 28, 2024',
    text: 'The lightbox sign looks incredibly professional in our lobby. Swapping the graphic was genuinely as easy as they claim. Only minor complaint is the packaging could be more protective.',
    helpful: 21, verified: true,
  },
  {
    id: 'r4', productId: '7',
    userName: 'David Park', userAvatar: 'D',
    rating: 5, date: 'Mar 15, 2024',
    text: 'Our channel letter sign transformed the whole frontage of our store. The illumination at night is exactly what I pictured. The installation team they recommended was great too.',
    helpful: 67, verified: true,
  },
  {
    id: 'r5', productId: '14',
    userName: 'Amanda Chen', userAvatar: 'A',
    rating: 5, date: 'Mar 1, 2024',
    text: 'The 3D lobby sign exceeded every expectation. The brushed gold finish is luxurious and the floating standoff mount looks so clean. Our clients are always impressed.',
    helpful: 44, verified: true,
  },
  {
    id: 'r6', productId: '9',
    userName: 'Mike Johnson', userAvatar: 'M',
    rating: 4, date: 'Feb 20, 2024',
    text: 'Solid aluminum monument sign, colors are vibrant and the powder coating feels very durable. Ordering was easy and it shipped faster than expected.',
    helpful: 17, verified: true,
  },
  {
    id: 'r7', productId: '3',
    userName: 'Rachel Green', userAvatar: 'R',
    rating: 5, date: 'Mar 18, 2024',
    text: 'Ordered the wedding neon sign as a backdrop and it was the star of the whole reception. Warm white script looks magical in photos. Rented it to two other couples already!',
    helpful: 41, verified: true,
  },
  {
    id: 'r8', productId: '18',
    userName: 'Carlos Mendez', userAvatar: 'C',
    rating: 5, date: 'Mar 5, 2024',
    text: 'Custom shape acrylic signs for our retail displays came out perfectly. The polished edges are chef\'s kiss — looks super high-end at a very reasonable price.',
    helpful: 29, verified: true,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-0089',
    date: 'Mar 5, 2024',
    status: 'Delivered',
    total: 269.98,
    items: [
      { name: 'Custom LED Neon Sign', qty: 1, size: '24" × 12"' },
      { name: 'ADA Compliant Room Sign', qty: 4, size: '6" × 8"' },
    ],
    trackingNumber: '1Z999AA10123456784',
  },
  {
    id: 'ORD-2024-0112',
    date: 'Mar 14, 2024',
    status: 'Shipped',
    total: 479.98,
    items: [
      { name: 'LED Lightbox Sign', qty: 2, size: '24" × 36"' },
      { name: 'Acrylic Office Nameplate', qty: 4, size: '4" × 10"' },
    ],
    trackingNumber: '1Z999AA10123456785',
  },
  {
    id: 'ORD-2024-0134',
    date: 'Mar 20, 2024',
    status: 'In Production',
    total: 599.98,
    items: [
      { name: 'Dimensional Lobby Logo Sign', qty: 1, size: '36" × 12"' },
      { name: 'Illuminated Channel Letters', qty: 1, size: '12" letter height' },
    ],
  },
];
