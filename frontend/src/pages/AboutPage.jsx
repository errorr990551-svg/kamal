import React from 'react';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { Award, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const whyUsPoints = [
    { title: 'Authentic Indian Spices', desc: 'Sourced directly from traditional farms to preserve original taste.' },
    { title: '100% Hygienic Processing', desc: 'No touched by hands automated sorting and moisture controlled packaging.' },
    { title: 'Sun-Dried Perfection', desc: 'Papads dried naturally to achieve ideal crispiness upon frying or roasting.' },
    { title: 'Quality Assurance', desc: 'Every batch undergoes rigorous quality testing before reaching stores.' },
  ];

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-12">

        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/10 border border-red-800/20 text-red-900 text-xs font-bold uppercase tracking-wider">
            <Award size={14} /> Our Tradition & Heritage
          </div>
          <h2 className="font-serif-brand text-3xl md:text-5xl font-extrabold text-stone-900">
            ABOUT US
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl mx-auto">
            Delivering authentic flavor, rich heritage, and uncompromised food purity to every household.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
        </div>

        {/* 1. KNOW OUR QUALITY FIRST (Wireframe 2 top block) */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-stone-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-200">
              <ShieldCheck size={16} /> Quality First Approach
            </div>
            <h3 className="font-serif-brand text-2xl md:text-4xl font-extrabold text-stone-900 leading-tight">
              Know Our Quality First
            </h3>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              At <strong className="text-red-900">Kamal Brand</strong>, quality is not just a standard—it is our legacy. We select only the highest grade pulses, fresh roasted spices, and natural ingredients. 
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Our products are crafted using time-honored recipes passed down through generations, combined with modern hygienic processing techniques to ensure freshness in every bite.
            </p>
            
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="text-amber-600" size={16} /> Premium Pulses</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="text-amber-600" size={16} /> Zero Preservatives</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="text-amber-600" size={16} /> Certified Processing</span>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 shadow-inner">
              <ImagePlaceholder 
                title="Know Our Quality First Image" 
                height="h-64 md:h-80" 
                subtext="Quality Inspection & Processing Facility" 
              />
            </div>
          </div>
        </section>

        {/* 2. OUR MOTIVE (Wireframe 2 middle block) */}
        <section className="bg-linear-to-br from-stone-900 via-red-950 to-stone-950 text-amber-100 rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-amber-500/40 space-y-8">
          <div className="max-w-3xl space-y-3 text-center md:text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Vision & Mission</span>
            <h3 className="font-serif-brand text-2xl md:text-4xl font-extrabold text-white">
              OUR MOTIVE
            </h3>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              Our motive is to preserve the true essence of traditional Indian snacking while adhering to world-class quality and hygiene standards. We aim to bring authentic flavor to every family meal, gathering, and celebration across the nation.
            </p>
          </div>

          {/* Round Images Grid (Matching wireframe 2 pencil drawing circular images) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {[
              { label: 'Purity Motive', sub: 'Chemical Free' },
              { label: 'Tradition Motive', sub: 'Original Recipe' },
              { label: 'Customer Satisfaction', sub: 'Trust & Smiles' },
            ].map((motive, idx) => (
              <div key={idx} className="bg-stone-900/90 p-5 rounded-2xl border border-amber-500/30 text-center space-y-3 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-stone-950 border-2 border-amber-400/50 flex flex-col items-center justify-center p-2 shadow-inner">
                  <Sparkles className="text-amber-400 mb-1" size={24} />
                  <span className="text-[10px] text-amber-200/60 font-bold">Image Area</span>
                </div>
                <h4 className="font-serif-brand font-bold text-amber-200 text-base">{motive.label}</h4>
                <p className="text-xs text-stone-400">{motive.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. AT LAST WHY US (Wireframe 2 bottom block) */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <h3 className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900 flex items-center gap-2">
              <Heart className="text-red-800" size={24} />
              At Last WHY US :
            </h3>
            <p className="text-xs text-stone-500">Reasons why distributors and families choose Kamal Brand</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUsPoints.map((point, idx) => (
              <div key={idx} className="bg-amber-50/40 p-5 rounded-2xl border border-amber-200 space-y-2 hover:bg-red-50/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-red-900 text-amber-200 font-bold text-xs flex items-center justify-center mb-2">
                  0{idx + 1}
                </div>
                <h4 className="font-serif-brand font-bold text-stone-900 text-base">
                  {point.title}
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
