import React, { useEffect, useState } from 'react';
import { Search, Menu, X, Building2, Package, Info, Gift, Factory, Home, Phone } from 'lucide-react';
import { Link, useRouter } from '../router';
import { NAV_ITEMS } from '../data/site';

const ICONS = { '/': Home, '/products': Package, '/dealership': Building2, '/hampers': Gift, '/contract': Factory, '/about': Info, '/contact': Phone };

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { path } = useRouter();
  const section = path.startsWith('/products') ? '/products' : path;

  useEffect(() => setMobileMenuOpen(false), [path]);

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-40 bg-red-950/95 backdrop-blur-md text-amber-100 border-b border-amber-600/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="xl:hidden p-2.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-amber-200 border border-amber-500/30 transition-colors shrink-0"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <ul className="hidden xl:flex items-center gap-1.5 flex-1">
            {NAV_ITEMS.map((item) => {
              const Icon = ICONS[item.path];
              const isActive = section === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all uppercase whitespace-nowrap ${
                      isActive
                        ? 'bg-amber-400 text-red-950 shadow-md ring-2 ring-amber-300 font-bold'
                        : 'bg-red-900/40 hover:bg-red-800/80 text-amber-100/90 hover:text-white border border-amber-500/20'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-red-950' : 'text-amber-300'} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <form role="search" className="relative w-full max-w-md xl:max-w-[13rem] ml-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search namkeen..."
              enterKeyHint="search"
              className="w-full pl-9 pr-9 py-2 text-base xl:text-sm rounded-full bg-stone-900/80 text-amber-100 placeholder-amber-200/60 border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-stone-900 transition-all shadow-inner [&::-webkit-search-cancel-button]:hidden"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-300/70 pointer-events-none" size={15} aria-hidden="true" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-amber-300/80 hover:text-white"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </form>
        </div>

        {mobileMenuOpen && (
          <ul id="mobile-nav" className="xl:hidden mt-3 pt-3 border-t border-amber-700/40 grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2 animate-fadeIn">
            {NAV_ITEMS.map((item) => {
              const Icon = ICONS[item.path];
              const isActive = section === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive ? 'bg-amber-400 text-red-950 font-bold shadow-md' : 'bg-red-900/40 hover:bg-red-800 text-amber-100 border border-amber-500/20'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-red-950' : 'text-amber-300'} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}
