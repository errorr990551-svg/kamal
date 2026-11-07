/**
 * API Service for Kamal Brand Frontend
 * Sends every form to the contact endpoint (Cloudflare Worker, or the /api/contact PHP fallback on Hostinger).
 */

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return '';
};

async function postContact(payload, fallbackError) {
  const endpoint = `${getApiBaseUrl()}/api/contact`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return { success: true, message: data.message || 'Submitted successfully!', data };
  } catch (error) {
    console.error('Form submit error:', error);
    const message =
      error.name === 'AbortError'
        ? 'The request timed out. Please check your internet connection and try again.'
        : error.message && !/failed to fetch|networkerror|load failed/i.test(error.message)
          ? error.message
          : fallbackError;
    return { success: false, message };
  }
}

const lines = (pairs) =>
  pairs
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${k}: ${String(v).trim()}`)
    .join('\n');

/** General enquiry: lead popup, product enquiry, bulk order, hamper and contact page. */
export function submitContactForm(formData) {
  return postContact(
    {
      formType: formData.formType || 'lead_popup',
      name: formData.name,
      email: formData.email || '',
      phone: formData.phone,
      company: formData.company || '',
      message: formData.message || '',
    },
    'Could not send your enquiry. Please try again or call us on +91 99322 59719.',
  );
}

/** Dealership Application form */
export function submitDealershipForm(formData) {
  return postContact(
    {
      formType: 'dealership_application',
      name: formData.name,
      agencyName: formData.agencyName,
      address: formData.address,
      state: formData.state,
      phone: formData.phone,
      email: formData.email || '',
      maxQuantity: formData.maxQuantity || '',
      specifiedProduct: formData.specifiedProduct || '',
    },
    'Could not submit your dealership application. Please try again or call us on +91 99322 59719.',
  );
}

/** Contract Manufacturing form */
export function submitContractManufacturingForm(formData) {
  return postContact(
    {
      formType: 'contract_manufacturing',
      name: formData.name,
      phone: formData.phone,
      email: formData.email || '',
      productWanted: formData.productWanted || '',
      quantity: formData.quantity || '',
      size: formData.size || '',
      dateWanted: formData.dateWanted || '',
      purpose: formData.purpose || '',
      extraWords: formData.extraWords || '',
      // Also send everything as one readable message so every backend includes all fields in the email.
      message: lines([
        ['Product wanted', formData.productWanted],
        ['Quantity', formData.quantity],
        ['Pack size', formData.size],
        ['Date needed by', formData.dateWanted],
        ['Purpose', formData.purpose],
        ['Notes', formData.extraWords],
      ]),
    },
    'Could not submit your enquiry. Please try again or call us on +91 99322 59719.',
  );
}

export { lines as formatLines };
