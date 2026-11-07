import React from 'react';
import { Phone, Mail, MapPin, Award, ShieldCheck } from 'lucide-react';
import ContactBanner from './ContactBanner';
import { Link } from '../router';
import { BUSINESS, IMG, NAV_ITEMS } from '../data/site';
import { PRODUCTS } from '../data/products';

export default function Footer() {
  return (
    <footer className="bg-red-950 text-amber-100/85 pt-10 pb-24 md:pb-8 border-t-4 border-amber-500/60 mt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-kamal-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-10">
        <ContactBanner />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={IMG.logo} alt="" width="300" height="200" loading="lazy" className="h-9 w-auto object-contain" />
            <p className="font-serif-brand text-2xl font-bold text-amber-200 tracking-wide">Kamal Brand</p>
          </div>
          <p className="font-serif-brand italic text-amber-100/90 text-sm">"Savour the authentic flavors in every bite"</p>
          <p className="text-sm text-amber-200/80 leading-relaxed">
            Namkeen manufacturer in Raniganj, Paschim Bardhaman, West Bengal. Traditional chanachur, bhujia, sev, gathiya and more, made with premium besan, pulses and spices.
          </p>
          <p className="flex items-center gap-2 pt-1 text-amber-400 text-sm font-medium">
            <ShieldCheck size={16} aria-hidden="true" /> Quality assured, pure ingredients
          </p>
        </div>

        <nav aria-label="Footer" className="space-y-3">
          <h2 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-amber-700/50 pb-1">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="inline-flex items-center gap-1.5 py-1 hover:text-amber-300 transition-colors">
                  <span className="text-amber-500" aria-hidden="true">›</span> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products" className="space-y-3">
          <h2 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-amber-700/50 pb-1">Our Namkeen</h2>
          <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-3 text-sm">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link to={p.path} className="inline-block py-1 hover:text-amber-300 transition-colors">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-amber-700/50 pb-1">Contact & Dealership</h2>
          <address className="not-italic space-y-2.5 text-sm">
            <p className="flex items-start gap-2">
              <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{BUSINESS.address.display}</span>
            </p>
            <div className="flex items-start gap-2">
              <Phone size={16} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex flex-col">
                {BUSINESS.phones.map((ph) => (
                  <a key={ph.tel} href={`tel:${ph.tel}`} className="hover:text-amber-300 py-0.5">
                    {ph.display}
                  </a>
                ))}
              </div>
            </div>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-amber-400 shrink-0" aria-hidden="true" />
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-amber-300 break-all">
                {BUSINESS.email}
              </a>
            </p>
          </address>
          <Link
            to="/dealership"
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-400 text-red-950 font-bold text-sm hover:bg-amber-300 transition-colors shadow-sm"
          >
            <Award size={16} aria-hidden="true" /> Become a Dealer / Distributor
          </Link>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-amber-800/40 text-center text-xs text-amber-300/80 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} Kamal Brand. All Rights Reserved.</p>
        <a href="https://errorr.in/" target="_blank" rel="noopener" className="hover:text-amber-200 transition-colors font-medium hover:underline">
          Designed and Promoted By Errorr.in - Best Digital Marketing Company in India.
        </a>
      </div>
    </footer>
  );
}
