import React, { useId } from 'react';

const inputClass =
  'w-full px-4 py-3 rounded-xl border bg-white text-base text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 transition-all disabled:bg-stone-100';

// Labelled form field. Uses 16px text on phones so iOS Safari does not zoom in on focus.
export default function Field({ label, required, error, hint, as = 'input', children, className = '', ...props }) {
  const id = useId();
  const Tag = as;
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-700" aria-hidden="true">*</span>}
      </label>
      <Tag
        id={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={`${inputClass} ${error ? 'border-red-500' : 'border-stone-300'} ${as === 'textarea' ? 'resize-y min-h-[88px]' : ''}`}
        {...props}
      >
        {children}
      </Tag>
      {error ? (
        <p id={`${id}-err`} className="mt-1 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-stone-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
