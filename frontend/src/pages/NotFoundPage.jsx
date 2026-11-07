import React from 'react';
import { Link } from '../router';
import { PRODUCTS } from '../data/products';

export default function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white/95 rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-amber-500/40 text-center space-y-5">
        <p className="font-cinzel text-amber-700 font-bold tracking-widest">Error 404</p>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-stone-900">Page Not Found</h1>
        <p className="text-stone-600">Sorry, we couldn't find that page. It may have moved. Try one of these instead:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="px-5 py-2.5 rounded-full bg-red-900 text-amber-200 font-bold text-sm">Home</Link>
          <Link to="/products" className="px-5 py-2.5 rounded-full bg-amber-400 text-red-950 font-bold text-sm">All Products</Link>
          <Link to="/contact" className="px-5 py-2.5 rounded-full border-2 border-red-900 text-red-900 font-bold text-sm">Contact Us</Link>
        </div>
        <ul className="flex flex-wrap justify-center gap-2 pt-2">
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <Link to={p.path} className="text-sm text-red-900 underline">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
