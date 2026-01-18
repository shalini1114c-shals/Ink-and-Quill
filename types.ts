
export type Category = 'Stationery' | 'Drawing & Painting' | 'School Bags' | 'Office Supplies';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  subCategory: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  stock: number;
  isPopular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  customerName: string;
  contactNumber: string;
  address: string;
  estimatedDelivery: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  reason: string;
  videoProofUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
