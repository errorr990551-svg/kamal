import React, { useState, useEffect } from 'react';
import { Search, Flame, ShoppingBag, Award, Sparkles, FileText } from 'lucide-react';

// Single Product Banner Card Component matching Image 3 & 4
function ProductBannerCard({ product, index, onEnquire, onDealership }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (product.images.length <= 1) return;

    // Stagger slide timers across products
    const stagger = (index % 4) * 400;
    let intervalId;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % product.images.length);
      }, 2800);
    }, stagger);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [product.images.length, index]);

  return (
    <article className="w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-400/80 bg-stone-900 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 md:grid-cols-12 product-banner-frame">
        
        {/* Left Section: Golden-Yellow Background with Auto-Sliding Packets (Matching Image 4) */}
        <div className="md:col-span-5 lg:col-span-4 bg-[#fbb017] p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden select-none">
          {/* Subtle decorative glow */}
          <div className="absolute inset-0 bg-linear-to-b from-amber-300/30 via-transparent to-amber-600/30 pointer-events-none" />

          {/* Product Image Frame */}
          <div className="relative w-full h-64 sm:h-72 md:h-80 flex items-center justify-center">
            {product.images.map((img, imgIdx) => (
              <img
                key={img}
                src={img}
                alt={`${product.name} ${imgIdx + 1}`}
                className={`absolute max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-all duration-700 ease-in-out ${
                  imgIdx === activeIndex
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
                }`}
              />
            ))}
          </div>

          {/* Auto Slide Indicator Dots if multiple images */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full backdrop-blur-xs">
              {product.images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(dotIdx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activeIndex ? 'w-5 bg-red-950' : 'w-2 bg-stone-800/60'
                  }`}
                  aria-label={`Show image ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Red Floral Background with Title, Description, Sizes, Slogan, and 2 Buttons */}
        <div className="md:col-span-7 lg:col-span-8 bg-kamal-pattern p-6 sm:p-8 md:p-10 flex flex-col justify-between text-white relative">
          {/* Subtle inner dark gradient for text readability */}
          <div className="absolute inset-0 bg-linear-to-r from-red-950/40 via-transparent to-black/30 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            
            {/* Headline Title from Kamal Brand.pdf */}
            <h2 className="font-serif-brand font-extrabold text-2xl sm:text-3xl md:text-4xl text-amber-300 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {product.headline}
            </h2>

            {/* Description from Kamal Brand.pdf */}
            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              {product.desc}
            </p>

            {/* Available Packets line from Kamal Brand.pdf */}
            <div className="inline-block bg-black/30 px-3.5 py-1.5 rounded-lg border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-semibold">
              ✦ {product.weight}
            </div>

            {/* Slogan from Kamal Brand.pdf */}
            <p className="font-serif-brand font-bold italic text-amber-300 text-base sm:text-lg md:text-xl drop-shadow-sm pt-1">
              {product.slogan}
            </p>

          </div>

          {/* Bottom Action Area: Strictly only 2 Buttons as requested */}
          <div className="relative z-10 pt-6 mt-4 border-t border-amber-500/30 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onEnquire(product.name)}
              className="px-6 sm:px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-amber-400/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ShoppingBag size={18} />
              Enquire Now
            </button>
            <button
              onClick={onDealership}
              className="px-6 sm:px-8 py-3 rounded-full bg-red-900/80 hover:bg-red-800 text-amber-100 font-extrabold text-sm sm:text-base border-2 border-amber-400/60 shadow-xl hover:shadow-red-900/40 transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-xs flex items-center gap-2"
            >
              <Award size={18} />
              Apply For Dealership
            </button>
          </div>

        </div>

      </div>
    </article>
  );
}

