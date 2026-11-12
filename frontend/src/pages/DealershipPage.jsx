import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Building2, Send, PhoneCall, Sparkles, Loader2, ClipboardList, PhoneIncoming, Truck } from 'lucide-react';
import { submitDealershipForm } from '../services/api';
import { phoneError, emailError } from '../utils/validate';
import Field from '../components/Field';
import { FormSuccess, FormError, INDIAN_STATES } from '../components/FormStatus';
import { FaqSection, PageHeader } from '../components/Common';
import { DEALER_FAQS } from '../data/faqs';
import { PRODUCTS } from '../data/products';
import { BUSINESS } from '../data/site';
import MarketAreas from '../components/MarketAreas';

const EMPTY = { name: '', agencyName: '', address: '', state: '', phone: '', email: '', maxQuantity: '', specifiedProduct: '' };

const BENEFITS = [
  { title: 'Trust Is the Main Factor in Business', desc: 'Transparent dealings, a reliable supply chain and a brand customers recognise.' },
  { title: 'Quality Products', desc: 'Premium besan, pulses, peanuts and spices, fried in high-quality edible oil, with checks on every batch.' },
  { title: 'Wide Range of Products', desc: 'Ten namkeen varieties, from Jhal Chanachur and Bhujia to Gathiya, Chana Dal and Masala Matar, in 90 g to 500 g packs.' },
  { title: 'Special Services', desc: 'Dedicated dealer support, quick dispatch and help with promotion at the point of sale.' },
  { title: 'Best Packing Unit', desc: 'Hygienic, sealed packing that protects freshness and crunch on the shelf.' },
];

const STEPS = [
  { icon: ClipboardList, title: 'Apply online', text: 'Fill in the form below with your business details. It takes about two minutes.' },
  { icon: PhoneIncoming, title: 'We call you', text: 'Our sales team calls to understand your area, outlets and expected volumes.' },
  { icon: Truck, title: 'Start selling', text: 'Agree on the product mix and terms, receive your first stock and start selling.' },
];

