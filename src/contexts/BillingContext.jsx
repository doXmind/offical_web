import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { getBillingStatus } from '../api/billing';

const PLAN_STORAGE_KEY = 'doxmind_billing_plan';

const BillingContext = createContext(null);

function loadCachedPlan() {
  try {
    return localStorage.getItem(PLAN_STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

function cachePlan(plan) {
  try {
    if (plan) {
      localStorage.setItem(PLAN_STORAGE_KEY, plan);
    } else {
      localStorage.removeItem(PLAN_STORAGE_KEY);
    }
  } catch { /* ignore */ }
}

export function BillingProvider({ children }) {
  const { user } = useAuth();

  const [plan, setPlan] = useState(loadCachedPlan);
  const [status, setStatus] = useState(null);
  const [periodEnd, setPeriodEnd] = useState(null);
  const [credits, setCredits] = useState(null);
  const [storage, setStorage] = useState(null);
  const [isEarlyBird, setIsEarlyBird] = useState(false);
  const [earlyBirdRemaining, setEarlyBirdRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const isInitializedRef = useRef(false);

  const applyBillingData = useCallback((data) => {
    setPlan(data.plan);
    setStatus(data.status);
    setPeriodEnd(data.period_end);
    setCredits(data.credits);
    setStorage(data.storage);
    setIsEarlyBird(data.is_early_bird);
    setEarlyBirdRemaining(data.early_bird_remaining);
    cachePlan(data.plan);
  }, []);

  const initialize = useCallback(async () => {
    if (isInitializedRef.current) return;
    setIsLoading(true);
    try {
      const data = await getBillingStatus();
      applyBillingData(data);
      setIsInitialized(true);
      isInitializedRef.current = true;
    } catch {
      // Don't set isInitialized on failure — allows retry
    } finally {
      setIsLoading(false);
    }
  }, [applyBillingData]);

  const refresh = useCallback(async () => {
    try {
      const data = await getBillingStatus();
      applyBillingData(data);
    } catch {
      // Silently fail
    }
  }, [applyBillingData]);

  const refreshWithRetry = useCallback(async () => {
    const MAX_ATTEMPTS = 5;
    const INTERVAL_MS = 2000;
    const previousPlan = plan;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      try {
        const data = await getBillingStatus();
        applyBillingData(data);

        if (data.plan !== previousPlan && data.plan !== 'free') {
          return;
        }
      } catch {
        // Continue retrying
      }

      if (attempt < MAX_ATTEMPTS - 1) {
        await new Promise((resolve) => setTimeout(resolve, INTERVAL_MS));
      }
    }
  }, [plan, applyBillingData]);

  const hasCredits = useCallback(() => {
    if (!credits) return true; // Not initialized — don't lock
    return credits.remaining > 0;
  }, [credits]);

  const openPricingModal = useCallback(() => setShowPricingModal(true), []);
  const closePricingModal = useCallback(() => setShowPricingModal(false), []);

  const reset = useCallback(() => {
    setPlan(null);
    setStatus(null);
    setPeriodEnd(null);
    setCredits(null);
    setStorage(null);
    setIsEarlyBird(false);
    setEarlyBirdRemaining(0);
    setIsInitialized(false);
    isInitializedRef.current = false;
    cachePlan(null);
  }, []);

  // Auto-initialize when user is available
  useEffect(() => {
    if (user && !isInitializedRef.current) {
      initialize();
    }
  }, [user, initialize]);

  // Reset when user logs out
  useEffect(() => {
    if (!user) {
      reset();
    }
  }, [user, reset]);

  return (
    <BillingContext.Provider value={{
      plan,
      status,
      periodEnd,
      credits,
      storage,
      isEarlyBird,
      earlyBirdRemaining,
      isLoading,
      isInitialized,
      showPricingModal,
      initialize,
      refresh,
      refreshWithRetry,
      hasCredits,
      openPricingModal,
      closePricingModal,
      reset,
    }}>
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const ctx = useContext(BillingContext);
  if (!ctx) throw new Error('useBilling must be used within BillingProvider');
  return ctx;
}
