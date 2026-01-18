
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight, Ban } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Wishlist: React.FC = () => {
  const { wishlist, addToCart, toggleWishlist, cart } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-fade-in">
        <div className="inline-flex p-8 bg-red-50 rounded-full mb-8">
           <Heart size={64} className="text-red-400" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Save your favorite stationery and art supplies here to buy them later.</p>
        <Link to="/products" className="bg-gray-900 text-white px-12 py-4 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition-all">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 italic uppercase">Saved <span className="text-yellow-500 underline decoration-4 underline-offset-8">Treasures</span></h1>
          <p className="text-gray-500 mt-4 font-medium">{wishlist.length} saved items for your creative journey</p>
        </div>
        <button 
          onClick={() => {
            wishlist.forEach(p => addToCart(p));
          }}
          className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-95"
        >
          <ShoppingCart size={20} />
          <span>Move All to Cart</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {wishlist.map((product) => {
          const cartItem = cart.find(i => i.id === product.id);
          const isOutOfStock = product.stock <= 0;
          const isAtStockLimit = cartItem && cartItem.quantity >= product.stock;

          return (
            <div key={product.id} className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ${isOutOfStock ? 'opacity-80' : ''}`}>
              <div className="flex flex-col sm:flex-row p-4 gap-6">
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="w-full sm:w-40 aspect-square rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isOutOfStock ? 'grayscale' : ''}`} 
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-black font-black px-3 py-1 rounded text-[10px] uppercase">Sold Out</span>
                    </div>
                  )}
                </Link>
                
                {/* Product Info */}
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</span>
                      {/* Clear Remove Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                        title="Remove from wishlist"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <Link to={`/product/${product.id}`} className="block mt-1">
                      <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 hover:text-yellow-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-gray-900">₹{product.price}</span>
                        {cartItem && <span className="text-[10px] text-yellow-600 font-bold uppercase">{cartItem.quantity} in cart</span>}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                        {isOutOfStock ? 'Out of Stock' : 'Available'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button 
                      disabled={isOutOfStock || isAtStockLimit}
                      onClick={() => addToCart(product)}
                      className={`flex-grow py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md active:scale-95 ${
                        isOutOfStock || isAtStockLimit 
                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' 
                          : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300'
                      }`}
                    >
                      {isAtStockLimit ? <Ban size={14} /> : <ShoppingCart size={14} />}
                      <span>{isAtStockLimit ? 'Stock Limit' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative bottom bar on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-16 bg-white rounded-[3rem] p-8 sm:p-16 text-center border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <h3 className="text-3xl font-black text-gray-900 mb-6 relative">Ready to Checkout?</h3>
        <p className="text-gray-500 mb-10 max-w-xl mx-auto text-lg relative font-medium">Your creative tools are waiting. Head over to your cart to complete your order and start creating.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          <Link 
            to="/cart" 
            className="w-full sm:w-auto bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black transition-all shadow-xl"
          >
            Go to Cart
          </Link>
          <Link 
            to="/products" 
            className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
