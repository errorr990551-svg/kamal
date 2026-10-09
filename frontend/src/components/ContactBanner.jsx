import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function ContactBanner({ onOrderBulk, className = "" }) {
  return (
    <section className={`w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-400/80 my-8 ${className}`}>
      {/* Top Floral Red Band with Authentic Kamal Brand Emblem & Tagline matching PDF */}
      <div className="w-full py-5 sm:py-7 bg-kamal-pattern relative overflow-hidden border-b-2 border-amber-500/50 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
          <span className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Kamal
          </span>
          <img 
            src="/kamal logo.webp" 
            alt="Kamal Brand Emblem" 
            className="h-10 sm:h-12 md:h-16 w-auto object-contain filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform"
          />
          <span className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Brand
          </span>
        </div>

        <p className="relative z-10 font-serif-brand italic text-amber-200 text-xs sm:text-sm md:text-base mt-1.5 tracking-wide">
          savour the authentic flavors in every bite
        </p>
        <div className="relative z-10 mt-1.5 w-28 h-0.5 bg-linear-to-r from-transparent via-amber-300 to-transparent mx-auto rounded-full" />
      </div>

      {/* Warm Golden-Yellow Card Body matching Image 3 */}
      <div className="bg-amber-400 sm:bg-[#f5a623] px-6 sm:px-12 py-10 md:py-14 text-center flex flex-col items-center justify-center relative">
        
        {/* Order In Bulk Now Button above Contacts as requested */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (onOrderBulk) {
                onOrderBulk();
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2.5 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-red-950 hover:bg-red-900 text-amber-300 hover:text-amber-200 font-extrabold text-base sm:text-lg border-2 border-amber-400 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer uppercase tracking-wider"
          >
            <span>Order In Bulk Now</span>
            <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Contact Details List - Perfectly Centered */}
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-4 sm:space-y-5 text-center">
          
          {/* Phone Numbers */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-red-950">
            <span className="font-serif-brand font-extrabold text-xl sm:text-3xl text-red-950 tracking-tight">
              Contacts :
            </span>
            <div className="flex items-center gap-1.5 bg-red-950/10 p-2 rounded-full border border-red-950/20">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-red-900 fill-red-900" />
            </div>
            <div className="font-serif-brand font-bold text-lg sm:text-2xl md:text-3xl text-red-950 tracking-wide">
              <a href="tel:9932259719" className="hover:underline hover:text-red-800 transition-colors">
                9932259719
              </a>
              <span className="mx-2 font-sans font-normal">,</span>
              <a href="tel:8900743299" className="hover:underline hover:text-red-800 transition-colors">
                8900743299
              </a>
            </div>
          </div>

          {/* Email Address */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-red-950">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-red-950 shrink-0" strokeWidth={2.2} />
            <a 
              href="mailto:kamalsbrand@gmail.com" 
              className="font-serif-brand font-bold text-lg sm:text-2xl md:text-3xl text-red-950 hover:underline hover:text-red-800 transition-colors break-all"
            >
              kamalsbrand@gmail.com
            </a>
          </div>

          {/* Address */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-red-950 pt-1">
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-red-950 shrink-0 mt-0.5" strokeWidth={2.2} />
            <div className="font-serif-brand font-bold text-lg sm:text-2xl md:text-3xl text-red-950 leading-snug text-center">
              <p>West Bengal , Raniganj</p>
              <p className="mt-0.5">Bardhaman District</p>
            </div>
          </div>

        </div>

        {/* Kamal Brand Lotus Emblem & Dhanyavad Section */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center space-y-3">
          <div className="relative transform hover:scale-105 transition-transform">
            <img 
              src="/kamal logo.webp" 
              alt="Kamal Brand Logo" 
              className="h-16 sm:h-20 md:h-24 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] select-none"
            />
          </div>

          {/* Dhanyavad Text in White Serif matching Image 3 */}
          <h2 className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] select-none">
            Dhanyavad
          </h2>
        </div>

      </div>
    </section>
  );
}
