import React from 'react';
import { Search, Flame, ShoppingBag, Award, Sparkles, ArrowRight, X } from 'lucide-react';
import { Link } from '../router';
import { PRODUCTS, productMatches } from '../data/products';
import { ProductGallery } from '../components/ProductVisuals';
import { useEnquiry } from '../components/Enquiry';

export function productEnquiry(product) {
  return {
    formType: 'product_enquiry',
    heading: `Enquire about ${product.name}`,
    subheading: `Available in ${product.sizesText} packs. Share your quantity and our team will call you with prices.`,
    message: `I am interested in Kamal Brand ${product.name} (${product.sizesText} packs). Quantity required: `,
  };
}

function ProductBannerCard({ product, index }) {
  const { openEnquiry } = useEnquiry();
  return (
    <article id={product.slug} className="w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-400/80 bg-stone-900 scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-12 product-banner-frame">
        <div className="md:col-span-5 lg:col-span-4 bg-[#fbb017] p-5 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-amber-300/30 via-transparent to-amber-600/30 pointer-events-none" />
          <div className="relative w-full">
            <ProductGallery product={product} to={product.path} eager={index === 0} className="h-60 sm:h-72 md:h-80" />
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8 bg-kamal-pattern p-6 sm:p-8 md:p-10 flex flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-linear-to-r from-red-950/60 via-red-950/30 to-black/40 pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <h2 className="font-serif-brand font-extrabold text-2xl sm:text-3xl md:text-4xl text-amber-300 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <Link to={product.path} className="hover:underline decoration-amber-400/60 underline-offset-4">
                {product.headline}
              </Link>
            </h2>
            <p className="text-white text-base md:text-lg leading-relaxed">{product.summary}</p>
            <p className="inline-block bg-black/35 px-3.5 py-1.5 rounded-lg border border-amber-400/30 text-amber-200 text-sm font-semibold">
              ✦ Available in {product.sizesText} packs
            </p>
            <p className="font-serif-brand font-bold italic text-amber-300 text-lg md:text-xl">“{product.slogan}”</p>
          </div>

          <div className="relative z-10 pt-6 mt-4 border-t border-amber-500/30 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => openEnquiry(productEnquiry(product))}
              className="px-6 sm:px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-sm sm:text-base shadow-xl transition-all flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
            >
              <ShoppingBag size={18} aria-hidden="true" /> Enquire Now
            </button>
            <Link
              to="/dealership"
              className="px-6 sm:px-8 py-3 rounded-full bg-red-900/80 hover:bg-red-800 text-amber-100 font-extrabold text-sm sm:text-base border-2 border-amber-400/60 shadow-xl transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Award size={18} aria-hidden="true" /> Apply For Dealership
            </Link>
            <Link to={product.path} className="inline-flex items-center gap-1.5 py-2 text-amber-200 hover:text-white font-semibold text-sm underline underline-offset-4">
              Ingredients & details <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProductsPage({ searchQuery, setSearchQuery }) {
  const filtered = PRODUCTS.filter((p) => productMatches(p, searchQuery || ''));

  return (
    <div className="space-y-10 animate-fadeIn pb-12">
      <div className="max-w-7xl mx-auto px-4 space-y-10 pt-2">
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-500/40 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/10 text-red-900 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} aria-hidden="true" /> Traditional Indian Namkeen
              </p>
              <h1 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 flex items-center justify-center md:justify-start gap-3">
                <Flame className="text-red-700 shrink-0" size={36} aria-hidden="true" /> ALL TIME ON DEMAND
              </h1>
              <p className="text-stone-600 text-base">Kamal Brand namkeen range: authentic Indian taste crafted with the purest ingredients.</p>
            </div>
            <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full sm:w-80 shrink-0">
              <label htmlFor="product-search" className="sr-only">
                Search products
              </label>
              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-10 py-3 rounded-full border-2 border-amber-500/50 focus:border-red-800 focus:outline-none text-base bg-white shadow-inner [&::-webkit-search-cancel-button]:hidden"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-600 pointer-events-none" size={16} aria-hidden="true" />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-800 cursor-pointer" aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
            </form>
          </div>
          <p className="text-stone-700 leading-relaxed">
            Kamal Brand makes ten namkeen varieties in Raniganj, West Bengal, from the spicy Bengal favourite Jhal Chanachur and the sweet-savoury Mitha Chanachur to classic Bhujia, Sev, Papdi Gathiya and Phool Gathiya, plus protein-rich Chana Dal, Salted Badam and Masala Matar, and light Fried Chura. Each is made from premium besan, pulses or peanuts and fried in high-quality edible oil. Packs range from 90 g to 500 g, and every product is available for retail, wholesale and dealership orders.
          </p>
          <nav aria-label="Jump to product" className="flex flex-wrap gap-2">
            {PRODUCTS.map((p) => (
              <Link key={p.slug} to={p.path} className="px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 text-sm font-semibold border border-amber-300/60">
                {p.name}
              </Link>
            ))}
          </nav>
        </div>

        <section aria-label="Product list" className="space-y-8">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-stone-600 border border-stone-200">
              <p className="text-lg">No products found matching “{searchQuery}”.</p>
              <button type="button" onClick={() => setSearchQuery('')} className="mt-4 px-6 py-2.5 rounded-full bg-amber-400 text-red-950 font-bold text-sm cursor-pointer">
                Clear Search
              </button>
            </div>
          ) : (
            filtered.map((p, i) => <ProductBannerCard key={p.slug} product={p} index={i} />)
          )}
        </section>
      </div>
    </div>
  );
}
