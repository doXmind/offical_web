import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { useBilling } from '../../contexts/BillingContext';

export default function PaymentSuccessModal({ open, onClose }) {
  const { t } = useTranslation('billing');
  const { plan, credits, isLoading } = useBilling();

  const isProcessing = isLoading || !plan || plan === 'free';
  const planLabel = plan ? t(`plan.${plan}`) : '';

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />

          {/* Content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full max-w-sm rounded-2xl border border-white/[0.06] bg-[#141519] p-8 text-center shadow-2xl">
              {isProcessing ? (
                <>
                  <Loader2 className="mx-auto h-12 w-12 text-white/40 animate-spin" />
                  <h2 className="mt-4 text-xl font-semibold text-white">
                    {t('success.processing')}
                  </h2>
                  <p className="mt-2 text-sm text-white/40">
                    {t('success.processingDesc')}
                  </p>
                </>
              ) : (
                <>
                  <div className="relative mx-auto w-fit">
                    <CheckCircle className="h-12 w-12 text-emerald-400" />
                    <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-400" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-white">
                    {t('success.title')}
                  </h2>
                  <p className="mt-2 text-sm text-white/40">
                    {t('success.desc', { plan: planLabel })}
                  </p>

                  {credits && (
                    <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                      <p className="text-2xl font-bold text-white">
                        {credits.display_remaining ?? credits.remaining}
                      </p>
                      <p className="text-xs text-white/30">{t('success.creditsAvailable')}</p>
                    </div>
                  )}

                  <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-lg bg-white text-black px-4 py-2.5 text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    {t('success.dismiss')}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
