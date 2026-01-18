
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, CreditCard, Smartphone, Banknote, ShieldCheck, 
  ChevronRight, MapPin, Phone, User, ShoppingBag, 
  ArrowLeft, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export const Checkout: React.FC = () => {
  const { cart, placeOrder, setNotification } = useApp();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Special handling for pincode to allow only numbers
    if (name === 'pincode') {
      const sanitized = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, [name]: sanitized }));
      return;
    }
    // Special handling for phone to allow only numbers
    if (name === 'phone') {
      const sanitized = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: sanitized }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setNotification({ message: 'Please enter your full name', type: 'error' });
      return false;
    }
    if (formData.phone.length !== 10) {
      setNotification({ message: 'Please enter a valid 10-digit mobile number', type: 'error' });
      return false;
    }
    if (formData.pincode.length !== 6) {
      setNotification({ message: 'Pincode must be exactly 6 digits', type: 'error' });
      return false;
    }
    if (!formData.address.trim()) {
      setNotification({ message: 'Delivery address cannot be empty', type: 'error' });
      return false;
    }
    if (!formData.city.trim()) {
      setNotification({ message: 'Please enter your city', type: 'error' });
      return false;
    }
    if (!formData.state.trim()) {
      setNotification({ message: 'Please enter your state', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      setNotification({ message: 'Your cart is empty', type: 'error' });
      return;
    }

    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      placeOrder({
        items: cart,
        total: total,
        customerName: formData.name,
        contactNumber: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      });
      setIsProcessing(false);
      navigate('/confirmation');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-fade-in">
        <div className="inline-flex p-8 bg-gray-100 rounded-full mb-8 text-gray-400">
          <ShoppingBag size={64} />
        </div>
        <h2 className="text-3xl font-black mb-4 text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some items before checking out!</p>
        <button onClick={() => navigate('/products')} className="bg-gray-900 text-white px-12 py-4 rounded-full font-bold">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="flex items-center space-x-4 mb-12">
        <button onClick={() => navigate('/cart')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase italic">Secure <span className="text-yellow-500">Checkout</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Shipping & Payment */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Shipping Details */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-12 overflow-hidden relative">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-yellow-400 text-black rounded-2xl">
                <MapPin size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Shipping Information</h2>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">
                  <User size={14} className="mr-2" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name" 
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-yellow-400 font-medium" 
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">
                  <Phone size={14} className="mr-2" /> Contact Number
                </label>
                <div className="flex items-center bg-gray-50 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
                  <span className="pl-4 font-bold text-gray-400">+91</span>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9XXXXXXXXX" 
                    className="w-full bg-transparent border-none p-4 focus:ring-0 font-medium" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">
                  <Truck size={14} className="mr-2" /> Pincode
                </label>
                <input 
                  type="text" 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="6 Digit PIN" 
                  maxLength={6}
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-yellow-400 font-medium" 
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Delivery Address</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3} 
                  placeholder="House No., Building Name, Street, Landmark" 
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-yellow-400 font-medium"
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">City</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. New Delhi"
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-yellow-400 font-medium" 
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">State</label>
                <input 
                  type="text" 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="e.g. Delhi"
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-yellow-400 font-medium" 
                  required
                />
              </div>
            </form>
          </div>

          {/* Section 2: Payment Options */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-yellow-400 text-black rounded-2xl">
                <CreditCard size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Payment Method</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'upi', label: 'UPI / PhonePe / GPay', icon: <Smartphone />, desc: 'Instant & Secure' },
                { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard />, desc: 'Visa, Mastercard, RuPay' },
                { id: 'netbanking', label: 'Net Banking', icon: <Smartphone />, desc: 'All Indian Banks' },
                { id: 'cod', label: 'Cash on Delivery', icon: <Banknote />, desc: 'Pay when you receive' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id as PaymentMethod)}
                  className={`flex items-start p-5 rounded-3xl border-2 transition-all text-left group ${
                    paymentMethod === opt.id 
                      ? 'border-yellow-400 bg-yellow-50 shadow-md translate-y-[-2px]' 
                      : 'border-gray-100 hover:border-yellow-200'
                  }`}
                >
                  <div className={`p-3 rounded-2xl mr-4 transition-colors ${
                    paymentMethod === opt.id ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-400 group-hover:text-yellow-500'
                  }`}>
                    {opt.icon}
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-tight text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-center space-x-3">
              <ShieldCheck className="text-green-600" size={20} />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                Your payment data is encrypted and secure.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 sm:p-10 sticky top-24 shadow-2xl border border-gray-800">
            <h3 className="text-2xl font-black mb-8 uppercase italic tracking-tighter">Your <span className="text-yellow-400">Order</span></h3>
            
            <div className="max-h-60 overflow-y-auto pr-2 mb-8 space-y-4 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-black text-yellow-400">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-800 mb-8">
              <div className="flex justify-between text-gray-400 font-bold uppercase text-xs">
                <span>Subtotal</span>
                <span className="text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-bold uppercase text-xs">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-400" : "text-white"}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="h-px bg-gray-800 my-4"></div>
              <div className="flex justify-between items-end">
                <span className="text-gray-400 font-black uppercase text-sm">To Pay</span>
                <span className="text-4xl font-black text-yellow-400 tracking-tighter">₹{total}</span>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`w-full py-5 rounded-[1.5rem] font-black text-xl uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3 transition-all ${
                isProcessing 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-yellow-400 text-black hover:bg-white active:scale-95 shadow-yellow-500/20'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-6 h-6 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Place Order</span>
                  <ChevronRight size={24} />
                </>
              )}
            </button>

            <div className="mt-8 flex items-center justify-center space-x-6 text-gray-500">
               <div className="flex flex-col items-center">
                 <CheckCircle2 size={16} className="text-yellow-400 mb-1" />
                 <span className="text-[8px] font-black uppercase">Genuine</span>
               </div>
               <div className="flex flex-col items-center">
                 <Truck size={16} className="text-yellow-400 mb-1" />
                 <span className="text-[8px] font-black uppercase">Safe Ship</span>
               </div>
               <div className="flex flex-col items-center">
                 <ShieldCheck size={16} className="text-yellow-400 mb-1" />
                 <span className="text-[8px] font-black uppercase">Secure</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
