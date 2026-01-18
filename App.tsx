
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';
import { Wishlist } from './pages/Wishlist';
import { ProductDetail } from './pages/ProductDetail';
import { Policy } from './pages/Policy';
import { Returns } from './pages/Returns';
import { Support } from './pages/Support';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ConfirmationPage = () => (
  <div className="max-w-xl mx-auto px-4 py-32 text-center">
     <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
     </div>
     <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase italic">Order <span className="text-yellow-500">Placed!</span></h1>
     <p className="text-gray-500 mb-12 font-medium">Thank you for shopping with Stationary Things. Your order #ORD82736 is being processed and will be shipped soon.</p>
     <div className="bg-gray-50 p-8 rounded-[2rem] border border-dashed border-gray-200 mb-12 text-left">
        <h4 className="font-black text-sm uppercase tracking-widest text-gray-900 mb-2">Estimated Delivery</h4>
        <p className="text-gray-500 font-medium">Your package will arrive in <span className="text-gray-900 font-black">3-5 Business Days</span> via our priority shipping partner.</p>
     </div>
     <button onClick={() => window.location.hash = '#/'} className="bg-gray-900 text-white px-12 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-yellow-400 hover:text-black transition-all shadow-xl">Return Home</button>
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Admin />} />
            <Route path="/shipping" element={<Policy type="shipping" />} />
            <Route path="/privacy" element={<Policy type="privacy" />} />
            <Route path="/terms" element={<Policy type="terms" />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
