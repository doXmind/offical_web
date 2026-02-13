import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  Type,
  MessageSquare,
  GitCompare,
  BookOpen,
  Search,
  FolderOpen,
  Presentation,
  List,
  Settings,
  Share2,
  Keyboard,
  Zap,
  Layout,
  Home,
  ChevronDown,
  Star,
  Plus,
  LayoutTemplate,
  ChevronRight,
  MousePointerClick,
  Mic,
  Image as ImageIcon,
  FileText,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Languages,
} from "lucide-react";
import { cn } from "../utils/cn";
import { DemoFooter } from "../components/home/demo-footer";
import { FeatureCard } from "../components/guide/feature-card";
import { StepGuide } from "../components/guide/step-guide";
import { ShortcutCombo, ShortcutKey, useIsMac } from "../components/guide/shortcut-key";
import {
  LayoutIllustration,
  ToolbarIllustration,
  QuickEditIllustration,
  AutocompleteIllustration,
  ChatIllustration,
  DiffReviewIllustration,
  KnowledgeBaseIllustration,
  CommandPaletteIllustration,
  FileTreeIllustration,
  PresentationIllustration,
  OutlineIllustration,
  CustomizationIllustration,
  SharingIllustration,
  HomeDashboardIllustration,
} from "../components/guide/help-illustrations";

const TOC_IDS = [
  { id: "getting-started", icon: Layout },
  { id: "home-dashboard", icon: Home },
  { id: "editor", icon: Type },
  { id: "quick-edit", icon: Sparkles },
  { id: "autocomplete", icon: Zap },
  { id: "chat", icon: MessageSquare },
  { id: "diff-review", icon: GitCompare },
  { id: "knowledge-base", icon: BookOpen },
  { id: "search", icon: Search },
  { id: "documents", icon: FolderOpen },
  { id: "presentation", icon: Presentation },
  { id: "outline", icon: List },
  { id: "customization", icon: Settings },
  { id: "sharing", icon: Share2 },
  { id: "shortcuts", icon: Keyboard },
];

const SECTION_IDS = TOC_IDS.map((item) => item.id);

const TOC_LABEL_KEYS = {
  "getting-started": "toc.gettingStarted",
  "home-dashboard": "toc.homeDashboard",
  "editor": "toc.editor",
  "quick-edit": "toc.quickEdit",
  "autocomplete": "toc.autocomplete",
  "chat": "toc.chat",
  "diff-review": "toc.diffReview",
  "knowledge-base": "toc.knowledgeBase",
  "search": "toc.search",
  "documents": "toc.documents",
  "presentation": "toc.presentation",
  "outline": "toc.outline",
  "customization": "toc.customization",
  "sharing": "toc.sharing",
  "shortcuts": "toc.shortcuts",
};

function useTocItems() {
  const { t } = useTranslation("guide");
  return useMemo(
    () =>
      TOC_IDS.map((item) => ({
        ...item,
        label: t(TOC_LABEL_KEYS[item.id]),
      })),
    [t]
  );
}

function useActiveSection() {
  const [activeId, setActiveId] = useState("");
  const headingIds = useRef(SECTION_IDS);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const ids = headingIds.current;
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return activeId;
}

function TocNav() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection();
  const { t } = useTranslation("guide");
  const tocItems = useTocItems();

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="fixed right-8 top-24 hidden w-48 xl:block" aria-label={t("toc.tableOfContents")}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("toc.onThisPage")}
        </p>
        <ul className="space-y-1">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors",
                  activeId === item.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-3 w-3 shrink-0" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible dropdown */}
      <div className="sticky top-14 z-40 mb-8 border-b border-border bg-background/80 backdrop-blur-sm xl:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4" />
            {activeId
              ? tocItems.find((item) => item.id === activeId)?.label ?? t("toc.tableOfContents")
              : t("toc.tableOfContents")}
          </span>
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {open && (
          <ul className="max-h-60 overflow-y-auto border-t border-border px-4 pb-3 pt-2">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                    activeId === item.id
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-3 w-3 shrink-0" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function SectionHeading({ id, icon: Icon, children }) {
  return (
    <h2 id={id} className="mb-4 flex scroll-mt-28 items-center gap-3 text-2xl font-bold">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      {children}
    </h2>
  );
}

function Tip({ children }) {
  const { t } = useTranslation("guide");
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground">
      <span className="mr-2 font-semibold text-primary">{t("tip")}</span>
      {children}
    </div>
  );
}

