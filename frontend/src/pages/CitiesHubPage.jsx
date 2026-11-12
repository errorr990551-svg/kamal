import React from 'react';
import { MapPin, Factory, Store, Truck, Award } from 'lucide-react';
import { Link } from '../router';
import { CITIES, CITY_REGIONS } from '../data/cities';
import { PRODUCTS } from '../data/products';
import { HUB_FAQS } from '../data/faqs';
import { FaqSection, PageHeader } from '../components/Common';

const card = 'bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-500/40';

export default function CitiesHubPage() {
  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10 pt-2">
        <PageHeader
          eyebrow="Mixture Supply Across West Bengal"
          icon={MapPin}
          title="Mixture Manufacturer, Distributor & Dealership in West Bengal"
          intro={`Kamal Brand makes chanachur mixture and namkeen in Raniganj, Paschim Bardhaman, and supplies shops, wholesalers and distributors in ${CITIES.length} cities across West Bengal. Pick your city to see the products, the route from our factory, the towns a local distributor can cover and answers to common questions.`}
        />

        <section aria-labelledby="cities-title" className={`${card} space-y-6`}>
          <h2 id="cities-title" className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900">
            Choose Your City
          </h2>
          <div className="space-y-8">
            {CITY_REGIONS.map((region) => (
              <div key={region} className="space-y-3">
                <h3 className="font-serif-brand font-bold text-xl text-red-900">{region}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {CITIES.filter((c) => c.region === region).map((c) => (
                    <li key={c.slug}>
                      <Link to={c.path} className="group block h-full p-4 rounded-2xl bg-amber-50/60 border border-amber-200 hover:border-amber-500 hover:bg-amber-50">
                        <span className="font-serif-brand font-bold text-stone-900 group-hover:text-red-900 flex items-center gap-1.5">
                          <MapPin size={16} className="text-red-800 shrink-0" aria-hidden="true" /> Mixture Manufacturer in {c.name}
                        </span>
                        <span className="block text-sm text-stone-600 mt-1">{c.short}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="why-title" className={`${card} space-y-5`}>
          <h2 id="why-title" className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900">
            Why Buy Mixture Directly From the Manufacturer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Factory,
                t: 'Made in West Bengal',
                d: 'Every pack is made in our Raniganj factory from besan, pulses, peanuts and spices, fried in high-quality edible oil and sealed for freshness.',
              },
              {
                icon: Store,
                t: 'One supplier, full shelf',
                d: `${PRODUCTS.length} varieties, from Jhal and Mitha Chanachur to Bhujia, Sev, Gathiya, Chana Dal, Fried Chura, Salted Badam and Masala Matar, in 90 g to 500 g packs.`,
              },
              {
                icon: Truck,
                t: 'Central location',
                d: 'Raniganj sits on NH19 and the highway south to Bankura and Kharagpur, which gives us direct road routes to every part of the state.',
              },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <Icon size={24} className="text-red-800" aria-hidden="true" />
                <h3 className="font-serif-brand font-bold text-lg text-stone-900">{t}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <p className="text-stone-700 leading-relaxed">
            In Bengal, &ldquo;mixture&rdquo; is the everyday word for chanachur, the spicy blend of besan sev, maize chips and peanuts that goes with tea, into jhal muri and onto guest plates. Our range covers the mixtures shops ask for most and the single-variety namkeen that sit beside them, so retailers, wholesalers and distributors can order everything from one place.
          </p>
          <Link to="/dealership#apply" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-900 hover:bg-red-800 text-amber-100 font-bold text-sm">
            <Award size={18} aria-hidden="true" /> Apply for a Distributorship
          </Link>
        </section>

        <FaqSection faqs={HUB_FAQS} title="Mixture Distributorship in West Bengal: FAQs" />
      </div>
    </div>
  );
}
