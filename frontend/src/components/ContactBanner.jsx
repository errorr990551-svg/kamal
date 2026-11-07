import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useEnquiry } from './Enquiry';
import { BUSINESS, IMG } from '../data/site';

export default function ContactBanner({ className = '' }) {
  const { openEnquiry } = useEnquiry();
  return (
    <section aria-label="Contact Kamal Brand" className={`w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-400/80 my-8 ${className}`}>
      <div className="w-full py-5 sm:py-7 bg-kamal-pattern relative overflow-hidden border-b-2 border-amber-500/50 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-5">
          <span className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">Kamal</span>
          <img src={IMG.logo} alt="" width="300" height="200" loading="lazy" className="h-10 sm:h-12 md:h-16 w-auto object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]" />
          <span className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">Brand</span>
        </div>
        <p className="relative z-10 font-serif-brand italic text-amber-200 text-xs sm:text-sm md:text-base mt-1.5 tracking-wide">{BUSINESS.tagline}</p>
      </div>

      <div className="bg-[#f5a623] px-5 sm:px-12 py-10 md:py-14 text-center flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={() =>
            openEnquiry({
              formType: 'bulk_order',
              heading: 'Order Kamal Brand namkeen in bulk',
              subheading: 'Tell us what you need and our team will call you with wholesale prices.',
            })
          }
          className="group mb-8 inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-10 py-3.5 sm:py-4 rounded-full bg-red-950 hover:bg-red-900 text-amber-300 hover:text-amber-200 font-extrabold text-base sm:text-lg border-2 border-amber-400 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer uppercase tracking-wider"
        >
          <span>Order In Bulk Now</span>
          <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
        </button>

        <address className="not-italic w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-4 sm:space-y-5 text-center text-red-950">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <span className="font-serif-brand font-extrabold text-xl sm:text-3xl tracking-tight">Contacts :</span>
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-red-900 fill-red-900" aria-hidden="true" />
            <div className="font-serif-brand font-bold text-lg sm:text-2xl md:text-3xl tracking-wide">
              {BUSINESS.phones.map((ph, i) => (
                <React.Fragment key={ph.tel}>
                  {i > 0 && <span className="mx-2 font-sans font-normal">,</span>}
                  <a href={`tel:${ph.tel}`} className="hover:underline hover:text-red-800 transition-colors whitespace-nowrap">
                    {ph.tel.slice(3)}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-full">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <a href={`mailto:${BUSINESS.email}`} className="font-serif-brand font-bold text-lg sm:text-2xl md:text-3xl hover:underline hover:text-red-800 transition-colors break-all">
              {BUSINESS.email}
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-1">
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <div className="font-serif-brand font-bold text-lg sm:text-2xl md:text-3xl leading-snug">
              <p>Raniganj, West Bengal</p>
              <p className="mt-0.5">Paschim Bardhaman District</p>
            </div>
          </div>
        </address>

        <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center space-y-3">
          <img src={IMG.logo} alt="" width="300" height="200" loading="lazy" className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]" />
          <p className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">Dhanyavad</p>
        </div>
      </div>
    </section>
  );
}