export default function Guide() {
  const isMac = useIsMac();
  const { t } = useTranslation("guide");

  return (
    <div className="min-h-screen bg-background">
      <TocNav />

      <div className="mx-auto max-w-4xl px-4 pt-24 pb-12 xl:pr-56">
        <h1 className="mb-2 text-3xl font-bold">{t("pageTitle")}</h1>
        <p className="mb-12 text-muted-foreground">
          {t("pageSubtitle")}
        </p>

        <div className="space-y-16">
          {/* 1. Getting Started */}
          <section>
            <SectionHeading id="getting-started" icon={Layout}>
              {t("gettingStarted.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("gettingStarted.description")
                .split(/<\/?bold>/g)
                .map((part, i) =>
                  i % 2 === 1 ? (
                    <strong key={i} className="text-foreground">{part}</strong>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <LayoutIllustration />
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("gettingStarted.createFirst")}</strong> Click the{" "}
                <strong className="text-foreground">+ New Document</strong> button on the home
                dashboard, or use the Command Palette (<ShortcutCombo keys={["Ctrl", "K"]} />) and
                type &quot;New Document&quot;.
              </p>
              <p>
                <strong className="text-foreground">{t("gettingStarted.onboarding")}</strong> When you first sign
                in, an interactive tour walks you through the key features. You can restart it
                anytime from the user menu →{" "}
                <strong className="text-foreground">Restart Tour</strong>.
              </p>
            </div>
          </section>

          {/* Home Dashboard */}
          <section>
            <SectionHeading id="home-dashboard" icon={Home}>
              {t("homeDashboard.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("homeDashboard.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <HomeDashboardIllustration />
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("homeDashboard.searchAskAI")}</h3>
            <div className="mb-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                {t("homeDashboard.searchIntro")}
              </p>
              <p>
                <strong className="text-foreground">{t("homeDashboard.askAiMode")}</strong> {t("homeDashboard.askAiModeDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("homeDashboard.searchMode")}</strong> {t("homeDashboard.searchModeDesc")}
              </p>
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("homeDashboard.recentFiles")}</h3>
            <div className="mb-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("homeDashboard.continueWriting")}</strong> {t("homeDashboard.continueWritingDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("homeDashboard.favorites")}</strong>{" "}
                {t("homeDashboard.favoritesDesc")}
              </p>
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("homeDashboard.creatingDocs")}</h3>
            <div className="mb-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                {t("homeDashboard.creatingDocsIntro")}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-lg border border-border px-3 py-2.5">
                  <p className="text-sm font-medium text-foreground">{t("homeDashboard.newDocument")}</p>
                  <p className="text-xs">{t("homeDashboard.newDocumentDesc")}</p>
                </div>
                <div className="rounded-lg border border-border px-3 py-2.5">
                  <p className="text-sm font-medium text-foreground">{t("homeDashboard.newFolder")}</p>
                  <p className="text-xs">{t("homeDashboard.newFolderDesc")}</p>
                </div>
                <div className="rounded-lg border border-border px-3 py-2.5">
                  <p className="text-sm font-medium text-foreground">{t("homeDashboard.fromTemplate")}</p>
                  <p className="text-xs">
                    {t("homeDashboard.fromTemplateDesc")}
                  </p>
                </div>
                <div className="rounded-lg border border-border px-3 py-2.5">
                  <p className="text-sm font-medium text-foreground">{t("homeDashboard.importFile")}</p>
                  <p className="text-xs">
                    {t("homeDashboard.importFileDesc")}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("homeDashboard.fileActions")}</h3>
            <div className="mb-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                {t("homeDashboard.fileActionsIntro")}
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <strong className="text-foreground">{t("homeDashboard.rename")}</strong> — {t("homeDashboard.renameDesc")}
                </li>
                <li>
                  <strong className="text-foreground">{t("homeDashboard.share")}</strong> — {t("homeDashboard.shareDesc")}
                </li>
                <li>
                  <strong className="text-foreground">{t("homeDashboard.addToFavorites")}</strong> — {t("homeDashboard.addToFavoritesDesc")}
                </li>
                <li>
                  <strong className="text-foreground">{t("homeDashboard.exportAs")}</strong> — {t("homeDashboard.exportAsDesc")}
                </li>
                <li>
                  <strong className="text-foreground">{t("homeDashboard.delete")}</strong> — {t("homeDashboard.deleteDesc")}
                </li>
              </ul>
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("homeDashboard.viewSort")}</h3>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("homeDashboard.gridListView")}</strong> {t("homeDashboard.gridListViewDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("homeDashboard.sort")}</strong> {t("homeDashboard.sortDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("homeDashboard.dragDrop")}</strong> {t("homeDashboard.dragDropDesc")}
              </p>
            </div>
          </section>

          {/* 2. Editor Basics */}
          <section>
            <SectionHeading id="editor" icon={Type}>
              {t("editor.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("editor.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <ToolbarIllustration />
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("editor.textFormatting")}</h3>
            <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                { label: t("editor.bold"), keys: ["Ctrl", "B"] },
                { label: t("editor.italic"), keys: ["Ctrl", "I"] },
                { label: t("editor.underline"), keys: ["Ctrl", "U"] },
                { label: t("editor.strikethrough"), keys: ["Ctrl", "Shift", "S"] },
                { label: t("editor.highlight"), keys: ["Ctrl", "Shift", "H"] },
                { label: t("editor.inlineCode"), keys: ["Ctrl", "E"] },
                { label: t("editor.addLink"), keys: ["Ctrl", "K"] },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                >
                  <span className="text-sm">{item.label}</span>
                  <ShortcutCombo keys={item.keys} />
                </div>
              ))}
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("editor.blockTypes")}</h3>
            <div className="mb-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("editor.headings")}</strong> Three levels (H1–H3) via{" "}
                <ShortcutCombo keys={["Ctrl", "Alt", "1"]} /> / <ShortcutKey>2</ShortcutKey> /{" "}
                <ShortcutKey>3</ShortcutKey>, or type{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">#</code>,{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">##</code>,{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">###</code> followed by a
                space.
              </p>
              <p>
                <strong className="text-foreground">{t("editor.lists")}</strong> Bullet (
                <ShortcutCombo keys={["Ctrl", "Shift", "8"]} />
                ), Numbered (
                <ShortcutCombo keys={["Ctrl", "Shift", "7"]} />
                ), and Task lists (
                <ShortcutCombo keys={["Ctrl", "Shift", "9"]} />) with checkboxes.
              </p>
              <p>
                <strong className="text-foreground">{t("editor.codeBlocks")}</strong> {t("editor.codeBlocksDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("editor.mathBlocks")}</strong> Inline math with{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">$...$</code> and display
                math with <code className="rounded bg-muted px-1.5 py-0.5 text-xs">$$...$$</code>.
                Supports full LaTeX syntax.
              </p>
              <p>
                <strong className="text-foreground">{t("editor.tables")}</strong> {t("editor.tablesDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("editor.otherBlocks")}</strong> {t("editor.otherBlocksDesc")}
              </p>
            </div>

            <Tip>
              {t("editor.slashTip")}
            </Tip>
          </section>

          {/* 3. AI Quick Edit */}
          <section>
            <SectionHeading id="quick-edit" icon={Sparkles}>
              {t("quickEdit.heading")}
            </SectionHeading>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              {t("quickEdit.description")}
            </p>

            <StepGuide
              steps={[
                { label: t("quickEdit.steps.selectText"), icon: <MousePointerClick className="h-4 w-4" /> },
                { label: t("quickEdit.steps.menuAppears"), icon: <Sparkles className="h-4 w-4" /> },
                { label: t("quickEdit.steps.chooseAction"), icon: <CheckCircle className="h-4 w-4" /> },
                { label: t("quickEdit.steps.reviewDiff"), icon: <GitCompare className="h-4 w-4" /> },
              ]}
            />

            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <QuickEditIllustration />
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("quickEdit.availableActions")}</h3>
            <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                {
                  icon: <CheckCircle className="h-4 w-4" />,
                  label: t("quickEdit.fixGrammar"),
                  desc: t("quickEdit.fixGrammarDesc"),
                },
                {
                  icon: <Sparkles className="h-4 w-4" />,
                  label: t("quickEdit.improveWriting"),
                  desc: t("quickEdit.improveWritingDesc"),
                },
                {
                  icon: <FileText className="h-4 w-4" />,
                  label: t("quickEdit.simplify"),
                  desc: t("quickEdit.simplifyDesc"),
                },
                {
                  icon: <ArrowUp className="h-4 w-4" />,
                  label: t("quickEdit.makeLonger"),
                  desc: t("quickEdit.makeLongerDesc"),
                },
                {
                  icon: <ArrowDown className="h-4 w-4" />,
                  label: t("quickEdit.makeShorter"),
                  desc: t("quickEdit.makeShorterDesc"),
                },
                {
                  icon: <MessageSquare className="h-4 w-4" />,
                  label: t("quickEdit.changeTone"),
                  desc: t("quickEdit.changeToneDesc"),
                },
                {
                  icon: <Languages className="h-4 w-4" />,
                  label: t("quickEdit.translate"),
                  desc: t("quickEdit.translateDesc"),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-lg border border-border px-3 py-2.5"
                >
                  <div className="mt-0.5 text-primary">{item.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Tip>
              Choose <strong>Ask in Chat</strong> at the bottom of the menu to send your selection
              to the AI chat with a custom instruction.
            </Tip>
          </section>

          {/* 4. AI Autocomplete */}
          <section>
            <SectionHeading id="autocomplete" icon={Zap}>
              {t("autocomplete.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("autocomplete.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <AutocompleteIllustration />
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("autocomplete.howToUse")}</h3>
            <div className="mb-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("autocomplete.autoTrigger")}</strong> Pause typing for ~750ms
                and a suggestion appears. Press <ShortcutKey>Tab</ShortcutKey> to accept, or{" "}
                <ShortcutKey>Esc</ShortcutKey> to dismiss.
              </p>
              <p>
                <strong className="text-foreground">{t("autocomplete.manualTrigger")}</strong> Press{" "}
                <ShortcutCombo keys={["Alt", "/"]} /> at any time to request a suggestion
                immediately.
              </p>
              <p>
                <strong className="text-foreground">{t("autocomplete.longMode")}</strong> Press{" "}
                <ShortcutCombo keys={["Ctrl", "Shift", "Space"]} /> to get a multi-sentence
                suggestion instead of a short one.
              </p>
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("autocomplete.modes")}</h3>
            <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { mode: t("autocomplete.adaptive"), desc: t("autocomplete.adaptiveDesc") },
                { mode: t("autocomplete.short"), desc: t("autocomplete.shortDesc") },
                { mode: t("autocomplete.long"), desc: t("autocomplete.longDesc") },
              ].map((item) => (
                <div
                  key={item.mode}
                  className="rounded-lg border border-border px-3 py-2.5 text-center"
                >
                  <p className="text-sm font-medium">{item.mode}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <Tip>
              {t("autocomplete.disabledTip")}
            </Tip>
          </section>

          {/* 5. AI Chat */}
          <section>
            <SectionHeading id="chat" icon={MessageSquare}>
              {t("chat.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("chat.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <ChatIllustration />
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("chat.chatModes")}</h3>
            <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-border px-4 py-3">
                <p className="text-sm font-medium">{t("chat.sidebarMode")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("chat.sidebarModeDesc")}
                </p>
              </div>
              <div className="rounded-lg border border-border px-4 py-3">
                <p className="text-sm font-medium">{t("chat.floatingMode")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("chat.floatingModeDesc")}
                </p>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("chat.featuresTitle")}</h3>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("chat.sendMessages")}</strong> Type in the input box
                and press <ShortcutKey>Enter</ShortcutKey>. Use{" "}
                <ShortcutCombo keys={["Shift", "Enter"]} /> for a new line.
              </p>
              <p>
                <strong className="text-foreground">{t("chat.voiceInput")}</strong> Press and hold the{" "}
                <Mic className="inline h-3.5 w-3.5" /> microphone button for at least 1 second, then
                release to send your transcribed speech.
              </p>
              <p>
                <strong className="text-foreground">{t("chat.imageAttachments")}</strong> Click the{" "}
                <ImageIcon className="inline h-3.5 w-3.5" /> image button or paste an image. Up to
                10 images per message (5MB each).
              </p>
              <p>
                <strong className="text-foreground">{t("chat.quickSuggestions")}</strong> {t("chat.quickSuggestionsDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("chat.documentEditing")}</strong> {t("chat.documentEditingDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("chat.extendedThinking")}</strong> {t("chat.extendedThinkingDesc")}
              </p>
            </div>
          </section>

          {/* 6. Diff Review */}
          <section>
            <SectionHeading id="diff-review" icon={GitCompare}>
              {t("diffReview.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("diffReview.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <DiffReviewIllustration />
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("diffReview.acceptReject")}</strong> {t("diffReview.acceptRejectDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("diffReview.bulkActions")}</strong> {t("diffReview.bulkActionsDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("diffReview.versionSnapshots")}</strong> {t("diffReview.versionSnapshotsDesc")}
              </p>
            </div>
          </section>

          {/* 7. Knowledge Base */}
          <section>
            <SectionHeading id="knowledge-base" icon={BookOpen}>
              {t("knowledgeBase.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("knowledgeBase.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <KnowledgeBaseIllustration />
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("knowledgeBase.supportedFormats")}</strong> {t("knowledgeBase.supportedFormatsDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("knowledgeBase.processing")}</strong> {t("knowledgeBase.processingDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("knowledgeBase.howItWorks")}</strong> {t("knowledgeBase.howItWorksDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("knowledgeBase.perConversation")}</strong> {t("knowledgeBase.perConversationDesc")}
              </p>
            </div>
          </section>

          {/* 8. Search & Navigation */}
          <section>
            <SectionHeading id="search" icon={Search}>
              {t("search.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("search.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <CommandPaletteIllustration />
            </div>

            <div className="space-y-4">
              <FeatureCard
                icon={<Search className="h-5 w-5" />}
                title={t("search.semanticSearch")}
                className="border-0 bg-transparent p-0"
              >
                <p>
                  Press <ShortcutCombo keys={["Ctrl", "Shift", "F"]} /> to open AI-powered semantic
                  search. Unlike plain text search, this understands meaning — search for
                  &quot;budget discussion&quot; to find paragraphs about financial planning even if
                  they don&apos;t contain those exact words. Results are ranked by relevance with
                  highlighting.
                </p>
              </FeatureCard>

              <FeatureCard
                icon={<Search className="h-5 w-5" />}
                title={t("search.findReplace")}
                className="border-0 bg-transparent p-0"
              >
                <p>
                  Press <ShortcutCombo keys={["Ctrl", "F"]} /> for traditional text search within
                  your document. Supports{" "}
                  <strong className="text-foreground">case-sensitive</strong>,{" "}
                  <strong className="text-foreground">whole word</strong>, and{" "}
                  <strong className="text-foreground">regex</strong> modes. Navigate matches with
                  arrow buttons or <ShortcutKey>Enter</ShortcutKey> /{" "}
                  <ShortcutCombo keys={["Shift", "Enter"]} />.
                </p>
              </FeatureCard>

              <FeatureCard
                icon={<Zap className="h-5 w-5" />}
                title={t("search.commandPalette")}
                className="border-0 bg-transparent p-0"
              >
                <p>
                  Press <ShortcutCombo keys={["Ctrl", "K"]} /> to open the command palette. Quickly
                  access any action: create documents, toggle panels, change themes, search files,
                  and more. Start typing to filter results.
                </p>
              </FeatureCard>

              <FeatureCard
                icon={<FolderOpen className="h-5 w-5" />}
                title={t("search.quickFileSwitcher")}
                className="border-0 bg-transparent p-0"
              >
                <p>
                  Press <ShortcutCombo keys={["Ctrl", "Tab"]} /> to quickly switch between your open
                  and recent documents.
                </p>
              </FeatureCard>
            </div>
          </section>

          {/* 9. Document Management */}
          <section>
            <SectionHeading id="documents" icon={FolderOpen}>
              {t("documents.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("documents.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <FileTreeIllustration />
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("documents.organization")}</h3>
            <div className="mb-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("documents.folders")}</strong> {t("documents.foldersDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("documents.bulkActions")}</strong> {t("documents.bulkActionsDesc")}
              </p>
              <p>
                <strong className="text-foreground">{t("documents.trash")}</strong> {t("documents.trashDesc")}
              </p>
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("documents.importTemplates")}</h3>
            <div className="mb-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("documents.import")}</strong> Click the{" "}
                <Plus className="inline h-3.5 w-3.5" /> button → <strong className="text-foreground">{t("homeDashboard.importFile")}</strong>{" "}
                to upload a PDF, DOCX, or Markdown file. The file is converted and opened in the
                editor automatically.
              </p>
              <p>
                <strong className="text-foreground">{t("documents.templates")}</strong> Click{" "}
                <Plus className="inline h-3.5 w-3.5" /> → <strong className="text-foreground">{t("homeDashboard.fromTemplate")}</strong>{" "}
                to start from a pre-built structure:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-border px-3 py-2">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> {t("documents.welcomeTutorial")}
                  </p>
                  <p className="text-xs">{t("documents.welcomeTutorialDesc")}</p>
                </div>
                <div className="rounded-lg border border-border px-3 py-2">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <FileText className="h-3.5 w-3.5 text-primary" /> {t("documents.blankDocument")}
                  </p>
                  <p className="text-xs">{t("documents.blankDocumentDesc")}</p>
                </div>
                <div className="rounded-lg border border-border px-3 py-2">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <LayoutTemplate className="h-3.5 w-3.5 text-primary" /> {t("documents.blogPost")}
                  </p>
                  <p className="text-xs">{t("documents.blogPostDesc")}</p>
                </div>
                <div className="rounded-lg border border-border px-3 py-2">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <FileText className="h-3.5 w-3.5 text-primary" /> {t("documents.meetingNotes")}
                  </p>
                  <p className="text-xs">{t("documents.meetingNotesDesc")}</p>
                </div>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("documents.versionHistory")}</h3>
            <div className="mb-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                {t("documents.versionHistoryP1")}
              </p>
              <p>
                Click any version to preview it. Use{" "}
                <strong className="text-foreground">Restore</strong> to revert your document to that
                point.
              </p>
            </div>

            <h3 className="mb-3 text-lg font-semibold">{t("documents.export")}</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { format: t("documents.markdown"), ext: ".md" },
                { format: t("documents.pdf"), ext: ".pdf" },
                { format: t("documents.word"), ext: ".docx" },
              ].map((item) => (
                <div
                  key={item.format}
                  className="flex flex-col items-center rounded-lg border border-border px-3 py-3"
                >
                  <p className="text-sm font-medium">{item.format}</p>
                  <p className="text-xs text-muted-foreground">{item.ext}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 10. Presentation Mode */}
          <section>
            <SectionHeading id="presentation" icon={Presentation}>
              {t("presentation.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("presentation.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <PresentationIllustration />
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("presentation.activate")}</strong> Press{" "}
                <ShortcutKey>F5</ShortcutKey> or click the presentation button in the header
                toolbar.
              </p>
              <p>
                <strong className="text-foreground">{t("presentation.slideSplitting")}</strong> Slides are created
                from horizontal dividers (
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">---</code>) in your
                document. If none are found, the document splits at H1/H2 headings.
              </p>
              <p>
                <strong className="text-foreground">{t("presentation.navigate")}</strong> Use{" "}
                <ShortcutKey>←</ShortcutKey> <ShortcutKey>→</ShortcutKey> arrow keys or click the
                on-screen navigation buttons. Dot indicators show your current position.
              </p>
              <p>
                <strong className="text-foreground">{t("presentation.exit")}</strong> Press{" "}
                <ShortcutKey>Esc</ShortcutKey> or click the exit button.
              </p>
            </div>

            <Tip>
              {t("presentation.coverSlideTip")}
            </Tip>
          </section>

          {/* 11. Outline & Mindlines */}
          <section>
            <SectionHeading id="outline" icon={List}>
              {t("outline.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("outline.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <OutlineIllustration />
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("outline.outlineSidebar")}</strong> Toggle with{" "}
                <ShortcutCombo keys={["Ctrl", "Shift", "O"]} />. Shows all headings (H1–H6) in a
                nested tree. Click any heading to scroll directly to that section. Drag the border
                to resize.
              </p>
              <p>
                <strong className="text-foreground">{t("outline.mindlines")}</strong> {t("outline.mindlinesDesc")}
              </p>
            </div>
          </section>

          {/* 12. Customization */}
          <section>
            <SectionHeading id="customization" icon={Settings}>
              {t("customization.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("customization.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <CustomizationIllustration />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border px-4 py-3">
                <p className="mb-1 text-sm font-medium">{t("customization.typography")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("customization.typographyDesc")}
                </p>
              </div>
              <div className="rounded-lg border border-border px-4 py-3">
                <p className="mb-1 text-sm font-medium">{t("customization.editorWidth")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("customization.editorWidthDesc")}
                </p>
              </div>
              <div className="rounded-lg border border-border px-4 py-3">
                <p className="mb-1 text-sm font-medium">{t("customization.themes")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("customization.themesDesc")}
                </p>
              </div>
              <div className="rounded-lg border border-border px-4 py-3">
                <p className="mb-1 text-sm font-medium">{t("customization.spellcheck")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("customization.spellcheckDesc")}
                </p>
              </div>
            </div>
          </section>

          {/* 13. Sharing */}
          <section>
            <SectionHeading id="sharing" icon={Share2}>
              {t("sharing.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t("sharing.description")}
            </p>
            <div className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/[0.06] glow-card p-6">
              <SharingIllustration />
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("sharing.generateLink")}</strong> Click the{" "}
                <Share2 className="inline h-3.5 w-3.5" /> Share button in the header. A unique URL
                is generated for your document. Copy it to share with others.
              </p>
              <p>
                <strong className="text-foreground">{t("sharing.viewerExperience")}</strong> {t("sharing.viewerExperienceDesc")}
              </p>
            </div>
          </section>

          {/* 14. Keyboard Shortcuts */}
          <section>
            <SectionHeading id="shortcuts" icon={Keyboard}>
              {t("shortcuts.heading")}
            </SectionHeading>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Press <ShortcutCombo keys={["Ctrl", "?"]} /> anywhere in the app to see this
              reference.
              {isMac ? t("shortcuts.showingMac") : t("shortcuts.showingWindows")}
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Text Formatting */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                  {t("shortcuts.textFormatting")}
                </h3>
                <div className="space-y-2">
                  {[
                    { keys: ["Ctrl", "B"], desc: t("shortcuts.bold") },
                    { keys: ["Ctrl", "I"], desc: t("shortcuts.italic") },
                    { keys: ["Ctrl", "U"], desc: t("shortcuts.underline") },
                    { keys: ["Ctrl", "Shift", "S"], desc: t("shortcuts.strikethrough") },
                    { keys: ["Ctrl", "E"], desc: t("shortcuts.inlineCode") },
                    { keys: ["Ctrl", "Shift", "H"], desc: t("shortcuts.highlight") },
                    { keys: ["Ctrl", "K"], desc: t("shortcuts.addLink") },
                  ].map((s) => (
                    <div key={s.desc} className="flex items-center justify-between py-1">
                      <span className="text-sm">{s.desc}</span>
                      <ShortcutCombo keys={s.keys} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Headings & Blocks */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                  {t("shortcuts.headingsBlocks")}
                </h3>
                <div className="space-y-2">
                  {[
                    { keys: ["Ctrl", "Alt", "1"], desc: t("shortcuts.heading1") },
                    { keys: ["Ctrl", "Alt", "2"], desc: t("shortcuts.heading2") },
                    { keys: ["Ctrl", "Alt", "3"], desc: t("shortcuts.heading3") },
                    { keys: ["Ctrl", "Shift", "8"], desc: t("shortcuts.bulletList") },
                    { keys: ["Ctrl", "Shift", "7"], desc: t("shortcuts.numberedList") },
                    { keys: ["Ctrl", "Shift", "9"], desc: t("shortcuts.taskList") },
                  ].map((s) => (
                    <div key={s.desc} className="flex items-center justify-between py-1">
                      <span className="text-sm">{s.desc}</span>
                      <ShortcutCombo keys={s.keys} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation & View */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                  {t("shortcuts.navigationView")}
                </h3>
                <div className="space-y-2">
                  {[
                    { keys: ["Ctrl", "K"], desc: t("shortcuts.commandPalette") },
                    { keys: ["Ctrl", "F"], desc: t("shortcuts.findInDocument") },
                    { keys: ["Ctrl", "Shift", "F"], desc: t("shortcuts.semanticSearch") },
                    { keys: ["Ctrl", "Shift", "O"], desc: t("shortcuts.toggleOutline") },
                    { keys: ["Ctrl", "Tab"], desc: t("shortcuts.quickFileSwitcher") },
                    { keys: ["Ctrl", "?"], desc: t("shortcuts.keyboardShortcuts") },
                  ].map((s) => (
                    <div key={s.desc} className="flex items-center justify-between py-1">
                      <span className="text-sm">{s.desc}</span>
                      <ShortcutCombo keys={s.keys} />
                    </div>
                  ))}
                </div>
              </div>

              {/* AI & Editing */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{t("shortcuts.aiEditing")}</h3>
                <div className="space-y-2">
                  {[
                    { keys: ["Alt", "/"], desc: t("shortcuts.triggerAutocomplete") },
                    { keys: ["Ctrl", "Shift", "Space"], desc: t("shortcuts.forceLongAutocomplete") },
                    { keys: ["Ctrl", "Z"], desc: t("shortcuts.undo") },
                    { keys: ["Ctrl", "Y"], desc: t("shortcuts.redo") },
                  ].map((s) => (
                    <div key={s.desc} className="flex items-center justify-between py-1">
                      <span className="text-sm">{s.desc}</span>
                      <ShortcutCombo keys={s.keys} />
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm">{t("shortcuts.acceptAutocomplete")}</span>
                    <ShortcutKey>Tab</ShortcutKey>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm">{t("shortcuts.showQuickEditMenu")}</span>
                    <span className="text-xs text-muted-foreground">{t("shortcuts.selectText")}</span>
                  </div>
                </div>
              </div>

              {/* Chat */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{t("shortcuts.chatSection")}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm">{t("shortcuts.sendMessage")}</span>
                    <ShortcutKey>Enter</ShortcutKey>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm">{t("shortcuts.newLineInChat")}</span>
                    <ShortcutCombo keys={["Shift", "Enter"]} />
                  </div>
                </div>
              </div>

              {/* Presentation */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{t("shortcuts.presentationSection")}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm">{t("shortcuts.startPresentation")}</span>
                    <ShortcutKey>F5</ShortcutKey>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm">{t("shortcuts.navigateSlides")}</span>
                    <span className="inline-flex gap-1">
                      <ShortcutKey>←</ShortcutKey>
                      <ShortcutKey>→</ShortcutKey>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm">{t("shortcuts.exitPresentation")}</span>
                    <ShortcutKey>Esc</ShortcutKey>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>

      {/* Footer */}
      <DemoFooter />
    </div>
  );
}
