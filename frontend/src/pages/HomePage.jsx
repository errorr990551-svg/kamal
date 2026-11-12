import React from 'react';
import { ArrowRight, Sparkles, Award, Utensils, Building2, Factory, Gift, Flame, Leaf, PackageCheck, MapPin } from 'lucide-react';
import { Link } from '../router';
import { PRODUCTS, productMatches } from '../data/products';
import { GENERAL_FAQS } from '../data/faqs';
import { IMG } from '../data/site';
import { ProductCircleCard } from '../components/ProductVisuals';
import { FaqSection } from '../components/Common';
import { useEnquiry } from '../components/Enquiry';
import MarketAreas from '../components/MarketAreas';

const BUSINESS_CARDS = [
  {
    to: '/dealership',
    icon: Building2,
    title: 'Dealership & Distributorship',
    text: 'Stock fast-moving namkeen with reliable supply and direct support from the manufacturer.',
    cta: 'Apply for dealership',
  },
  {
    to: '/contract',
    icon: Factory,
    title: 'Contract Manufacturing',
    text: 'Private label bhujia, sev, gathiya, chanachur and more, made to your recipe and pack size.',
    cta: 'Discuss your requirement',
  },
  {
    to: '/hampers',
    icon: Gift,
    title: 'Festive & Corporate Hampers',
    text: 'Namkeen gift boxes for Diwali, Bijoya, weddings and business gifting, in any quantity.',
    cta: 'Build a hamper',
  },
];

const PROMISES = [
  { icon: Leaf, title: 'Premium Ingredients', text: 'Chana besan, pulses, peanuts and spices selected for taste and freshness.' },
  { icon: Flame, title: 'Fried in Quality Oil', text: 'Every product is fried in high-quality edible oil for a clean, crisp bite.' },
  { icon: PackageCheck, title: 'Sealed Fresh Packing', text: 'Hygienically packed to keep the crunch and flavour locked in.' },
  { icon: Award, title: 'Traditional Recipes', text: 'Familiar, home-style tastes that customers come back for every day.' },
];

