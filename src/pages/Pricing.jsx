import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Crown, Zap, Rocket, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBilling } from '../contexts/BillingContext';
import { getPricing, createCheckout } from '../api/billing';
import { getAppBase } from '../config/region';
import SEO from '../components/seo/SEO';
import PricingCard from '../components/billing/PricingCard';
import { ChevronGrid } from '../components/home/chevron-grid';
import { DemoFooter } from '../components/home/demo-footer';

/* ── Scroll-reveal helper ── */

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 1 — Hero
   ═══════════════════════════════════════════════════════════ */

function HeroSection() {
  const { t } = useTranslation('pricing');

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6">
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-20 h-[600px] w-[700px] rounded-full bg-blue-600/[0.12] blur-[120px]" />
        <div className="absolute -right-10 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
      </div>

      {/* Interactive chevron grid */}
      <ChevronGrid />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="fluid-hero font-bold tracking-tight text-gradient">
          {t('hero.heading')}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {t('hero.subtitle')}
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 2 — Pricing Cards
   ═══════════════════════════════════════════════════════════ */

function PricingCardsSection() {
  const { t } = useTranslation('pricing');
  const { t: tb } = useTranslation('billing');
  const { isAuthenticated } = useAuth();
  const { plan } = useBilling();
  const navigate = useNavigate();

  const [pricing, setPricing] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);

  useEffect(() => {
    getPricing()
      .then(setPricing)
      .catch(() => {});
  }, []);

  const handleSelect = async (targetPlan) => {
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }

    if (targetPlan === 'free') return;
    if (!pricing) return;

    setLoadingPlan(targetPlan);
    try {
      const priceId = targetPlan === 'pro' ? pricing.pro_price_id : pricing.max_price_id;
      if (!priceId) return;

      const origin = window.location.origin;
      const { checkout_url } = await createCheckout(
        priceId,
        `${origin}/dashboard?billing=success&session_id={CHECKOUT_SESSION_ID}`,
        `${origin}/pricing`
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

  const freeFeatures = tb('pricing.features.free', { returnObjects: true });
  const proFeatures = tb('pricing.features.pro', { returnObjects: true });
  const maxFeatures = tb('pricing.features.max', { returnObjects: true });

  const getCtaLabel = (tierPlan) => {
    if (isAuthenticated && plan === tierPlan) return tb('pricing.currentPlan');
    if (tierPlan === 'free') {
      return isAuthenticated ? tb('pricing.currentPlan') : t('cta.getStarted');
    }
    return isAuthenticated ? tb('pricing.upgrade') : t('cta.getStarted');
  };

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('section.heading')}
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            {t('section.subtitle')}
          </p>
        </Reveal>

        {/* Early bird banner */}
        {isEarlyBirdAvailable && (
          <Reveal className="mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
              <Crown className="h-4 w-4" />
              {tb('pricing.earlyBirdDesc', { count: earlyBirdRemaining, price: '2.99' })}
            </div>
          </Reveal>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal delay={0}>
            <PricingCard
              name={tb('plan.free')}
              icon={<Zap className="h-5 w-5 text-white/40" />}
              price={0}
              period={tb('pricing.month')}
              description={tb('pricing.descriptions.free')}
              features={Array.isArray(freeFeatures) ? freeFeatures : []}
              isCurrent={isAuthenticated && plan === 'free'}
              isLoading={false}
              onSelect={() => handleSelect('free')}
              ctaLabel={getCtaLabel('free')}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <PricingCard
              name={tb('plan.pro')}
              icon={<Rocket className="h-5 w-5 text-indigo-400" />}
              price={proPrice}
              originalPrice={isEarlyBirdAvailable ? 4.99 : undefined}
              period={tb('pricing.month')}
              description={tb('pricing.descriptions.pro')}
              features={Array.isArray(proFeatures) ? proFeatures : []}
              isCurrent={isAuthenticated && plan === 'pro'}
              isPopular
              isLoading={loadingPlan === 'pro'}
              onSelect={() => handleSelect('pro')}
              badge={isEarlyBirdAvailable ? tb('pricing.earlyBird') : tb('pricing.popular')}
              ctaLabel={getCtaLabel('pro')}
            />
          </Reveal>

          <Reveal delay={0.2}>
            <PricingCard
              name={tb('plan.max')}
              icon={<Crown className="h-5 w-5 text-amber-400" />}
              price={14.99}
              period={tb('pricing.month')}
              description={tb('pricing.descriptions.max')}
              features={Array.isArray(maxFeatures) ? maxFeatures : []}
              isCurrent={isAuthenticated && plan === 'max'}
              isLoading={loadingPlan === 'max'}
              onSelect={() => handleSelect('max')}
              ctaLabel={getCtaLabel('max')}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 3 — FAQ
   ═══════════════════════════════════════════════════════════ */

function FAQSection() {
  const { t } = useTranslation('pricing');
  const [openIndex, setOpenIndex] = useState(null);

  const items = t('faq.items', { returnObjects: true });
  const faqItems = Array.isArray(items) ? items : [];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('faq.heading')}
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            {t('faq.subtitle')}
          </p>
        </Reveal>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="text-[15px] font-medium text-white/80">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-white/30 transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-white/40">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 4 — CTA
   ═══════════════════════════════════════════════════════════ */

function CTASection() {
  const { t } = useTranslation('pricing');
  const { t: tc } = useTranslation('common');

  return (
    <section className="relative overflow-hidden px-4 pt-48 pb-36 text-center lg:pt-60 lg:pb-44">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-20 h-[600px] w-[700px] rounded-full bg-blue-600/[0.12] blur-[120px]" />
        <div className="absolute -right-10 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
      </div>

      {/* Interactive chevron grid */}
      <ChevronGrid />

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold sm:text-4xl">{t('bottomCta.heading')}</h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
          {t('bottomCta.subtitle')}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`${getAppBase()}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            {tc('cta.getStarted')}
          </a>
          <Link
            to="/guide"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-8 py-3 text-base font-medium text-foreground shadow-sm hover:bg-muted transition-colors"
          >
            {tc('cta.learnMore')}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════ */

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO path="/pricing" />
      <HeroSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <PricingCardsSection />
      <FAQSection />
      <CTASection />
      <DemoFooter />
    </div>
  );
};

export default Pricing;
