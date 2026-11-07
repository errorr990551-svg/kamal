import React, { useState } from 'react';
import { Gift, PackageCheck, Sparkles, Plus, Check, Send, Loader2, Building, PartyPopper, Heart } from 'lucide-react';
import { PRODUCTS, getProduct } from '../data/products';
import { submitContactForm, formatLines } from '../services/api';
import { phoneError, emailError } from '../utils/validate';
import Field from '../components/Field';
import { FormSuccess, FormError } from '../components/FormStatus';
import { PageHeader } from '../components/Common';
import { useEnquiry } from '../components/Enquiry';
import { Link } from '../router';

// Suggested combinations of catalogue products. Every hamper can be customised; prices are quoted on enquiry.
const HAMPERS = [
  { name: 'Bengali Festive Hamper', occasion: 'Bijoya, Durga Puja & Poila Baisakh', items: ['jhal-chanachur', 'mitha-chanachur', 'fried-chura', 'papdi-gathiya'] },
  { name: 'Classic Namkeen Box', occasion: 'Diwali, Holi & family visits', items: ['bhujia', 'sev', 'phool-gathiya', 'chana-dal'] },
  { name: 'Family Snack Box', occasion: 'Weddings, guests & get-togethers', items: ['jhal-chanachur', 'bhujia', 'masala-matar', 'salted-peanuts'] },
  { name: 'Corporate Gift Hamper', occasion: 'Employees, clients & dealers', items: ['jhal-chanachur', 'mitha-chanachur', 'bhujia', 'papdi-gathiya', 'phool-gathiya', 'sev'] },
];

const BOX_SIZES = ['Small Pack (Mini Gift Box)', 'Medium Pack (Standard Box)', 'Large Pack (Grand Box)', 'Executive Gift Box'];
const EMPTY_CONTACT = { name: '', phone: '', email: '', company: '', notes: '' };

