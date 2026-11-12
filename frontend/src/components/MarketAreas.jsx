import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from '../router';
import { MARKET_AREAS } from '../data/site';
import { CITY_HUB_PATH, cityByName } from '../data/cities';

// Plain-text, crawlable list of the West Bengal cities we serve.
// variant "manufacturer" (home page) or "distributor" (dealership page) changes the heading
// and copy to match the keyword each page targets.
const COPY = {
  manufacturer: {
    title: 'Market Areas: Namkeen Manufacturer in West Bengal',
    intro:
      'Kamal Brand supplies namkeen directly from our factory in Raniganj to retailers, wholesalers, sweet shops, canteens and caterers across West Bengal. If you are looking for a namkeen manufacturer in Asansol, Durgapur, Bardhaman, Kolkata, Siliguri or any of the cities below, contact us for wholesale prices.',
    cta: { to: '/dealership', label: 'Become a distributor in your city' },
  },
  distributor: {
    title: 'Market Areas: Namkeen Distributorship in West Bengal',
    intro:
      'We are appointing dealers and distributors for Kamal Brand namkeen across West Bengal. Apply for a namkeen distributorship in your city, from Asansol and Durgapur to Kolkata, Medinipur, Malda and Siliguri. If your town is not listed, apply anyway and tell us the area you cover.',
    cta: { to: '#apply', label: 'Apply for distributorship' },
  },
};

export default function MarketAreas({ variant = 'manufacturer' }) {
  const c = COPY[variant];
  return (
    <section id="market-areas" aria-labelledby="market-areas-title" className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-500/40 space-y-6 scroll-mt-28">
      <div className="space-y-3 text-center">
        <h2 id="market-areas-title" className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900 flex items-center justify-center gap-2">
          <MapPin className="text-red-800 shrink-0" size={26} aria-hidden="true" /> {c.title}
        </h2>
        <p className="text-stone-600 leading-relaxed max-w-3xl mx-auto">{c.intro}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MARKET_AREAS.map((area) => (
          <div key={area.region} className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
            <div>
              <h3 className="font-serif-brand font-bold text-lg text-stone-900">{area.region}</h3>
              <p className="text-xs text-stone-500">{area.note}</p>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label={`Cities in ${area.region}`}>
              {area.cities.map((city) => {
                const page = cityByName(city);
                return page ? (
                  <li key={city}>
                    <Link to={page.path} className="inline-block px-3 py-1 rounded-full bg-red-900 text-amber-100 hover:bg-red-800 text-sm font-semibold">
                      {city}
                    </Link>
                  </li>
                ) : (
                  <li key={city} className="px-3 py-1 rounded-full bg-white border border-amber-300 text-sm text-stone-800">
                    {city}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-stone-600">
        Highlighted cities have their own page with products, routes and distributor details.{' '}
        <Link to={CITY_HUB_PATH} className="font-bold text-red-900 underline underline-offset-4">
          See all city pages
        </Link>
      </p>
      <p className="text-center">
        {c.cta.to.startsWith('#') ? (
          <a href={c.cta.to} className="inline-block px-6 py-3 rounded-full bg-red-900 hover:bg-red-800 text-amber-100 font-bold text-sm">
            {c.cta.label}
          </a>
        ) : (
          <Link to={c.cta.to} className="inline-block px-6 py-3 rounded-full bg-red-900 hover:bg-red-800 text-amber-100 font-bold text-sm">
            {c.cta.label}
          </Link>
        )}
      </p>
    </section>
  );
}
