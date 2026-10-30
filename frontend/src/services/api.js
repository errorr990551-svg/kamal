/**
 * API Service for Kamal Brand Frontend
 * Connects forms to Cloudflare Worker backend (/api/contact)
 */

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  // Default to relative path if not specified
  return '';
};

/**
 * Submit general consultation / lead popup form
 */
export async function submitContactForm(formData) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/contact`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: 'lead_popup',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || '',
        message: formData.message || '',
        submittedAt: new Date().toISOString(),
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return {
      success: true,
      message: data.message || 'Consultation inquiry submitted successfully!',
      data,
    };
  } catch (error) {
    console.error('API submitContactForm error:', error);
    return {
      success: false,
      message: error.message || 'Network error: Unable to submit your inquiry. Please try again.',
    };
  }
}

/**
 * Submit Dealership Application form
 */
export async function submitDealershipForm(formData) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/contact`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: 'dealership_application',
        name: formData.name,
        agencyName: formData.agencyName,
        address: formData.address,
        state: formData.state,
        phone: formData.phone,
        email: formData.email || '',
        maxQuantity: formData.maxQuantity || '',
        specifiedProduct: formData.specifiedProduct || '',
        submittedAt: new Date().toISOString(),
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return {
      success: true,
      message: data.message || 'Dealership application submitted successfully!',
      data,
    };
  } catch (error) {
    console.error('API submitDealershipForm error:', error);
    return {
      success: false,
      message: error.message || 'Network error: Unable to submit dealership application.',
    };
  }
}

/**
 * Submit Contract Manufacturing form
 */
export async function submitContractManufacturingForm(formData) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/contact`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
        submittedAt: new Date().toISOString(),
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return {
      success: true,
      message: data.message || 'Contract manufacturing inquiry submitted successfully!',
      data,
    };
  } catch (error) {
    console.error('API submitContractManufacturingForm error:', error);
    return {
      success: false,
      message: error.message || 'Network error: Unable to submit inquiry.',
    };
  }
}
