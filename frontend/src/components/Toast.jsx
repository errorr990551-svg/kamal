import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-red-950 text-amber-100 px-5 py-3.5 rounded-xl border-2 border-amber-400 shadow-2xl animate-bounce">
      <CheckCircle2 size={24} className="text-amber-400 shrink-0" />
      <div>
        <p className="font-serif-brand font-bold text-amber-200 text-sm">{message.title || 'Success!'}</p>
        <p className="text-xs text-stone-300">{message.description || 'Your request has been received.'}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-2 text-stone-400 hover:text-white p-1"
      >
        <X size={16} />
      </button>
    </div>
  );
}
