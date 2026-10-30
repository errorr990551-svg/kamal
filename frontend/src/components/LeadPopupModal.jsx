import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { submitContactForm } from '../services/api';

const STORAGE_KEY = 'kamal_lead_popup_dismissed';

export default function LeadPopupModal({ forceOpen = false, onCloseCustom }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    // Check URL query param ?popup=true for testing
    let isTestMode = false;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      isTestMode = urlParams.get('popup') === 'true';
    } catch {
      isTestMode = false;
    }

    if (forceOpen || isTestMode) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Check localStorage to avoid repeated popups
    try {
      const hasDismissed = localStorage.getItem(STORAGE_KEY);
      if (!hasDismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage fallback
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
    if (onCloseCustom) {
      onCloseCustom();
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Basic client validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in Name, Email, and Phone Number.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setIsSuccess(true);
        try {
          localStorage.setItem(STORAGE_KEY, 'true');
        } catch {
          // Ignore storage errors
        }
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Lead popup submit error:', err);
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-500/30 w-full max-w-lg overflow-hidden relative transform transition-all duration-300 scale-100 animate-slideUp">
        
        {/* Top Decorative Kamal Brand Accent Bar */}
        <div className="h-2 bg-linear-to-r from-red-950 via-red-800 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer shadow-xs focus:outline-none"
          aria-label="Close quote modal"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          /* Confirmation Success State */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-2 border-emerald-400/40 shadow-inner">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} className="text-amber-600" /> Inquiry Confirmed
              </span>
              <h3 className="font-serif-brand text-2xl sm:text-3xl font-extrabold text-stone-900">
                Thank You, {formData.name || 'Valued Partner'}!
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                Your consultation and quote request has been dispatched to our sales team. We guarantee a response within <span className="font-bold text-red-900">30 minutes</span>.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1 text-left">
              <p className="flex items-center gap-2">
                <Clock size={14} className="text-amber-600" /> Fast Response Guaranteed
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" /> Direct Dealership & Bulk Wholesale Pricing
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl bg-red-950 hover:bg-red-900 text-amber-200 font-bold text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Continue Browsing Kamal Brand
            </button>
          </div>
        ) : (
          /* Form Filling State */
          <div className="p-6 sm:p-8 space-y-5">
            {/* Modal Header matching Image 2 */}
            <div className="space-y-1.5 pr-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-900 uppercase tracking-widest">
                <Sparkles size={14} className="text-amber-600" /> Kamal Brand Direct Support
              </div>
              <h2 className="font-serif-brand text-2xl sm:text-3xl font-extrabold text-stone-900 leading-snug">
                Fill this form and get a quote in 30 minutes — guaranteed.
              </h2>
              <p className="text-stone-500 text-sm">
                Let our experts take over from here!
              </p>
            </div>

            {/* Error Alert if any */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form Fields matching Image 2 and User Specs */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Name <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 text-sm text-stone-900 placeholder-stone-400 transition-all disabled:bg-stone-100"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Email <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 text-sm text-stone-900 placeholder-stone-400 transition-all disabled:bg-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 text-sm text-stone-900 placeholder-stone-400 transition-all disabled:bg-stone-100"
                  />
                </div>

                {/* Company / Location (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Company / Location
                  </label>
                  <input
                    type="text"
                    name="company"
                    disabled={isSubmitting}
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company or City"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 text-sm text-stone-900 placeholder-stone-400 transition-all disabled:bg-stone-100"
                  />
                </div>
              </div>

              {/* Message / Project Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Message / Project Notes
                </label>
                <textarea
                  name="message"
                  rows={3}
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share products of interest, expected quantities, or dealership inquiries..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 text-sm text-stone-900 placeholder-stone-400 transition-all disabled:bg-stone-100 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-red-950 hover:bg-red-900 active:scale-[0.99] text-amber-200 font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed border border-amber-500/30"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-amber-300" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} className="text-amber-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] text-stone-500">
                  🔒 We respect your privacy. No spam. Direct official response only.
                </span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

