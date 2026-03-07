import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, DollarSign, Activity, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../api/client';
import SEO from '../components/seo/SEO';
import AccountOverview from '../components/dashboard/AccountOverview';
import UsageSummaryCard from '../components/dashboard/UsageSummaryCard';
import ActivityChart from '../components/dashboard/ActivityChart';
import { DemoFooter } from '../components/home/demo-footer';

const PERIOD_OPTIONS = [7, 30, 90];

function formatTokens(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();

  const [period, setPeriod] = useState(30);
  const [usage, setUsage] = useState(null);
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        {/* Account Overview */}
        {user && <AccountOverview user={user} />}

        {/* Usage Section */}
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">{t('usage.title')}</h2>
              <p className="text-sm text-white/30 mt-0.5">
                {t('usage.subtitle', { days: period })}
              </p>
            </div>

            {/* Period selector */}
            <div className="flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
              {PERIOD_OPTIONS.map((days) => (
                <button
                  key={days}
                  onClick={() => setPeriod(days)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    period === days
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/30 hover:text-white/50'
                  }`}
                >
                  {t('usage.days', { count: days })}
                </button>
              ))}
            </div>
          </div>

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
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 h-28 animate-pulse" />
                ))}
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] h-80 animate-pulse" />
            </div>
          )}

          {usage && !error && (
            <>
              {/* Summary Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <UsageSummaryCard
                  icon={Coins}
                  label={t('usage.totalTokens')}
                  value={formatTokens(usage.total_tokens)}
                  delay={0.05}
                />
                <UsageSummaryCard
                  icon={DollarSign}
                  label={t('usage.totalCost')}
                  value={usage.total_cost != null ? `$${usage.total_cost.toFixed(2)}` : t('usage.free')}
                  delay={0.1}
                />
                <UsageSummaryCard
                  icon={Activity}
                  label={t('usage.totalRequests')}
                  value={usage.total_requests.toLocaleString()}
                  delay={0.15}
                />
                <UsageSummaryCard
                  icon={Calendar}
                  label={t('usage.period')}
                  value={t('usage.days', { count: usage.period_days })}
                  delay={0.2}
                />
              </div>

              {/* Activity Chart */}
              <div className="mt-8">
                <ActivityChart data={daily?.days} period={period} />
              </div>
            </>
          )}
        </div>
      </div>

      <DemoFooter />
    </div>
  );
}
