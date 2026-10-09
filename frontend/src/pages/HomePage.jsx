import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Award, Utensils } from 'lucide-react';

// Product card with auto-sliding images (without-number image first, then packet images)
function SlidingProductCard({ product, index, onSelect }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (product.images.length <= 1) return;

    // Stagger slide intervals slightly so not all cards animate simultaneously
    const staggerDelay = (index % 4) * 450;
    let intervalId;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1) % product.images.length);
      }, 2600);
    }, staggerDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [product.images.length, index]);

  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer bg-white/95 hover:bg-amber-50/70 p-4 sm:p-5 rounded-2xl border-2 border-stone-200/80 hover:border-amber-500/70 transition-all duration-300 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1"
    >
      {/* Circular Image Frame matching wireframe drawing */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-amber-500/40 bg-stone-50 overflow-hidden flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform mb-2 p-1.5">
        {product.images.map((img, imgIdx) => (
          <img
            key={img}
            src={img}
            alt={`${product.name} ${imgIdx + 1}`}
            className={`absolute inset-0 w-full h-full object-contain p-1.5 transition-all duration-700 ease-in-out ${
              imgIdx === currentImgIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
          />
        ))}
      </div>

      {/* Auto Slide Indicator Dots if multiple pictures */}
      {product.images.length > 1 && (
        <div className="flex items-center justify-center gap-1 my-1.5">
          {product.images.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === currentImgIndex
                  ? 'w-4 bg-amber-500'
                  : 'w-1.5 bg-stone-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Product Name from image filename */}
      <h3 className="font-serif-brand font-bold text-stone-900 text-sm sm:text-base group-hover:text-red-900 transition-colors mt-1">
        {product.name}
      </h3>

      {/* Badge / Tag */}
      <span className="text-[11px] font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full mt-1.5 border border-amber-300/40">
        {product.tag}
      </span>
    </div>
  );
}

export default function HomePage({ setActiveTab, searchQuery }) {
  // All 10 products using all 22 pictures from public folder in WebP format
  // Un-numbered image is strictly placed at index 0 (first), followed by numbered packaging variants
  const favouriteProducts = [
    {
      id: 'bhujiya',
      name: 'Bhujiya',
      tag: 'Classic Namkeen',
      images: ['/BHUJIYA.webp', '/bhujia1.webp', '/bhujia2.webp'],
    },
    {
      id: 'chana-dal',
      name: 'Chana Dal',
      tag: 'Spicy & Crunchy',
      images: ['/chana dal.webp', '/CHANA DAL2.webp'],
    },
    {
      id: 'fried-chura',
      name: 'Fried Chura',
      tag: 'Crispy Poha Mix',
      images: ['/fried chura.webp', '/fried chura2.webp'],
    },
    {
      id: 'fulghatia',
      name: 'Fulghatia',
      tag: 'Traditional Taste',
      images: ['/fulghatia.webp', '/fulghatia1.webp', '/fulghatia2.webp'],
    },
    {
      id: 'jhal-chanachur',
      name: 'Jhal Chanachur',
      tag: 'Spicy Bengal Mix',
      images: ['/Jhal Chanachur.webp', '/Jhal Chanachur1.webp', '/Jhal Chanachur2.webp'],
    },
    {
      id: 'masala-matar',
      name: 'Masala Matar',
      tag: 'Chatpata Green Peas',
      images: ['/Masala Matar.webp', '/Masala Matar2.webp'],
    },
    {
      id: 'mitha-chanachur',
      name: 'Mitha Chanachur',
      tag: 'Sweet & Tangy',
      images: ['/Mitha Chanachur.webp', '/Mitha Chanachur1.webp', '/Mitha Chanachur2.webp'],
    },
    {
      id: 'papdighatia',
      name: 'Papdighatia',
      tag: 'Crispy Tea Snack',
      images: ['/Papdighatia.webp', '/Papdighatia1.webp', '/Papdighatia2.webp'],
    },
    {
      id: 'salted-peanuts',
      name: 'Salted Peanuts',
      tag: 'Crunchy Roasted',
      images: ['/saltedpeanuts.webp', '/salted peanuts2.webp'],
    },
    {
      id: 'sew',
      name: 'Sew',
      tag: 'Golden Crisp Sev',
      images: ['/sew.webp', '/sew1.webp', '/sew2.webp'],
    },
  ];

  const filteredProducts = searchQuery
    ? favouriteProducts.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : favouriteProducts;

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      
      {/* HERO SECTION: Left margin se sata ke, text clear and balanced */}
      <section className="w-full relative overflow-hidden bg-red-950 shadow-2xl border-b-4 border-amber-500/60">
        <div className="relative w-full hero-banner-frame flex items-center">
          
          {/* Banner Graphic Image from public/kamal banner.webp */}
          <img
            src="/kamal banner.webp"
            alt="Kamal Brand Namkeen Banner"
            className="absolute inset-0 w-full h-full object-cover object-right md:object-center select-none"
          />

          {/* Left subtle gradient overlay to ensure text readability while letting right side packets pop */}
          <div className="absolute inset-0 bg-linear-to-r from-red-950/95 via-red-950/70 to-transparent w-full md:w-3/5 lg:w-1/2 pointer-events-none" />

          {/* Left Content Overlay: Shifted closer to the left margin */}
          <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 py-12 md:py-16">
            <div className="max-w-xl text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-xs">
                <Sparkles size={16} /> Swad Aur Shuddhata Ka Bharosa
              </div>

              {/* Exact Tagline requested: Taste Jo Dil Mein Bas Jaaye, Quality Jo Bharosa Ban Jaaye */}
              <h1 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                Taste Jo Dil Mein Bas Jaaye,<br />
                <span className="text-amber-300 drop-shadow-md">
                  Quality Jo Bharosa Ban Jaaye
                </span>
              </h1>

              {/* Action Buttons: Order In Bulk Now, Explore Products & Apply For Dealership */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('dealership');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-amber-400/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wide"
                >
                  Order In Bulk Now <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => {
                    setActiveTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3 rounded-full bg-red-900/80 hover:bg-red-800 text-amber-100 font-extrabold text-sm sm:text-base border-2 border-amber-400/60 shadow-xl hover:shadow-red-900/40 transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-xs flex items-center gap-2"
                >
                  Explore Products
                </button>
                <button
                  onClick={() => {
                    setActiveTab('dealership');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full bg-black/40 hover:bg-black/60 text-stone-200 hover:text-white font-bold text-sm sm:text-base border border-amber-300/30 transition-all cursor-pointer backdrop-blur-xs"
                >
                  Apply For Dealership
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 space-y-12">

        {/* YOUR FAVOURITE ITEMS (Matching Image 2 with top-right View All button) */}
        <section className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-amber-500/40 space-y-6 relative">
          <div className="relative flex flex-col items-center justify-center text-center space-y-2">
            
            {/* Top Right "View All ->" Button matching Image 2 */}
            <div className="w-full flex justify-end sm:absolute sm:right-0 sm:top-0 sm:w-auto mb-2 sm:mb-0">
              <button
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-red-950 hover:text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 border border-amber-600/30 group"
              >
                <span>View All</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <h2 className="font-serif-brand text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 flex items-center justify-center gap-3">
              <Utensils className="text-red-800" size={32} />
              YOUR FAVOURITE ITEMS
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Discover our most loved authentic recipe creations
            </p>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          </div>

          {/* Product Items Grid with Auto-Sliding Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pt-4">
            {filteredProducts.map((product, idx) => (
              <SlidingProductCard
                key={product.id}
                product={product}
                index={idx}
                onSelect={() => setActiveTab('products')}
              />
            ))}
          </div>
        </section>

        {/* THE TASTE WE ARE DELIVERING (Wireframe 1 section) */}
        <section className="bg-stone-900 text-amber-100 rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-amber-500/40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden">
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xl group">
              <img 
                src="/kamal banner.webp" 
                alt="Kamal Brand Taste Showcase"
                className="w-full h-56 sm:h-72 object-cover object-right group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-amber-300 font-serif-brand font-bold text-sm">
                  100% Traditional Taste & Purity
                </span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Award size={18} /> Quality & Craftsmanship
            </div>
            <h3 className="font-serif-brand text-2xl md:text-4xl font-bold text-white leading-snug">
              THE TASTE WE ARE DELIVERING
            </h3>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              Every package from <strong className="text-amber-300">Kamal Brand</strong> carries decades of secret spice blends, authentic recipes, and hygienic processing prepared under strict quality standards.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-800/80 border border-amber-500/20">
                <span className="font-bold text-amber-300 text-sm block">100% Natural</span>
                <span className="text-stone-400">Pure ingredients & authentic taste</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/80 border border-amber-500/20">
                <span className="font-bold text-amber-300 text-sm block">Hygienic Unit</span>
                <span className="text-stone-400">State of the art automated packing</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('about')}
                className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
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
