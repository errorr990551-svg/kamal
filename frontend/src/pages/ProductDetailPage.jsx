import React from 'react';
import { ShoppingBag, Award, CheckCircle2, Package, Flame, Utensils, Store } from 'lucide-react';
import { Link } from '../router';
import { PRODUCTS } from '../data/products';
import { ProductGallery, ProductCircleCard } from '../components/ProductVisuals';
import { useEnquiry } from '../components/Enquiry';
import { FaqSection } from '../components/Common';
import { productEnquiry } from './ProductsPage';
import { BUSINESS } from '../data/site';
import { productFaqs } from '../data/faqs';

export default function ProductDetailPage({ product }) {
  const { openEnquiry } = useEnquiry();
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 5);
  const faqs = productFaqs(product);

  return (
    <div className="animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10 pt-4">
        <article className="overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-400/80 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-[#fbb017] p-6 sm:p-10 flex items-center justify-center">
              <ProductGallery product={product} eager className="h-72 sm:h-96" />
            </div>
            <div className="p-6 sm:p-8 md:p-10 space-y-5">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/10 text-red-900 text-xs font-bold uppercase tracking-wider">
                <Flame size={14} aria-hidden="true" /> {product.tag}
              </p>
              <h1 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                Kamal Brand {product.name}
              </h1>
              <p className="font-serif-brand text-xl text-red-900 font-bold">{product.headline.split('–')[1]?.trim()}</p>
              <p className="text-stone-700 text-base leading-relaxed">{product.summary}</p>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <dt className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Package size={16} className="text-red-800" aria-hidden="true" /> Pack sizes
                  </dt>
                  <dd className="text-stone-700 mt-0.5">{product.sizesText}</dd>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <dt className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Flame size={16} className="text-red-800" aria-hidden="true" /> Taste
                  </dt>
                  <dd className="text-stone-700 mt-0.5">{product.taste}</dd>
                </div>
              </dl>

              <p className="font-serif-brand italic font-bold text-red-900 text-lg">“{product.slogan}”</p>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => openEnquiry(productEnquiry(product))}
                  className="px-6 py-3 rounded-full bg-red-950 hover:bg-red-900 text-amber-200 font-extrabold text-sm sm:text-base shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={18} aria-hidden="true" /> Enquire / Bulk Order
                </button>
                <Link to="/dealership" className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-sm sm:text-base shadow-lg flex items-center gap-2">
                  <Award size={18} aria-hidden="true" /> Apply For Dealership
                </Link>
              </div>
              {product.altNames.length > 0 && <p className="text-xs text-stone-500">Also known as: {product.altNames.join(', ')}</p>}
            </div>
          </div>
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-500/40 space-y-4">
            <h2 className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900">About Kamal Brand {product.name}</h2>
            {product.about.map((para) => (
              <p key={para.slice(0, 24)} className="text-stone-700 leading-relaxed">
                {para}
              </p>
            ))}
          </section>

          <aside className="space-y-6">
            <section className="bg-white/95 rounded-3xl p-6 shadow-xl border-2 border-amber-500/40 space-y-3">
              <h2 className="font-serif-brand text-xl font-extrabold text-stone-900">Ingredients</h2>
              <ul className="space-y-1.5 text-stone-700 text-sm">
                {product.ingredients.map((ing) => (
                  <li key={ing} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true" /> {ing}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-stone-500">Please refer to the pack label for the complete ingredient list, allergen and nutrition information.</p>
            </section>
            <section className="bg-white/95 rounded-3xl p-6 shadow-xl border-2 border-amber-500/40 space-y-3">
              <h2 className="font-serif-brand text-xl font-extrabold text-stone-900 flex items-center gap-2">
                <Utensils size={20} className="text-red-800" aria-hidden="true" /> How to Enjoy
              </h2>
              <ul className="space-y-1.5 text-stone-700 text-sm list-disc pl-5">
                {product.enjoy.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <section className="bg-stone-900 text-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-500/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <h2 className="font-serif-brand text-2xl font-bold text-white flex items-center gap-2">
              <Store className="text-amber-400" size={24} aria-hidden="true" /> {product.name} for Shops, Wholesalers & Distributors
            </h2>
            <p className="leading-relaxed">
              Buy Kamal Brand {product.name} directly from the manufacturer in Raniganj, West Bengal. We supply kirana and grocery stores, wholesalers, sweet shops, tea stalls, canteens and caterers, and we are appointing dealers and distributors.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => openEnquiry(productEnquiry(product))}
              className="px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-sm cursor-pointer"
            >
              Get Wholesale Price
            </button>
            <a href={`tel:${BUSINESS.phones[0].tel}`} className="px-5 py-3 rounded-full border-2 border-amber-400/60 text-amber-100 hover:bg-red-900 font-bold text-sm text-center">
              Call {BUSINESS.phones[0].display}
            </a>
          </div>
        </section>

        <FaqSection faqs={faqs} title={`${product.name}: Frequently Asked Questions`} />

        <section aria-labelledby="more-title" className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-500/40 space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 id="more-title" className="font-serif-brand text-2xl font-extrabold text-stone-900">
              More Kamal Brand Namkeen
            </h2>
            <Link to="/products" className="inline-block py-2 text-sm font-bold text-red-900 underline underline-offset-4">
              View all products
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
            {related.map((p, i) => (
              <ProductCircleCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
