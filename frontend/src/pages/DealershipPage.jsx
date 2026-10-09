import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Building2, Send, PhoneCall, Sparkles } from 'lucide-react';

export default function DealershipPage({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    state: '',
    agencyName: '',
    phone: '',
    maxQuantity: '',
    specifiedProduct: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast({
      title: 'Dealership Application Submitted!',
      description: `Thank you ${formData.name}. Our Kamal Brand team will call you at ${formData.phone} shortly.`,
    });
    setFormData({
      name: '',
      address: '',
      state: '',
      agencyName: '',
      phone: '',
      maxQuantity: '',
      specifiedProduct: '',
    });
  };

  const benefits = [
    { title: "TRUST IS MAIN FACTOR IN BUSINESS", desc: "Transparent dealings, reliable supply chain, and trusted brand goodwill." },
    { title: "Quality Products", desc: "Premium grade raw materials, authentic Indian spices, and strict purity checks." },
    { title: "WIDE Range of Products", desc: "From Papads, Toasts, Bhujia, to festive Hampers for every customer segment." },
    { title: "Special Services", desc: "Dedicated distributor support, fast dispatch, and promotional assistance." },
    { title: "Best Packing Unit", desc: "Vacuum sealed, hygienic, moisture-proof packaging for maximum shelf life." }
  ];

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">

        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/10 border border-red-800/20 text-red-900 text-xs font-bold uppercase tracking-wider">
            <Building2 size={14} /> Official Business Partnership
          </div>
          <h2 className="font-serif-brand text-3xl md:text-5xl font-extrabold text-stone-900">
            APPLY FOR DEALERSHIP
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl mx-auto">
            Become an authorized dealer or distributor of Kamal Brand products in your region.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: WHAT YOU WILL GET FROM US (Wireframe 1) */}
          <div className="lg:col-span-5 bg-linear-to-br from-stone-900 via-red-950 to-stone-950 text-amber-100 p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-amber-500/40 space-y-6">
            <div className="border-b border-amber-500/30 pb-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">Partner Benefits</span>
              <h3 className="font-serif-brand text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-amber-400" size={20} />
                WHAT YOU WILL GET FROM US:
              </h3>
            </div>

            <div className="space-y-4">
              {benefits.map((item, idx) => (
                <div key={idx} className="bg-stone-900/80 p-4 rounded-xl border border-amber-500/20 space-y-1 hover:border-amber-400/50 transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm md:text-base">
                    <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
                    <span>{idx + 1}. {item.title}</span>
                  </div>
                  <p className="text-stone-300 text-xs pl-6 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-amber-400" /> Authorized Dealership</span>
              <span className="flex items-center gap-1.5"><PhoneCall size={16} className="text-amber-400" /> Direct Support</span>
            </div>
          </div>

          {/* RIGHT COLUMN: APPLY FOR DEALERSHIP FORM (Wireframe 1) */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
                Dealer Application Form
              </h3>
              <p className="text-xs text-stone-500">Please fill in your business details below</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Name *
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

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Agency / Business Name *
                  </label>
                  <input
                    type="text"
                    name="agencyName"
                    required
                    value={formData.agencyName}
                    onChange={handleChange}
                    placeholder="Enter agency name"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Address *
                </label>
                <textarea
                  name="address"
                  rows={2}
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Complete business address, city, pin code"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Rajasthan, MP, Delhi, UP"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone No. *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Maximum Order Quantity
                  </label>
                  <input
                    type="text"
                    name="maxQuantity"
                    value={formData.maxQuantity}
                    onChange={handleChange}
                    placeholder="e.g. 500 Cartons / Month"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Which Product You Specify Most
                  </label>
                  <input
                    type="text"
                    name="specifiedProduct"
                    value={formData.specifiedProduct}
                    onChange={handleChange}
                    placeholder="e.g. Urad Papad, Toast, Bhujia"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-800 text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Submit Dealership Application
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
