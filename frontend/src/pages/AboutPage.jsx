import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, CheckCircle2, Leaf, Users } from 'lucide-react';
import { PageHeader } from '../components/Common';
import { Link } from '../router';
import { PRODUCTS } from '../data/products';
import { IMG } from '../data/site';

const WHY_US = [
  { title: 'Authentic Indian Spices', desc: 'Carefully chosen spices and time-honoured blends for the original, home-style taste.' },
  { title: 'Hygienic Processing', desc: 'Clean, careful processing with sealed, moisture-protected packaging.' },
  { title: 'Quality Edible Oil', desc: 'Every product is fried in high-quality edible oil for a clean, crisp bite.' },
  { title: 'Quality Assurance', desc: 'Every batch is checked for taste, texture and freshness before it is packed.' },
];

const MOTIVES = [
  { icon: Leaf, label: 'Purity', sub: 'Good ingredients, nothing to hide' },
  { icon: Award, label: 'Tradition', sub: 'Recipes Indian homes know and love' },
  { icon: Users, label: 'Customer Satisfaction', sub: 'Trust and smiles in every pack' },
];

export default function AboutPage() {
  const showcase = ['jhal-chanachur', 'bhujia', 'papdi-gathiya', 'mitha-chanachur'].map((s) => PRODUCTS.find((p) => p.slug === s));
  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-12 pt-2">
        <PageHeader
          eyebrow="Our Tradition & Heritage"
          icon={Award}
          title="About Kamal Brand Namkeen"
          intro="Delivering authentic flavour, rich heritage and food purity to every household, from our namkeen unit in Raniganj, Paschim Bardhaman, West Bengal."
        />

        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-stone-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <p className="inline-flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-200">
              <ShieldCheck size={16} aria-hidden="true" /> Quality First Approach
            </p>
            <h2 className="font-serif-brand text-2xl md:text-4xl font-extrabold text-stone-900 leading-tight">Know Our Quality First</h2>
            <p className="text-stone-700 text-base leading-relaxed">
              At <strong className="text-red-900">Kamal Brand</strong>, quality is not just a standard, it is our legacy. We select premium chana besan, pulses, peanuts and freshly ground spices, and fry every product in high-quality edible oil.
            </p>
            <p className="text-stone-700 leading-relaxed">
              Our namkeen is made with time-honoured recipes passed down through generations, combined with hygienic processing and sealed packing so that every pack reaches you fresh and crunchy, whether it is a 90 g pack of Papdi Gathiya or a 500 g pack of Chana Dal.
            </p>
            <ul className="pt-2 flex flex-wrap gap-4 text-sm font-semibold text-stone-700">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="text-amber-600" size={16} aria-hidden="true" /> Premium Besan & Pulses</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="text-amber-600" size={16} aria-hidden="true" /> Quality Edible Oil</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="text-amber-600" size={16} aria-hidden="true" /> Sealed Fresh Packing</li>
            </ul>
          </div>
          <div className="md:col-span-6">
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#fbb017] border border-amber-500 shadow-inner">
              {showcase.map((p) => (
                <Link key={p.slug} to={p.path} className="bg-white/80 rounded-xl p-2 hover:bg-white transition-colors">
                  <img src={p.gallery[0].thumb} alt={`Kamal Brand ${p.name} pack`} width="360" height="360" loading="lazy" className="w-full aspect-square object-contain" />
                  <span className="block text-center text-sm font-bold text-stone-900 mt-1">{p.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-linear-to-br from-stone-900 via-red-950 to-stone-950 text-amber-100 rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-amber-500/40 space-y-8">
          <div className="max-w-3xl space-y-3 text-center md:text-left">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">Vision & Mission</p>
            <h2 className="font-serif-brand text-2xl md:text-4xl font-extrabold text-white">Our Motive</h2>
            <p className="text-stone-200 text-base leading-relaxed">
              Our motive is to preserve the true essence of traditional Indian snacking while following strict quality and hygiene standards. We want to bring authentic flavour to every family meal, gathering and celebration, and to build long-term partnerships with the shopkeepers and distributors who bring our namkeen to their customers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MOTIVES.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-stone-900/90 p-5 rounded-2xl border border-amber-500/30 text-center space-y-3 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-stone-950 border-2 border-amber-400/50 flex items-center justify-center">
                  <Icon className="text-amber-400" size={32} aria-hidden="true" />
                </div>
                <h3 className="font-serif-brand font-bold text-amber-200 text-lg">{label}</h3>
                <p className="text-sm text-stone-300">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img src={IMG.banner(800)} alt="Kamal Brand namkeen product range" width="800" height="320" loading="lazy" className="w-full rounded-2xl object-cover border border-amber-300" />
          <div className="space-y-3 text-stone-700 leading-relaxed">
            <h2 className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900">From Raniganj to Your Table</h2>
            <p>
              Kamal Brand is based in Raniganj, in the Paschim Bardhaman district of West Bengal, a historic industrial town between Asansol and Durgapur. Bengal loves its tea-time snacks, and our range reflects that: Jhal and Mitha Chanachur, Fried Chura (chire bhaja) and Salted Badam sit alongside all-India favourites such as Bhujia, Sev, Papdi Gathiya, Phool Gathiya, Chana Dal and Masala Matar.
            </p>
            <p>
              We supply households, kirana stores, wholesalers, sweet shops and food businesses, appoint dealers and distributors, make festive gift hampers and offer contract manufacturing for brands that want their own namkeen range.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link to="/products" className="px-5 py-2.5 rounded-full bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-sm">See our products</Link>
              <Link to="/dealership" className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-sm">Become a dealer</Link>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <h2 className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900 flex items-center gap-2">
              <Heart className="text-red-800" size={24} aria-hidden="true" /> Why Choose Us
            </h2>
            <p className="text-sm text-stone-500">Reasons distributors and families choose Kamal Brand</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((point, idx) => (
              <div key={point.title} className="bg-amber-50/40 p-5 rounded-2xl border border-amber-200 space-y-2">
                <span className="w-8 h-8 rounded-full bg-red-900 text-amber-200 font-bold text-xs flex items-center justify-center mb-2">0{idx + 1}</span>
                <h3 className="font-serif-brand font-bold text-stone-900 text-lg">{point.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm text-stone-600">
            <Sparkles size={16} className="text-amber-600" aria-hidden="true" /> Have a question about our products or process?{' '}
            <Link to="/contact" className="font-bold text-red-900 underline">Contact us</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
