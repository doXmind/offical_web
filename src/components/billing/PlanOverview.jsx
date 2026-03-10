import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Crown, Rocket, Zap, ExternalLink, Loader2, Check } from 'lucide-react';
import { useBilling } from '../../contexts/BillingContext';
import { createPortal } from '../../api/billing';

const PLAN_ICONS = {
  free: Zap,
  pro: Rocket,
  max: Crown,
};

const PLAN_ICON_COLORS = {
  free: 'text-white/40',
  pro: 'text-indigo-400',
  max: 'text-amber-400',
};

const STATUS_STYLES = {
  active: 'bg-emerald-500/10 text-emerald-400',
  past_due: 'bg-amber-500/10 text-amber-400',
  canceled: 'bg-red-500/10 text-red-400',
};

const PLAN_KEYS = ['free', 'pro', 'max'];

export default function PlanOverview() {
  const { t } = useTranslation('billing');
  const {
    plan,
    status,
    periodEnd,
    credits,
    storage,
    openPricingModal,
  } = useBilling();
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  if (!plan) return null;

  const PlanIcon = PLAN_ICONS[plan] || Zap;
  const iconColor = PLAN_ICON_COLORS[plan] || 'text-white/40';
  const statusStyle = status ? STATUS_STYLES[status] || '' : '';

  const creditsPercentage =
    credits && credits.limit > 0 ? (credits.remaining / credits.limit) * 100 : 0;
  const isCreditsLow = creditsPercentage < 20;
  const isCreditsMedium = creditsPercentage >= 20 && creditsPercentage < 50;

  const storagePercentage =
    storage && storage.limit_bytes > 0
      ? (storage.used_bytes / storage.limit_bytes) * 100
      : 0;

  const handleManageSubscription = async () => {
    setIsLoadingPortal(true);
    try {
      const { portal_url } = await createPortal(window.location.href);
      window.location.href = portal_url;
    } catch {
      // Silently fail
    } finally {
      setIsLoadingPortal(false);
    }
  };

  return (
    <motion.div
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
    >
      {/* Plan header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <PlanIcon className={`w-4.5 h-4.5 ${iconColor}`} />
          <span className="text-sm font-semibold text-white">
            {t(`plan.${plan}`)}
          </span>
          {status && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyle}`}>
              {status === 'active'
                ? t('status.active')
                : status === 'past_due'
                  ? t('status.pastDue')
                  : t('status.canceled')}
            </span>
          )}
        </div>
        {periodEnd && plan !== 'free' && (
          <p className="text-xs text-white/30">
            {t('renewsOn', { date: new Date(periodEnd).toLocaleDateString() })}
          </p>
        )}
      </div>

      {/* Credits */}
      {credits && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/40">{t('credits.title')}</span>
            <span
              className={`font-medium ${
                isCreditsLow
                  ? 'text-red-400'
                  : isCreditsMedium
                    ? 'text-amber-400'
                    : 'text-white/60'
              }`}
            >
              {t('credits.remaining', { percent: Math.round(creditsPercentage) })}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full transition-all ${
                isCreditsLow
                  ? 'bg-red-500'
                  : isCreditsMedium
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.max(creditsPercentage, 1)}%` }}
            />
          </div>
          {credits.period_end && (
            <p className="text-xs text-white/20">
              {t('credits.resetOn', { date: new Date(credits.period_end).toLocaleDateString() })}
            </p>
          )}
        </div>
      )}

      {/* Storage */}
      {storage && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/40">{t('storage.title')}</span>
            <span className="font-medium text-white/60">
              {t('storage.used', { percent: Math.round(storagePercentage) })}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full transition-all ${
                storagePercentage > 90
                  ? 'bg-red-500'
                  : storagePercentage > 70
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.max(storagePercentage, 1)}%` }}
            />
          </div>
        </div>
      )}

      {/* Plan features */}
      {PLAN_KEYS.includes(plan) && (
        <ul className="space-y-1.5">
          {t(`planFeatures.${plan}`, { returnObjects: true }).map((label, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-white/50">
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              {label}
            </li>
          ))}
        </ul>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={openPricingModal}
          className="flex-1 rounded-lg bg-white text-black px-4 py-2.5 text-sm font-medium hover:bg-white/90 transition-colors"
        >
          {plan === 'free' ? t('actions.upgrade') : t('actions.choosePlan')}
        </button>
        {plan !== 'free' && (
          <button
            onClick={handleManageSubscription}
            disabled={isLoadingPortal}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors disabled:opacity-50"
          >
            {isLoadingPortal ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
            {t('actions.manageSub')}
          </button>
        )}
      </div>
    </motion.div>
  );
}
