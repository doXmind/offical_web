import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  CheckCircle,
  BookOpen,
  Send,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Presentation,
} from "lucide-react";
import { useTranslation } from "react-i18next";

/* ── Reveal helper ── */

function Reveal({ inView, delay = 0, y = 8, x = 0, duration = 0.4, className, children }) {
  const initial = { opacity: 0, y, x };
  const target = { opacity: 1, y: 0, x: 0 };
  return (
    <motion.div
      initial={initial}
      animate={inView ? target : initial}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WorkflowCard({ children, title, cta }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const inView = isInView || prefersReduced;

  // Clone child to inject inView
  const animatedChild = typeof children?.type === 'function'
    ? { ...children, props: { ...children.props, inView } }
    : children;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col"
    >
      {/* Card with hero-matching gradient background */}
      <div className="relative flex min-h-[380px] items-end overflow-hidden rounded-2xl border border-white/10 dark:border-white/5">
        <div className="absolute -left-16 -top-16 h-48 w-56 rounded-full bg-blue-600/[0.12] blur-[80px]" />
        <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-indigo-500/[0.10] blur-[80px]" />
        <div className="absolute bottom-0 left-1/3 h-32 w-48 rounded-full bg-violet-600/[0.08] blur-[80px]" />
        <div className="relative w-full p-4 sm:p-5">
          <div className="overflow-hidden rounded-xl border border-white/20 bg-background shadow-2xl dark:border-white/10">
            {animatedChild}
          </div>
        </div>
      </div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-5 text-lg font-bold text-foreground"
      >
        {title}
      </motion.h3>
      <motion.button
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-3 w-full rounded-full border border-border bg-background py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        {cta}
      </motion.button>
    </motion.div>
  );
}

function MiniWriteMock({ inView = false }) {
  const { t } = useTranslation('mock');
  return (
    <div className="px-5 py-5">
      <Reveal inView={inView} delay={0.2}>
        <h3 className="mb-2 text-base font-bold text-foreground">{t('miniWrite.title')}</h3>
      </Reveal>
      <Reveal inView={inView} delay={0.4}>
        <p className="mb-3 text-[13px] leading-relaxed text-foreground">{t('miniWrite.body')}</p>
      </Reveal>
      <Reveal inView={inView} delay={0.6}>
        <p className="text-[13px] leading-relaxed">
          <span className="text-foreground">{t('miniWrite.autocompleteVisible')}</span>
          <span className="relative mx-0.5 inline-block h-4 w-[2px] animate-pulse bg-primary align-middle" />
          <span className="text-muted-foreground/40">{t('miniWrite.autocompleteGhost')}</span>
        </p>
      </Reveal>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={inView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
        className="mt-4 overflow-hidden rounded-md border border-border text-[12px]"
      >
        <div className="px-3 py-1.5" style={{ backgroundColor: "var(--diff-deleted-bg)" }}>
          <span className="mr-1.5 text-red-500/70">-</span>
          <span className="text-foreground/70 line-through">{t('miniWrite.diffOld')}</span>
        </div>
        <div className="px-3 py-1.5" style={{ backgroundColor: "var(--diff-inserted-bg)" }}>
          <span className="mr-1.5 text-green-500/70">+</span>
          <span className="text-foreground">{t('miniWrite.diffNew')}</span>
        </div>
      </motion.div>
      <div className="mt-3 flex gap-1.5">
        {[t('miniWrite.improve'), t('miniWrite.simplify'), t('miniWrite.expand')].map((label, i) => (
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 4 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.25, delay: 1.2 + i * 0.1 }}
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ${
              i === 0
                ? "gap-1 bg-primary/10 font-medium text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i === 0 && <Sparkles className="h-2.5 w-2.5" />}
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function MiniResearchMock({ inView = false }) {
  const { t } = useTranslation('mock');
  return (
    <div className="px-5 py-5">
      {/* User question — slide from right */}
      <Reveal inView={inView} delay={0.2} x={16} y={0}>
        <div className="mb-3 flex justify-end">
          <div className="rounded-2xl rounded-br-md bg-primary/10 px-3 py-2 text-[12px] text-foreground">
            {t('miniResearch.userQuestion')}
          </div>
        </div>
      </Reveal>
      {/* Tool steps */}
      <div className="mb-2 space-y-1 px-1">
        <Reveal inView={inView} delay={0.5} y={4} duration={0.3}>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <CheckCircle className="h-2.5 w-2.5 text-green-500" />
            {t('miniResearch.searchingDocs')}
          </div>
        </Reveal>
        <Reveal inView={inView} delay={0.65} y={4} duration={0.3}>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <CheckCircle className="h-2.5 w-2.5 text-green-500" />
            {t('miniResearch.readingPaper')}
          </div>
        </Reveal>
      </div>
      {/* AI response — slide from left */}
      <Reveal inView={inView} delay={0.85} x={-8} y={0}>
        <div className="rounded-2xl rounded-bl-md bg-muted px-3 py-2 text-[12px] leading-relaxed text-foreground">
          {t('miniResearch.aiResponse')}
        </div>
      </Reveal>
      {/* Sources — staggered */}
      <div className="mt-2 space-y-1">
        <Reveal inView={inView} delay={1.05} x={-6} y={0} duration={0.3}>
          <div className="flex items-center gap-1.5 rounded bg-muted/50 px-2 py-1">
            <BookOpen className="h-2.5 w-2.5 text-primary" />
            <span className="text-[10px] text-foreground">{t('miniResearch.researchPaper')}</span>
            <span className="ml-auto rounded bg-green-500/10 px-1 text-[9px] font-medium text-green-600 dark:text-green-400">94%</span>
          </div>
        </Reveal>
        <Reveal inView={inView} delay={1.2} x={-6} y={0} duration={0.3}>
          <div className="flex items-center gap-1.5 rounded bg-muted/50 px-2 py-1">
            <BookOpen className="h-2.5 w-2.5 text-primary" />
            <span className="text-[10px] text-foreground">{t('miniResearch.industryReport')}</span>
            <span className="ml-auto rounded bg-green-500/10 px-1 text-[9px] font-medium text-green-600 dark:text-green-400">81%</span>
          </div>
        </Reveal>
      </div>
      {/* Input */}
      <Reveal inView={inView} delay={1.4}>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5">
          <span className="flex-1 text-[11px] text-muted-foreground/50">{t('miniResearch.askFollowUp')}</span>
          <Send className="h-3 w-3 text-primary" />
        </div>
      </Reveal>
    </div>
  );
}

function MiniPresentMock({ inView = false }) {
  const { t } = useTranslation('mock');
  return (
    <div className="relative bg-[#0a0a0f]">
      <div className="flex flex-col items-center justify-center px-8 py-8">
        <Reveal inView={inView} delay={0.2} y={10}>
          <h3 className="text-center text-lg font-bold text-zinc-100">{t('miniPresent.title')}</h3>
          <p className="mt-1 text-center text-[11px] text-zinc-500">{t('miniPresent.byline')}</p>
        </Reveal>
        <div className="mx-auto mt-4 max-w-[260px] space-y-1.5 text-left text-[12px] text-zinc-400">
          {[t('miniPresent.feature1'), t('miniPresent.feature2'), t('miniPresent.feature3')].map((feat, i) => (
            <Reveal key={i} inView={inView} delay={0.5 + i * 0.15} x={-6} y={0} duration={0.3}>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                {feat}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      {/* Nav arrows — fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.9 }}
        className="absolute left-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-zinc-500"
      >
        <ChevronLeft className="h-3 w-3" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.9 }}
        className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-zinc-500"
      >
        <ChevronRight className="h-3 w-3" />
      </motion.div>
      <Reveal inView={inView} delay={1.0} duration={0.3}>
        <div className="flex items-center justify-center pb-1.5 text-[10px] text-zinc-500">{t('miniPresent.slideCount')}</div>
      </Reveal>
      {/* Progress bar */}
      <div className="h-0.5 w-full bg-zinc-800">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={inView ? { width: "40%" } : { width: "0%" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        />
      </div>
      {/* Bottom actions */}
      <Reveal inView={inView} delay={1.1} duration={0.3}>
        <div className="flex items-center justify-center gap-3 border-t border-white/5 bg-white/[0.02] px-4 py-2">
          <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500">
            <Presentation className="h-3 w-3" />
            {t('miniPresent.present')}
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500">
            <FileDown className="h-3 w-3" />
            {t('miniPresent.exportPdf')}
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500">
            <FileDown className="h-3 w-3" />
            {t('miniPresent.exportMd')}
          </span>
        </div>
      </Reveal>
    </div>
  );
}

export function WorkflowShowcase() {
  const { t } = useTranslation('home');

  return (
    <div>
      <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
        {t('workflow.heading')}
      </h2>
      <p className="mb-14 text-center text-sm text-muted-foreground sm:text-base">
        {t('workflow.subheading')}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <WorkflowCard title={t('workflow.write.title')} cta={t('workflow.write.cta')}>
          <MiniWriteMock />
        </WorkflowCard>
        <WorkflowCard title={t('workflow.research.title')} cta={t('workflow.research.cta')}>
          <MiniResearchMock />
        </WorkflowCard>
        <WorkflowCard title={t('workflow.present.title')} cta={t('workflow.present.cta')}>
          <MiniPresentMock />
        </WorkflowCard>
      </div>
    </div>
  );
}
