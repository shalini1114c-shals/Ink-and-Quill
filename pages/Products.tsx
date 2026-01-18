
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRANDS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const Products: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('category') || '';
  const initialSearch = params.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState(5000);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSearchQuery(initialSearch);
  }, [initialCategory, initialSearch]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = !selectedCategory || p.category === selectedCategory;
      const matchBrand = !selectedBrand || p.brand === selectedBrand;
      const matchPrice = p.price <= priceRange;
      return matchSearch && matchCategory && matchBrand && matchPrice;
    });
  }, [searchQuery, selectedCategory, selectedBrand, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Filter Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-lg font-black mb-4">Categories</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${!selectedCategory ? 'bg-yellow-400 font-bold' : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  All Items
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${selectedCategory === cat ? 'bg-yellow-400 font-bold' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <hr />

            <div>
              <h3 className="text-lg font-black mb-4">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
                <span>₹0</span>
                <span>₹{priceRange}</span>
              </div>
            </div>

            <hr />

            <div>
              <h3 className="text-lg font-black mb-4">Brands</h3>
              <div className="grid grid-cols-1 gap-2">
                {BRANDS.map(brand => (
                  <button 
                    key={brand.name}
                    onClick={() => setSelectedBrand(prev => prev === brand.name ? '' : brand.name)}
                    className={`text-left px-4 py-2 rounded-xl text-sm transition-all ${selectedBrand === brand.name ? 'bg-gray-900 text-white font-bold' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          <div className="flex lg:hidden items-center justify-between mb-6">
             <button 
               onClick={() => setIsFilterOpen(true)}
               className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full font-bold text-sm"
             >
               <SlidersHorizontal size={18} />
               <span>Filters</span>
             </button>
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredProducts.length} Products</span>
          </div>

          {/* Active Filters */}
          {(selectedCategory || selectedBrand || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <span className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                  <span>"{searchQuery}"</span>
                  <X size={12} className="cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center space-x-1 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold">
                  <span>{selectedCategory}</span>
                  <X size={12} className="cursor-pointer" onClick={() => setSelectedCategory('')} />
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="p-8 bg-gray-100 rounded-full mb-6">
                <Search size={48} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">No products found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSelectedCategory(''); setSelectedBrand(''); setPriceRange(5000); setSearchQuery(''); }}
                className="mt-6 font-bold text-yellow-600 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-slide-up lg:hidden overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}><X size={28} /></button>
            </div>
            {/* Same filter content as desktop sidebar */}
            <div className="space-y-8 pb-12">
               <div>
                  <h3 className="text-lg font-black mb-4">Category</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                        className={`text-left px-4 py-3 rounded-xl text-sm ${selectedCategory === cat ? 'bg-yellow-400 font-bold' : 'bg-gray-50'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
               </div>
               <div>
                  <h3 className="text-lg font-black mb-4">Price</h3>
                   <input 
                    type="range" 
                    min="0" 
                    max="5000" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none accent-yellow-400"
                  />
                  <div className="flex justify-between mt-2 font-bold">
                    <span>₹0</span>
                    <span>₹{priceRange}</span>
                  </div>
               </div>
               <button 
                 onClick={() => setIsFilterOpen(false)}
                 className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl"
               >
                 Show {filteredProducts.length} Results
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
