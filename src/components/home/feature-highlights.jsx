import {
  Sparkles,
  CheckCircle,
  Paperclip,
  FileText,
  Loader2,
  ArrowUp,
  Wand2,
  Check,
  Heading1,
  Heading2,
  List,
  Code,
  Quote,
  ListChecks,
  Bot,
  Search,
  BookOpen,
  Send,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CaseSensitive,
  WholeWord,
  Regex,
} from "lucide-react";
import { useTranslation } from "react-i18next";

/* ── Shared layout for one feature row ── */

function FeatureRow({
  title,
  description,
  children,
  reversed = false,
}) {
  return (
    <div
      className={`flex flex-col items-center gap-10 lg:gap-16 ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      {/* Mock wrapped in gradient background */}
      <div className="relative w-full flex-[3] overflow-hidden rounded-3xl border border-white/10 dark:border-white/5">
        {/* Ambient mesh blobs */}
        <div className="absolute -left-20 -top-20 h-64 w-72 rounded-full bg-blue-600/[0.12] blur-[100px]" />
        <div className="absolute -right-10 top-0 h-52 w-52 rounded-full bg-indigo-500/[0.10] blur-[100px]" />
        <div className="absolute -bottom-10 left-1/3 h-40 w-56 rounded-full bg-violet-600/[0.08] blur-[80px]" />

        {/* Mock content */}
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

/* ── Mini mocks ── */

function MiniChatMock() {
  const { t } = useTranslation('mock');

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">{t('miniChat.aiAssistant')}</span>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          {t('miniChat.demo')}
        </span>
      </div>
      <div className="space-y-3 px-4 py-4">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary/10 px-3.5 py-2.5 text-[13px] text-foreground">
            {t('miniChat.userMessage')}
          </div>
        </div>
        {/* Tool steps */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>{t('miniChat.analyzingDocument')}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>{t('miniChat.editingIntroduction')}</span>
          </div>
        </div>
        {/* AI response */}
        <div className="max-w-[90%]">
          <div className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground">
            <p>{t('miniChat.improvedIntro')}</p>
            <ul className="mt-2 space-y-1 text-[12px]">
              <li>
                {t('chat.fixed')} <strong>&quot;{t('miniChat.fixedOld')}&quot;</strong> →{" "}
                <strong>&quot;{t('miniChat.fixedNew')}&quot;</strong>
              </li>
              <li>{t('miniChat.madeEngaging')}</li>
              <li>{t('miniChat.tightenedLanguage')}</li>
            </ul>
          </div>
          <div className="mt-2 inline-flex items-center rounded-md bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
            {t('miniChat.reviewChanges')}
          </div>
        </div>
        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[t('miniChat.summarizeDoc'), t('miniChat.brainstormIdeas'), t('miniChat.fixGrammar')].map((label) => (
            <span
              key={label}
              className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      {/* Input bar */}
      <div className="border-t border-border px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <span className="flex-1 text-[13px] text-muted-foreground/50">{t('miniChat.askAiAnything')}</span>
          <Paperclip className="h-3.5 w-3.5 text-muted-foreground/40" />
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <ArrowUp className="h-3.5 w-3.5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniEditorMock() {
  const { t } = useTranslation('mock');

  return (
    <div className="px-8 py-6">
      {/* Paragraph with bubble toolbar */}
      <p className="mb-5 text-[15px] leading-relaxed text-foreground">
        {t('miniEditor.bodyText')}{" "}
        <span className="relative">
          <span className="rounded bg-blue-500/20 px-0.5">{t('miniEditor.compelling')}</span>
          <span className="absolute -top-9 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border border-border bg-popover px-1 py-1 shadow-lg">
            <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-foreground">
              B
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded text-xs italic text-foreground">
              I
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded text-xs text-foreground underline">
              U
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded text-xs text-foreground line-through">
              S
            </span>
            <span className="mx-0.5 h-4 w-px bg-border" />
            <span className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-muted-foreground">
              H1
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-muted-foreground">
              H2
            </span>
            <span className="mx-0.5 h-4 w-px bg-border" />
            <span className="flex h-6 w-6 items-center justify-center rounded text-primary">
              <Wand2 className="h-3.5 w-3.5" />
            </span>
          </span>
        </span>{" "}
        {t('miniEditor.bodyEnd')}
      </p>

      {/* Autocomplete ghost text */}
      <p className="mb-5 text-[15px] leading-relaxed">
        <span className="text-foreground">{t('miniEditor.autocompleteVisible')}</span>
        <span className="relative mx-0.5 inline-block h-5 w-[2px] animate-pulse bg-primary align-middle" />
        <span className="text-muted-foreground/40">
          {t('miniEditor.autocompleteGhost')}
        </span>
      </p>

      {/* Task list */}
      <div className="mb-5 space-y-2 text-[15px]">
        <label className="flex items-center gap-3">
          <span className="flex h-4 w-4 items-center justify-center rounded border border-primary bg-primary">
            <Check className="h-3 w-3 text-primary-foreground" />
          </span>
          <span className="text-muted-foreground line-through">
            {t('miniEditor.feature1Done')}
          </span>
        </label>
        <label className="flex items-center gap-3">
          <span className="h-4 w-4 rounded border border-border bg-background" />
          <span className="text-foreground">{t('miniEditor.feature2Todo')}</span>
        </label>
      </div>

      {/* Slash command */}
      <div className="relative">
        <p className="text-[15px] leading-relaxed text-foreground">
          <span className="text-muted-foreground">/</span>
          <span className="relative mx-0.5 inline-block h-5 w-[2px] animate-pulse bg-primary align-middle" />
        </p>
        <div className="absolute left-0 top-8 z-10 w-[200px] overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-lg">
          <div className="px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {t('miniEditor.blocks')}
          </div>
          <div className="flex items-center gap-2 rounded-sm bg-primary/10 px-3 py-1.5 text-[13px] text-foreground">
            <Heading1 className="h-4 w-4 text-muted-foreground" />
            {t('miniEditor.heading1')}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-foreground">
            <Heading2 className="h-4 w-4 text-muted-foreground" />
            {t('miniEditor.heading2')}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-foreground">
            <List className="h-4 w-4 text-muted-foreground" />
            {t('miniEditor.bulletList')}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-foreground">
            <ListChecks className="h-4 w-4 text-muted-foreground" />
            {t('miniEditor.taskList')}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-foreground">
            <Code className="h-4 w-4 text-muted-foreground" />
            {t('miniEditor.codeBlock')}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-foreground">
            <Quote className="h-4 w-4 text-muted-foreground" />
            {t('miniEditor.blockquote')}
          </div>
        </div>
        {/* Spacer for dropdown */}
        <div className="h-48" />
      </div>
    </div>
  );
}

function MiniDiffMock() {
  const { t } = useTranslation('mock');

  return (
    <div className="px-6 py-5">
      <p className="mb-4 text-[15px] leading-relaxed text-foreground">
        {t('miniDiff.description')}
      </p>
      <div className="overflow-hidden rounded-lg border border-border">
        <div
          className="px-4 py-2 text-[14px]"
          style={{ backgroundColor: "var(--diff-deleted-bg)" }}
        >
          <span className="mr-2 text-red-500/70">-</span>
          <span className="text-foreground/70 line-through">
            {t('miniDiff.oldText')}
          </span>
        </div>
        <div
          className="px-4 py-2 text-[14px]"
          style={{ backgroundColor: "var(--diff-inserted-bg)" }}
        >
          <span className="mr-2 text-green-500/70">+</span>
          <span className="text-foreground">
            {t('miniDiff.newText')}
          </span>
        </div>
        <div className="flex gap-2 border-t border-border px-4 py-2">
          <span
            className="inline-flex cursor-default items-center rounded px-2.5 py-1 text-xs font-medium text-green-600 dark:text-green-400"
            style={{ background: "rgba(52, 199, 89, 0.12)" }}
          >
            {t('miniDiff.accept')}
          </span>
          <span className="inline-flex cursor-default items-center rounded border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {t('miniDiff.reject')}
          </span>
        </div>
      </div>
    </div>
  );
}

function MiniKBMock() {
  const { t } = useTranslation('mock');

  return (
    <div className="px-6 py-5">
      <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground">
        <Paperclip className="h-4 w-4 text-primary" />
        {t('miniKB.knowledgeBase')}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
          <FileText className="h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-medium text-foreground">{t('miniKB.researchPaper')}</div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[65%] rounded-full bg-primary" />
            </div>
          </div>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
          <FileText className="h-4 w-4 shrink-0 text-green-500" />
          <span className="flex-1 text-[13px] text-foreground">{t('miniKB.styleGuide')}</span>
          <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
          <FileText className="h-4 w-4 shrink-0 text-green-500" />
          <span className="flex-1 text-[13px] text-foreground">{t('miniKB.brandGuidelines')}</span>
          <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
        </div>
      </div>
      <p className="mt-3 text-[12px] text-muted-foreground">
        {t('miniKB.filesSummary')}
      </p>
    </div>
  );
}

function MiniKBAgentMock() {
  const { t } = useTranslation('mock');

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <Bot className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">{t('miniKBAgent.kbAssistant')}</span>
      </div>
      <div className="space-y-3 px-4 py-4">
        {/* User question */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary/10 px-3.5 py-2.5 text-[13px] text-foreground">
            {t('miniKBAgent.userQuestion')}
          </div>
        </div>
        {/* Tool steps */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>{t('miniKBAgent.searchingDocs')}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>{t('miniKBAgent.readingReport')}</span>
          </div>
        </div>
        {/* AI response */}
        <div className="max-w-[90%]">
          <div className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground">
            <p>{t('miniKBAgent.aiResponse')}</p>
            <ul className="mt-2 space-y-1 text-[12px]">
              <li>{t('miniKBAgent.finding1')}</li>
              <li>{t('miniKBAgent.finding2')}</li>
              <li>{t('miniKBAgent.finding3')}</li>
            </ul>
          </div>
          {/* Sources */}
          <div className="mt-2 space-y-1">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{t('miniKBAgent.sources')}</div>
            <div className="flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1.5">
              <BookOpen className="h-3 w-3 shrink-0 text-primary" />
              <span className="text-[11px] text-foreground">{t('miniKBAgent.q4Report')}</span>
              <span className="ml-auto rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">92%</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1.5">
              <BookOpen className="h-3 w-3 shrink-0 text-primary" />
              <span className="text-[11px] text-foreground">{t('miniKBAgent.annualSummary')}</span>
              <span className="ml-auto rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">78%</span>
            </div>
          </div>
        </div>
      </div>
      {/* Follow-up input */}
      <div className="border-t border-border px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <span className="flex-1 text-[13px] text-muted-foreground/50">{t('miniKBAgent.askFollowUp')}</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <Send className="h-3.5 w-3.5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniPresentationMock() {
  const { t } = useTranslation('mock');

  return (
    <div className="relative bg-[#0a0a0f]">
      {/* Slide content */}
      <div className="flex flex-col items-center justify-center px-10 py-12">
        <h2 className="text-center text-2xl font-bold text-zinc-100">{t('miniPresentation.title')}</h2>
        <p className="mt-2 text-center text-sm text-zinc-500">{t('miniPresentation.byline')}</p>
        <div className="mx-auto mt-6 max-w-md space-y-3 text-left">
          <p className="text-[14px] leading-relaxed text-zinc-400">
            {t('miniWrite.body')}
          </p>
          <ul className="space-y-1.5 text-[13px] text-zinc-400">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t('miniPresentation.feature1')}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t('miniPresentation.feature2')}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t('miniPresentation.feature3')}
            </li>
          </ul>
        </div>
      </div>
      {/* Navigation arrows */}
      <div className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-zinc-500">
        <ChevronLeft className="h-4 w-4" />
      </div>
      <div className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-zinc-500">
        <ChevronRight className="h-4 w-4" />
      </div>
      {/* Bottom bar */}
      <div className="flex items-center justify-center py-2 text-[11px] text-zinc-500">
        {t('miniPresentation.slideCount')}
      </div>
      {/* Progress bar */}
      <div className="h-0.5 w-full bg-zinc-800">
        <div className="h-full w-[40%] bg-primary" />
      </div>
    </div>
  );
}

function MiniSearchMock() {
  const { t } = useTranslation('mock');

  return (
    <div className="px-6 py-5">
      {/* Search bar */}
      <div className="mb-4 overflow-hidden rounded-lg border border-border shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1 text-[13px] text-foreground">{t('miniSearch.searchQuery')}</span>
          <span className="text-[11px] text-muted-foreground">{t('miniSearch.resultCount')}</span>
          <span className="mx-1 h-4 w-px bg-border" />
          <CaseSensitive className="h-4 w-4 text-muted-foreground/50" />
          <WholeWord className="h-4 w-4 text-muted-foreground/50" />
          <Regex className="h-4 w-4 text-muted-foreground/50" />
          <span className="mx-1 h-4 w-px bg-border" />
          <Sparkles className="h-4 w-4 text-purple-500" />
        </div>
      </div>
      {/* AI semantic results */}
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-purple-500" />
        <span className="text-[12px] font-medium text-foreground">{t('miniSearch.aiResults')}</span>
        <span className="rounded-full bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-medium text-purple-600 dark:text-purple-400">
          {t('miniSearch.matchCount')}
        </span>
      </div>
      <div className="space-y-2">
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 px-3 py-2">
          <div className="text-[13px] text-foreground">
            {t('miniSearch.result1Pre')} <span className="rounded bg-purple-500/20 px-0.5">{t('miniSearch.result1Highlight')}</span> {t('miniSearch.result1Post')}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">{t('miniSearch.result1Score')}</span>
            <span className="text-[10px] text-muted-foreground">{t('miniSearch.result1Location')}</span>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2">
          <div className="text-[13px] text-foreground">
            {t('miniSearch.result2Pre')} <span className="rounded bg-purple-500/20 px-0.5">{t('miniSearch.result2Highlight')}</span> {t('miniSearch.result2Post')}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">{t('miniSearch.result2Score')}</span>
            <span className="text-[10px] text-muted-foreground">{t('miniSearch.result2Location')}</span>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2">
          <div className="text-[13px] text-foreground">
            {t('miniSearch.result3Pre')} <span className="rounded bg-purple-500/20 px-0.5">{t('miniSearch.result3Highlight')}</span> {t('miniSearch.result3Post')}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded bg-yellow-500/10 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400">{t('miniSearch.result3Score')}</span>
            <span className="text-[10px] text-muted-foreground">{t('miniSearch.result3Location')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniReviewMock() {
  const { t } = useTranslation('mock');

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">{t('miniReview.writingReview')}</span>
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          {t('miniReview.suggestionCount')}
        </span>
      </div>
      {/* Summary */}
      <div className="border-b border-border px-4 py-3">
        <p className="text-[12px] italic text-muted-foreground">
          {t('miniReview.summary')}
        </p>
      </div>
      {/* Suggestion list */}
      <div className="space-y-2 px-4 py-3">
        {/* Suggestion 1 */}
        <div className="rounded-lg border border-border p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-red-600 dark:text-red-400">{t('miniReview.grammar')}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="rounded bg-red-500/10 px-1 text-foreground/70 line-through">{t('miniReview.old1')}</span>
            <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="rounded bg-green-500/10 px-1 text-foreground">{t('miniReview.new1')}</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            <span className="inline-flex cursor-default items-center rounded px-2 py-0.5 text-[11px] font-medium text-green-600 dark:text-green-400" style={{ background: "rgba(52, 199, 89, 0.12)" }}>
              {t('miniReview.accept')}
            </span>
            <span className="inline-flex cursor-default items-center rounded border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {t('miniReview.dismiss')}
            </span>
          </div>
        </div>
        {/* Suggestion 2 */}
        <div className="rounded-lg border border-border p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">{t('miniReview.clarity')}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="rounded bg-red-500/10 px-1 text-foreground/70 line-through">{t('miniReview.old2')}</span>
            <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="rounded bg-green-500/10 px-1 text-foreground">{t('miniReview.new2')}</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            <span className="inline-flex cursor-default items-center rounded px-2 py-0.5 text-[11px] font-medium text-green-600 dark:text-green-400" style={{ background: "rgba(52, 199, 89, 0.12)" }}>
              {t('miniReview.accept')}
            </span>
            <span className="inline-flex cursor-default items-center rounded border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {t('miniReview.dismiss')}
            </span>
          </div>
        </div>
        {/* Suggestion 3 */}
        <div className="rounded-lg border border-border p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">{t('miniReview.tone')}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="rounded bg-red-500/10 px-1 text-foreground/70 line-through">{t('miniReview.old3')}</span>
            <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="rounded bg-green-500/10 px-1 text-foreground">{t('miniReview.new3')}</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            <span className="inline-flex cursor-default items-center rounded px-2 py-0.5 text-[11px] font-medium text-green-600 dark:text-green-400" style={{ background: "rgba(52, 199, 89, 0.12)" }}>
              {t('miniReview.accept')}
            </span>
            <span className="inline-flex cursor-default items-center rounded border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {t('miniReview.dismiss')}
            </span>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex gap-2 border-t border-border px-4 py-2.5">
        <span className="inline-flex cursor-default items-center rounded px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          {t('miniReview.dismissAll')}
        </span>
        <span className="ml-auto inline-flex cursor-default items-center rounded px-2.5 py-1 text-[11px] font-medium text-green-600 dark:text-green-400" style={{ background: "rgba(52, 199, 89, 0.12)" }}>
          {t('miniReview.acceptAll')}
        </span>
      </div>
    </div>
  );
}

/* ── Main export ── */

export function FeatureHighlights() {
  const { t } = useTranslation('home');

  return (
    <div className="space-y-20 lg:space-y-28">
      <FeatureRow
        title={t('features.aiPartner.title')}
        description={t('features.aiPartner.description')}
      >
        <MiniChatMock />
      </FeatureRow>

      <FeatureRow
        title={t('features.intelligentAssist.title')}
        description={t('features.intelligentAssist.description')}
        reversed
      >
        <MiniEditorMock />
      </FeatureRow>

      <FeatureRow
        title={t('features.reviewChanges.title')}
        description={t('features.reviewChanges.description')}
      >
        <MiniDiffMock />
      </FeatureRow>

      <FeatureRow
        title={t('features.groundResearch.title')}
        description={t('features.groundResearch.description')}
        reversed
      >
        <MiniKBMock />
      </FeatureRow>

      <FeatureRow
        title={t('features.askKB.title')}
        description={t('features.askKB.description')}
      >
        <MiniKBAgentMock />
      </FeatureRow>

      <FeatureRow
        title={t('features.present.title')}
        description={t('features.present.description')}
        reversed
      >
        <MiniPresentationMock />
      </FeatureRow>

      <FeatureRow
        title={t('features.semanticSearch.title')}
        description={t('features.semanticSearch.description')}
      >
        <MiniSearchMock />
      </FeatureRow>

      <FeatureRow
        title={t('features.writingReview.title')}
        description={t('features.writingReview.description')}
        reversed
      >
        <MiniReviewMock />
      </FeatureRow>
    </div>
  );
}
