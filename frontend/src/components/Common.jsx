import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Phone, MessageSquareText } from 'lucide-react';
import { Link } from '../router';
import { BUSINESS } from '../data/site';
import { useEnquiry } from './Enquiry';

export function Breadcrumbs({ items }) {
  if (!items?.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 pt-5">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-amber-100/90">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={14} className="text-amber-400" aria-hidden="true" />}
              {last ? (
                <span aria-current="page" className="font-semibold text-amber-200">
                  {it.name}
                </span>
              ) : (
                <Link to={it.path} className="hover:text-amber-300 underline-offset-2 hover:underline">
                  {it.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHeader({ eyebrow, icon: Icon, title, intro }) {
  return (
    <div className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-500/40 text-center space-y-3">
      {eyebrow && (
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/10 border border-red-800/20 text-red-900 text-xs font-bold uppercase tracking-wider">
          {Icon && <Icon size={14} aria-hidden="true" />} {eyebrow}
        </p>
      )}
      <h1 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight">{title}</h1>
      {intro && <p className="text-stone-600 text-base max-w-3xl mx-auto leading-relaxed">{intro}</p>}
      <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
    </div>
  );
}

export function FaqSection({ faqs, title = 'Frequently Asked Questions', id = 'faq' }) {
  const [open, setOpen] = useState(0);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-500/40 space-y-5 scroll-mt-24">
      <h2 id={`${id}-title`} className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900">
        {title}
      </h2>
      <div className="divide-y divide-stone-200 border-y border-stone-200">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-a-${i}`}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left font-semibold text-stone-900 hover:text-red-900 cursor-pointer"
                >
                  <span>{f.q}</span>
                  <ChevronDown size={20} className={`shrink-0 text-amber-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              </h3>
              {/* Answers stay in the HTML (hidden attr) so search engines can read every answer. */}
              <div id={`${id}-a-${i}`} hidden={!isOpen} className="pb-4 text-stone-600 leading-relaxed">
                {f.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Sticky call / enquiry bar on phones: the fastest way for mobile visitors to reach the sales team.
export function MobileActionBar() {
  const { openEnquiry } = useEnquiry();
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 gap-2 p-2 bg-red-950/95 backdrop-blur border-t border-amber-500/40 shadow-[0_-4px_16px_rgba(0,0,0,0.3)]" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
      <a href={`tel:${BUSINESS.phones[0].tel}`} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 text-red-950 font-extrabold text-sm uppercase tracking-wide">
        <Phone size={18} aria-hidden="true" /> Call Now
      </a>
      <button
        type="button"
        onClick={() => openEnquiry({ formType: 'bulk_order', heading: 'Get a quote from Kamal Brand', subheading: 'Share your requirement and our team will call you back quickly.' })}
        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-800 text-amber-100 border border-amber-400/60 font-extrabold text-sm uppercase tracking-wide cursor-pointer"
      >
        <MessageSquareText size={18} aria-hidden="true" /> Get Quote
      </button>
    </div>
  );
}
