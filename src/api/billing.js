import { apiClient } from './client';

export async function getBillingStatus() {
  return apiClient('/api/billing/status');
}

export async function getPricing() {
  return apiClient('/api/billing/pricing');
}

export async function createCheckout(priceId, successUrl, cancelUrl) {
  return apiClient('/api/billing/checkout', {
    method: 'POST',
    body: JSON.stringify({
      price_id: priceId,
      success_url: successUrl,
      cancel_url: cancelUrl,
    }),
  });
}

export async function createPortal(returnUrl) {
  return apiClient('/api/billing/portal', {
    method: 'POST',
    body: JSON.stringify({ return_url: returnUrl }),
  });
}

export async function verifyCheckout(sessionId) {
  return apiClient('/api/billing/verify-checkout', {
    method: 'POST',
    body: JSON.stringify({ session_id: sessionId }),
  });
}
