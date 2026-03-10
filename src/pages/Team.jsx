import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { getAppBase } from '../config/region';
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
   Section 1 — Hero (minimal, editorial feel)
   ═══════════════════════════════════════════════════════════ */

function HeroSection() {
  const { t } = useTranslation('team');

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-6">
      {/* Single ambient glow — subtle, not noisy */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-indigo-500/[0.07] blur-[160px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Overline */}
        <motion.p
          className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('hero.badge')}
        </motion.p>

        {/* Heading */}
        <motion.h1
          className="fluid-hero font-bold tracking-tight text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {t('hero.heading')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mt-12 h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 2 — Team Members (immersive editorial cards)
   ═══════════════════════════════════════════════════════════ */

const MEMBERS = [
  { key: 'steve', photo: '/steve.jpg' },
  { key: 'rickie', photo: '/rickie.jpg' },
  { key: 'cassie', photo: '/cassie.png' },
];

function MemberCard({ member, index }) {
  const { t } = useTranslation('team');
  const reversed = index % 2 !== 0;

  return (
    <Reveal delay={0.1}>
      <div
        className={`group relative flex flex-col items-center gap-8 lg:gap-14 ${
          reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* Photo container */}
        <div className="relative w-full max-w-sm flex-shrink-0 lg:max-w-[400px]">
          {/* Ambient glow behind photo */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/[0.08] via-violet-500/[0.05] to-blue-500/[0.08] blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.06]">
            <img
              src={member.photo}
              alt={t(`members.${member.key}.name`)}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Name & role overlay on photo */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-sm font-medium uppercase tracking-widest text-white/50">
                {t(`members.${member.key}.role`)}
              </p>
              <h3 className="mt-1 text-2xl font-bold text-white">
                {t(`members.${member.key}.name`)}
              </h3>
            </div>
          </div>
        </div>

        {/* Quote & text */}
        <div className="flex flex-1 flex-col justify-center text-center lg:text-left">
          <Quote className="mx-auto mb-4 h-8 w-8 text-white/[0.06] lg:mx-0" />
          <blockquote className="text-xl font-light leading-relaxed text-foreground/90 sm:text-2xl lg:text-[28px] lg:leading-[1.4]">
            {t(`members.${member.key}.quote`)}
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
            <div className="h-px w-8 bg-white/10" />
            <span className="text-sm text-muted-foreground">
              {t(`members.${member.key}.name`)}, {t(`members.${member.key}.role`)}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function MembersSection() {
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl space-y-24 lg:space-y-32">
        {MEMBERS.map((member, i) => (
          <MemberCard key={member.key} member={member} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 3 — Mission Banner
   ═══════════════════════════════════════════════════════════ */

function MissionBanner() {
  const { t } = useTranslation('team');

  return (
    <section className="relative overflow-hidden px-6 py-24 lg:py-32">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full bg-blue-600/[0.06] blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[350px] w-[400px] rounded-full bg-violet-600/[0.05] blur-[120px]" />
      </div>

      <Reveal>
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/[0.06] bg-white/[0.02] p-10 text-center backdrop-blur-sm sm:p-14 lg:p-20">
          {/* Three small avatars */}
          <div className="mb-8 flex items-center justify-center -space-x-3">
            {MEMBERS.map((m) => (
              <div
                key={m.key}
                className="h-10 w-10 overflow-hidden rounded-full border-2 border-background"
              >
                <img src={m.photo} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {t('cta.heading')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {t('cta.subtitle')}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 4 — CTA
   ═══════════════════════════════════════════════════════════ */

function CTASection() {
  const { t: tc } = useTranslation('common');

  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-28 text-center lg:pt-40 lg:pb-36">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-20 h-[600px] w-[700px] rounded-full bg-blue-600/[0.12] blur-[120px]" />
        <div className="absolute -right-10 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
      </div>

      <ChevronGrid />

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
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
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════ */

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO path="/team" />
      <HeroSection />
      <MembersSection />
      <MissionBanner />
      <CTASection />
      <DemoFooter />
    </div>
  );
};

export default Team;
