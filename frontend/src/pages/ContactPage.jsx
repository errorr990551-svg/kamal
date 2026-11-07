import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, MessageSquareText, Building2, Factory, Gift } from 'lucide-react';
import { submitContactForm } from '../services/api';
import { phoneError, emailError } from '../utils/validate';
import Field from '../components/Field';
import { FormSuccess, FormError } from '../components/FormStatus';
import { PageHeader } from '../components/Common';
import { Link } from '../router';
import { BUSINESS } from '../data/site';

const EMPTY = { name: '', phone: '', email: '', company: '', topic: 'Bulk / wholesale order', message: '' };
const TOPICS = ['Bulk / wholesale order', 'Dealership / distributorship', 'Gift hampers', 'Contract manufacturing', 'Product question', 'Other'];

export default function ContactPage() {
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
    const next = { name: form.name.trim() ? '' : 'Please enter your name.', phone: phoneError(form.phone), email: emailError(form.email) };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setSending(true);
    setServerError('');
    const result = await submitContactForm({
      formType: 'contact_page',
      name: form.name,
      phone: form.phone,
      email: form.email,
      company: form.company,
      message: `Topic: ${form.topic}\n${form.message}`.trim(),
    });
    setSending(false);
    if (result.success) {
      setDone({ name: form.name, phone: form.phone });
      setForm(EMPTY);
    } else setServerError(result.message);
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10 pt-2">
        <PageHeader
          eyebrow="We're Here to Help"
          icon={MessageSquareText}
          title="Contact Kamal Brand"
          intro="Call, email or send us a message for bulk namkeen orders, wholesale prices, dealership, gift hampers or contract manufacturing. Our sales team replies quickly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <address className="not-italic bg-linear-to-br from-stone-900 via-red-950 to-stone-950 text-amber-100 p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-amber-500/40 space-y-5">
              <h2 className="font-serif-brand text-2xl font-bold text-white">Kamal Brand Namkeen</h2>
              <div className="flex items-start gap-3">
                <Phone className="text-amber-400 shrink-0 mt-1" size={20} aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-amber-300 font-bold">Phone</p>
                  {BUSINESS.phones.map((ph) => (
                    <a key={ph.tel} href={`tel:${ph.tel}`} className="block text-lg font-semibold hover:text-white py-0.5">
                      {ph.display}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-amber-400 shrink-0 mt-1" size={20} aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-amber-300 font-bold">Email</p>
                  <a href={`mailto:${BUSINESS.email}`} className="inline-block py-1 text-lg font-semibold hover:text-white break-all">
                    {BUSINESS.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-amber-400 shrink-0 mt-1" size={20} aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-amber-300 font-bold">Address</p>
                  <p className="text-lg font-semibold">{BUSINESS.address.display}</p>
                </div>
              </div>
              <p className="text-sm text-stone-300">We speak Hindi, English and Bengali.</p>
            </address>

            <div className="bg-white/95 rounded-3xl p-6 shadow-xl border-2 border-amber-500/40 space-y-3">
              <h2 className="font-serif-brand text-xl font-bold text-stone-900">Looking for something specific?</h2>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dealership" className="flex items-center gap-2 font-semibold text-red-900 hover:underline"><Building2 size={16} aria-hidden="true" /> Apply for dealership / distributorship</Link></li>
                <li><Link to="/contract" className="flex items-center gap-2 font-semibold text-red-900 hover:underline"><Factory size={16} aria-hidden="true" /> Contract manufacturing & private label</Link></li>
                <li><Link to="/hampers" className="flex items-center gap-2 font-semibold text-red-900 hover:underline"><Gift size={16} aria-hidden="true" /> Festive & corporate gift hampers</Link></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="font-serif-brand text-2xl font-bold text-stone-900">Send Us a Message</h2>
              <p className="text-sm text-stone-500">Fields marked * are required.</p>
            </div>
            {done ? (
              <FormSuccess title="Message Sent!" onReset={() => setDone(null)} resetLabel="Send another message">
                Thank you, {done.name}. Our team will call you on <strong>{done.phone}</strong> shortly.
              </FormSuccess>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <FormError message={serverError} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name" required name="name" autoComplete="name" value={form.name} onChange={onChange} error={errors.name} placeholder="Your full name" disabled={sending} />
                  <Field label="Phone No." required type="tel" inputMode="tel" name="phone" autoComplete="tel" value={form.phone} onChange={onChange} error={errors.phone} placeholder="10-digit mobile number" disabled={sending} />
                  <Field label="Email" type="email" inputMode="email" name="email" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} placeholder="Optional" disabled={sending} />
                  <Field label="Shop / Company / City" name="company" autoComplete="organization" value={form.company} onChange={onChange} placeholder="Optional" disabled={sending} />
                </div>
                <Field label="Topic" as="select" name="topic" value={form.topic} onChange={onChange} disabled={sending}>
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Field>
                <Field label="Message" as="textarea" rows={4} name="message" value={form.message} onChange={onChange} placeholder="Products, quantities, location or your question..." disabled={sending} />
                <button type="submit" disabled={sending} className="w-full py-3.5 rounded-xl bg-red-900 hover:bg-red-800 disabled:opacity-75 text-amber-200 font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} aria-hidden="true" />} Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
