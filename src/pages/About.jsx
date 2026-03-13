import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAppBase } from '../config/region';
import {
  Sparkles,
  Shield,
  Pen,
  Minimize2,
  Puzzle,
  Wrench,
  Brain,
  FileText,
  CheckCircle,
  Loader2,
  Paperclip,
  Wand2,
  Check,
  Heading1,
  List,
  ListChecks,
  Code,
  Quote,
  ArrowUp,
  Send,
  Bot,
  BookOpen,
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

/* ═══════════════════════════════════════════════════════════
   Section 1 — Hero
   ═══════════════════════════════════════════════════════════ */

function HeroSection() {
  const { t } = useTranslation('about');

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6">
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
        {/* Large heading */}
        <h1 className="fluid-hero font-bold tracking-tight text-gradient">
          {t('hero.heading')}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {t('hero.subtitle')}
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 2 — Vision (split layout with orbital visual)
   ═══════════════════════════════════════════════════════════ */

function OrbitalVisual() {
  const icons = [
    { Icon: Pen, angle: 0, radius: 80, duration: 20 },
    { Icon: Brain, angle: 90, radius: 80, duration: 20 },
    { Icon: Sparkles, angle: 45, radius: 130, duration: 30 },
    { Icon: FileText, angle: 225, radius: 130, duration: 30 },
    { Icon: Wand2, angle: 120, radius: 180, duration: 40 },
    { Icon: BookOpen, angle: 300, radius: 180, duration: 40 },
  ];

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full max-w-[360px]" aria-hidden="true">
        {/* Orbit rings */}
        <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 10" />

        {/* Central logo circle */}
        <circle cx="200" cy="200" r="32" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <image href="/logo.svg" x="184" y="184" width="32" height="32" />

        {/* Orbiting icons */}
        {icons.map(({ Icon, angle, radius, duration }, i) => (
          <motion.g
            key={i}
            style={{ originX: "200px", originY: "200px" }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration, ease: "linear" }}
          >
            <g transform={`translate(${200 + radius * Math.cos((angle * Math.PI) / 180)}, ${200 + radius * Math.sin((angle * Math.PI) / 180)})`}>
              <circle r="16" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <foreignObject x="-8" y="-8" width="16" height="16">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </foreignObject>
            </g>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function VisionSection() {
  const { t } = useTranslation('about');

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Text */}
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('vision.label')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('vision.heading')}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            {t('vision.p1')}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {t('vision.p2')}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {t('vision.p3')}
          </p>
        </Reveal>

        {/* Orbital visual */}
        <Reveal delay={0.15}>
          <OrbitalVisual />
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 3 — Problem
   ═══════════════════════════════════════════════════════════ */

function ProblemSection() {
  const { t } = useTranslation('about');

  const problems = [
    {
      icon: Puzzle,
      title: t('problem.fragmentedTools.title'),
      description: t('problem.fragmentedTools.description'),
    },
    {
      icon: Wrench,
      title: t('problem.aiBoltedOn.title'),
      description: t('problem.aiBoltedOn.description'),
    },
    {
      icon: Brain,
      title: t('problem.noMemory.title'),
      description: t('problem.noMemory.description'),
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('problem.label')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('problem.heading')}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {t('problem.subtitle')}
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <p.icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 4 — Approach (alternating feature rows with mocks)
   ═══════════════════════════════════════════════════════════ */

/* Mini mock: AI autocomplete + bubble toolbar */
function MiniAutocompleteMock() {
  return (
    <div className="px-8 py-6">
      <p className="mb-5 text-[15px] leading-relaxed text-foreground">
        Modern AI tools are enabling writers to produce clearer, more{" "}
        <span className="relative">
          <span className="rounded bg-blue-500/20 px-0.5">compelling</span>
          <span className="absolute -top-9 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border border-border bg-popover px-1 py-1 shadow-lg">
            <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-foreground">B</span>
            <span className="flex h-6 w-6 items-center justify-center rounded text-xs italic text-foreground">I</span>
            <span className="flex h-6 w-6 items-center justify-center rounded text-xs text-foreground underline">U</span>
            <span className="mx-0.5 h-4 w-px bg-border" />
            <span className="flex h-6 w-6 items-center justify-center rounded text-primary">
              <Wand2 className="h-3.5 w-3.5" />
            </span>
          </span>
        </span>{" "}
        prose in a fraction of the time.
      </p>
      <p className="text-[15px] leading-relaxed">
        <span className="text-foreground">The writing assistant analyzes context</span>
        <span className="relative mx-0.5 inline-block h-5 w-[2px] animate-pulse bg-primary align-middle" />
        <span className="text-muted-foreground/40">
          to provide suggestions that maintain consistency in voice and style.
        </span>
      </p>
    </div>
  );
}

/* Mini mock: Clean editor with slash command */
function MiniCleanEditorMock() {
  return (
    <div className="px-8 py-6">
      <h2 className="mb-3 text-xl font-bold text-foreground">The Future of Writing</h2>
      <p className="mb-4 text-[15px] leading-relaxed text-foreground">
        A distraction-free canvas where ideas flow freely. No ribbon bars, no menu mazes — just your words and the tools that appear when needed.
      </p>
      <div className="relative">
        <p className="text-[15px] leading-relaxed text-foreground">
          <span className="text-muted-foreground">/</span>
          <span className="relative mx-0.5 inline-block h-5 w-[2px] animate-pulse bg-primary align-middle" />
        </p>
        <div className="absolute left-0 top-8 z-10 w-[200px] overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-lg">
          <div className="px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Blocks</div>
          <div className="flex items-center gap-2 rounded-sm bg-primary/10 px-3 py-1.5 text-[13px] text-foreground">
            <Heading1 className="h-4 w-4 text-muted-foreground" />
            Heading 1
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-foreground">
            <List className="h-4 w-4 text-muted-foreground" />
            Bullet List
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-foreground">
            <ListChecks className="h-4 w-4 text-muted-foreground" />
            Task List
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-foreground">
            <Code className="h-4 w-4 text-muted-foreground" />
            Code Block
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-foreground">
            <Quote className="h-4 w-4 text-muted-foreground" />
            Blockquote
          </div>
        </div>
        <div className="h-44" />
      </div>
    </div>
  );
}

/* Mini mock: Knowledge base */
function MiniKBMock() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <Bot className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">KB Assistant</span>
      </div>
      <div className="space-y-3 px-4 py-4">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary/10 px-3.5 py-2.5 text-[13px] text-foreground">
            Summarize the key findings from this research paper
          </div>
        </div>
        <div className="space-y-1.5 px-1">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Searching knowledge base...</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Reading research-paper.pdf</span>
          </div>
        </div>
        <div className="max-w-[90%]">
          <div className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground">
            <p>Based on the paper, the key findings are:</p>
            <ul className="mt-2 space-y-1 text-[12px]">
              <li>AI-assisted writing efficiency improved by 47%</li>
              <li>Writing quality scores increased by 23% on average</li>
              <li>User satisfaction reached 94%</li>
            </ul>
          </div>
          <div className="mt-2 space-y-1">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Sources</div>
            <div className="flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1.5">
              <BookOpen className="h-3 w-3 shrink-0 text-primary" />
              <span className="text-[11px] text-foreground">research-paper.pdf</span>
              <span className="ml-auto rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">95%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <span className="flex-1 text-[13px] text-muted-foreground/50">Ask a follow-up...</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <Send className="h-3.5 w-3.5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Shared approach feature row — matching FeatureHighlights FeatureRow */
function ApproachRow({ title, description, children, reversed = false }) {
  return (
    <div className={`flex flex-col items-center gap-10 lg:gap-16 ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
      {/* Mock in gradient container */}
      <div className="relative w-full flex-[3] overflow-hidden rounded-3xl border border-white/10 dark:border-white/5">
        <div className="absolute -left-20 -top-20 h-64 w-72 rounded-full bg-blue-600/[0.12] blur-[100px]" />
        <div className="absolute -right-10 top-0 h-52 w-52 rounded-full bg-indigo-500/[0.10] blur-[100px]" />
        <div className="absolute -bottom-10 left-1/3 h-40 w-56 rounded-full bg-violet-600/[0.08] blur-[80px]" />
        <div className="relative flex min-h-[560px] items-end p-6 lg:min-h-[740px] lg:p-8">
          <div className="w-full overflow-hidden rounded-xl border border-white/20 bg-background shadow-2xl dark:border-white/10">
            {children}
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="flex-[2] text-center lg:text-left">
        <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ApproachSection() {
  const { t } = useTranslation('about');

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('approach.label')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('approach.heading')}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {t('approach.subtitle')}
          </p>
        </Reveal>

        <div className="space-y-20 lg:space-y-28">
          <Reveal>
            <ApproachRow
              title={t('approach.aiWoven.title')}
              description={t('approach.aiWoven.description')}
            >
              <MiniAutocompleteMock />
            </ApproachRow>
          </Reveal>

          <Reveal>
            <ApproachRow
              title={t('approach.distractionFree.title')}
              description={t('approach.distractionFree.description')}
              reversed
            >
              <MiniCleanEditorMock />
            </ApproachRow>
          </Reveal>

          <Reveal>
            <ApproachRow
              title={t('approach.knowledgeConnected.title')}
              description={t('approach.knowledgeConnected.description')}
            >
              <MiniKBMock />
            </ApproachRow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 5 — Values
   ═══════════════════════════════════════════════════════════ */

function ValuesSection() {
  const { t } = useTranslation('about');

  const values = [
    {
      icon: Pen,
      title: t('values.writerFirst.title'),
      description: t('values.writerFirst.description'),
    },
    {
      icon: Sparkles,
      title: t('values.aiAsPartner.title'),
      description: t('values.aiAsPartner.description'),
    },
    {
      icon: Shield,
      title: t('values.yourData.title'),
      description: t('values.yourData.description'),
    },
    {
      icon: Minimize2,
      title: t('values.simplicity.title'),
      description: t('values.simplicity.description'),
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('values.label')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('values.heading')}
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="glass-card group rounded-2xl p-8 h-full">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-white/20">
                  <v.icon className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">{v.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 6 — CTA
   ═══════════════════════════════════════════════════════════ */

function CTASection() {
  const { t } = useTranslation('about');
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

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO path="/about" />
      <HeroSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <VisionSection />
      <ProblemSection />
      <ApproachSection />
      <ValuesSection />
      <CTASection />
      <DemoFooter />
    </div>
  );
};

export default About;
