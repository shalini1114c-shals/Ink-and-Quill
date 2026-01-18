
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Ban } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, cart } = useApp();
  const isWishlisted = wishlist.some(p => p.id === product.id);
  const cartItem = cart.find(i => i.id === product.id);
  const isOutOfStock = product.stock <= 0;
  const isAtStockLimit = cartItem && cartItem.quantity >= product.stock;

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-yellow-200 ${isOutOfStock ? 'opacity-75 grayscale-[0.5]' : ''}`}>
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
        <button 
          onClick={() => toggleWishlist(product)}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-black font-black px-4 py-2 rounded-lg text-xs uppercase tracking-widest shadow-xl">Out of Stock</span>
          </div>
        )}
        {!isOutOfStock && product.isPopular && (
          <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
            Popular
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</span>
          <div className="flex items-center text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold ml-1">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="block group-hover:text-yellow-600 transition-colors">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px] leading-tight mb-3">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-black text-gray-900">₹{product.price}</span>
            <span className={`text-[10px] font-bold uppercase ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
              {isOutOfStock ? 'Currently Unavailable' : 'Free Delivery'}
            </span>
          </div>
          <button 
            disabled={isOutOfStock || isAtStockLimit}
            onClick={() => addToCart(product)}
            className={`p-2 sm:p-3 rounded-xl transition-all active:scale-90 ${
              isOutOfStock || isAtStockLimit 
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                : 'bg-gray-900 text-white hover:bg-yellow-500 hover:text-yellow-900 shadow-lg'
            }`}
            title={isOutOfStock ? "Out of Stock" : isAtStockLimit ? "Stock Limit Reached" : "Add to Cart"}
          >
            {isAtStockLimit ? <Ban size={20} /> : <ShoppingCart size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
