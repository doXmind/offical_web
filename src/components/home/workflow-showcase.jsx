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

function WorkflowCard({ children, title, cta }) {
  return (
    <div className="flex flex-col">
      {/* Card with hero-matching gradient background */}
      <div className="relative flex min-h-[380px] items-end overflow-hidden rounded-2xl border border-white/10 dark:border-white/5">
        <div className="absolute -left-16 -top-16 h-48 w-56 rounded-full bg-blue-600/[0.12] blur-[80px]" />
        <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-indigo-500/[0.10] blur-[80px]" />
        <div className="absolute bottom-0 left-1/3 h-32 w-48 rounded-full bg-violet-600/[0.08] blur-[80px]" />
        <div className="relative w-full p-4 sm:p-5">
          <div className="overflow-hidden rounded-xl border border-white/20 bg-background shadow-2xl dark:border-white/10">
            {children}
          </div>
        </div>
      </div>
      <h3 className="mt-5 text-lg font-bold text-foreground">{title}</h3>
      <button className="mt-3 w-full rounded-full border border-border bg-background py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
        {cta}
      </button>
    </div>
  );
}

function MiniWriteMock() {
  const { t } = useTranslation('mock');
  return (
    <div className="px-5 py-5">
      <h3 className="mb-2 text-base font-bold text-foreground">{t('miniWrite.title')}</h3>
      <p className="mb-3 text-[13px] leading-relaxed text-foreground">
        {t('miniWrite.body')}
      </p>
      <p className="text-[13px] leading-relaxed">
        <span className="text-foreground">{t('miniWrite.autocompleteVisible')}</span>
        <span className="relative mx-0.5 inline-block h-4 w-[2px] animate-pulse bg-primary align-middle" />
        <span className="text-muted-foreground/40">
          {t('miniWrite.autocompleteGhost')}
        </span>
      </p>
      <div className="mt-4 overflow-hidden rounded-md border border-border text-[12px]">
        <div className="px-3 py-1.5" style={{ backgroundColor: "var(--diff-deleted-bg)" }}>
          <span className="mr-1.5 text-red-500/70">-</span>
          <span className="text-foreground/70 line-through">{t('miniWrite.diffOld')}</span>
        </div>
        <div className="px-3 py-1.5" style={{ backgroundColor: "var(--diff-inserted-bg)" }}>
          <span className="mr-1.5 text-green-500/70">+</span>
          <span className="text-foreground">{t('miniWrite.diffNew')}</span>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          <Sparkles className="h-2.5 w-2.5" />
          {t('miniWrite.improve')}
        </span>
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
          {t('miniWrite.simplify')}
        </span>
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
          {t('miniWrite.expand')}
        </span>
      </div>
    </div>
  );
}

function MiniResearchMock() {
  const { t } = useTranslation('mock');
  return (
    <div className="px-5 py-5">
      <div className="mb-3 flex justify-end">
        <div className="rounded-2xl rounded-br-md bg-primary/10 px-3 py-2 text-[12px] text-foreground">
          {t('miniResearch.userQuestion')}
        </div>
      </div>
      <div className="mb-2 space-y-1 px-1">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <CheckCircle className="h-2.5 w-2.5 text-green-500" />
          {t('miniResearch.searchingDocs')}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <CheckCircle className="h-2.5 w-2.5 text-green-500" />
          {t('miniResearch.readingPaper')}
        </div>
      </div>
      <div className="rounded-2xl rounded-bl-md bg-muted px-3 py-2 text-[12px] leading-relaxed text-foreground">
        {t('miniResearch.aiResponse')}
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-1.5 rounded bg-muted/50 px-2 py-1">
          <BookOpen className="h-2.5 w-2.5 text-primary" />
          <span className="text-[10px] text-foreground">{t('miniResearch.researchPaper')}</span>
          <span className="ml-auto rounded bg-green-500/10 px-1 text-[9px] font-medium text-green-600 dark:text-green-400">94%</span>
        </div>
        <div className="flex items-center gap-1.5 rounded bg-muted/50 px-2 py-1">
          <BookOpen className="h-2.5 w-2.5 text-primary" />
          <span className="text-[10px] text-foreground">{t('miniResearch.industryReport')}</span>
          <span className="ml-auto rounded bg-green-500/10 px-1 text-[9px] font-medium text-green-600 dark:text-green-400">81%</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5">
        <span className="flex-1 text-[11px] text-muted-foreground/50">{t('miniResearch.askFollowUp')}</span>
        <Send className="h-3 w-3 text-primary" />
      </div>
    </div>
  );
}

function MiniPresentMock() {
  const { t } = useTranslation('mock');
  return (
    <div className="relative bg-[#0a0a0f]">
      <div className="flex flex-col items-center justify-center px-8 py-8">
        <h3 className="text-center text-lg font-bold text-zinc-100">{t('miniPresent.title')}</h3>
        <p className="mt-1 text-center text-[11px] text-zinc-500">{t('miniPresent.byline')}</p>
        <div className="mx-auto mt-4 max-w-[260px] space-y-1.5 text-left text-[12px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {t('miniPresent.feature1')}
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {t('miniPresent.feature2')}
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {t('miniPresent.feature3')}
          </div>
        </div>
      </div>
      <div className="absolute left-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-zinc-500">
        <ChevronLeft className="h-3 w-3" />
      </div>
      <div className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-zinc-500">
        <ChevronRight className="h-3 w-3" />
      </div>
      <div className="flex items-center justify-center pb-1.5 text-[10px] text-zinc-500">{t('miniPresent.slideCount')}</div>
      <div className="h-0.5 w-full bg-zinc-800">
        <div className="h-full w-[40%] bg-primary" />
      </div>
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
