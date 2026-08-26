import React from 'react';

export default function BrandHeader({ subtitle = "savour the authentic flavors in every bite" }) {
  return (
    <header className="relative bg-kamal-pattern text-white pt-8 pb-10 px-4 shadow-xl border-b-4 border-amber-500/60 overflow-hidden select-none">
      {/* Subtle Inner Glow Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-red-950/40 via-transparent to-black/20 pointer-events-none" />

      {/* Decorative Top Border Line */}
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 mb-3">
        <div className="h-px bg-linear-to-r from-transparent via-amber-300/60 to-transparent flex-1" />
        <span className="text-amber-300/80 text-xs tracking-widest uppercase font-cinzel">Est. Quality & Purity</span>
        <div className="h-px bg-linear-to-r from-transparent via-amber-300/60 to-transparent flex-1" />
      </div>

      {/* Main Brand Title with Lotus Icon */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          {/* Brand Name Left */}
          <h1 className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
            Kamal
          </h1>

          {/* Lotus Emblem (Matching Image 3) */}
          <div className="relative flex items-center justify-center my-1">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-amber-400/20 border border-amber-300/50 flex items-center justify-center shadow-inner backdrop-blur-xs p-1">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-300 drop-shadow" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                {/* Lotus Petals Drawing */}
                <path d="M50 15 C55 35 75 45 85 60 C65 65 55 60 50 75 C45 60 35 65 15 60 C25 45 45 35 50 15 Z" fill="url(#goldGrad)" stroke="#fef08a" strokeWidth="2.5" />
                <path d="M50 28 C55 42 68 50 75 62 C60 65 54 62 50 73 C46 62 40 65 25 62 C32 50 45 42 50 28 Z" fill="#fde047" fillOpacity="0.5" stroke="#fef08a" strokeWidth="1.5" />
                <path d="M50 40 C53 48 60 54 65 64 C55 66 52 64 50 70 C48 64 45 66 35 64 C40 54 47 48 50 40 Z" fill="#fef08a" fillOpacity="0.8" />
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Brand Name Right */}
          <h1 className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
            Brand
          </h1>
        </div>

        {/* Tagline matching Image 3 exact words & style */}
        <div className="mt-3 flex items-center justify-center gap-3 max-w-xl w-full">
          <div className="h-px bg-linear-to-r from-transparent via-amber-300/70 to-amber-300 flex-1 hidden sm:block" />
          <p className="font-serif-brand italic text-amber-100/90 text-sm sm:text-lg md:text-xl font-medium tracking-wide">
            {subtitle}
          </p>
          <div className="h-px bg-linear-to-l from-transparent via-amber-300/70 to-amber-300 flex-1 hidden sm:block" />
        </div>

        {/* Decorative Golden Flourish Line */}
        <div className="mt-2 w-36 h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full" />
      </div>
    </header>
  );
}
