import React from 'react';
import { CalendarDays, MapPin, Factory, Truck, Store, Users, PhoneCall, ShoppingBag, Award, ClipboardList, PhoneIncoming, PackageCheck, Route, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '../router';
import { PRODUCTS, getProduct } from '../data/products';
import { BUSINESS } from '../data/site';
import { CITIES, CITY_HUB_PATH, getCity } from '../data/cities';
import { cityFaqs } from '../data/faqs';
import { useEnquiry } from '../components/Enquiry';
import { FaqSection } from '../components/Common';

const card = 'bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-500/40';
const h2 = 'font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900';

const cityEnquiry = (city) => ({
  formType: 'bulk_order',
  heading: `Mixture wholesale price for ${city.name}`,
  subheading: `Tell us what you need in ${city.name} and our team will call you back with prices and supply details.`,
  message: `I am in ${city.name}${city.district === city.name ? "" : ` (${city.district})`} and want wholesale prices for Kamal Brand mixture and namkeen. Products / quantity: `,
});

export default function CityPage({ city }) {
  const { openEnquiry } = useEnquiry();
  const picks = city.picks.map(getProduct).filter(Boolean);
  const near = city.near.map(getCity).filter(Boolean);
  const faqs = cityFaqs(city);
  const isHome = city.km === 0;

  return (
    <div className="animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10 pt-2">
        {/* Hero */}
        <header className={`${card} space-y-5`}>
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/10 border border-red-800/20 text-red-900 text-xs font-bold uppercase tracking-wider">
            <MapPin size={14} aria-hidden="true" /> {city.district} district · West Bengal
          </p>
          <h1 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight">
            Mixture Manufacturer in {city.displayName}
          </h1>
          <p className="font-serif-brand text-lg sm:text-xl text-red-900 font-bold">
            Distributor &amp; dealership enquiries open in {city.name}
          </p>
          <p className="text-stone-700 text-base leading-relaxed max-w-4xl">{city.intro}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <dt className="font-bold text-stone-900 flex items-center gap-1.5">
                <Factory size={16} className="text-red-800" aria-hidden="true" /> Made in
              </dt>
              <dd className="text-stone-700 mt-0.5">Raniganj, Paschim Bardhaman</dd>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <dt className="font-bold text-stone-900 flex items-center gap-1.5">
                <Route size={16} className="text-red-800" aria-hidden="true" /> {isHome ? 'Distance' : `Distance to ${city.name}`}
              </dt>
              <dd className="text-stone-700 mt-0.5">{isHome ? city.distanceText : `${city.distanceText}, ${city.route.charAt(0).toLowerCase()}${city.route.slice(1)}`}</dd>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <dt className="font-bold text-stone-900 flex items-center gap-1.5">
                <PackageCheck size={16} className="text-red-800" aria-hidden="true" /> Range
              </dt>
              <dd className="text-stone-700 mt-0.5">{PRODUCTS.length} namkeen varieties, 90 g to 500 g packs</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openEnquiry(cityEnquiry(city))}
              className="px-6 py-3 rounded-full bg-red-950 hover:bg-red-900 text-amber-200 font-extrabold text-sm sm:text-base shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={18} aria-hidden="true" /> Get Wholesale Price
            </button>
            <Link to="/dealership#apply" className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-sm sm:text-base shadow-lg flex items-center gap-2">
              <Award size={18} aria-hidden="true" /> Apply for {city.name} Dealership
            </Link>
            <a href={`tel:${BUSINESS.phones[0].tel}`} className="px-6 py-3 rounded-full border-2 border-red-900/30 text-red-950 hover:bg-amber-50 font-bold text-sm sm:text-base flex items-center gap-2">
              <PhoneCall size={18} aria-hidden="true" /> {BUSINESS.phones[0].display}
            </a>
          </div>
        </header>

        {/* Local market */}
        <section aria-labelledby="market-title" className={`${card} grid grid-cols-1 lg:grid-cols-5 gap-8`}>
          <div className="lg:col-span-3 space-y-4">
            <h2 id="market-title" className={h2}>
              The Mixture Market in {city.name}
            </h2>
            <p className="text-stone-700 leading-relaxed">{city.market}</p>
            <h3 className="font-serif-brand font-bold text-xl text-stone-900 flex items-center gap-2 pt-2">
              <CalendarDays size={20} className="text-red-800" aria-hidden="true" /> When demand peaks in {city.name}
            </h3>
            <p className="text-stone-700 leading-relaxed">{city.seasons}</p>
          </div>
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif-brand font-bold text-xl text-stone-900 flex items-center gap-2">
              <Users size={20} className="text-red-800" aria-hidden="true" /> Who we supply in {city.name}
            </h3>
            <ul className="space-y-3">
              {city.buyers.map((b) => (
                <li key={b.t} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <p className="font-bold text-stone-900 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" aria-hidden="true" /> {b.t}
                  </p>
                  <p className="text-sm text-stone-600 pl-6 leading-relaxed">{b.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* All products */}
        <section aria-labelledby="products-title" className={`${card} space-y-6`}>
          <div className="space-y-3">
            <h2 id="products-title" className={h2}>
              Kamal Brand Mixture &amp; Namkeen Available in {city.name}
            </h2>
            <p className="text-stone-700 leading-relaxed">
              In Bengal, &ldquo;mixture&rdquo; usually means chanachur. We make spicy Jhal Chanachur, sweet-savoury Mitha Chanachur and a Fried Chura mixture, plus seven more namkeen, all of which can be ordered for {city.name} as single varieties or a mixed order. {city.picksNote}
            </p>
            <p className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-bold text-stone-900">Popular in {city.name}:</span>
              {picks.map((p) => (
                <Link key={p.slug} to={p.path} className="px-3 py-1 rounded-full bg-red-900 text-amber-100 hover:bg-red-800 font-semibold">
                  {p.name}
                </Link>
              ))}
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link to={p.path} className="group h-full flex gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-200 hover:border-amber-500 hover:bg-amber-50 transition-colors">
                  <img
                    src={p.thumbs[0]}
                    alt={`Kamal Brand ${p.name}`}
                    width="360"
                    height="360"
                    loading="lazy"
                    decoding="async"
                    className="w-20 h-20 shrink-0 rounded-full bg-white border border-amber-300 object-contain p-1"
                  />
                  <span className="min-w-0 space-y-1">
                    <span className="block font-serif-brand font-bold text-stone-900 group-hover:text-red-900">{p.name}</span>
                    <span className="block text-xs text-stone-600">
                      {p.taste} · {p.sizesText}
                    </span>
                    <span className="block text-sm text-stone-700 leading-snug">{p.enjoy[0]}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Distributor + dealership */}
        <section aria-labelledby="distributor-title" className="bg-stone-900 text-stone-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-amber-500/40 space-y-6">
          <div className="space-y-3">
            <h2 id="distributor-title" className="font-serif-brand text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
              <Store className="text-amber-400 shrink-0" size={26} aria-hidden="true" /> Become a Mixture Distributor in {city.name}
            </h2>
            <p className="leading-relaxed">
              We are appointing distributors, stockists and dealers for Kamal Brand in {city.name}. A {city.name}-based distributor buys directly from the manufacturer and supplies retailers in{' '}
              {city.nearby.slice(0, -1).join(', ')} and {city.nearby[city.nearby.length - 1]}. Wholesalers who already serve kirana shops, sweet shops or tea stalls in the area are a natural fit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-serif-brand font-bold text-xl text-amber-300">What a {city.name} distributor gets</h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Direct supply from the factory, with no middle layer',
                  `A complete range of ${PRODUCTS.length} namkeen to fill a retailer's shelf`,
                  'Fast-moving everyday lines (Jhal Chanachur, Bhujia, Sev) and premium add-ons',
                  'Sealed, branded packs from 90 g to 500 g for every price point',
                  'A sales team you can call in Hindi, Bengali or English',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif-brand font-bold text-xl text-amber-300">Mixture dealership in {city.name}: 3 steps</h3>
              <ol className="space-y-3 text-sm">
                {[
                  { icon: ClipboardList, t: 'Apply online', d: `Fill in the dealership form and mention ${city.name} and the towns you cover.` },
                  { icon: PhoneIncoming, t: 'We call you', d: 'Our team discusses your area, outlets, product mix and expected volume.' },
                  { icon: Truck, t: 'Receive your first stock', d: `Agree terms and start supplying shops in and around ${city.name}.` },
                ].map(({ icon: Icon, t, d }, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-amber-400 text-red-950 font-bold flex items-center justify-center">{i + 1}</span>
                    <span>
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Icon size={16} className="text-amber-400" aria-hidden="true" /> {t}
                      </span>
                      <span className="block text-stone-300">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/dealership#apply" className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-sm flex items-center gap-2">
              <Award size={18} aria-hidden="true" /> Apply for Distributorship
            </Link>
            <button
              type="button"
              onClick={() => openEnquiry(cityEnquiry(city))}
              className="px-6 py-3 rounded-full border-2 border-amber-400/60 text-amber-100 hover:bg-red-900 font-bold text-sm cursor-pointer"
            >
              Ask a Question
            </button>
          </div>
        </section>

        {/* Delivery / coverage */}
        <section aria-labelledby="delivery-title" className={`${card} space-y-5`}>
          <h2 id="delivery-title" className={`${h2} flex items-center gap-2`}>
            <Truck className="text-red-800 shrink-0" size={26} aria-hidden="true" /> {isHome ? `Supply in ${city.name} and Beyond` : `Supplying ${city.name} from Raniganj`}
          </h2>
          <p className="text-stone-700 leading-relaxed">
            {city.logistics}
          </p>
          <div className="space-y-2">
            <h3 className="font-serif-brand font-bold text-lg text-stone-900">Towns covered from {city.name}</h3>
            <ul className="flex flex-wrap gap-2">
              {city.nearby.map((t) => (
                <li key={t} className="px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-sm text-stone-800">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-stone-500">
            Distances are approximate road distances from our Raniganj factory. Delivery timelines and order terms depend on the quantity and your exact location, so please call {BUSINESS.phones[0].display} to confirm.
          </p>
        </section>

        <FaqSection faqs={faqs} title={`Mixture Supply in ${city.name}: FAQs`} />

        {/* Nearby city pages */}
        <nav aria-labelledby="nearby-title" className={`${card} space-y-4`}>
          <h2 id="nearby-title" className={h2}>
            Mixture Manufacturer for Nearby Cities
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {near.map((c) => (
              <li key={c.slug}>
                <Link to={c.path} className="group block h-full p-4 rounded-2xl bg-amber-50/60 border border-amber-200 hover:border-amber-500">
                  <span className="font-serif-brand font-bold text-stone-900 group-hover:text-red-900 flex items-center gap-1.5">
                    <MapPin size={16} className="text-red-800" aria-hidden="true" /> {c.name}
                  </span>
                  <span className="block text-sm text-stone-600 mt-1">{c.short}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to={CITY_HUB_PATH} className="inline-flex items-center gap-1.5 py-2 font-bold text-red-900 underline underline-offset-4">
            All {CITIES.length} West Bengal cities we supply <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
