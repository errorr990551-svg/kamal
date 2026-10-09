import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactBanner({ className = "" }) {
  return (
    <section className={`w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-400/80 my-8 ${className}`}>
      {/* Top Floral Red Band matching Image 5 */}
      <div className="w-full h-14 sm:h-20 bg-kamal-pattern relative overflow-hidden border-b-2 border-amber-500/50">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Warm Golden-Yellow Card Body matching Image 5 */}
      <div className="bg-amber-400 sm:bg-[#f5a623] px-6 sm:px-12 py-10 md:py-14 text-center flex flex-col items-center justify-center relative">
        
        {/* Contact Details List */}
        <div className="w-full max-w-2xl space-y-4 text-left sm:text-left mx-auto">
          
          {/* Phone Numbers */}
          <div className="flex items-center gap-3 sm:gap-4 text-red-950">
            <span className="font-serif-brand font-extrabold text-xl sm:text-3xl text-red-950 tracking-tight">
              Contacts :
            </span>
            <div className="flex items-center gap-2 bg-red-950/10 p-2 rounded-full border border-red-950/20">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-red-900 fill-red-900" />
            </div>
            <div className="font-serif-brand font-bold text-lg sm:text-2xl md:text-3xl text-red-950 tracking-wide">
              <a href="tel:9932259719" className="hover:underline hover:text-red-800 transition-colors">
                9932259719
              </a>
              <span className="mx-1.5 font-sans">,</span>
              <a href="tel:8900743299" className="hover:underline hover:text-red-800 transition-colors">
                8900743299
              </a>
            </div>
          </div>

          {/* Email Address */}
          <div className="flex items-center gap-3 sm:gap-4 text-red-950 pl-0 sm:pl-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-red-950" strokeWidth={2.2} />
            </div>
            <a 
              href="mailto:kamalsbrand@gmail.com" 
              className="font-serif-brand font-bold text-lg sm:text-2xl md:text-3xl text-red-950 hover:underline hover:text-red-800 transition-colors break-all"
            >
              kamalsbrand@gmail.com
            </a>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 sm:gap-4 text-red-950 pl-0 sm:pl-2 pt-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-red-950" strokeWidth={2.2} />
            </div>
            <div className="font-serif-brand font-bold text-lg sm:text-2xl md:text-3xl text-red-950 leading-snug">
              <p>West Bengal , Raniganj</p>
              <p className="mt-0.5">Bardhaman District</p>
            </div>
          </div>

        </div>

        {/* Namaste / Pranam Folded Hands Icon & Dhanyavad Section */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center space-y-2">
          {/* Namaste Hands Illustration (Matching Image 5) */}
          <div className="relative transform hover:scale-110 transition-transform">
            <svg 
              className="w-20 h-20 sm:w-28 sm:h-28 text-red-700 drop-shadow-md" 
              viewBox="0 0 120 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Hand Silhouette & Outline */}
              <path 
                d="M60 15 C58 28 50 48 42 62 C38 69 42 76 48 76 C53 76 56 68 60 58" 
                stroke="#b91c1c" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M60 15 C62 28 70 48 78 62 C82 69 78 76 72 76 C67 76 64 68 60 58" 
                stroke="#b91c1c" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Outer Palm & Fingers */}
              <path 
                d="M48 35 C43 45 36 58 35 68 C34 76 40 82 48 82 C55 82 58 75 60 70" 
                stroke="#b91c1c" 
                strokeWidth="3" 
                strokeLinecap="round" 
              />
              <path 
                d="M72 35 C77 45 84 58 85 68 C86 76 80 82 72 82 C65 82 62 75 60 70" 
                stroke="#b91c1c" 
                strokeWidth="3" 
                strokeLinecap="round" 
              />
              {/* Decorative Wrist Lotus Cuffs (matching Image 5) */}
              <path 
                d="M38 82 C42 86 46 95 44 100 C50 96 56 94 60 98 C64 94 70 96 76 100 C74 95 78 86 82 82" 
                stroke="#b91c1c" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="#fde047"
                fillOpacity="0.3"
              />
              <path 
                d="M44 90 C50 94 56 90 60 88 C64 90 70 94 76 90" 
                stroke="#dc2626" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          {/* Dhanyavad Text in White Serif matching Image 5 */}
          <h2 className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] select-none">
            Dhanyavad
          </h2>
        </div>

      </div>
    </section>
  );
}
