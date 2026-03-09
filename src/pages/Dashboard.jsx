import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBilling } from '../contexts/BillingContext';
import { apiClient } from '../api/client';
import { verifyCheckout } from '../api/billing';
import SEO from '../components/seo/SEO';
import AccountOverview from '../components/dashboard/AccountOverview';
import ActivityChart from '../components/dashboard/ActivityChart';
import PlanOverview from '../components/billing/PlanOverview';
import CreditsExhaustedBanner from '../components/billing/CreditsExhaustedBanner';
import PricingModal from '../components/billing/PricingModal';
import PaymentSuccessModal from '../components/billing/PaymentSuccessModal';
import { DemoFooter } from '../components/home/demo-footer';

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();
  const { refreshWithRetry } = useBilling();
  const [searchParams, setSearchParams] = useSearchParams();

  const [period, setPeriod] = useState(30);
  const [usage, setUsage] = useState(null);
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // Handle Stripe checkout callback
  useEffect(() => {
    const billingStatus = searchParams.get('billing');
    const sessionId = searchParams.get('session_id');

    if (billingStatus === 'success' && sessionId) {
      // Clean up URL params
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('billing');
      newParams.delete('session_id');
      setSearchParams(newParams, { replace: true });

      // Verify checkout and refresh billing data
      verifyCheckout(sessionId)
        .then(() => refreshWithRetry())
        .catch(() => {});
      setShowPaymentSuccess(true);
    }

    if (billingStatus === 'canceled') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('billing');
      setSearchParams(newParams, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = useCallback(async (days) => {
    setLoading(true);
    setError('');
    try {
      const summaryData = await apiClient(`/api/usage/summary?days=${days}`);
      setUsage(summaryData);
    } catch {
      setError(t('error'));
    }
    try {
      const dailyData = await apiClient(`/api/usage/daily?days=${days}`);
      setDaily(dailyData);
    } catch {
      setDaily(null);
    }
    setLoading(false);
  }, [t]);

  useEffect(() => {
    fetchData(period);
  }, [period, fetchData]);

  return (
    <div className="min-h-screen bg-background">
      <SEO path="/dashboard" />

      <div className="mx-auto max-w-4xl px-6 pt-24 pb-16">
        {/* Credits Exhausted / Past Due Banner */}
        <CreditsExhaustedBanner />

        {/* Account Overview */}
        {user && <AccountOverview user={user} />}

        {/* Plan & Credits Section */}
        <div className="mt-6">
          <PlanOverview />
        </div>

        {/* Activity Chart */}
        <div className="mt-10">
          {error && (
            <div className="rounded-2xl border border-red-500/10 bg-red-500/5 px-6 py-8 text-center">
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={() => fetchData(period)}
                className="mt-3 text-sm text-white/40 hover:text-white/60 transition-colors"
              >
                {t('retry')}
              </button>
            </div>
          )}

          {loading && !usage && (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] h-80 animate-pulse" />
          )}

          {usage && !error && (
            <ActivityChart data={daily?.days} period={period} onPeriodChange={setPeriod} />
          )}
        </div>
      </div>

      <DemoFooter />

      {/* Modals */}
      <PricingModal />
      <PaymentSuccessModal
        open={showPaymentSuccess}
        onClose={() => setShowPaymentSuccess(false)}
      />
    </div>
  );
}
