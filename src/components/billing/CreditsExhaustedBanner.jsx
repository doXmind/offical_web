import { useTranslation } from 'react-i18next';
import { Zap, AlertTriangle } from 'lucide-react';
import { useBilling } from '../../contexts/BillingContext';
import { createPortal } from '../../api/billing';

export default function CreditsExhaustedBanner() {
  const { t } = useTranslation('billing');
  const { status, hasCredits, openPricingModal } = useBilling();

  // Past-due payment warning
  if (status === 'past_due') {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-amber-500/10 px-4 py-3 text-xs font-medium text-amber-400 mb-6">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        <span>{t('banner.paymentFailed')}</span>
        <button
          onClick={async () => {
            try {
              const { portal_url } = await createPortal(window.location.href);
              window.location.href = portal_url;
            } catch {
              // Silently fail
            }
          }}
          className="underline underline-offset-2 hover:text-amber-300"
        >
          {t('actions.manageSub')}
        </button>
      </div>
    );
  }

  // Credits exhausted warning
  if (hasCredits()) return null;

  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 px-4 py-3 text-xs font-medium text-red-400 mb-6">
      <Zap className="h-3.5 w-3.5 shrink-0" />
      <span>{t('banner.creditsExhausted')}</span>
      <button
        onClick={openPricingModal}
        className="underline underline-offset-2 hover:text-red-300"
      >
        {t('actions.upgradeNow')}
      </button>
    </div>
  );
}