export default function HampersPage() {
  const { openEnquiry } = useEnquiry();
  const [selected, setSelected] = useState(['Jhal Chanachur', 'Bhujia']);
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState(BOX_SIZES[1]);
  const [familyPack, setFamilyPack] = useState(false);
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');
  const [done, setDone] = useState(null);

  const toggle = (name) => setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));
  const onContact = (e) => {
    setContact((c) => ({ ...c, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {
      products: selected.length ? '' : 'Please select at least one product.',
      quantity: quantity.trim() ? '' : 'Please enter how many hampers you need.',
      name: contact.name.trim() ? '' : 'Please enter your name.',
      phone: phoneError(contact.phone),
      email: emailError(contact.email),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      document.querySelector('[aria-invalid="true"], #hamper-products-error')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    setSending(true);
    setServerError('');
    const result = await submitContactForm({
      formType: 'hamper_inquiry',
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      company: contact.company,
      message: formatLines([
        ['Custom hamper products', selected.join(', ')],
        ['Number of hampers', quantity],
        ['Box size', size],
        ['Family pack', familyPack ? 'Yes' : 'No'],
        ['Notes', contact.notes],
      ]),
    });
    setSending(false);
    if (result.success) {
      setDone({ name: contact.name, phone: contact.phone });
      setContact(EMPTY_CONTACT);
    } else {
      setServerError(result.message);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-12 pt-2">
        <PageHeader
          eyebrow="Festival & Celebration Packs"
          icon={Gift}
          title="Namkeen Gift Hampers"
          intro="Share authentic, traditional taste with family, friends, employees and business partners. Kamal Brand namkeen hampers are perfect for Diwali, Bijoya, Durga Puja, Holi, weddings and corporate gifting. Pick a ready combination or build your own."
        />

        <section aria-labelledby="gifting-title" className="space-y-6">
          <h2 id="gifting-title" className="font-serif-brand text-2xl md:text-3xl font-bold text-white flex items-center gap-2 drop-shadow">
            <Sparkles className="text-amber-300" size={24} aria-hidden="true" /> For Gifting
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HAMPERS.map((h) => {
              const items = h.items.map(getProduct);
              return (
                <article key={h.name} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-[#fbb017]/90">
                      {items.slice(0, 4).map((p) => (
                        <img key={p.slug} src={p.thumbs[0]} alt={p.name} width="360" height="360" loading="lazy" className="w-full aspect-square object-contain bg-white/70 rounded-lg p-1" />
                      ))}
                    </div>
                    <h3 className="font-serif-brand font-bold text-stone-900 text-lg">{h.name}</h3>
                    <p className="text-xs font-semibold text-red-900 uppercase tracking-wide">{h.occasion}</p>
                    <ul className="text-sm text-stone-600 space-y-0.5">
                      {items.map((p) => (
                        <li key={p.slug}>
                          •{' '}
                          <Link to={p.path} className="hover:text-red-900 hover:underline">
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openEnquiry({
                        formType: 'hamper_inquiry',
                        heading: `Order the ${h.name}`,
                        subheading: 'Tell us how many hampers you need and when. We will call you with pricing and options.',
                        message: `I would like to order the ${h.name} (${items.map((p) => p.name).join(', ')}).\nNumber of hampers: \nRequired by (date): `,
                      })
                    }
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Gift size={16} aria-hidden="true" /> Order This Hamper
                  </button>
                </article>
              );
            })}
          </div>
          <p className="text-sm text-amber-100/90">Pricing depends on products, pack sizes, box type and quantity. Send an enquiry for a quote.</p>
        </section>

        <section id="custom" aria-labelledby="custom-title" className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6 scroll-mt-24">
          <div className="border-b border-stone-200 pb-3">
            <h2 id="custom-title" className="font-serif-brand text-2xl font-bold text-stone-900 flex items-center gap-2">
              <PackageCheck className="text-red-900" size={24} aria-hidden="true" /> Build a Custom Hamper
            </h2>
            <p className="text-sm text-stone-500">Choose your products, box size and quantity. Our team will call you with a quote.</p>
          </div>

          {done ? (
            <FormSuccess title="Hamper Enquiry Sent!" onReset={() => setDone(null)} resetLabel="Build another hamper">
              Thank you, {done.name}. We will call you on <strong>{done.phone}</strong> with options and pricing for your custom hamper.
            </FormSuccess>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <FormError message={serverError} />
              <fieldset className="space-y-2">
                <legend className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Add Products <span className="text-red-700">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {PRODUCTS.map((p) => {
                    const on = selected.includes(p.name);
                    return (
                      <button
                        type="button"
                        key={p.slug}
                        onClick={() => toggle(p.name)}
                        aria-pressed={on}
                        className={`px-3.5 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                          on ? 'bg-red-900 text-amber-200 ring-1 ring-red-800' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {on ? <Check size={14} className="text-amber-300" aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
                        {p.name}
                      </button>
                    );
                  })}
                </div>
                {errors.products && (
                  <p id="hamper-products-error" className="text-xs font-medium text-red-700">
                    {errors.products}
                  </p>
                )}
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <Field label="Number of Hampers" required inputMode="numeric" value={quantity} onChange={(e) => { setQuantity(e.target.value); setErrors((er) => ({ ...er, quantity: '' })); }} error={errors.quantity} placeholder="e.g. 50 boxes" disabled={sending} />
                <Field label="Box Size" as="select" value={size} onChange={(e) => setSize(e.target.value)} disabled={sending}>
                  {BOX_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Field>
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-stone-300 cursor-pointer bg-stone-50 hover:bg-stone-100 transition-colors">
                    <input type="checkbox" checked={familyPack} onChange={(e) => setFamilyPack(e.target.checked)} className="w-5 h-5 accent-red-900" disabled={sending} />
                    <span className="text-sm font-bold text-stone-800">Family Pack (larger packs)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Your Name" required name="name" autoComplete="name" value={contact.name} onChange={onContact} error={errors.name} placeholder="Your full name" disabled={sending} />
                <Field label="Phone No." required type="tel" inputMode="tel" name="phone" autoComplete="tel" value={contact.phone} onChange={onContact} error={errors.phone} placeholder="10-digit mobile number" disabled={sending} />
                <Field label="Email" type="email" inputMode="email" name="email" autoComplete="email" value={contact.email} onChange={onContact} error={errors.email} placeholder="Optional" disabled={sending} />
                <Field label="Company / City" name="company" autoComplete="organization" value={contact.company} onChange={onContact} placeholder="Optional" disabled={sending} />
              </div>
              <Field label="Notes" as="textarea" rows={2} name="notes" value={contact.notes} onChange={onContact} placeholder="Occasion, delivery date, branding or message cards..." disabled={sending} />

              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-900 hover:bg-red-800 disabled:opacity-75 text-amber-200 font-bold text-sm uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} aria-hidden="true" />} Submit Custom Hamper Enquiry
              </button>
            </form>
          )}
        </section>

        <section className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-500/40 space-y-5">
          <h2 className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900">Namkeen Hampers for Every Occasion</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <h3 className="font-serif-brand font-bold text-lg text-stone-900 flex items-center gap-2"><PartyPopper size={20} className="text-red-800" aria-hidden="true" /> Festivals</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Namkeen is a welcome alternative to sweets for Diwali, Bijoya Dashami, Durga Puja, Poila Baisakh and Holi, and it lasts longer and suits every guest.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif-brand font-bold text-lg text-stone-900 flex items-center gap-2"><Building size={20} className="text-red-800" aria-hidden="true" /> Corporate gifting</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Thank employees, clients and dealers with assorted namkeen boxes. We handle bulk quantities and can discuss custom boxes and message cards.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif-brand font-bold text-lg text-stone-900 flex items-center gap-2"><Heart size={20} className="text-red-800" aria-hidden="true" /> Weddings & family events</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Return gifts and tatva for weddings, annaprashan, griha pravesh and pujas, packed neatly in the box size you choose.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
