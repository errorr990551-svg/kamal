import React, { useState } from 'react';
import BrandHeader from '../components/BrandHeader';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { Search, Flame, Clock, Sparkles, Filter, ShoppingBag } from 'lucide-react';

export default function ProductsPage({ searchQuery, setSearchQuery, showToast }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // ALL TIME ON DEMAND products
  const onDemandProducts = [
    { id: 1, name: 'Kamal Special Urad Papad', size: '200g / 400g', desc: 'Hand-rolled traditional urad dal papad with black pepper & hing flavor.', cat: 'papad' },
    { id: 2, name: 'Crispy Butter Toast', size: '250g / 500g', desc: 'Double baked crispy tea time rusks rich in butter flavor.', cat: 'toast' },
    { id: 3, name: 'Bikaneri Taste Bhujia', size: '200g / 500g', desc: 'Authentic moth-bean flour bhujia with traditional spices.', cat: 'namkeen' },
    { id: 4, name: 'Moong Dal Papad', size: '200g / 400g', desc: 'Light, crunchy and easy to digest authentic moong papad.', cat: 'papad' },
    { id: 5, name: 'Special Ajwain Mathri', size: '250g', desc: 'Crispy savory flour bites seasoned with thymol seeds.', cat: 'namkeen' },
    { id: 6, name: 'Khatta Meetha Mix', size: '200g / 400g', desc: 'Perfect blend of sweet and tangy crunchy namkeen.', cat: 'namkeen' },
  ];

  // NEW ARRIVALS products
  const newArrivals = [
    { id: 7, name: 'Kamal Garlic Chana Papad', size: '250g', desc: 'Bold garlic infusion blended with spiced chana dal.', cat: 'papad' },
    { id: 8, name: 'Ratlami Sev Supreme', size: '200g / 500g', desc: 'Extra spicy clove & pepper infused thick chickpea noodles.', cat: 'namkeen' },
    { id: 9, name: 'Milk Elaichi Rusk Toast', size: '300g', desc: 'Aromatic cardamom flavored crispy milk toast.', cat: 'toast' },
    { id: 10, name: 'Spicy Masala Chana Jor', size: '200g', desc: 'Flattened roasted chickpeas spiced with chat masala.', cat: 'namkeen' },
  ];

  // COMING SOON products
  const comingSoonItems = [
    { name: 'Organic Jaggery Sweets', desc: 'Traditional healthy sweets crafted with pure organic gur.' },
    { name: 'Diet Roasted Wheat Namkeen', desc: 'Zero oil roasted healthy snacking option.' },
    { name: 'Premix Masala Tea Rusk', desc: 'Infused with ginger & cardamom spices.' },
  ];

  const filterItem = (item) => {
    const matchesSearch = searchQuery 
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCat = selectedCategory === 'all' || item.cat === selectedCategory;
    return matchesSearch && matchesCat;
  };

  const filteredOnDemand = onDemandProducts.filter(filterItem);
  const filteredNewArrivals = newArrivals.filter(filterItem);

  const handleInquiry = (productName) => {
    showToast({
      title: 'Inquiry Submitted',
      description: `Inquiry for "${productName}" sent! Our team will contact you.`,
    });
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      {/* Brand Header Banner */}
      <BrandHeader subtitle="Savour the authentic flavors in every bite" />

      <div className="max-w-7xl mx-auto px-4 space-y-10">

        {/* Header & Search Bar (Pencil wireframe element) */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-brand text-3xl font-extrabold text-stone-900">
                OUR PRODUCTS
              </h2>
              <p className="text-xs text-stone-500">Explore our full range of traditional delicacies</p>
            </div>

            {/* Integrated Search Bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH BAR - Find products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-red-900/20 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent shadow-xs"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap border-t border-stone-100 pt-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 mr-2">
              <Filter size={14} /> Filter:
            </span>
            {[
              { id: 'all', label: 'All Items' },
              { id: 'papad', label: 'Papads' },
              { id: 'toast', label: 'Toasts & Rusks' },
              { id: 'namkeen', label: 'Namkeen & Sev' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-red-900 text-amber-200 font-bold shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. ALL TIME ON DEMAND SECTION (Wireframe 1) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-red-900/20 pb-2">
            <h3 className="font-serif-brand text-2xl font-bold text-stone-900 flex items-center gap-2">
              <Flame className="text-red-800" size={24} />
              ALL TIME ON DEMAND:
            </h3>
            <span className="text-xs text-stone-500 font-semibold">{filteredOnDemand.length} Items</span>
          </div>

          {filteredOnDemand.length === 0 ? (
            <p className="text-stone-500 text-center py-8">No products found matching search filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOnDemand.map(product => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Image Area Frame (Wireframe 1: Product Small / Photo Product) */}
                    <ImagePlaceholder 
                      title={product.name} 
                      height="h-44" 
                      subtext="Photo Product Image Area" 
                    />
                    
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-serif-brand font-bold text-stone-900 text-base">
                          {product.name}
                        </h4>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                          {product.size}
                        </span>
                      </div>
                      <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                        {product.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInquiry(product.name)}
                    className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag size={14} /> Inquiry / Order Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 2. NEW ARRIVALS SECTION (Wireframe 1) */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b-2 border-amber-500/40 pb-2">
            <h3 className="font-serif-brand text-2xl font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="text-amber-600" size={24} />
              NEW ARRIVALS:
            </h3>
            <span className="text-xs text-stone-500 font-semibold">{filteredNewArrivals.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNewArrivals.map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="relative">
                    <span className="absolute top-2 left-2 z-10 text-[9px] font-extrabold uppercase bg-red-800 text-amber-100 px-2 py-0.5 rounded-md shadow-xs">
                      NEW
                    </span>
                    <ImagePlaceholder title={product.name} height="h-40" subtext="New Product Image Area" />
                  </div>
                  
                  <div>
                    <h4 className="font-serif-brand font-bold text-stone-900 text-sm">
                      {product.name}
                    </h4>
                    <p className="text-stone-500 text-[11px] mt-1 line-clamp-2">
                      {product.desc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleInquiry(product.name)}
                  className="w-full py-2 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-xs uppercase tracking-wider"
                >
                  Order Sample
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. COMING SOON SECTION (Wireframe 1 bottom left) */}
        <section className="bg-linear-to-r from-stone-900 via-red-950 to-stone-900 text-amber-100 rounded-3xl p-6 md:p-8 shadow-xl border border-amber-500/40 space-y-6">
          <div className="flex items-center gap-3">
            <Clock className="text-amber-400" size={28} />
            <div>
              <h3 className="font-serif-brand text-2xl font-bold text-white tracking-wide">
                COMING SOON
              </h3>
              <p className="text-xs text-amber-200/80">Exciting new flavors currently in development in our kitchen!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comingSoonItems.map((item, idx) => (
              <div key={idx} className="bg-stone-950/70 p-4 rounded-2xl border border-amber-500/30 space-y-2">
                <ImagePlaceholder title="Upcoming Product" height="h-32" subtext="Teaser Image Placeholder" />
                <h4 className="font-serif-brand font-bold text-amber-300 text-sm mt-2">
                  {item.name}
                </h4>
                <p className="text-stone-400 text-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