export default function ProductsPage({ searchQuery, setSearchQuery, showToast, setActiveTab }) {
  // All 10 products with exact headlines, descriptions, weight, and slogans extracted from frontend/public/Kamal Brand.pdf
  const onDemandProducts = [
    {
      id: 'papdigathia',
      name: 'Papdigathia',
      headline: 'Papdigathia – A Crunch of Pure Perfection',
      desc: 'Crafted from finest chana besan and blended with aromatic carom seeds, every bite delivers a rich, authentic taste. Light, crispy, and perfectly seasoned with premium spices, this gathia is fried in high-quality edible oil to ensure unmatched freshness and flavor.',
      weight: 'Available in 180gm , 90gm etc packets.',
      slogan: '“Ek Baar Try Karo, Fan Ban Jao”',
      images: ['/Papdighatia1.webp', '/Papdighatia2.webp', '/Papdighatia.webp'],
    },
    {
      id: 'fulgathia',
      name: 'Fulgathia',
      headline: 'Fulgathia – Light Crunch, Rich Taste',
      desc: 'Crafted from premium chana besan and infused with aromatic carom seeds, our fulgathia delivers a light, fluffy texture with a perfectly balanced blend of spices. Fried in high-quality edible oil, each bite offers a crispy yet airy experience that feels light and tastes rich.',
      weight: 'Available in 180gm , 90gm etc packets.',
      slogan: '“Light Bhi, Tasty Bhi”',
      images: ['/fulghatia1.webp', '/fulghatia2.webp', '/fulghatia.webp'],
    },
    {
      id: 'jhal-chanachur',
      name: 'Jhal Chanachur',
      headline: 'Jhal Chanachur – Spicy Mix, Ultimate Crunch',
      desc: 'A bold and flavorful blend crafted from premium chana besan, crunchy maize chips, and roasted peanuts, perfectly seasoned with a rich mix of spices. Prepared in high-quality edible oil, this jhal chanachur delivers a fiery kick with every bite while maintaining a perfect balance of crunch and taste.',
      weight: 'Available in 400gm , 200gm packets.',
      slogan: '“Teekha Swad, Zabardast Crunch”',
      images: ['/Jhal Chanachur1.webp', '/Jhal Chanachur2.webp', '/Jhal Chanachur.webp'],
    },
    {
      id: 'mitha-chanachur',
      name: 'Mitha Chanachur',
      headline: 'Mitha Chanachur – Sweet Twist, Perfect Crunch',
      desc: 'A delightful blend of premium chana besan, crispy maize chips, and crunchy peanuts, coated with a hint of sweetness and a balanced mix of spices. Prepared in high-quality edible oil, this mitha chanachur offers a unique fusion of sweet and savory flavors with a satisfying crunch in every bite.',
      weight: 'Available in 400gm , 200gm packets.',
      slogan: '“Meetha Bhi, Crunchy Bhi”',
      images: ['/Mitha Chanachur.webp'],
    },
    {
      id: 'bhujia',
      name: 'Bhujia',
      headline: 'Bhujia – Classic Crunch with a Spicy Kick',
      desc: 'Made from premium quality besan and seasoned with a perfect blend of spices, our bhujia delivers a crispy texture with a mildly spicy taste that delights every palate. Fried in high-quality edible oil, each strand offers freshness, rich flavor, and a satisfying crunch.',
      weight: 'Available in 380gm , 180gm packets.',
      slogan: '“Halka Teekha, Full Maza”',
      images: ['/BHUJIYA.webp'],
    },
    {
      id: 'sew',
      name: 'Sew',
      headline: 'Sew – Light Crunch, Delightful Flavor',
      desc: 'Crafted from premium quality besan and seasoned with a subtle blend of spices, our sew offers a light, crispy texture with a smooth and flavorful taste. Fried in high-quality edible oil, it delivers freshness and a melt-in-the-mouth experience in every bite.',
      weight: 'Available in 380gm , 180gm packets.',
      slogan: '“Simple Taste, Pure Delight”',
      images: ['/sew1.webp', '/sew2.webp', '/sew.webp'],
    },
    {
      id: 'chana-dal',
      name: 'Chana Dal',
      headline: 'Chana Dal – Crunchy Bites with a Spicy Punch',
      desc: 'Made from carefully selected chana dal and crunchy peanuts, our snack is perfectly seasoned with a bold blend of spices to deliver a rich, spicy flavor. Fried in high-quality edible oil, it offers a crisp texture and fresh taste in every bite.',
      weight: 'Available in 500gm packet.',
      slogan: '“Crunch Karo, Spice Mehsoos Karo”',
      images: ['/CHANA DAL2.webp', '/chana dal.webp'],
    },
    {
      id: 'fried-chura',
      name: 'Fried Chura',
      headline: 'Fried Chura – Sweet, Tangy & Spicy Crunch',
      desc: 'A delightful mix of crispy chura blended with peanuts, sev, maize chips, and aromatic curry leaves, perfectly seasoned with a flavorful blend of spices. Prepared in high-quality edible oil, this snack offers a unique balance of sweet, tangy, and mildly spicy taste with a light yet crunchy texture.',
      weight: 'Available in 200gm packet.',
      slogan: '“Har Bite Mein Chatpata Maza”',
      images: ['/fried chura2.webp', '/fried chura.webp'],
    },
    {
      id: 'salted-badam',
      name: 'Salted Badam',
      headline: 'Salted Badam – Simple Taste, Premium Crunch',
      desc: 'Carefully selected lal badam, perfectly roasted and lightly seasoned with salt and a subtle blend of spices to enhance their natural flavor. Prepared using high-quality edible oil, these almonds offer a rich, crunchy texture with a clean, savory taste in every bite.',
      weight: 'Available in 500gm packet.',
      slogan: '“Crunchy, Nutty, Perfectly Salted”',
      images: ['/salted peanuts2.webp', '/saltedpeanuts.webp'],
    },
    {
      id: 'masala-matar',
      name: 'Masala Matar',
      headline: 'Masala Matar – Crispy Bites with a Spicy Kick',
      desc: 'Made from carefully selected green matar and perfectly seasoned with a bold blend of spices, this snack delivers a crunchy texture with a rich, spicy taste. Fried in high-quality edible oil, each bite offers freshness, flavor, and a satisfying crispiness.',
      weight: 'Available in 500gm packets.',
      slogan: '“Teekha Swad, Crispy Maza”',
      images: ['/Masala Matar2.webp', '/Masala Matar.webp'],
    },
  ];

  const filteredProducts = searchQuery
    ? onDemandProducts.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : onDemandProducts;

  const handleInquiry = (productName) => {
    showToast({
      title: 'Inquiry Submitted',
      description: `Inquiry for "${productName}" sent! Our team will contact you shortly.`,
    });
  };

  const handleDealership = () => {
    if (setActiveTab) {
      setActiveTab('dealership');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-12">
      <div className="max-w-7xl mx-auto px-4 space-y-10">

        {/* Section Header: ONLY "ALL TIME ON DEMAND" as requested */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/10 text-red-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Traditional Indian Namkeen
            </div>
            <h1 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 flex items-center justify-center md:justify-start gap-3">
              <Flame className="text-red-700" size={36} />
              ALL TIME ON DEMAND
            </h1>
            <p className="text-stone-600 text-sm">
              Authentic Indian taste crafted with purest ingredients & decades of tradition
            </p>
          </div>

          {/* Header Action Controls: View PDF Catalog + Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="/Kamal%20Brand.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-400/30 transition-all shrink-0 cursor-pointer"
            >
              <FileText size={16} />
              View Catalog PDF
            </a>

            {/* Quick Product Search Input */}
            <div className="relative w-full sm:w-64 md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-amber-500/50 focus:border-red-800 focus:outline-none text-sm bg-white shadow-inner"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-600" size={16} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* List of Full-Width Banner Cards */}
        <section className="space-y-8">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-stone-500 border border-stone-200">
              <p className="text-lg">No products found matching "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-6 py-2 rounded-full bg-amber-400 text-red-950 font-bold text-xs"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredProducts.map((product, idx) => (
              <ProductBannerCard
                key={product.id}
                product={product}
                index={idx}
                onEnquire={handleInquiry}
                onDealership={handleDealership}
              />
            ))
          )}
        </section>

      </div>
    </div>
  );
}
