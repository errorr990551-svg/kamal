import React, { useState } from 'react';
import { Factory, Send, ShieldCheck, PhoneCall, Sparkles, Loader2 } from 'lucide-react';
import { submitContractManufacturingForm } from '../services/api';

export default function ContractManufacturingPage({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    productWanted: '',
    quantity: '',
    size: '',
    phone: '',
    dateWanted: '',
    purpose: '',
    extraWords: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContractManufacturingForm(formData);

      if (result.success) {
        showToast({
          title: 'Contract Manufacturing Request Received!',
          description: `Thank you ${formData.name}. Our commercial production team will contact you at ${formData.phone}.`,
        });
        setFormData({
          name: '',
          productWanted: '',
          quantity: '',
          size: '',
          phone: '',
          dateWanted: '',
          purpose: '',
          extraWords: '',
        });
      } else {
        showToast({
          title: 'Submission Issue',
          description: result.message || 'Please check your details and try again.',
        });
      }
    } catch {
      showToast({
        title: 'Connection Error',
        description: 'Unable to reach the server. Please try again or call us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">

        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/10 border border-red-800/20 text-red-900 text-xs font-bold uppercase tracking-wider">
            <Factory size={14} /> Commercial B2B Solutions
          </div>
          <h2 className="font-serif-brand text-3xl md:text-5xl font-extrabold text-stone-900">
            CONTRACT MANUFACTURING
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl mx-auto">
            Get your own private label papads, toasts, and namkeens processed in our state-of-the-art manufacturing plant.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Info Panel */}
          <div className="lg:col-span-4 bg-linear-to-br from-stone-900 via-red-950 to-stone-950 text-amber-100 p-6 rounded-3xl shadow-2xl border-2 border-amber-500/40 space-y-6">
            <div className="border-b border-amber-500/30 pb-3">
              <h3 className="font-serif-brand text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-amber-400" size={20} />
                Why Contract Manufacture With Us?
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-900/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-300 block text-sm">High Capacity Processing</span>
                <span className="text-stone-300 leading-relaxed">Modern automated drying and frying lines capable of handling large bulk orders seamlessly.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-300 block text-sm">Custom Recipe Formulation</span>
                <span className="text-stone-300 leading-relaxed">Customize spice blends, thickness, size, and pulse proportion for your brand.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-300 block text-sm">Private Label Packing</span>
                <span className="text-stone-300 leading-relaxed">Complete packaging support with custom pouch printing and box packaging.</span>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-amber-400" /> FSSAI Compliant</span>
              <span className="flex items-center gap-1"><PhoneCall size={16} className="text-amber-400" /> Bulk Pricing</span>
            </div>
          </div>

          {/* Right Form: CONTRACT MANUFACTURING FORM (Wireframe 2 bottom form) */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
                Contract Manufacturing Request
              </h3>
              <p className="text-xs text-stone-500">Please provide your custom production specifications</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name :- */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Name :- *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>

                {/* Product You want :- */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Product You want :- *
                  </label>
                  <input
                    type="text"
                    name="productWanted"
                    required
                    value={formData.productWanted}
                    onChange={handleChange}
                    placeholder="e.g. Urad Papad, Moong Papad, Toast"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Quantity :- */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Quantity :- *
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 1000 Kg / 500 Cartons"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>

                {/* Size :- */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Size :- *
                  </label>
                  <input
                    type="text"
                    name="size"
                    required
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="e.g. 7 inch / 200g Pouch"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone no. :- */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone no. :- *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>

                {/* DATE You want :- */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    DATE You want :- *
                  </label>
                  <input
                    type="date"
                    name="dateWanted"
                    required
                    value={formData.dateWanted}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>
              </div>

              {/* For Which Purpose :- */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  For Which Purpose :-
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="e.g. Retail distribution, Export, White label brand"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                />
              </div>

              {/* Extra Words :- */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Extra Words :-
                </label>
                <textarea
                  name="extraWords"
                  rows={3}
                  value={formData.extraWords}
                  onChange={handleChange}
                  placeholder="Any additional recipe instructions, custom packaging specifications..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-red-900 hover:bg-red-800 disabled:opacity-75 disabled:cursor-not-allowed text-amber-200 font-bold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-amber-300" />
                      <span>Submitting Proposal...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Manufacturing Proposal</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
