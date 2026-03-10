const REGIONS = {
  global: {
    id: 'global',
    apiBase: 'https://api.doxmind.com',
    appBase: 'https://app.doxmind.com',
  },
  cn: {
    id: 'cn',
    apiBase: 'https://cn.api.doxmind.com',
    appBase: 'https://cn.doxmind.com',
  },
};

const OVERRIDE_KEY = 'doxmind_region_override';
const COUNTRY_KEY = 'doxmind_detected_country';

function resolveRegionId() {
  try {
    const override = localStorage.getItem(OVERRIDE_KEY);
    if (override && REGIONS[override]) return override;

    const country = localStorage.getItem(COUNTRY_KEY);
    if (country === 'CN') return 'cn';
  } catch { /* ignore */ }
  return 'global';
}

export function getRegion() {
  return REGIONS[resolveRegionId()];
}

export function getApiBase() {
  if (import.meta.env.DEV) {
    if (import.meta.env.VITE_API_BASE) return import.meta.env.VITE_API_BASE;
    return isCnRegion() ? '/cn' : '';
  }
  return getRegion().apiBase;
}

export function getAppBase() {
  if (import.meta.env.DEV) {
    return 'https://app.doxmind.com';
  }
  return getRegion().appBase;
}

export function isCnRegion() {
  return resolveRegionId() === 'cn';
}

export function setRegionOverride(regionId) {
  try {
    if (REGIONS[regionId]) {
      localStorage.setItem(OVERRIDE_KEY, regionId);
    }
  } catch { /* ignore */ }
}

export function clearRegionOverride() {
  try {
    localStorage.removeItem(OVERRIDE_KEY);
  } catch { /* ignore */ }
}

export async function detectCountry() {
  try {
    const cached = localStorage.getItem(COUNTRY_KEY);
    if (cached) return cached;

    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;

    const data = await res.json();
    const country = data.country_code || null;
    if (country) {
      localStorage.setItem(COUNTRY_KEY, country);
    }
    return country;
  } catch {
    return null;
  }
}

export { REGIONS };
