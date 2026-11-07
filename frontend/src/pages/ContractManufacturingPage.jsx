import React, { useEffect, useState } from 'react';
import { Factory, Send, ShieldCheck, PhoneCall, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { submitContractManufacturingForm } from '../services/api';
import { phoneError, emailError } from '../utils/validate';
import Field from '../components/Field';
import { FormSuccess, FormError } from '../components/FormStatus';
import { FaqSection, PageHeader } from '../components/Common';
import { CONTRACT_FAQS } from '../data/faqs';
import { BUSINESS } from '../data/site';

const EMPTY = { name: '', productWanted: '', quantity: '', size: '', phone: '', email: '', dateWanted: '', purpose: '', extraWords: '' };

const CAPABILITIES = [
  { title: 'Bulk Production', text: 'Frying and packing capacity for large and repeat orders of namkeen.' },
  { title: 'Custom Recipe Formulation', text: 'Adjust spice level, sweetness, seasoning and blend for your brand and market.' },
  { title: 'Private Label Packing', text: 'Packing support with your brand on custom printed pouches and boxes.' },
];

const PRODUCTS_WE_MAKE = ['Bhujia', 'Sev', 'Papdi Gathiya', 'Phool Gathiya', 'Jhal Chanachur', 'Mitha Chanachur', 'Chana Dal', 'Fried Chura', 'Salted Peanuts', 'Masala Matar'];

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function ContractManufacturingPage() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');
  const [done, setDone] = useState(null);
  // Set after mount so the prerendered HTML never carries a stale build-time date.
  const [minDate, setMinDate] = useState(undefined);
  useEffect(() => setMinDate(todayISO()), []);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {
      name: form.name.trim() ? '' : 'Please enter your name.',
      productWanted: form.productWanted.trim() ? '' : 'Please tell us which product you need.',
      quantity: form.quantity.trim() ? '' : 'Please enter the quantity.',
      size: form.size.trim() ? '' : 'Please enter the pack size.',
      phone: phoneError(form.phone),
      email: emailError(form.email),
      dateWanted: !form.dateWanted ? 'Please choose a date.' : form.dateWanted < todayISO() ? 'Please choose a future date.' : '',
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setSending(true);
    setServerError('');
    const result = await submitContractManufacturingForm(form);
    setSending(false);
    if (result.success) {
      setDone({ name: form.name, phone: form.phone });
      setForm(EMPTY);
    } else {
      setServerError(result.message);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10 pt-2">
        <PageHeader
          eyebrow="Commercial B2B Solutions"
          icon={Factory}
          title="Namkeen Contract Manufacturing & Private Label"
          intro="Launch or grow your own namkeen brand without building a factory. Kamal Brand manufactures bhujia, sev, gathiya, chanachur, chana dal and more for businesses, made to your recipe, pack size and timeline at our unit in Raniganj, West Bengal."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-linear-to-br from-stone-900 via-red-950 to-stone-950 text-amber-100 p-6 rounded-3xl shadow-2xl border-2 border-amber-500/40 space-y-6">
            <h2 className="font-serif-brand text-xl font-bold text-white flex items-center gap-2 border-b border-amber-500/30 pb-3">
              <Sparkles className="text-amber-400" size={20} aria-hidden="true" /> Why Contract Manufacture With Us?
            </h2>
            <div className="space-y-4">
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="p-3.5 rounded-xl bg-stone-900/80 border border-amber-500/20 space-y-1">
                  <h3 className="font-bold text-amber-300 text-base">{c.title}</h3>
                  <p className="text-stone-300 text-sm leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-amber-500/30 text-amber-200 text-sm flex flex-wrap gap-3 items-center justify-between">
              <span className="flex items-center gap-1">
                <ShieldCheck size={16} className="text-amber-400" aria-hidden="true" /> FSSAI Compliant
              </span>
              <a href={`tel:${BUSINESS.phones[0].tel}`} className="flex items-center gap-1 py-2 hover:text-white">
                <PhoneCall size={16} className="text-amber-400" aria-hidden="true" /> {BUSINESS.phones[0].display}
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="font-serif-brand text-2xl font-bold text-stone-900">Contract Manufacturing Request</h2>
              <p className="text-sm text-stone-500">Share your production requirements. Fields marked * are required.</p>
            </div>

            {done ? (
              <FormSuccess title="Request Received!" onReset={() => setDone(null)} resetLabel="Submit another request">
                Thank you, {done.name}. Our production team will contact you on <strong>{done.phone}</strong> to discuss your requirement.
              </FormSuccess>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <FormError message={serverError} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name" required name="name" autoComplete="name" value={form.name} onChange={onChange} error={errors.name} placeholder="Your full name" disabled={sending} />
                  <Field label="Product You Want" required name="productWanted" value={form.productWanted} onChange={onChange} error={errors.productWanted} placeholder="e.g. Bhujia, Chanachur, Gathiya" disabled={sending} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Quantity" required name="quantity" value={form.quantity} onChange={onChange} error={errors.quantity} placeholder="e.g. 1000 kg / 500 cartons" disabled={sending} />
                  <Field label="Pack Size" required name="size" value={form.size} onChange={onChange} error={errors.size} placeholder="e.g. 200 g pouch" disabled={sending} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone No." required type="tel" inputMode="tel" name="phone" autoComplete="tel" value={form.phone} onChange={onChange} error={errors.phone} placeholder="10-digit mobile number" disabled={sending} />
                  <Field label="Date You Need It By" required type="date" name="dateWanted" min={minDate} value={form.dateWanted} onChange={onChange} error={errors.dateWanted} disabled={sending} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email" type="email" inputMode="email" name="email" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} placeholder="Optional" disabled={sending} />
                  <Field label="Purpose" name="purpose" value={form.purpose} onChange={onChange} placeholder="e.g. Retail, export, white label" disabled={sending} />
                </div>
                <Field label="Additional Details" as="textarea" rows={3} name="extraWords" value={form.extraWords} onChange={onChange} placeholder="Recipe instructions, packaging specifications, branding..." disabled={sending} />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl bg-red-900 hover:bg-red-800 disabled:opacity-75 disabled:cursor-not-allowed text-amber-200 font-bold text-sm uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-amber-300" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Manufacturing Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <section className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-500/40 space-y-5">
          <h2 className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900">Private Label Namkeen Products We Can Make</h2>
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {PRODUCTS_WE_MAKE.map((p) => (
              <li key={p} className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm font-semibold text-stone-800">
                <CheckCircle2 size={16} className="text-amber-600 shrink-0" aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
          <div className="text-stone-700 leading-relaxed space-y-3">
            <h3 className="font-serif-brand font-bold text-xl text-stone-900">How our third-party namkeen manufacturing works</h3>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li><strong>Share your requirement:</strong> the product, quantity, pack size, target date and purpose.</li>
              <li><strong>Recipe & sample:</strong> we discuss taste, spice level and packaging and agree the specification.</li>
              <li><strong>Quote & confirmation:</strong> you receive pricing and timelines for your order.</li>
              <li><strong>Production & packing:</strong> your namkeen is made, packed under your brand and dispatched.</li>
            </ol>
            <p>
              Contract manufacturing suits new snack brands, supermarkets building a private label range, distributors who want their own brand, exporters, and caterers or corporates who need large, consistent quantities.
            </p>
          </div>
        </section>

        <FaqSection faqs={CONTRACT_FAQS} title="Contract Manufacturing FAQs" />
      </div>
    </div>
  );
}
