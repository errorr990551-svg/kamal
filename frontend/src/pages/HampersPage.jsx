import React, { useState } from 'react';
import BrandHeader from '../components/BrandHeader';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { Gift, PackageCheck, Sparkles, Plus, Check, Send } from 'lucide-react';

export default function HampersPage({ showToast }) {
  // Pre-configured gifting hampers
  const giftingHampers = [
    { name: 'Royal Festive Hamper', contents: 'Urad Papad + Toast + Bikaneri Bhujia + Mathri', price: '₹499' },
    { name: 'Traditional Celebration Pack', contents: 'Moong Papad + Butter Rusk + Mix Namkeen + Sweets', price: '₹799' },
    { name: 'Family Snack Box', contents: 'Large Urad Papad + 2 Toast Packs + 3 Namkeen Varieties', price: '₹999' },
    { name: 'Corporate Gift Hamper', contents: 'Assorted Papads + Premium Dryfruit Mix + Sweets Box', price: '₹1299' },
  ];

  // Custom Hamper State
  const availableProducts = ['Urad Papad', 'Moong Papad', 'Crispy Toast', 'Bikaneri Bhujia', 'Mix Namkeen', 'Mathri', 'Sweets Box'];
  const [selectedProducts, setSelectedProducts] = useState(['Urad Papad', 'Crispy Toast']);
  const [quantity, setQuantity] = useState('10 Boxes');
  const [size, setSize] = useState('Medium Pack');
  const [isFamilyPack, setIsFamilyPack] = useState(true);

  const toggleProduct = (prod) => {
    if (selectedProducts.includes(prod)) {
      setSelectedProducts(selectedProducts.filter(p => p !== prod));
    } else {
      setSelectedProducts([...selectedProducts, prod]);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      showToast({
        title: 'Please Select Products',
        description: 'Select at least one product for your custom hamper.',
      });
      return;
    }
    showToast({
      title: 'Custom Hamper Order Requested!',
      description: `Request for ${quantity} (${size}${isFamilyPack ? ' - Family Pack' : ''}) submitted successfully.`,
    });
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      {/* Brand Header Banner (Matching Image 2 pencil wireframe top header note "Kamal Brand Same Here") */}
      <BrandHeader subtitle="Gifting & Custom Celebration Hampers" />

      <div className="max-w-7xl mx-auto px-4 space-y-12">

        {/* Section Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/10 border border-red-800/20 text-red-900 text-xs font-bold uppercase tracking-wider">
            <Gift size={14} /> Festival & Celebration Packs
          </div>
          <h2 className="font-serif-brand text-3xl md:text-5xl font-extrabold text-stone-900">
            HAMPERS
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl mx-auto">
            Share authentic traditional taste with your loved ones, corporate partners, and family.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
        </div>

        {/* 1. FOR GIFTING (Wireframe 2 middle top) */}
        <section className="space-y-6">
          <div className="border-b-2 border-red-900/20 pb-2">
            <h3 className="font-serif-brand text-2xl font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="text-amber-600" size={24} />
              FOR GIFTING :
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftingHampers.map((hamper, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Empty Image Container (Wireframe 2: Hamper Images) */}
                  <ImagePlaceholder 
                    title={hamper.name} 
                    height="h-44" 
                    subtext="Hamper Box Image Area" 
                  />

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif-brand font-bold text-stone-900 text-base">
                        {hamper.name}
                      </h4>
                      <span className="text-xs font-extrabold text-red-900 bg-red-50 px-2 py-0.5 rounded-full">
                        {hamper.price}
                      </span>
                    </div>
                    <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                      {hamper.contents}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => showToast({
                    title: 'Hamper Inquiry Sent',
                    description: `Inquiry for ${hamper.name} received! We will contact you soon.`,
                  })}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Gift size={14} /> Order Gifting Pack
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 2. CUSTOM HAMPER (Wireframe 2 middle bottom) */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <h3 className="font-serif-brand text-2xl font-bold text-stone-900 flex items-center gap-2">
              <PackageCheck className="text-red-900" size={24} />
              Custom Hamper :
            </h3>
            <p className="text-xs text-stone-500">Build your customized gift hamper according to your choice & quantity</p>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-6">
            
            {/* Add Products Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Add Products :-
              </label>
              <div className="flex flex-wrap gap-2">
                {availableProducts.map((prod) => {
                  const isSelected = selectedProducts.includes(prod);
                  return (
                    <button
                      type="button"
                      key={prod}
                      onClick={() => toggleProduct(prod)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-red-900 text-amber-200 shadow-xs ring-1 ring-red-800'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? <Check size={14} className="text-amber-300" /> : <Plus size={14} />}
                      <span>{prod}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Quantity :-
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 50 Boxes"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                />
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Size :-
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm bg-white"
                >
                  <option value="Small Pack">Small Pack (Mini Gift Box)</option>
                  <option value="Medium Pack">Medium Pack (Standard Box)</option>
                  <option value="Large Pack">Large Pack (Grand Box)</option>
                  <option value="Executive Wooden Box">Executive Wooden Box</option>
                </select>
              </div>

              {/* Family Pack Option (Wireframe 2 checkbox) */}
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-stone-300 cursor-pointer bg-stone-50 hover:bg-stone-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={isFamilyPack}
                    onChange={(e) => setIsFamilyPack(e.target.checked)}
                    className="w-4 h-4 text-red-900 rounded accent-red-900 focus:ring-red-800"
                  />
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Family Pack :-
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Send size={16} /> Submit Custom Hamper Inquiry
              </button>
            </div>

          </form>
        </section>

      </div>
    </div>
  );
}
