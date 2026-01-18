
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ShieldCheck, Truck, RefreshCw, ChevronLeft, Minus, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, cart } = useApp();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === id);
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-black mb-4">Product Not Found</h2>
        <Link to="/products" className="text-yellow-600 font-bold underline">Back to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const cartItem = cart.find((i) => i.id === product.id);
  const availableStock = product.stock - (cartItem?.quantity || 0);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
      >
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-sm uppercase tracking-widest">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-[2rem] overflow-hidden bg-white border shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-xs font-black text-yellow-600 uppercase tracking-[0.3em]">{product.brand}</span>
            <h1 className="text-4xl font-black text-gray-900 mt-2 leading-tight">{product.name}</h1>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center bg-yellow-400/10 px-3 py-1 rounded-full">
                <Star size={16} className="text-yellow-500 fill-current" />
                <span className="ml-1 font-black text-yellow-700 text-sm">{product.rating}</span>
              </div>
              <span className="text-gray-400 text-sm font-medium">{product.reviews} customer reviews</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
              <span className="text-gray-400 line-through text-lg">₹{Math.floor(product.price * 1.2)}</span>
              <span className="text-green-600 font-bold text-sm uppercase tracking-wider">Save 20%</span>
            </div>
            <p className="text-gray-500 mt-4 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 mb-10">
            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="flex items-center space-x-4">
                <span className="font-bold text-gray-900 text-sm uppercase tracking-widest">Quantity</span>
                <div className="flex items-center bg-gray-100 rounded-2xl p-1 border">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-3 hover:bg-white rounded-xl transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(availableStock, prev + 1))}
                    className="p-3 hover:bg-white rounded-xl transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${availableStock < 10 ? 'text-red-500' : 'text-gray-400'}`}>
                  {availableStock} pieces left
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                disabled={isOutOfStock || availableStock <= 0}
                onClick={handleAddToCart}
                className={`flex-1 py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 transition-all ${
                  isOutOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-yellow-500 hover:text-black shadow-xl active:scale-95'
                }`}
              >
                <ShoppingCart size={22} />
                <span>{isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}</span>
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-center space-x-2 ${
                  isWishlisted 
                    ? 'bg-red-50 border-red-200 text-red-500 shadow-inner' 
                    : 'bg-white border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                <span className="font-bold sm:hidden">Wishlist</span>
              </button>
            </div>
          </div>

          {/* Trust Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-900">Free Delivery</p>
                <p className="text-[10px] text-gray-500 font-medium">Orders over ₹500</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <RefreshCw size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-900">Easy Returns</p>
                <p className="text-[10px] text-gray-500 font-medium">With video proof</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-900">100% Genuine</p>
                <p className="text-[10px] text-gray-500 font-medium">Authentic brands</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Recommended <span className="text-yellow-500">Items</span></h2>
            <Link to="/products" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">See all</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
