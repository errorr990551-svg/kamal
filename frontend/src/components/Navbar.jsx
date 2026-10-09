import React, { useState } from 'react';
import { Search, Menu, X, Building2, Package, Info, Gift, Factory, Home } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dealership', label: 'Apply For Dealership', icon: Building2 },
    { id: 'products', label: 'Our Products', icon: Package },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'hampers', label: 'Hampers', icon: Gift },
    { id: 'contract', label: 'Contract Manufacturing', icon: Factory },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-red-950/95 backdrop-blur-md text-amber-100 border-b border-amber-600/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-red-900/60 hover:bg-red-800 text-amber-200 border border-amber-500/30 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Navigation Pills (Desktop - exact items from pencil wireframe) */}
          <div className="hidden md:flex items-center gap-1.5 flex-wrap flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all uppercase ${
                    isActive
                      ? 'bg-amber-400 text-red-950 shadow-md ring-2 ring-amber-300 font-bold scale-105'
                      : 'bg-red-900/40 hover:bg-red-800/80 text-amber-100/90 hover:text-white border border-amber-500/20'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-red-950' : 'text-amber-300'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar (Pencil wireframe element) */}
          <div className="relative w-full max-w-xs md:max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Papad, Toast, Namkeen..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full bg-stone-900/80 text-amber-100 placeholder-amber-200/50 border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-stone-900 transition-all shadow-inner"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-300/70" size={14} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-300/70 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-amber-700/40 flex flex-col gap-2 pb-2 animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-400 text-red-950 font-bold shadow-md'
                      : 'bg-red-900/40 hover:bg-red-800 text-amber-100 border border-amber-500/20'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-red-950' : 'text-amber-300'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
