import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Clock, ShieldCheck, Phone } from 'lucide-react';
import { submitContactForm } from '../services/api';
import { phoneError, emailError } from '../utils/validate';
import { BUSINESS } from '../data/site';
import Field from './Field';

const STORAGE_KEY = 'kamal_lead_popup_dismissed';
const AUTO_OPEN_DELAY_MS = 25000;
// Pages that already contain their own form: never interrupt visitors there.
const NO_AUTO_POPUP = ['/dealership', '/contract', '/contact'];

const EnquiryContext = createContext({ openEnquiry: () => {} });
export const useEnquiry = () => useContext(EnquiryContext);

const DEFAULT_COPY = {
  formType: 'lead_popup',
  heading: 'Fill this form and get a quote in 30 minutes.',
  subheading: 'Bulk orders, wholesale prices and dealership enquiries. Let our experts take over from here!',
  message: '',
};

export function EnquiryProvider({ path, children }) {
  const [state, setState] = useState(null); // null = closed

  const openEnquiry = useCallback((opts = {}) => setState({ ...DEFAULT_COPY, ...opts }), []);
  const close = useCallback(() => {
    setState((prev) => {
      if (prev?.formType === 'lead_popup') {
        try {
          localStorage.setItem(STORAGE_KEY, 'true');
        } catch {
          /* storage unavailable */
        }
      }
      return null;
    });
  }, []);

  // One-time, delayed popup for first-time visitors (or instantly testable with ?popup=true).
  useEffect(() => {
    let force = false;
    try {
      force = new URLSearchParams(window.location.search).get('popup') === 'true';
    } catch {
      /* ignore */
    }
    if (!force) {
      if (NO_AUTO_POPUP.includes(path)) return undefined;
      try {
        if (localStorage.getItem(STORAGE_KEY)) return undefined;
      } catch {
        /* storage unavailable: still show once per page load */
      }
    }
    const t = setTimeout(() => setState((s) => s || { ...DEFAULT_COPY }), force ? 1500 : AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, [path]);

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      {state && <EnquiryModal key={state.formType + state.message} config={state} onClose={close} />}
    </EnquiryContext.Provider>
  );
}

function EnquiryModal({ config, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: config.message || '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const [serverError, setServerError] = useState('');
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);
  const sending = status === 'sending';

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstInputRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape' && !sending) onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll('button, [href], input, select, textarea');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [onClose, sending]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }));
    if (serverError) setServerError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      name: form.name.trim() ? '' : 'Please enter your name.',
      phone: phoneError(form.phone),
      email: emailError(form.email),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus('sending');
    const result = await submitContactForm({ ...form, formType: config.formType });
    if (result.success) {
      setStatus('success');
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        /* ignore */
      }
    } else {
      setStatus('idle');
      setServerError(result.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-xs animate-fadeIn"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !sending) onClose();
      }}
    >
      <div className="flex min-h-full items-start sm:items-center justify-center p-3 sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && !sending && onClose()}>
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
          className="relative w-full max-w-lg my-4 bg-white rounded-3xl shadow-2xl border-2 border-amber-500/30 overflow-hidden animate-slideUp"
        >
          <div className="h-2 bg-linear-to-r from-red-950 via-red-800 to-amber-500" />
          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close enquiry form"
          >
            <X size={20} />
          </button>

          {status === 'success' ? (
            <div className="p-7 sm:p-10 text-center space-y-6" aria-live="polite">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-2 border-emerald-400/40">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={14} className="text-amber-600" /> Enquiry Received
                </span>
                <h2 id="enquiry-title" className="font-serif-brand text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Thank you, {form.name.trim().split(' ')[0]}!
                </h2>
                <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                  Your enquiry has reached the Kamal Brand sales team. We will call you on{' '}
                  <span className="font-bold text-red-900">{form.phone}</span>, usually within{' '}
                  <span className="font-bold text-red-900">30 minutes</span> during business hours.
                </p>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-sm text-stone-600 space-y-1.5 text-left">
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-amber-600" /> Fast response from our sales team
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" /> Direct dealership & wholesale pricing
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-red-950 hover:bg-red-900 text-amber-200 font-bold text-sm uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="p-5 sm:p-8 space-y-5">
              <div className="space-y-1.5 pr-12">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-900 uppercase tracking-widest">
                  <Sparkles size={14} className="text-amber-600" /> Kamal Brand Direct Support
                </div>
                <h2 id="enquiry-title" className="font-serif-brand text-2xl sm:text-3xl font-extrabold text-stone-900 leading-snug">
                  {config.heading}
                </h2>
                <p className="text-stone-600 text-sm">{config.subheading}</p>
              </div>

              {serverError && (
                <div role="alert" className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5">
                  <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name" required name="name" autoComplete="name" value={form.name} onChange={onChange} disabled={sending} error={errors.name} placeholder="Your full name" ref={firstInputRef} />
                  <Field label="Phone Number" required type="tel" inputMode="tel" name="phone" autoComplete="tel" value={form.phone} onChange={onChange} disabled={sending} error={errors.phone} placeholder="10-digit mobile number" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email" type="email" inputMode="email" name="email" autoComplete="email" value={form.email} onChange={onChange} disabled={sending} error={errors.email} placeholder="you@example.com (optional)" />
                  <Field label="Company / City" name="company" autoComplete="organization" value={form.company} onChange={onChange} disabled={sending} placeholder="Shop, company or city" />
                </div>
                <Field label="Message" as="textarea" rows={3} name="message" value={form.message} onChange={onChange} disabled={sending} placeholder="Products you need, quantity, or your dealership question..." />

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 px-6 rounded-xl bg-red-950 hover:bg-red-900 text-amber-200 font-bold text-sm uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed border border-amber-500/30"
                >
                  {sending ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-amber-300" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="text-amber-300" /> Send Enquiry
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-stone-500">
                  Prefer to talk?{' '}
                  <a href={`tel:${BUSINESS.phones[0].tel}`} className="inline-flex items-center gap-1 font-bold text-red-900 underline">
                    <Phone size={12} /> {BUSINESS.phones[0].display}
                  </a>
                  <br />
                  🔒 We respect your privacy. No spam.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
