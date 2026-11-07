// Accepts Indian numbers typed as 9932259719, 099322 59719, +91 99322-59719, 91 9932259719 etc.
export function normalizeIndianPhone(value = '') {
  let digits = String(value).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

export function phoneError(value) {
  const d = normalizeIndianPhone(value);
  if (!d) return 'Please enter your phone number.';
  if (d.length !== 10) return 'Please enter a valid 10-digit mobile number.';
  if (!/^[6-9]/.test(d)) return 'Mobile numbers in India start with 6, 7, 8 or 9.';
  return '';
}

export function emailError(value, required = false) {
  const v = String(value || '').trim();
  if (!v) return required ? 'Please enter your email address.' : '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address.';
}
