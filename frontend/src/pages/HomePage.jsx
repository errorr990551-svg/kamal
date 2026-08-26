import React from 'react';
import BrandHeader from '../components/BrandHeader';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { ArrowRight, Sparkles, Award, Utensils, HeartHandshake } from 'lucide-react';

export default function HomePage({ setActiveTab, searchQuery }) {
  // Favourite item icons from wireframe 1
  const favouriteItems = [
    { name: 'Special Papad', tag: 'Best Seller' },
    { name: 'Crispy Toast', tag: 'Daily Favorite' },
    { name: 'Bikaneri Bhujia', tag: 'Spicy Delight' },
    { name: 'Mix Namkeen', tag: 'Crunchy' },
    { name: 'Mathri', tag: 'Traditional' },
    { name: 'Sweets', tag: 'Festive' },
    { name: 'Chana Jor', tag: 'Tasty' },
    { name: 'Ratlami Sev', tag: 'Classic' },
  ];

  const filteredItems = searchQuery
    ? favouriteItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : favouriteItems;

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      {/* Brand Header Banner (Matching Image 3 & top of wireframe 1) */}
      <BrandHeader subtitle="Savour the authentic flavors in every bite" />

      <div className="max-w-7xl mx-auto px-4 space-y-12">

        {/* HERO SECTION (Wireframe 1: "IMAGES COMING HERO SECTION") */}
        <section className="bg-linear-to-b from-stone-900 to-red-950 text-amber-100 rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-amber-500/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} /> Premium Quality Authentic Snacks
              </div>
              <h2 className="font-serif-brand text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Authentic Taste, <br />
                <span className="text-amber-400 underline decoration-amber-500/40">Crafted With Perfection</span>
              </h2>
              <p className="text-stone-300 text-sm md:text-base max-w-xl leading-relaxed">
                Welcome to <strong className="text-amber-200">Kamal Brand</strong>. We specialize in bringing traditional Indian papad, toasts, namkeens, and hampers right to your table with uncompromising purity and flavor.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-sm shadow-lg hover:shadow-amber-400/20 transition-all flex items-center gap-2"
                >
                  Explore Products <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setActiveTab('dealership')}
                  className="px-6 py-3 rounded-full bg-red-900/60 hover:bg-red-800 text-amber-100 font-bold text-sm border border-amber-500/40 transition-all"
                >
                  Apply For Dealership
                </button>
              </div>
            </div>

            {/* Hero Right Image Frame (Wireframe 1: Hero Section empty image area) */}
            <div className="lg:col-span-6">
              <div className="bg-stone-950/80 p-4 rounded-2xl border border-amber-500/30 shadow-2xl">
                <ImagePlaceholder 
                  title="HERO SECTION - BRAND BANNER IMAGES" 
                  height="h-64 md:h-80" 
                  subtext="Images Coming - Main Hero Showcase" 
                  className="bg-stone-900/90 text-amber-100 border-amber-500/40"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-amber-200/80 px-2 font-medium">
                  <span>✦ 100% Hygienic Processing</span>
                  <span>✦ Traditional Spices</span>
                  <span>✦ Sealed Freshness</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YOUR FAVOURITE ITEMS (Wireframe 1: Circular Item Thumbnails Section) */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif-brand text-2xl md:text-4xl font-extrabold text-stone-900 flex items-center justify-center gap-3">
              <Utensils className="text-red-800" size={28} />
              YOUR FAVOURITE ITEMS
            </h2>
            <p className="text-stone-500 text-xs md:text-sm">
              Discover our most loved authentic recipe creations
            </p>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-4">
            {filteredItems.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveTab('products')}
                className="group cursor-pointer bg-amber-50/40 hover:bg-red-50/50 p-4 rounded-2xl border border-stone-200 hover:border-red-800/40 transition-all flex flex-col items-center text-center shadow-xs hover:shadow-md"
              >
                {/* Round Circular Image Frame (Matching pencil drawing circles) */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-600/30 bg-stone-100 overflow-hidden flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform mb-3">
                  {/* Empty Circular Image Area */}
                  <div className="flex flex-col items-center justify-center text-stone-400 p-2">
                    <svg className="w-8 h-8 text-red-900/30 mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-[10px] font-bold text-stone-400">Empty Image</span>
                  </div>
                </div>

                <h3 className="font-serif-brand font-bold text-stone-900 text-sm md:text-base group-hover:text-red-900 transition-colors">
                  {item.name}
                </h3>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mt-1">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* THE TASTE WE ARE DELIVERING (Wireframe 1 section) */}
        <section className="bg-stone-900 text-amber-100 rounded-3xl p-6 md:p-10 shadow-xl border border-amber-500/30 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <ImagePlaceholder 
              title="THE TASTE WE ARE DELIVERING" 
              height="h-56 md:h-72" 
              subtext="Images Coming - Taste & Quality Showcase" 
            />
          </div>
          
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Award size={18} /> Quality & Craftsmanship
            </div>
            <h3 className="font-serif-brand text-2xl md:text-4xl font-bold text-white leading-snug">
              THE TASTE WE ARE DELIVERING
            </h3>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              Every package from <strong className="text-amber-300">Kamal Brand</strong> carries decades of secret spice blends, sun-dried traditional papads, and freshly baked toasts prepared under strict hygienic conditions.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-800/80 border border-amber-500/20">
                <span className="font-bold text-amber-300 text-sm block">100% Natural</span>
                <span className="text-stone-400">No harmful chemical preservatives</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/80 border border-amber-500/20">
                <span className="font-bold text-amber-300 text-sm block">Hygienic Unit</span>
                <span className="text-stone-400">State of the art packing</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('about')}
                className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                Learn More About Us <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
