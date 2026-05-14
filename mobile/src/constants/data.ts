export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  image: string;
  description: string;
  sizes: string[];
  materials: string[];
  turnaround: string;
  popular?: boolean;
  new?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
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
  { id: '1', name: 'Banners', icon: 'flag', count: 24, color: '#E94560' },
  { id: '2', name: 'Yard Signs', icon: 'location-pin', count: 18, color: '#3B82F6' },
  { id: '3', name: 'Posters', icon: 'image', count: 32, color: '#10B981' },
  { id: '4', name: 'Window Graphics', icon: 'storefront', count: 15, color: '#F59E0B' },
  { id: '5', name: 'Trade Show', icon: 'business', count: 21, color: '#8B5CF6' },
  { id: '6', name: 'Vehicle Wraps', icon: 'directions-car', count: 12, color: '#EF4444' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Vinyl Banner',
    category: 'Banners',
    basePrice: 29.99,
    image: 'https://placehold.co/400x300/E94560/FFF?text=Vinyl+Banner',
    description: 'Full-color vinyl banners printed on 13 oz. outdoor vinyl. Perfect for events, storefronts, and promotions. Weather-resistant and durable.',
    sizes: ['2\' x 4\'', '2\' x 6\'', '3\' x 6\'', '3\' x 8\'', '4\' x 8\'', '4\' x 10\''],
    materials: ['13 oz. Vinyl', '18 oz. Heavy Duty', 'Mesh Vinyl'],
    turnaround: '2-3 business days',
    popular: true,
  },
  {
    id: '2',
    name: 'Retractable Banner Stand',
    category: 'Banners',
    basePrice: 89.99,
    image: 'https://placehold.co/400x300/3B82F6/FFF?text=Retractable+Banner',
    description: 'Professional retractable banner stands with full-color printing. Lightweight and easy to set up for trade shows and events.',
    sizes: ['24\' x 78\'', '33\' x 78\'', '36\' x 84\''],
    materials: ['Standard', 'Premium'],
    turnaround: '3-4 business days',
    popular: true,
  },
  {
    id: '3',
    name: 'Corrugated Yard Sign',
    category: 'Yard Signs',
    basePrice: 12.99,
    image: 'https://placehold.co/400x300/10B981/FFF?text=Yard+Sign',
    description: 'Double-sided corrugated plastic yard signs with wire stakes included. Great for real estate, political, and event advertising.',
    sizes: ['12\' x 18\'', '18\' x 24\'', '24\' x 36\''],
    materials: ['4mm Coroplast', '6mm Heavy Duty'],
    turnaround: '2-3 business days',
    popular: true,
  },
  {
    id: '4',
    name: 'Foam Board Poster',
    category: 'Posters',
    basePrice: 18.99,
    image: 'https://placehold.co/400x300/F59E0B/FFF?text=Foam+Board',
    description: 'Rigid foam board prints for displays, presentations, and mounting. Lightweight yet sturdy with a professional finish.',
    sizes: ['11\' x 14\'', '16\' x 20\'', '18\' x 24\'', '24\' x 36\''],
    materials: ['3/16" Foam Board', '1/2" Foam Board'],
    turnaround: '2-3 business days',
  },
  {
    id: '5',
    name: 'Window Cling',
    category: 'Window Graphics',
    basePrice: 14.99,
    image: 'https://placehold.co/400x300/8B5CF6/FFF?text=Window+Cling',
    description: 'Static cling window graphics that adhere without glue. Removable and repositionable — ideal for storefronts and promotions.',
    sizes: ['8\' x 10\'', '12\' x 12\'', '12\' x 24\'', '24\' x 24\''],
    materials: ['Clear Cling', 'White Cling', 'Perforated (See-Through)'],
    turnaround: '2-3 business days',
    new: true,
  },
  {
    id: '6',
    name: 'Table Throw',
    category: 'Trade Show',
    basePrice: 119.99,
    image: 'https://placehold.co/400x300/EF4444/FFF?text=Table+Throw',
    description: 'Custom printed table throws for trade shows and events. Machine washable, wrinkle-resistant fabric with vibrant full-color printing.',
    sizes: ['6 ft. Table', '8 ft. Table'],
    materials: ['Polyester Fabric', 'Stretch Spandex'],
    turnaround: '4-5 business days',
    new: true,
  },
  {
    id: '7',
    name: 'Poster Print',
    category: 'Posters',
    basePrice: 8.99,
    image: 'https://placehold.co/400x300/06B6D4/FFF?text=Poster+Print',
    description: 'High-resolution poster printing on premium paper stock. Perfect for events, offices, and retail displays.',
    sizes: ['11\' x 17\'', '18\' x 24\'', '24\' x 36\'', '36\' x 48\''],
    materials: ['Matte Paper', 'Gloss Paper', 'Satin Paper'],
    turnaround: '1-2 business days',
    popular: true,
  },
  {
    id: '8',
    name: 'Car Magnet',
    category: 'Vehicle Wraps',
    basePrice: 19.99,
    image: 'https://placehold.co/400x300/F97316/FFF?text=Car+Magnet',
    description: 'Custom vehicle magnets for mobile advertising. 30 mil magnetic material with UV laminate protection.',
    sizes: ['12\' x 12\'', '12\' x 24\'', '18\' x 24\'', '24\' x 24\''],
    materials: ['Standard 30 mil', 'Heavy Duty 45 mil'],
    turnaround: '2-3 business days',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: 'Jan 28, 2024',
    status: 'Delivered',
    total: 89.97,
    items: [
      { name: 'Vinyl Banner', qty: 2, size: '3\' x 6\'' },
      { name: 'Yard Sign', qty: 5, size: '18\' x 24\'' },
    ],
    trackingNumber: '1Z999AA10123456784',
  },
  {
    id: 'ORD-2024-002',
    date: 'Feb 5, 2024',
    status: 'Shipped',
    total: 119.99,
    items: [{ name: 'Retractable Banner Stand', qty: 1, size: '33\' x 78\'' }],
    trackingNumber: '1Z999AA10123456785',
  },
  {
    id: 'ORD-2024-003',
    date: 'Feb 14, 2024',
    status: 'In Production',
    total: 45.98,
    items: [
      { name: 'Foam Board Poster', qty: 3, size: '18\' x 24\'' },
      { name: 'Window Cling', qty: 2, size: '12\' x 12\'' },
    ],
  },
];
