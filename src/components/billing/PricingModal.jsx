import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Crown, Zap, Rocket, X } from 'lucide-react';
import { useBilling } from '../../contexts/BillingContext';
import { getPricing, createCheckout } from '../../api/billing';

function PricingCard({
  name,
  icon,
  price,
  originalPrice,
  period,
  description,
  features,
  isCurrent,
  isPopular,
  isLoading,
  onSelect,
  badge,
  ctaLabel,
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-shadow ${
        isPopular
          ? 'border-white/[0.15] shadow-lg shadow-white/[0.02]'
          : 'border-white/[0.06]'
      } ${isCurrent ? 'ring-2 ring-white/[0.08]' : ''} bg-white/[0.03]`}
    >
      {badge && (
        <span className="absolute -top-3 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
          {badge}
        </span>
      )}
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
      <div className="mb-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">${price}</span>
        {originalPrice != null && originalPrice > price && (
          <span className="text-lg text-white/30 line-through">${originalPrice}</span>
        )}
        <span className="text-sm text-white/30">{period}</span>
      </div>
      <p className="mb-6 text-sm text-white/40">{description}</p>
      <ul className="mb-6 flex-1 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-white/60">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
          isPopular
            ? 'bg-white text-black hover:bg-white/90'
            : 'border border-white/[0.08] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white'
        }`}
        disabled={isCurrent || isLoading}
        onClick={onSelect}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        ) : (
          ctaLabel
        )}
      </button>
    </div>
  );
}

export default function PricingModal() {
  const { t } = useTranslation('billing');
  const { plan, showPricingModal, closePricingModal } = useBilling();
  const [pricing, setPricing] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);

  useEffect(() => {
    if (showPricingModal && !pricing) {
      getPricing()
        .then(setPricing)
        .catch(() => {});
    }
  }, [showPricingModal, pricing]);

  useEffect(() => {
    if (!showPricingModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePricingModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showPricingModal, closePricingModal]);

  const handleUpgrade = async (targetPlan) => {
    if (!pricing) return;

    setLoadingPlan(targetPlan);
    try {
      const priceId = targetPlan === 'pro' ? pricing.pro_price_id : pricing.max_price_id;
      if (!priceId) return;

      const origin = window.location.origin;
      const { checkout_url } = await createCheckout(
        priceId,
        `${origin}/dashboard?billing=success&session_id={CHECKOUT_SESSION_ID}`,
        `${origin}/dashboard?billing=canceled`
      );
      window.location.href = checkout_url;
    } catch {
      // Silently fail
    } finally {
      setLoadingPlan(null);
    }
  };

  const earlyBirdRemaining = pricing?.early_bird_remaining ?? 0;
  const proPrice = pricing?.plans?.pro?.price ?? 4.99;
  const isEarlyBirdAvailable = earlyBirdRemaining > 0;

  const freeFeatures = t('pricing.features.free', { returnObjects: true });
  const proFeatures = t('pricing.features.pro', { returnObjects: true });
  const maxFeatures = t('pricing.features.max', { returnObjects: true });

  return createPortal(
    <AnimatePresence>
      {showPricingModal && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePricingModal}
            aria-hidden="true"
          />

          {/* Content */}
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <div className="sticky top-0 z-10 flex justify-end px-6 pt-4">
              <button
                onClick={closePricingModal}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-sm transition-colors hover:bg-white/[0.1]"
              >
                <X className="h-4 w-4 text-white/60" />
              </button>
            </div>

            {/* Header */}
            <div className="mx-auto max-w-5xl px-6 pt-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t('pricing.title')}
              </h1>
              <p className="mt-3 text-lg text-white/40">{t('pricing.subtitle')}</p>

              {isEarlyBirdAvailable && (
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
                  <Crown className="h-4 w-4" />
                  {t('pricing.earlyBirdDesc', { count: earlyBirdRemaining, price: '2.99' })}
                </div>
              )}
            </div>

            {/* Pricing Cards */}
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 px-6 pb-20 md:grid-cols-3">
              <PricingCard
                name={t('plan.free')}
                icon={<Zap className="h-5 w-5 text-white/40" />}
                price={0}
                period={t('pricing.month')}
                description={t('pricing.descriptions.free')}
                features={Array.isArray(freeFeatures) ? freeFeatures : []}
                isCurrent={plan === 'free'}
                isLoading={false}
                onSelect={() => {}}
                ctaLabel={t('pricing.currentPlan')}
              />

              <PricingCard
                name={t('plan.pro')}
                icon={<Rocket className="h-5 w-5 text-indigo-400" />}
                price={proPrice}
                originalPrice={isEarlyBirdAvailable ? 4.99 : undefined}
                period={t('pricing.month')}
                description={t('pricing.descriptions.pro')}
                features={Array.isArray(proFeatures) ? proFeatures : []}
                isCurrent={plan === 'pro'}
                isPopular
                isLoading={loadingPlan === 'pro'}
                onSelect={() => handleUpgrade('pro')}
                badge={isEarlyBirdAvailable ? t('pricing.earlyBird') : t('pricing.popular')}
                ctaLabel={plan === 'pro' ? t('pricing.currentPlan') : t('pricing.upgrade')}
              />

              <PricingCard
                name={t('plan.max')}
                icon={<Crown className="h-5 w-5 text-amber-400" />}
                price={14.99}
                period={t('pricing.month')}
                description={t('pricing.descriptions.max')}
                features={Array.isArray(maxFeatures) ? maxFeatures : []}
                isCurrent={plan === 'max'}
                isLoading={loadingPlan === 'max'}
                onSelect={() => handleUpgrade('max')}
                ctaLabel={plan === 'max' ? t('pricing.currentPlan') : t('pricing.upgrade')}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
