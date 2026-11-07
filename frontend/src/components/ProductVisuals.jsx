import React, { useEffect, useState } from 'react';
import { Link } from '../router';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return undefined;
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}

// Auto-advancing slideshow. Images beyond the first are only requested once the slideshow reaches them,
// so a page with 10 cards loads 10 small thumbnails instead of 26 full-size photos.
export function useSlides(count, { interval = 2800, offset = 0 } = {}) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (count <= 1 || paused || reduced) return undefined;
    let intervalId;
    const timeoutId = setTimeout(() => {
      // Preload the next image one tick ahead so the crossfade never shows a blank frame.
      setLoaded((l) => Math.max(l, 2));
      intervalId = setInterval(() => {
        setIndex((i) => {
          const next = (i + 1) % count;
          setLoaded((l) => Math.min(count, Math.max(l, next + 2)));
          return next;
        });
      }, interval);
    }, offset);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [count, interval, offset, paused, reduced]);

  const goTo = (i) => {
    setLoaded((l) => Math.max(l, i + 1));
    setIndex(i);
  };
  return { index, loaded, goTo, setPaused };
}

export function ProductCircleCard({ product, index, priority = false }) {
  const { index: current, loaded, setPaused } = useSlides(product.thumbs.length, { interval: 2600, offset: (index % 4) * 450 });
  return (
    <Link
      to={product.path}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="group bg-white/95 hover:bg-amber-50/70 p-4 sm:p-5 rounded-2xl border-2 border-stone-200/80 hover:border-amber-500/70 transition-all duration-300 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 focus-visible:outline-3 focus-visible:outline-amber-500"
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-amber-500/40 bg-stone-50 overflow-hidden shadow-inner group-hover:scale-105 transition-transform mb-2">
        {product.thumbs.slice(0, loaded).map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === 0 ? `Kamal Brand ${product.name} namkeen` : ''}
            width="360"
            height="360"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-contain p-1.5 transition-all duration-700 ease-in-out ${
              i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        ))}
      </div>
      {product.thumbs.length > 1 && (
        <div className="flex items-center justify-center gap-1 my-1.5" aria-hidden="true">
          {product.thumbs.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-4 bg-amber-500' : 'w-1.5 bg-stone-300'}`} />
          ))}
        </div>
      )}
      <h3 className="font-serif-brand font-bold text-stone-900 text-sm sm:text-base group-hover:text-red-900 transition-colors mt-1">{product.name}</h3>
      <span className="text-xs font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full mt-1.5 border border-amber-300/40">{product.tag}</span>
    </Link>
  );
}

export function ProductGallery({ product, eager = false, className = 'h-64 sm:h-72 md:h-80', to }) {
  const { index, loaded, goTo, setPaused } = useSlides(product.gallery.length);
  return (
    <div className="w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Frame to={to} label={`View ${product.name} details`} className={`relative w-full ${className} flex items-center justify-center`}>
        {product.gallery.slice(0, loaded).map((g, i) => (
          <img
            key={g.src}
            src={g.src}
            srcSet={`${g.thumb} 360w, ${g.src} 800w`}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 40vw, 90vw"
            alt={`Kamal Brand ${product.name} ${i === 0 ? 'namkeen pack' : `photo ${i + 1}`}`}
            width="800"
            height="800"
            loading={eager && i === 0 ? 'eager' : 'lazy'}
            fetchPriority={eager && i === 0 ? 'high' : undefined}
            decoding="async"
            className={`absolute inset-0 m-auto max-h-full max-w-full w-auto h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-all duration-700 ease-in-out ${
              i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          />
        ))}
      </Frame>
      {product.gallery.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1 w-fit mx-auto bg-black/25 px-2 py-1 rounded-full">
          {product.gallery.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => goTo(i)}
              className="p-2.5 cursor-pointer"
              aria-label={`Show ${product.name} photo ${i + 1}`}
              aria-pressed={i === index}
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-red-950' : 'w-2 bg-stone-800/60'}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Frame({ to, label, className, children }) {
  return to ? (
    <Link to={to} aria-label={label} className={`block ${className}`}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
}
