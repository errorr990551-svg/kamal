import React from 'react';

export default function ImagePlaceholder({ 
  title = "Image Area", 
  height = "h-48 md:h-64", 
  aspectRatio = "", 
  className = "",
  subtext = "Image Coming Soon"
}) {
  return (
    <div 
      className={`relative w-full ${height} ${aspectRatio} rounded-xl border-2 border-dashed border-red-900/20 bg-stone-100/70 hover:bg-stone-100 transition-all flex flex-col items-center justify-center p-4 text-center overflow-hidden group shadow-inner ${className}`}
    >
      {/* Subtle background lotus graphic watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        <svg className="w-32 h-32 text-red-900" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 15 C55 35 75 45 85 60 C65 65 55 60 50 75 C45 60 35 65 15 60 C25 45 45 35 50 15 Z" />
        </svg>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-600/40 rounded-tl" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-600/40 rounded-tr" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-600/40 rounded-bl" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-600/40 rounded-br" />

      {/* Icon & Label */}
      <div className="z-10 flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-red-800/10 text-red-800 flex items-center justify-center border border-red-800/20 shadow-xs group-hover:scale-105 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="font-serif-brand font-bold text-stone-700 text-sm md:text-base tracking-wide">
          {title}
        </span>
        <span className="text-xs text-stone-400 font-medium">
          {subtext}
        </span>
      </div>
    </div>
  );
}
