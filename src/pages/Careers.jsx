import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAppBase } from '../config/region';
import {
  Rocket,
  Users,
  Globe,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Zap,
  TrendingUp,
  Gem,
  Laptop,
  Sparkles,
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import { HeroBackground } from '../components/home/hero-background';
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
   Section 1 — Hero (full-height with HeroBackground parallax)
   ═══════════════════════════════════════════════════════════ */

function HeroSection() {
  const { t } = useTranslation('careers');

  return (
    <HeroBackground>
      <section className="flex min-h-[80vh] items-center justify-center px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Pill badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{t('hero.badge')}</span>
          </div>

          <h1 className="fluid-hero font-bold tracking-tight text-gradient">
            {t('hero.heading')}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t('hero.subtitle')}
          </p>

          {/* CTA to scroll to positions */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#positions"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              {t('hero.viewRoles')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </HeroBackground>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 2 — Stats Banner
   ═══════════════════════════════════════════════════════════ */

function StatsSection() {
  const { t } = useTranslation('careers');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const stats = [
    { value: t('stats.roles.value'), label: t('stats.roles.label') },
    { value: t('stats.countries.value'), label: t('stats.countries.label') },
    { value: t('stats.remote.value'), label: t('stats.remote.label') },
  ];

  return (
    <section className="px-6 py-16">
      <div ref={ref} className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm sm:p-12">
          {/* Ambient blobs */}
          <div className="absolute -left-20 -top-20 h-48 w-56 rounded-full bg-blue-600/[0.08] blur-[80px]" />
          <div className="absolute -right-10 bottom-0 h-40 w-48 rounded-full bg-violet-600/[0.06] blur-[80px]" />

          <div className="relative grid gap-8 sm:grid-cols-3 sm:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 3 — Why Join Us (rich value cards)
   ═══════════════════════════════════════════════════════════ */

const VALUE_ICONS = {
  mission: Rocket,
  impact: Users,
  remote: Globe,
};

function ValuesSection() {
  const { t } = useTranslation('careers');
  const keys = ['mission', 'impact', 'remote'];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('values.label')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('values.title')}
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {keys.map((key, i) => {
            const Icon = VALUE_ICONS[key];
            return (
              <Reveal key={key} delay={i * 0.1}>
                <div className="glass-card group rounded-2xl p-8 h-full">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-white/20">
                    <Icon className="h-7 w-7 text-foreground" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {t(`values.items.${key}.title`)}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {t(`values.items.${key}.description`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 4 — Open Positions (accent-colored cards)
   ═══════════════════════════════════════════════════════════ */

const ROLE_CONFIG = {
  marketing: {
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'hover:border-emerald-500/30',
    badge: 'bg-emerald-500/10 text-emerald-400',
    dot: 'bg-emerald-500',
  },
  sales: {
    gradient: 'from-amber-500/20 to-amber-500/5',
    border: 'hover:border-amber-500/30',
    badge: 'bg-amber-500/10 text-amber-400',
    dot: 'bg-amber-500',
  },
  ml: {
    gradient: 'from-blue-500/20 to-blue-500/5',
    border: 'hover:border-blue-500/30',
    badge: 'bg-blue-500/10 text-blue-400',
    dot: 'bg-blue-500',
  },
};

const ROLES = ['marketing', 'sales', 'ml'];

function PositionsSection() {
  const { t } = useTranslation('careers');

  return (
    <section id="positions" className="relative overflow-hidden px-6 py-24 lg:py-32">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full bg-blue-600/[0.06] blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[350px] w-[400px] rounded-full bg-violet-600/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('positions.label')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('positions.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {t('positions.subtitle')}
          </p>
        </Reveal>

        <div className="space-y-5">
          {ROLES.map((role, i) => {
            const config = ROLE_CONFIG[role];
            return (
              <Reveal key={role} delay={i * 0.12}>
                <div className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 sm:p-8 ${config.border}`}>
                  {/* Subtle gradient glow on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${config.dot}`} />
                        <span className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider ${config.badge}`}>
                          {t(`positions.roles.${role}.department`)}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold">
                        {t(`positions.roles.${role}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {t(`positions.roles.${role}.description`)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                          <MapPin className="h-3.5 w-3.5" />
                          {t('positions.tags.remote')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                          <Clock className="h-3.5 w-3.5" />
                          {t('positions.tags.fullTime')}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`mailto:careers@doxmind.com?subject=Application: ${t(`positions.roles.${role}.title`)}`}
                      className="inline-flex shrink-0 items-center gap-2 justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors sm:self-center"
                    >
                      <Briefcase className="h-4 w-4" />
                      {t('positions.apply')}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 5 — Culture & Perks (2×2 grid)
   ═══════════════════════════════════════════════════════════ */

const PERK_ICONS = {
  flexibility: Zap,
  growth: TrendingUp,
  equity: Gem,
  tools: Laptop,
};

function CultureSection() {
  const { t } = useTranslation('careers');
  const keys = ['flexibility', 'growth', 'equity', 'tools'];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('culture.label')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('culture.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {t('culture.subtitle')}
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {keys.map((key, i) => {
            const Icon = PERK_ICONS[key];
            return (
              <Reveal key={key} delay={i * 0.1}>
                <div className="glass-card group rounded-2xl p-8 h-full">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-white/20">
                    <Icon className="h-7 w-7 text-foreground" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {t(`culture.items.${key}.title`)}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {t(`culture.items.${key}.description`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 6 — CTA
   ═══════════════════════════════════════════════════════════ */

function CTASection() {
  const { t } = useTranslation('careers');
  const { t: tc } = useTranslation('common');

  return (
    <section className="relative overflow-hidden px-4 pt-48 pb-36 text-center lg:pt-60 lg:pb-44">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-20 h-[600px] w-[700px] rounded-full bg-blue-600/[0.12] blur-[120px]" />
        <div className="absolute -right-10 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
      </div>

      <ChevronGrid />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold sm:text-4xl">{t('cta.heading')}</h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
          {t('cta.subtitle')}
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
            to="/about"
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

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO path="/careers" />
      <HeroSection />
      <StatsSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <ValuesSection />
      <PositionsSection />
      <CultureSection />
      <CTASection />
      <DemoFooter />
    </div>
  );
};

export default Careers;
