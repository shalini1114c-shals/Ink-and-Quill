
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, PenTool, Book, ShoppingBag, ShieldCheck } from 'lucide-react';
import { PRODUCTS, BRANDS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const featured = PRODUCTS.filter(p => p.isPopular).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pb-12 sm:pb-24 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold animate-bounce">
              <Sparkles size={16} />
              <span>New Arrivals for School Session 2024</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-gray-900 leading-[1.1] tracking-tighter">
              Create More,<br />
              <span className="text-yellow-500">Worry Less.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-md leading-relaxed">
              Explore India's largest collection of premium stationery and art supplies. From daily notebooks to professional canvas sets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition-all flex items-center space-x-2"
              >
                <span>Shop All Items</span>
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/products?category=Drawing+%26+Painting" 
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all"
              >
                Art Supplies
              </Link>
            </div>
            <div className="flex items-center space-x-8 pt-4">
               <div className="flex flex-col">
                  <span className="text-2xl font-black">50k+</span>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Happy Customers</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black">200+</span>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Global Brands</span>
               </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-yellow-400/10 rounded-full blur-3xl"></div>
             <img 
               src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200" 
               alt="Stationery Layout" 
               className="relative rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
             />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
              <p className="text-gray-500 mt-2">Everything you need, organized perfectly.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Stationery', icon: <PenTool />, color: 'bg-blue-50', text: 'text-blue-600', img: 'https://images.unsplash.com/photo-1516962080544-eac695c93791?q=80&w=400' },
              { name: 'Art Supplies', icon: <Sparkles />, color: 'bg-purple-50', text: 'text-purple-600', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400' },
              { name: 'Notebooks', icon: <Book />, color: 'bg-orange-50', text: 'text-orange-600', img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=400' },
              { name: 'School Bags', icon: <ShoppingBag />, color: 'bg-teal-50', text: 'text-teal-600', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400' },
            ].map((cat, i) => (
              <Link 
                key={i} 
                to={`/products?category=${cat.name}`}
                className="group relative h-64 overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all"
              >
                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className={`p-3 rounded-2xl w-fit mb-3 ${cat.color} ${cat.text}`}>
                    {cat.icon}
                  </div>
                  <span className="text-xl font-bold">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col items-center text-center mb-12">
             <h2 className="text-4xl font-black text-gray-900 tracking-tight">Best Sellers</h2>
             <div className="h-1.5 w-24 bg-yellow-400 mt-4 rounded-full"></div>
             <p className="text-gray-500 mt-6 max-w-lg">Our most loved stationery items chosen by students and professionals across India.</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
             {featured.map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
           <div className="mt-12 text-center">
              <Link to="/products" className="inline-block px-12 py-4 border-2 border-gray-900 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-all">
                 View Full Collection
              </Link>
           </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-12">Authorized Retailer For</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
             {BRANDS.map((brand, i) => (
               <div key={i} className="flex flex-col items-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                 <img src={brand.logo} className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-white shadow-sm" alt={brand.name} />
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{brand.name}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Policy Note Section */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="inline-block p-4 bg-white rounded-3xl mb-8">
             <ShieldCheck size={48} className="text-yellow-500" />
           </div>
           <h2 className="text-3xl font-black text-yellow-900 mb-6">Our Commitment to You</h2>
           <p className="text-xl text-yellow-800 font-medium leading-relaxed italic">
             "Exchange or return will be accepted only if the customer provides a proper product opening video or a valid genuine reason."
           </p>
           <p className="mt-8 text-yellow-900/60 text-sm font-bold uppercase tracking-widest">Safety First • Genuine Products • Assured Quality</p>
        </div>
      </section>
    </div>
  );
};
