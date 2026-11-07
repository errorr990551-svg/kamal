import React from 'react';
import { Link } from '../router';
import { IMG } from '../data/site';

// Decorative brand banner. Uses <p>/<span> (not <h1>) so each page keeps exactly one meaningful <h1>.
export default function BrandHeader({ subtitle = 'savour the authentic flavors in every bite' }) {
  return (
    <header className="relative bg-kamal-pattern text-white pt-5 pb-6 sm:pt-8 sm:pb-10 px-4 shadow-xl border-b-4 border-amber-500/60 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-red-950/40 via-transparent to-black/20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto flex items-center justify-center gap-4 mb-2 sm:mb-3">
        <div className="h-px bg-linear-to-r from-transparent via-amber-300/60 to-transparent flex-1" />
        <span className="text-amber-300/90 text-[11px] sm:text-xs tracking-widest uppercase font-cinzel">Est. Quality & Purity</span>
        <div className="h-px bg-linear-to-r from-transparent via-amber-300/60 to-transparent flex-1" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
        <Link to="/" className="flex items-center justify-center gap-3 md:gap-6 group" aria-label="Kamal Brand – Home">
          <span className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">Kamal</span>
          <img
            src={IMG.logo}
            alt=""
            width="300"
            height="200"
            fetchPriority="high"
            className="h-11 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform"
          />
          <span className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">Brand</span>
        </Link>

        <div className="mt-2 sm:mt-3 flex items-center justify-center gap-3 max-w-xl w-full">
          <div className="h-px bg-linear-to-r from-transparent via-amber-300/70 to-amber-300 flex-1 hidden sm:block" />
          <p className="font-serif-brand italic text-amber-100/90 text-sm sm:text-lg md:text-xl font-medium tracking-wide">{subtitle}</p>
          <div className="h-px bg-linear-to-l from-transparent via-amber-300/70 to-amber-300 flex-1 hidden sm:block" />
        </div>
        <div className="mt-2 w-36 h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full" />
      </div>
    </header>
  );
}
