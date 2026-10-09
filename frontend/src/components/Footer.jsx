import React from 'react';
import { Phone, Mail, MapPin, Award, ShieldCheck } from 'lucide-react';
import ContactBanner from './ContactBanner';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-red-950 text-amber-100/80 pt-10 pb-8 border-t-4 border-amber-500/60 mt-16 relative overflow-hidden">
      {/* Background Floral Overlay */}
      <div className="absolute inset-0 bg-kamal-pattern opacity-30 pointer-events-none" />

      {/* Official Contact & Dhanyavad Card matching Image 3 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-10">
        <ContactBanner onOrderBulk={() => {
          setActiveTab('dealership');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <h3 className="font-serif-brand text-2xl font-bold text-amber-200 tracking-wide">
              Kamal Brand
            </h3>
          </div>
          <p className="font-serif-brand italic text-amber-100/90 text-sm">
            "Savour the authentic flavors in every bite"
          </p>
          <p className="text-xs text-amber-200/70 leading-relaxed">
            Delivering pure, hygienic, and traditional Indian flavors crafted with premium ingredients and unmatched dedication to quality.
          </p>
          <div className="flex items-center gap-2 pt-1 text-amber-400 text-xs font-medium">
            <ShieldCheck size={16} /> 100% Quality Assured & Pure Ingredients
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-amber-700/50 pb-1">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs">
            {['home', 'dealership', 'products', 'about', 'hampers', 'contract'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    setActiveTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 hover:translate-x-1 transition-all capitalize flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-amber-500">›</span> {tab === 'contract' ? 'Contract Manufacturing' : tab === 'dealership' ? 'Apply For Dealership' : tab}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/Kamal%20Brand.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 hover:translate-x-1 transition-all flex items-center gap-1.5 text-amber-300 font-semibold"
              >
                <span className="text-amber-400">📄</span> Download Catalog (PDF)
              </a>
            </li>
          </ul>
        </div>

        {/* Product Specialties */}
        <div className="space-y-3">
          <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-amber-700/50 pb-1">
            Our Specialties
          </h4>
          <ul className="space-y-1.5 text-xs text-amber-100/80">
            <li>• Premium Urad & Moong Papad</li>
            <li>• Crunchy Crispy Toast</li>
            <li>• Bikaneri Bhujia & Namkeen</li>
            <li>• Authentic Mathri & Snack Mix</li>
            <li>• Festival & Gifting Hampers</li>
            <li>• Custom Bulk Orders</li>
          </ul>
        </div>

        {/* Contact Info (Matching Image 5) */}
        <div className="space-y-3">
          <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-amber-700/50 pb-1">
            Contact & Dealership
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <span>West Bengal , Raniganj, Bardhaman District</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-amber-400 shrink-0" />
              <div className="space-x-1">
                <a href="tel:9932259719" className="hover:text-amber-300">+91 99322 59719</a>
                <span>/</span>
                <a href="tel:8900743299" className="hover:text-amber-300">+91 89007 43299</a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-amber-400 shrink-0" />
              <a href="mailto:kamalsbrand@gmail.com" className="hover:text-amber-300">
                kamalsbrand@gmail.com
              </a>
            </div>
            <button
              onClick={() => {
                setActiveTab('dealership');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-red-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
            >
              <Award size={14} /> Become a Dealer / Distributor
            </button>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-amber-800/40 text-center text-xs text-amber-300/70 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} Kamal Brand. All Rights Reserved.</p>
        <a 
          href="https://errorr.in/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-amber-200 transition-all flex items-center gap-1 font-medium hover:underline"
        >
          Designed and Promoted By Errorr.in - Best Digital Marketing Company in India.
        </a>
      </div>
    </footer>
  );
}
