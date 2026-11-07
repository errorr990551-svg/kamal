import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function FormSuccess({ title, children, onReset, resetLabel = 'Submit another' }) {
  return (
    <div role="status" className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3">
      <CheckCircle2 size={44} className="mx-auto text-emerald-600" aria-hidden="true" />
      <h3 className="font-serif-brand text-2xl font-extrabold text-stone-900">{title}</h3>
      <div className="text-stone-700 leading-relaxed">{children}</div>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-2 px-5 py-2.5 rounded-full bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-sm cursor-pointer">
          {resetLabel}
        </button>
      )}
    </div>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return (
    <div role="alert" className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5">
      <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

export const INDIAN_STATES = [
  'West Bengal', 'Jharkhand', 'Bihar', 'Odisha', 'Assam', 'Sikkim', 'Tripura', 'Meghalaya', 'Manipur', 'Mizoram', 'Nagaland',
  'Arunachal Pradesh', 'Uttar Pradesh', 'Chhattisgarh', 'Madhya Pradesh', 'Delhi', 'Haryana', 'Punjab', 'Rajasthan', 'Gujarat',
  'Maharashtra', 'Goa', 'Karnataka', 'Telangana', 'Andhra Pradesh', 'Tamil Nadu', 'Kerala', 'Uttarakhand', 'Himachal Pradesh',
  'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh', 'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep',
];