export default function DealershipPage() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');
  const [done, setDone] = useState(null);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {
      name: form.name.trim() ? '' : 'Please enter your name.',
      agencyName: form.agencyName.trim() ? '' : 'Please enter your agency or business name.',
      address: form.address.trim() ? '' : 'Please enter your business address.',
      state: form.state.trim() ? '' : 'Please enter your state.',
      phone: phoneError(form.phone),
      email: emailError(form.email),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setSending(true);
    setServerError('');
    const result = await submitDealershipForm(form);
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
          eyebrow="Namkeen Distributorship in West Bengal"
          icon={Building2}
          title="Apply For Kamal Brand Namkeen Dealership"
          intro="Become an authorised dealer, distributor or stockist of Kamal Brand namkeen. We are a manufacturer in Raniganj, West Bengal, looking for committed partners to take our chanachur, bhujia, sev and gathiya to more shops in Asansol, Durgapur, Bardhaman, Kolkata, Siliguri and every district of West Bengal, as well as neighbouring states."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-linear-to-br from-stone-900 via-red-950 to-stone-950 text-amber-100 p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-amber-500/40 space-y-6">
            <div className="border-b border-amber-500/30 pb-4">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Partner Benefits</p>
              <h2 className="font-serif-brand text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-amber-400" size={20} aria-hidden="true" /> What You Will Get From Us
              </h2>
            </div>
            <ol className="space-y-4">
              {BENEFITS.map((item, idx) => (
                <li key={item.title} className="bg-stone-900/80 p-4 rounded-xl border border-amber-500/20 space-y-1">
                  <h3 className="flex items-center gap-2 text-amber-300 font-bold text-base">
                    <CheckCircle2 size={18} className="text-amber-400 shrink-0" aria-hidden="true" /> {idx + 1}. {item.title}
                  </h3>
                  <p className="text-stone-300 text-sm pl-6 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ol>
            <div className="pt-2 border-t border-amber-500/30 flex flex-wrap gap-3 items-center justify-between text-sm text-amber-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-400" aria-hidden="true" /> Authorised Dealership
              </span>
              <a href={`tel:${BUSINESS.phones[0].tel}`} className="flex items-center gap-1.5 py-2 hover:text-white">
                <PhoneCall size={16} className="text-amber-400" aria-hidden="true" /> {BUSINESS.phones[0].display}
              </a>
            </div>
          </div>

          <div id="apply" className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone-200 space-y-6 scroll-mt-24">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="font-serif-brand text-2xl font-bold text-stone-900">Dealer Application Form</h2>
              <p className="text-sm text-stone-500">Fields marked * are required.</p>
            </div>

            {done ? (
              <FormSuccess title="Application Submitted!" onReset={() => setDone(null)} resetLabel="Submit another application">
                Thank you, {done.name}. Our Kamal Brand team will call you on <strong>{done.phone}</strong> shortly to discuss your dealership.
              </FormSuccess>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <FormError message={serverError} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name" required name="name" autoComplete="name" value={form.name} onChange={onChange} error={errors.name} placeholder="Your full name" disabled={sending} />
                  <Field label="Agency / Business Name" required name="agencyName" autoComplete="organization" value={form.agencyName} onChange={onChange} error={errors.agencyName} placeholder="Agency or shop name" disabled={sending} />
                </div>
                <Field label="Address" required as="textarea" rows={2} name="address" autoComplete="street-address" value={form.address} onChange={onChange} error={errors.address} placeholder="Business address, city, PIN code" disabled={sending} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Your State" required name="state" list="state-list" autoComplete="address-level1" value={form.state} onChange={onChange} error={errors.state} placeholder="e.g. West Bengal, Jharkhand, Bihar" disabled={sending} />
                  <Field label="Phone No." required type="tel" inputMode="tel" name="phone" autoComplete="tel" value={form.phone} onChange={onChange} error={errors.phone} placeholder="10-digit mobile number" disabled={sending} />
                </div>
                <datalist id="state-list">
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email" type="email" inputMode="email" name="email" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} placeholder="Optional" disabled={sending} />
                  <Field label="Maximum Order Quantity" name="maxQuantity" value={form.maxQuantity} onChange={onChange} placeholder="e.g. 500 cartons / month" disabled={sending} />
                </div>
                <Field
                  label="Which Products Do You Want Most"
                  name="specifiedProduct"
                  list="product-list"
                  value={form.specifiedProduct}
                  onChange={onChange}
                  placeholder="e.g. Jhal Chanachur, Bhujia, Sev"
                  disabled={sending}
                />
                <datalist id="product-list">
                  {PRODUCTS.map((p) => (
                    <option key={p.slug} value={p.name} />
                  ))}
                </datalist>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl bg-red-900 hover:bg-red-800 disabled:opacity-75 disabled:cursor-not-allowed text-amber-200 font-bold text-sm uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-amber-300" /> Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Dealership Application
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <section aria-labelledby="steps-title" className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-500/40 space-y-6">
          <h2 id="steps-title" className="font-serif-brand text-2xl md:text-3xl font-extrabold text-stone-900 text-center">
            How to Become a Kamal Brand Distributor
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <span className="flex items-center gap-2 text-red-900 font-bold">
                  <span className="w-8 h-8 rounded-full bg-red-900 text-amber-200 text-sm flex items-center justify-center">{i + 1}</span>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-serif-brand font-bold text-lg text-stone-900">{title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
          <div className="text-stone-700 leading-relaxed space-y-3">
            <h3 className="font-serif-brand font-bold text-xl text-stone-900">Why a namkeen distributorship is a good business</h3>
            <p>
              Namkeen is bought every day, in every season and by every age group, which keeps stock moving and gives distributors steady repeat orders from retailers. Snacks such as chanachur, bhujia and sev are staples in Bengal and eastern India, and low-priced packs sell quickly at kirana stores, tea stalls, bus stands and railway stations.
            </p>
            <p>
              With Kamal Brand you deal directly with the manufacturer, so you get consistent quality, a range of fast-moving and premium products, and a team you can call when you need support. Whether you run a single wholesale shop or a multi-town distribution network, tell us about your business and we will discuss the right arrangement for your area.
            </p>
          </div>
        </section>

        <MarketAreas variant="distributor" />

        <FaqSection faqs={DEALER_FAQS} title="Dealership FAQs" />
      </div>
    </div>
  );
}
