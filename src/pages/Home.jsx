import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/seo/SEO';
import { getAppBase } from '../config/region';
import { MockEditorShowcase } from '../components/home/mock-editor-showcase';
import { FeatureHighlights } from '../components/home/feature-highlights';
import { WorkflowShowcase } from '../components/home/workflow-showcase';
import { HeroBackground } from '../components/home/hero-background';
import { ChevronGrid } from '../components/home/chevron-grid';
import { DemoFooter } from '../components/home/demo-footer';

const Home = () => {
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation('common');

  return (
    <div className="min-h-screen bg-background">
      <SEO path="/" />

      {/* Hero — gradient background */}
      <HeroBackground>
        <section className="relative px-4 pb-0 pt-28 lg:pt-36">
          {/* Centered branding */}
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Large logo icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10">
                <img src="/logo.svg" alt="doXmind" className="w-8 h-8" />
              </div>
            </div>

            {/* Product name */}
            <h1 className="text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
              <span className="font-light">do</span>
              <span className="font-black">X</span>
              <span className="font-light">mind</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              {t('hero.subtitle')}
            </p>

            {/* Two CTAs side by side */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`${getAppBase()}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                {tc('cta.tryForFree')}
              </a>
              <Link
                to="/guide"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-8 py-3 text-base font-medium text-foreground shadow-sm hover:bg-muted transition-colors"
              >
                {tc('cta.learnMore')}
              </Link>
            </div>
          </motion.div>

          {/* Mock Editor — hangs below the gradient */}
          <motion.div
            className="relative mx-auto mt-10 max-w-5xl sm:mt-14 lg:mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="relative h-[260px] overflow-hidden rounded-2xl sm:h-[380px] md:h-[520px] lg:h-auto lg:overflow-visible">
              <div className="absolute left-1/2 top-0 w-[1024px] -translate-x-1/2 origin-top scale-[0.40] md:scale-[0.60] lg:static lg:w-auto lg:translate-x-0 lg:scale-100">
                <MockEditorShowcase />
              </div>
              {/* Bottom fade mask on mobile/tablet */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent lg:hidden" />
            </div>
          </motion.div>
        </section>
      </HeroBackground>

      {/* Feature Highlights */}
      <section className="px-6 pt-16 pb-16 lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
            {t('features.heading')}
          </h2>
          <p className="mb-16 text-center text-sm text-muted-foreground sm:text-base">
            {t('features.subheading')}
          </p>
          <FeatureHighlights />
        </div>
      </section>

      {/* Workflow Showcase */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <WorkflowShowcase />
        </div>
      </section>

      {/* CTA — gradient background matching hero */}
      <section className="relative overflow-hidden px-4 pt-48 pb-36 text-center lg:pt-60 lg:pb-44">
        {/* Ambient mesh blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 -top-20 h-[600px] w-[700px] rounded-full bg-blue-600/[0.12] blur-[120px]" />
          <div className="absolute -right-10 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
        </div>

        {/* Interactive chevron grid */}
        <ChevronGrid />

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold sm:text-4xl">{t('ctaSection.heading')}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            {t('ctaSection.subheading')}
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

      {/* Footer */}
      <DemoFooter />
    </div>
  );
};

export default Home;
