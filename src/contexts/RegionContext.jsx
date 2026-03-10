import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getRegion, setRegionOverride, clearRegionOverride, detectCountry, REGIONS } from '../config/region';
import { clearAccessToken } from '../api/client';

const RegionContext = createContext(null);

export function RegionProvider({ children }) {
  const [region, setRegionState] = useState(() => getRegion());

  // Run geo-IP detection on mount (production only)
  useEffect(() => {
    if (import.meta.env.DEV) return;

    let cancelled = false;
    detectCountry().then((country) => {
      if (cancelled) return;
      if (country) {
        // Re-read region after detection (may have changed if no override was set)
        const updated = getRegion();
        setRegionState(updated);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const switchRegion = useCallback((regionId) => {
    if (!REGIONS[regionId]) return;
    setRegionOverride(regionId);
    // Clear auth tokens since they're tied to the old API backend
    clearAccessToken();
    // Reload the page so all API calls and links pick up the new region
    window.location.reload();
  }, []);

  const resetRegion = useCallback(() => {
    clearRegionOverride();
    clearAccessToken();
    window.location.reload();
  }, []);

  return (
    <RegionContext.Provider value={{ region, switchRegion, resetRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error('useRegion must be used within RegionProvider');
  return ctx;
}
