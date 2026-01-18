
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, Heart, User, Search, Menu, X, 
  ArrowLeft, MessageSquare, Phone, Instagram, Facebook,
  AlertCircle, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, wishlist, notification } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setIsMenuOpen(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919XXXXXXXXX', '_blank');
  };

  const isHome = location.pathname === '/';
  const showBackButton = !isHome && location.pathname !== '/admin';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] flex items-center space-x-3 px-6 py-4 rounded-2xl shadow-2xl animate-slide-down border ${
          notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'
        }`}>
          {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          <span className="font-bold text-sm tracking-tight">{notification.message}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="yellow-primary text-yellow-900 py-1 text-center text-xs font-semibold tracking-wide">
        FREE DELIVERY ON ORDERS ABOVE ₹500 | INDIA WIDE SHIPPING
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Left: Menu & Back Button */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <Menu size={24} />
              </button>
              {showBackButton && (
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Back"
                >
                  <ArrowLeft size={24} />
                </button>
              )}
              <Link to="/" className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tighter text-gray-900">STATIONARY<span className="text-yellow-500 underline decoration-4 underline-offset-4">THINGS</span></span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">Art & Office Essentials</span>
              </Link>
            </div>

            {/* Desktop Navigation & Search */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search brands, products, categories..."
                  className="w-full bg-gray-50 border-none rounded-full py-2 px-12 focus:ring-2 focus:ring-yellow-400 transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </form>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-1 sm:space-x-4">
              <Link to="/wishlist" className="p-2 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 rounded-full transition-all relative">
                <Heart size={22} fill={wishlist.length > 0 ? "currentColor" : "none"} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                )}
              </Link>
              <Link to="/cart" className="p-2 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 rounded-full transition-all relative">
                <ShoppingCart size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </Link>
              <Link to="/admin" className="hidden sm:flex items-center space-x-2 p-2 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 rounded-full transition-all">
                <User size={22} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="font-bold text-lg text-gray-900">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)}><X /></button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-100 rounded-lg py-2 px-10 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </form>
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-lg font-black text-gray-900 uppercase" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/products" className="text-lg font-black text-gray-900 uppercase" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
                <Link to="/wishlist" className="text-lg font-black text-gray-900 uppercase" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
                <Link to="/admin" className="text-lg font-black text-gray-900 uppercase" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                <hr className="border-gray-100" />
                <Link to="/contact" className="text-sm font-bold text-gray-400 uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                <Link to="/support" className="text-sm font-bold text-gray-400 uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>AI Support (DM)</Link>
                <Link to="/returns" className="text-sm font-bold text-gray-400 uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Returns</Link>
              </nav>
            </div>
            <div className="p-6 border-t yellow-primary text-yellow-900">
               <button onClick={handleWhatsApp} className="w-full flex items-center justify-center space-x-2 font-black uppercase text-xs">
                 <Phone size={16} />
                 <span>WhatsApp Support</span>
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black italic tracking-tighter">STATIONARY <span className="text-yellow-400 underline decoration-2 underline-offset-4">THINGS</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Your one-stop destination for premium stationery and professional art supplies in India. Bringing creativity to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="p-2 bg-gray-800 rounded-full hover:bg-yellow-500 transition-colors"><Instagram size={18} /></Link>
              <Link to="#" className="p-2 bg-gray-800 rounded-full hover:bg-yellow-500 transition-colors"><Facebook size={18} /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Navigation</h4>
            <ul className="space-y-4 text-gray-300 text-sm font-bold">
              <li><Link to="/products" className="hover:text-yellow-400 transition-colors">Full Collection</Link></li>
              <li><Link to="/admin" className="hover:text-yellow-400 transition-colors">Account Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-yellow-400 transition-colors">Track Orders</Link></li>
              <li><Link to="/support" className="hover:text-yellow-400 transition-colors">Direct Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Legal & Policy</h4>
            <ul className="space-y-4 text-gray-300 text-sm font-bold">
              <li><Link to="/shipping" className="hover:text-yellow-400 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-yellow-400 transition-colors">Privacy & Cookies</Link></li>
              <li><Link to="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/returns" className="hover:text-yellow-400 transition-colors">Exchange & Refunds</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Reach Out</h4>
            <ul className="space-y-4 text-gray-300 text-sm font-bold">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-yellow-500" />
                <span>+91 9XXXXXXXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <MessageSquare size={16} className="text-yellow-500" />
                <span>support@stationarythings.com</span>
              </li>
              <li className="mt-4">
                 <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-yellow-500 text-black font-black py-3 rounded-2xl hover:bg-yellow-400 transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-widest shadow-xl shadow-black/20"
                 >
                    <Phone size={16} />
                    <span>WhatsApp Chat</span>
                 </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Stationary Things India. Premium Quality Guaranteed.
        </div>
      </footer>
    </div>
  );
};