export default function HomePage({ searchQuery }) {
  const { openEnquiry } = useEnquiry();
  const products = PRODUCTS.filter((p) => productMatches(p, searchQuery || ''));
  const bulk = () =>
    openEnquiry({
      formType: 'bulk_order',
      heading: 'Order Kamal Brand namkeen in bulk',
      subheading: 'Tell us the products and quantity you need. Our team will call you with wholesale prices.',
    });

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      {/* HERO */}
      <section className="w-full relative overflow-hidden bg-red-950 shadow-2xl border-b-4 border-amber-500/60">
        <div className="relative w-full hero-banner-frame flex items-center">
          <img
            src={IMG.banner(1280)}
            srcSet={`${IMG.banner(800)} 800w, ${IMG.banner(1280)} 1280w, ${IMG.banner(1983)} 1983w`}
            sizes="100vw"
            alt="Kamal Brand namkeen packets: chanachur, bhujia and more"
            width="1983"
            height="793"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-red-950/95 via-red-950/75 to-red-950/10 md:to-transparent pointer-events-none" />
          <div className="relative z-10 w-full px-5 sm:px-10 md:px-14 lg:px-16 py-10 md:py-16">
            <div className="max-w-xl text-left space-y-5">
              <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-xs">
                <Sparkles size={16} aria-hidden="true" /> Swad Aur Shuddhata Ka Bharosa
              </p>
              <h1 className="font-serif-brand font-extrabold text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                <span className="block text-base sm:text-lg md:text-xl font-semibold text-amber-200 mb-2 font-sans tracking-wide">
                  Kamal Brand · Namkeen Manufacturer in West Bengal
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl">Taste Jo Dil Mein Bas Jaaye,</span>
                <span className="block text-3xl sm:text-4xl md:text-5xl text-amber-300">Quality Jo Bharosa Ban Jaaye</span>
              </h1>
              <p className="text-amber-50/95 text-base sm:text-lg max-w-lg">
                Jhal &amp; Mitha Chanachur, Bhujia, Sev, Gathiya, Chana Dal and more, made fresh for families, shops and distributors.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <button
                  type="button"
                  onClick={bulk}
                  className="px-6 sm:px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-sm sm:text-base shadow-xl transition-all flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer uppercase tracking-wide"
                >
                  Order In Bulk Now <ArrowRight size={18} aria-hidden="true" />
                </button>
                <Link
                  to="/products"
                  className="px-6 sm:px-7 py-3 rounded-full bg-red-900/80 hover:bg-red-800 text-amber-100 font-extrabold text-sm sm:text-base border-2 border-amber-400/60 shadow-xl transition-all hover:-translate-y-0.5 backdrop-blur-xs"
                >
                  Explore Products
                </Link>
                <Link
                  to="/dealership"
                  className="px-6 py-3 rounded-full bg-black/40 hover:bg-black/60 text-stone-100 hover:text-white font-bold text-sm sm:text-base border border-amber-300/40 transition-colors backdrop-blur-xs"
                >
                  Apply For Dealership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* FAVOURITES */}
        <section aria-labelledby="fav-title" className="bg-white/95 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border-2 border-amber-500/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-center sm:text-left">
            <div className="space-y-2">
              <h2 id="fav-title" className="font-serif-brand text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 flex items-center justify-center sm:justify-start gap-3">
                <Utensils className="text-red-800" size={30} aria-hidden="true" />
                YOUR FAVOURITE ITEMS
              </h2>
              <p className="text-stone-600 text-sm sm:text-base">Ten authentic namkeen favourites. Tap any product to see ingredients, pack sizes and bulk options.</p>
            </div>
            <Link
              to="/products"
              className="self-center sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-red-950 font-extrabold text-sm shadow-md transition-all group border border-amber-600/30 shrink-0"
            >
              View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {products.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 pt-2">
              {products.map((p, i) => (
                <ProductCircleCard key={p.slug} product={p} index={i} priority={i < 4} />
              ))}
            </div>
          ) : (
            <p className="text-center text-stone-600 py-6">No products match “{searchQuery}”.</p>
          )}
        </section>

        {/* TASTE / ABOUT TEASER */}
        <section className="bg-stone-900 text-amber-100 rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-amber-500/40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden">
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xl">
              <img src={IMG.banner(800)} alt="Range of Kamal Brand namkeen products" width="800" height="320" loading="lazy" className="w-full h-56 sm:h-72 object-cover object-right" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-amber-300 font-serif-brand font-bold text-sm">100% Traditional Taste & Purity</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-4">
            <p className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Award size={18} aria-hidden="true" /> Quality & Craftsmanship
            </p>
            <h2 className="font-serif-brand text-2xl md:text-4xl font-bold text-white leading-snug">THE TASTE WE ARE DELIVERING</h2>
            <p className="text-stone-300 text-base leading-relaxed">
              Every pack of <strong className="text-amber-300">Kamal Brand</strong> namkeen is made in Raniganj from premium chana besan, pulses, peanuts and spices, fried in high-quality edible oil and sealed fresh. From the fiery crunch of Jhal Chanachur to the light, ajwain-scented Phool Gathiya, our recipes deliver the authentic flavours that Indian homes love with their evening cha.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1 text-sm">
              <div className="p-3 rounded-xl bg-stone-800/80 border border-amber-500/20">
                <span className="font-bold text-amber-300 block">10 Varieties</span>
                <span className="text-stone-300">Spicy, sweet & classic namkeen</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/80 border border-amber-500/20">
                <span className="font-bold text-amber-300 block">90 g – 500 g</span>
                <span className="text-stone-300">Pack sizes for homes & shops</span>
              </div>
            </div>
            <Link to="/about" className="inline-flex px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-xs uppercase tracking-wider items-center gap-2 shadow-md">
              Learn More About Us <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* PROMISES */}
        <section aria-labelledby="why-title" className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-500/40 space-y-6">
          <h2 id="why-title" className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900 text-center">Why Families & Retailers Choose Kamal Brand</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROMISES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <Icon className="text-red-800" size={26} aria-hidden="true" />
                <h3 className="font-serif-brand font-bold text-lg text-stone-900">{title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* B2B */}
        <section aria-labelledby="b2b-title" className="space-y-5">
          <h2 id="b2b-title" className="font-serif-brand text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow">Grow Your Business With Kamal Brand</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BUSINESS_CARDS.map(({ to, icon: Icon, title, text, cta }) => (
              <Link key={to} to={to} className="group bg-white/95 rounded-3xl p-6 shadow-xl border-2 border-amber-500/40 hover:border-amber-500 hover:-translate-y-1 transition-all space-y-3 block">
                <span className="w-12 h-12 rounded-full bg-red-900 text-amber-300 flex items-center justify-center">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="font-serif-brand font-bold text-xl text-stone-900 group-hover:text-red-900">{title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{text}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-900">
                  {cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* LOCAL */}
        <section className="bg-stone-900 text-stone-200 rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-amber-500/40 space-y-4">
          <h2 className="font-serif-brand text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <MapPin className="text-amber-400" size={26} aria-hidden="true" /> Namkeen Manufacturer in Raniganj, West Bengal
          </h2>
          <p className="leading-relaxed">
            Kamal Brand is a namkeen manufacturer based in Raniganj, Paschim Bardhaman district, in the heart of West Bengal's coal belt between Asansol and Durgapur. We make Bengal's favourite snacks, including Jhal Chanachur, Mitha Chanachur and Fried Chura (chire bhaja), alongside all-India classics like Bhujia, Sev, Papdi Gathiya, Phool Gathiya, Chana Dal, Masala Matar and Salted Badam.
          </p>
          <p className="leading-relaxed">
            Kirana stores, wholesalers, sweet shops, tea stalls, canteens and caterers can order directly from the manufacturer. We welcome dealer and distributor enquiries from across West Bengal and neighbouring states. Call us or send an enquiry and our sales team will get back to you quickly.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <button type="button" onClick={bulk} className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-sm cursor-pointer">
              Get Wholesale Prices
            </button>
            <Link to="/contact" className="px-5 py-2.5 rounded-full border-2 border-amber-400/60 text-amber-100 hover:bg-red-900 font-bold text-sm">
              Contact Us
            </Link>
          </div>
        </section>

        <MarketAreas variant="manufacturer" />

        <FaqSection faqs={GENERAL_FAQS} />
      </div>
    </div>
  );
}
