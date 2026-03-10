import { getApiBase } from '../config/region';

const TOKEN_KEY = 'doxmind_access_token';

let accessToken = null;
let tokenExpiry = null;
let autoRefreshTimer = null;

// Load token from localStorage on init
function loadToken() {
  try {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      const { token, expiry } = JSON.parse(stored);
      if (expiry && expiry > Date.now()) {
        accessToken = token;
        tokenExpiry = expiry;
        scheduleAutoRefresh();
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  } catch {
    localStorage.removeItem(TOKEN_KEY);
  }
}
loadToken();

export function setAccessToken(token, expiresIn) {
  accessToken = token;
  // Default to 15 minutes if expiresIn not provided
  const ttl = (expiresIn || 900) * 1000;
  tokenExpiry = Date.now() + ttl;
  try {
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiry: tokenExpiry }));
  } catch { /* ignore */ }
  scheduleAutoRefresh();
}

export function getAccessToken() {
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
  tokenExpiry = null;
  if (autoRefreshTimer) {
    clearTimeout(autoRefreshTimer);
    autoRefreshTimer = null;
  }
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch { /* ignore */ }
}

// Schedule refresh 1 minute before expiry
function scheduleAutoRefresh() {
  if (autoRefreshTimer) {
    clearTimeout(autoRefreshTimer);
    autoRefreshTimer = null;
  }
  if (!tokenExpiry) return;

  const timeUntilRefresh = tokenExpiry - Date.now() - 60_000;
  if (timeUntilRefresh > 0) {
    autoRefreshTimer = setTimeout(() => {
      refreshAccessToken().catch(() => {});
    }, timeUntilRefresh);
  }
}

let refreshPromise = null;

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const res = await fetch(`${getApiBase()}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      clearAccessToken();
      throw new Error('Session expired');
    }

    const data = await res.json();
    setAccessToken(data.access_token, data.expires_in);
    return data.access_token;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

export async function apiClient(endpoint, options = {}) {
  const apiBase = getApiBase();
  const url = `${apiBase}${endpoint}`;
  const headers = { ...options.headers };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (res.status === 401 && accessToken) {
    try {
      const newToken = await refreshAccessToken();
      headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetch(url, { ...options, headers, credentials: 'include' });
    } catch {
      throw new Error('Authentication required');
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(
      errorData.detail || errorData.error?.message || `Request failed: ${res.status}`
    );
    error.status = res.status;
    error.data = errorData;
    throw error;
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
}
