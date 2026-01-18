
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ReturnRequest, Message } from '../types';

interface Notification {
  message: string;
  type: 'error' | 'success';
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  orders: Order[];
  placeOrder: (orderDetails: Omit<Order, 'id' | 'status' | 'date' | 'estimatedDelivery'>) => void;
  cancelOrder: (id: string) => void;
  returns: ReturnRequest[];
  submitReturn: (req: Omit<ReturnRequest, 'id' | 'status' | 'date'>) => void;
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  user: { name: string; email: string; phone: string; address: string } | null;
  login: (userData: any) => void;
  notification: Notification | null;
  setNotification: (notif: Notification | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<any>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      setNotification({ message: 'Item is currently out of stock', type: 'error' });
      return;
    }

    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      const currentQty = existing ? existing.quantity : 0;

      if (currentQty + 1 > product.stock) {
        setNotification({ 
          message: `Only ${product.stock} units available in stock`, 
          type: 'error' 
        });
        return prev;
      }

      setNotification({ message: 'Added to cart!', type: 'success' });
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  
  const updateQuantity = (id: string, qty: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      
      const newQty = Math.max(1, qty);
      if (newQty > item.stock) {
        setNotification({ 
          message: `Maximum stock limit (${item.stock}) reached`, 
          type: 'error' 
        });
        return prev;
      }
      
      return prev.map(i => i.id === id ? { ...i, quantity: newQty } : i);
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const placeOrder = (details: any) => {
    const newOrder: Order = {
      ...details,
      id: 'ORD' + Math.floor(Math.random() * 100000),
      status: 'Pending',
      date: new Date().toLocaleDateString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const cancelOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' as const } : o));
  };

  const submitReturn = (req: any) => {
    const newReturn: ReturnRequest = {
      ...req,
      id: 'RET' + Math.floor(Math.random() * 100000),
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };
    setReturns(prev => [newReturn, ...prev]);
  };

  const addMessage = (msg: any) => {
    setMessages(prev => [...prev, { ...msg, id: Date.now().toString(), timestamp: new Date() }]);
  };

  const login = (data: any) => setUser(data);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      wishlist, toggleWishlist,
      orders, placeOrder, cancelOrder,
      returns, submitReturn,
      messages, addMessage,
      user, login,
      notification, setNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
