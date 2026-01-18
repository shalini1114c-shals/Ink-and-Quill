
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="inline-flex p-8 bg-yellow-50 rounded-full mb-8">
           <ShoppingBag size={64} className="text-yellow-400" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Time to fill it with creative tools!</p>
        <Link to="/products" className="bg-gray-900 text-white px-12 py-4 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black mb-12 tracking-tight">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-3xl shadow-sm border hover:border-yellow-200 transition-all group">
              <Link to={`/product/${item.id}`} className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden mb-4 sm:mb-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </Link>
              <div className="flex-1 sm:ml-6 text-center sm:text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.brand}</span>
                <Link to={`/product/${item.id}`} className="block mt-1">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">{item.name}</h3>
                </Link>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center bg-gray-50 rounded-xl border p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-black text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-col items-center sm:items-end">
                    <span className="text-xl font-black">₹{item.price * item.quantity}</span>
                    <span className="text-xs text-gray-400">₹{item.price} each</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white rounded-[2rem] p-8 sticky top-24 shadow-2xl">
            <h2 className="text-2xl font-black mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-bold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated Shipping</span>
                <span className="text-white font-bold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest text-center mt-2">
                  Add ₹{500 - subtotal} more for FREE Delivery
                </p>
              )}
              <hr className="border-gray-800" />
              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-yellow-400">₹{total}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black text-lg hover:bg-yellow-300 transition-all flex items-center justify-center space-x-2"
            >
              <span>Secure Checkout</span>
              <ArrowRight size={20} />
            </Link>
            
            <div className="mt-8 grid grid-cols-2 gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-tighter text-center">
               <div className="p-3 border border-gray-800 rounded-xl">Secure Payments</div>
               <div className="p-3 border border-gray-800 rounded-xl">Easy Returns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
