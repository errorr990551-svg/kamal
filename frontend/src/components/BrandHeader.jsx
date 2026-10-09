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

          {/* Lotus Emblem: Using frontend/public/kamal logo.webp */}
          <div className="relative flex items-center justify-center my-1 px-1 sm:px-2">
            <img 
              src="/kamal logo.webp" 
              alt="Kamal Brand Logo" 
              className="h-12 sm:h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform"
            />
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
