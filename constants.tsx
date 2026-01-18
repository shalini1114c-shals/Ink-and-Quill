
import { Product } from './types';

export const BRANDS = [
  { name: 'Apsara', logo: 'https://picsum.photos/seed/apsara/200/200' },
  { name: 'Nataraj', logo: 'https://picsum.photos/seed/nataraj/200/200' },
  { name: 'Camlin', logo: 'https://picsum.photos/seed/camlin/200/200' },
  { name: 'Cello', logo: 'https://picsum.photos/seed/cello/200/200' },
  { name: 'Reynolds', logo: 'https://picsum.photos/seed/reynolds/200/200' },
  { name: 'Parker', logo: 'https://picsum.photos/seed/parker/200/200' },
  { name: 'Classmate', logo: 'https://picsum.photos/seed/classmate/200/200' },
  { name: 'Navneet', logo: 'https://picsum.photos/seed/navneet/200/200' },
  { name: 'Faber-Castell', logo: 'https://picsum.photos/seed/faber/200/200' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic Platinum Pencils Pack of 10',
    brand: 'Apsara',
    category: 'Stationery',
    subCategory: 'Pencils',
    price: 60,
    description: 'Dark and durable lead for smooth writing.',
    rating: 4.8,
    reviews: 1250,
    image: 'https://images.unsplash.com/photo-1516962080544-eac695c93791?auto=format&fit=crop&q=80&w=800',
    stock: 500,
    isPopular: true
  },
  {
    id: 'p2',
    name: 'Gel Tech Roller Ball Pen',
    brand: 'Cello',
    category: 'Stationery',
    subCategory: 'Pens',
    price: 15,
    description: 'Water-resistant ink for precise writing.',
    rating: 4.5,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800',
    stock: 1000
  },
  {
    id: 'p3',
    name: 'Premium Notebook A5 Unruled',
    brand: 'Classmate',
    category: 'Stationery',
    subCategory: 'Books & notebooks',
    price: 120,
    description: 'High-quality paper, eco-friendly bindings.',
    rating: 4.9,
    reviews: 850,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800',
    stock: 200,
    isPopular: true
  },
  {
    id: 'p4',
    name: 'Acrylic Paint Set 12 Colors',
    brand: 'Camlin',
    category: 'Drawing & Painting',
    subCategory: 'Acrylic paints',
    price: 450,
    description: 'Vibrant colors for canvas and wood.',
    rating: 4.7,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    stock: 50
  },
  {
    id: 'p5',
    name: 'Artist Grade Sketching Pencils',
    brand: 'Faber-Castell',
    category: 'Drawing & Painting',
    subCategory: 'Drawing pencils & charcoal',
    price: 850,
    description: 'Set of 12 grading pencils for professional sketching.',
    rating: 5.0,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
    stock: 80,
    isPopular: true
  },
  {
    id: 'p6',
    name: 'Ergonomic Student Backpack',
    brand: 'Skybags',
    category: 'School Bags',
    subCategory: 'School bags',
    price: 1899,
    description: 'Spacious compartments with rain cover included.',
    rating: 4.6,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    stock: 30
  },
  {
    id: 'p7',
    name: 'Vector Matte Black Fountain Pen',
    brand: 'Parker',
    category: 'Stationery',
    subCategory: 'Pens',
    price: 650,
    description: 'Iconic design with a stainless steel nib.',
    rating: 4.9,
    reviews: 980,
    image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&q=80&w=800',
    stock: 45
  },
  {
    id: 'p8',
    name: 'Sticky Notes Multi-color Pack',
    brand: '3M',
    category: 'Stationery',
    subCategory: 'Notes',
    price: 85,
    description: 'Strong adhesive and bright colors for indexing.',
    rating: 4.4,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=800',
    stock: 600
  },
  {
    id: 'p9',
    name: 'Watercolor Cakes Set of 24',
    brand: 'Camlin',
    category: 'Drawing & Painting',
    subCategory: 'Watercolors',
    price: 220,
    description: 'Rich pigments with high transparency.',
    rating: 4.6,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800',
    stock: 120
  }
];

export const CATEGORIES = [
  'Stationery',
  'Drawing & Painting',
  'School Bags',
  'Office Supplies'
];

export const POLICY_NOTE = "Exchange or return will be accepted only if the customer provides a proper product opening video or a valid genuine reason.";
