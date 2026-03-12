import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAppBase } from '../config/region';
import {
  Check,
  Minus,
  X,
  Brain,
  BookOpen,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import SEO from '../components/seo/SEO';
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

/* ── Comparison table data ── */

const FEATURE_CATEGORIES = [
  {
    key: 'aiWriting',
    features: [
      { key: 'aiChat',        doxmind: 'full',    notion: 'partial', googleDocs: 'partial' },
      { key: 'aiThinking',    doxmind: 'full',    notion: 'none',    googleDocs: 'none'    },
      { key: 'aiAutocomplete', doxmind: 'full',   notion: 'partial', googleDocs: 'partial' },
      { key: 'inlineDiff',    doxmind: 'full',    notion: 'none',    googleDocs: 'partial' },
      { key: 'writingReview', doxmind: 'full',    notion: 'none',    googleDocs: 'partial' },
    ],
  },
  {
    key: 'knowledge',
    features: [
      { key: 'knowledgeBase',  doxmind: 'full',    notion: 'none',    googleDocs: 'none' },
      { key: 'kbAgent',        doxmind: 'full',    notion: 'none',    googleDocs: 'none' },
      { key: 'semanticSearch', doxmind: 'full',    notion: 'partial', googleDocs: 'partial' },
    ],
  },
  {
    key: 'dataStructure',
    features: [
      { key: 'databaseBlocks', doxmind: 'full',    notion: 'full',    googleDocs: 'none'    },
      { key: 'csvAnalysis',    doxmind: 'full',    notion: 'none',    googleDocs: 'none'    },
      { key: 'inlineComments', doxmind: 'full',    notion: 'full',    googleDocs: 'full'    },
    ],
  },
  {
    key: 'presentationOutput',
    features: [
      { key: 'presentationMode', doxmind: 'full',    notion: 'none',    googleDocs: 'none'    },
      { key: 'exportFormats',    doxmind: 'full',    notion: 'full',    googleDocs: 'full'    },
      { key: 'realtimeCollab',   doxmind: 'partial', notion: 'full',    googleDocs: 'full'    },
    ],
  },
];

/* ── Status icon ── */

function StatusIcon({ status }) {
  if (status === 'full') {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
        <Check className="h-3.5 w-3.5 text-emerald-400" />
      </span>
    );
  }
  if (status === 'partial') {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20">
        <Minus className="h-3.5 w-3.5 text-amber-400" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5">
      <X className="h-3.5 w-3.5 text-muted-foreground/50" />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 1 — Hero
   ═══════════════════════════════════════════════════════════ */

function HeroSection() {
  const { t } = useTranslation('compare');

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
        {/* Pill badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-foreground" />
          <span className="text-xs font-medium text-muted-foreground">{t('hero.badge')}</span>
        </div>

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
   Section 2 — Overview Cards
   ═══════════════════════════════════════════════════════════ */

function OverviewCards() {
  const { t } = useTranslation('compare');

  const products = [
    { key: 'doxmind', highlight: true },
    { key: 'notion', highlight: false },
    { key: 'googleDocs', highlight: false },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('overview.heading')}
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            {t('overview.subtitle')}
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.key} delay={i * 0.1}>
              <div className={`glass-card group rounded-2xl p-8 h-full ${product.highlight ? 'ring-1 ring-primary/30' : ''}`}>
                <h3 className="mb-1 text-xl font-semibold text-foreground">
                  {t(`overview.${product.key}.label`)}
                </h3>
                <p className="mb-5 text-sm text-muted-foreground">
                  {t(`overview.${product.key}.tagline`)}
                </p>
                <ul className="space-y-2.5">
                  {(t(`overview.${product.key}.points`, { returnObjects: true }) || []).map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-[14px] leading-relaxed text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 3 — Comparison Table
   ═══════════════════════════════════════════════════════════ */

function ComparisonTable() {
  const { t } = useTranslation('compare');

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('table.heading')}
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            {t('table.subtitle')}
          </p>
        </Reveal>

        {/* Desktop Table */}
        <Reveal>
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="w-[30%] px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    {t('table.feature')}
                  </th>
                  <th className="w-[23.3%] px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-foreground">doXmind</span>
                  </th>
                  <th className="w-[23.3%] px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                    Notion
                  </th>
                  <th className="w-[23.3%] px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                    Google Docs
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_CATEGORIES.map((category) => (
                  <React.Fragment key={category.key}>
                    {/* Category header */}
                    <tr className="bg-white/[0.03]">
                      <td colSpan={4} className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t(`table.categories.${category.key}`)}
                      </td>
                    </tr>
                    {/* Feature rows */}
                    {category.features.map((feature) => (
                      <tr key={feature.key} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          {t(`table.features.${feature.key}.name`)}
                        </td>
                        <td className="px-6 py-4 text-center bg-primary/[0.03]">
                          <div className="flex flex-col items-center gap-1.5">
                            <StatusIcon status={feature.doxmind} />
                            <span className="text-xs text-muted-foreground">
                              {t(`table.features.${feature.key}.doxmind`)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <StatusIcon status={feature.notion} />
                            <span className="text-xs text-muted-foreground">
                              {t(`table.features.${feature.key}.notion`)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <StatusIcon status={feature.googleDocs} />
                            <span className="text-xs text-muted-foreground">
                              {t(`table.features.${feature.key}.googleDocs`)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {FEATURE_CATEGORIES.map((category) => (
            <Reveal key={category.key}>
              <div className="mb-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(`table.categories.${category.key}`)}
                </h3>
                <div className="space-y-3">
                  {category.features.map((feature) => (
                    <div key={feature.key} className="glass-card rounded-xl p-4">
                      <h4 className="mb-3 text-sm font-semibold text-foreground">
                        {t(`table.features.${feature.key}.name`)}
                      </h4>
                      <div className="space-y-2">
                        {['doxmind', 'notion', 'googleDocs'].map((product) => (
                          <div key={product} className="flex items-start gap-2.5">
                            <StatusIcon status={feature[product]} />
                            <div className="min-w-0">
                              <span className="text-xs font-medium text-foreground">
                                {product === 'doxmind' ? 'doXmind' : product === 'googleDocs' ? 'Google Docs' : 'Notion'}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {t(`table.features.${feature.key}.${product}`)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Disclaimer */}
        <Reveal>
          <p className="mt-8 text-center text-xs text-muted-foreground/60">
            {t('table.disclaimer')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 4 — Unique Advantages
   ═══════════════════════════════════════════════════════════ */

function AdvantagesSection() {
  const { t } = useTranslation('compare');

  const advantages = [
    { key: 'thinkingAI', icon: Brain },
    { key: 'knowledgePowered', icon: BookOpen },
    { key: 'dataToPresentation', icon: BarChart3 },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('advantages.heading')}
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            {t('advantages.subtitle')}
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {advantages.map((advantage, i) => (
            <Reveal key={advantage.key} delay={i * 0.1}>
              <div className="glass-card group rounded-2xl p-8 h-full">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-white/20">
                  <advantage.icon className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {t(`advantages.${advantage.key}.title`)}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {t(`advantages.${advantage.key}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 5 — CTA
   ═══════════════════════════════════════════════════════════ */

function CTASection() {
  const { t } = useTranslation('compare');
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

const Compare = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO path="/compare" />
      <HeroSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <OverviewCards />
      <ComparisonTable />
      <AdvantagesSection />
      <CTASection />
      <DemoFooter />
    </div>
  );
};

export default Compare;
