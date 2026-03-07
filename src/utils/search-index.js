import {
  Home, Info, Users, FileText, List, ArrowRight,
  Layout, Type, Sparkles, Zap, MessageSquare, GitCompare,
  BookOpen, FolderOpen, Presentation, Settings, Share2, Keyboard, Search,
  Tag, Pen, Star, Globe, LayoutDashboard,
} from "lucide-react";

/* ── Helpers ── */

/** Recursively collect all string values from an object */
function collectStrings(obj) {
  const parts = [];
  for (const val of Object.values(obj)) {
    if (typeof val === "string") parts.push(val);
    else if (Array.isArray(val)) val.forEach((v) => typeof v === "string" && parts.push(v));
    else if (val && typeof val === "object") parts.push(...collectStrings(val));
  }
  return parts;
}

/** Strip HTML-like tags from i18n strings (e.g. <bold>text</bold>) */
function strip(s) {
  return s.replace(/<[^>]+>/g, "");
}

/* ── Guide section ID mapping (camelCase key → kebab-case anchor) ── */
const GUIDE_SECTIONS = {
  gettingStarted:  { anchor: "getting-started",  icon: Layout },
  homeDashboard:   { anchor: "home-dashboard",    icon: Home },
  editor:          { anchor: "editor",            icon: Type },
  quickEdit:       { anchor: "quick-edit",        icon: Sparkles },
  autocomplete:    { anchor: "autocomplete",      icon: Zap },
  chat:            { anchor: "chat",              icon: MessageSquare },
  diffReview:      { anchor: "diff-review",       icon: GitCompare },
  knowledgeBase:   { anchor: "knowledge-base",    icon: BookOpen },
  search:          { anchor: "search",            icon: Search },
  documents:       { anchor: "documents",         icon: FolderOpen },
  presentation:    { anchor: "presentation",      icon: Presentation },
  outline:         { anchor: "outline",           icon: List },
  customization:   { anchor: "customization",     icon: Settings },
  sharing:         { anchor: "sharing",           icon: Share2 },
  shortcuts:       { anchor: "shortcuts",         icon: Keyboard },
};

/* ── Build the full-text search index ── */

/**
 * @param {Function} t - i18next translation function (bound to 'common' namespace)
 * @param {Function} tNs - function (namespace, key) => translated string
 * @returns {Array} search entries
 */
export function buildSearchIndex(t, tNs) {
  const entries = [];

  // ─── 1. Page-level entries (from common.json globalSearch.entries) ───
  const PAGE_DEFS = [
    { id: "page-home",      type: "page", path: "/",          icon: Home },
    { id: "page-about",     type: "page", path: "/about",     icon: Info },
    { id: "page-team",      type: "page", path: "/team",      icon: Users },
    { id: "page-guide",     type: "page", path: "/guide",     icon: FileText },
    { id: "page-changelog", type: "page", path: "/changelog", icon: List },
    { id: "page-dashboard", type: "page", path: "/dashboard", icon: LayoutDashboard },
  ];

  for (const def of PAGE_DEFS) {
    entries.push({
      ...def,
      label: t(`globalSearch.entries.${def.id}.label`),
      description: t(`globalSearch.entries.${def.id}.description`),
      keywords: t(`globalSearch.entries.${def.id}.keywords`),
      searchText: "",
      breadcrumb: "",
    });
  }

  // Quick action
  entries.push({
    id: "action-login",
    type: "action",
    path: "/login",
    icon: ArrowRight,
    label: t("globalSearch.entries.action-login.label"),
    description: t("globalSearch.entries.action-login.description"),
    keywords: t("globalSearch.entries.action-login.keywords"),
    searchText: "",
    breadcrumb: "",
  });

  // ─── 2. Guide sections (full-text from guide.json) ───
  const guideLabel = t("globalSearch.entries.page-guide.label");
  for (const [key, { anchor, icon }] of Object.entries(GUIDE_SECTIONS)) {
    const heading = tNs("guide", `${key}.heading`);
    const description = strip(tNs("guide", `${key}.description`));

    // Collect all nested string values for full-text
    // We build the searchText by requesting known sub-keys, falling back to collecting all strings
    const sectionStrings = [];
    // Try to get all leaf values by re-requesting the section as an object
    const sectionObj = tNs("guide", key, { returnObjects: true });
    if (sectionObj && typeof sectionObj === "object") {
      sectionStrings.push(...collectStrings(sectionObj).map(strip));
    }
    const searchText = sectionStrings.join(" ");

    entries.push({
      id: `guide-${anchor}`,
      type: "content",
      path: `/guide#${anchor}`,
      icon,
      label: heading,
      description,
      keywords: "",
      searchText,
      breadcrumb: `${guideLabel} > ${heading}`,
    });
  }

  // ─── 3. Home features (from home.json) ───
  const homeFeatures = [
    "aiPartner", "intelligentAssist", "reviewChanges", "groundResearch",
    "askKB", "present", "semanticSearch", "writingReview",
  ];
  for (const key of homeFeatures) {
    const title = tNs("home", `features.${key}.title`);
    const desc = tNs("home", `features.${key}.description`);
    entries.push({
      id: `home-feature-${key}`,
      type: "content",
      path: "/",
      icon: Star,
      label: title,
      description: desc,
      keywords: "",
      searchText: `${title} ${desc}`,
      breadcrumb: `Home > ${tNs("home", "features.heading")}`,
    });
  }

  // ─── 4. About sections (from about.json) ───
  const aboutLabel = t("globalSearch.entries.page-about.label");

  // Vision
  const visionHeading = tNs("about", "vision.heading");
  const visionText = [1, 2, 3].map((n) => tNs("about", `vision.p${n}`)).join(" ");
  entries.push({
    id: "about-vision",
    type: "content",
    path: "/about",
    icon: Globe,
    label: visionHeading,
    description: strip(tNs("about", "vision.p1")).slice(0, 120) + "...",
    keywords: "",
    searchText: `${visionHeading} ${visionText}`,
    breadcrumb: `${aboutLabel} > ${tNs("about", "vision.label")}`,
  });

  // Problems
  for (const key of ["fragmentedTools", "aiBoltedOn", "noMemory"]) {
    const title = tNs("about", `problem.${key}.title`);
    const desc = tNs("about", `problem.${key}.description`);
    entries.push({
      id: `about-problem-${key}`,
      type: "content",
      path: "/about",
      icon: Info,
      label: title,
      description: desc,
      keywords: "",
      searchText: `${title} ${desc}`,
      breadcrumb: `${aboutLabel} > ${tNs("about", "problem.label")}`,
    });
  }

  // Values
  for (const key of ["writerFirst", "aiAsPartner", "yourData", "simplicity"]) {
    const title = tNs("about", `values.${key}.title`);
    const desc = tNs("about", `values.${key}.description`);
    entries.push({
      id: `about-value-${key}`,
      type: "content",
      path: "/about",
      icon: Pen,
      label: title,
      description: desc,
      keywords: "",
      searchText: `${title} ${desc}`,
      breadcrumb: `${aboutLabel} > ${tNs("about", "values.label")}`,
    });
  }

  // ─── 5. Changelog releases (from changelog.json) ───
  const changelogLabel = t("globalSearch.entries.page-changelog.label");
  const releaseKeys = ["v0_6", "v0_5", "v0_4", "v0_3", "v0_2", "v0_1"];
  for (const vKey of releaseKeys) {
    const releaseObj = tNs("changelog", `releases.${vKey}`, { returnObjects: true });
    if (!releaseObj || typeof releaseObj !== "object") continue;

    const title = releaseObj.title || vKey;
    const summary = releaseObj.summary || "";
    const added = Array.isArray(releaseObj.added) ? releaseObj.added.join(" ") : "";
    const improved = Array.isArray(releaseObj.improved) ? releaseObj.improved.join(" ") : "";
    const fixed = Array.isArray(releaseObj.fixed) ? releaseObj.fixed.join(" ") : "";
    const searchText = `${title} ${summary} ${added} ${improved} ${fixed}`;
    const version = vKey.replace("v0_", "v0.");

    entries.push({
      id: `changelog-${vKey}`,
      type: "changelog",
      path: "/changelog",
      icon: Tag,
      label: `${version} — ${title}`,
      description: summary.slice(0, 120) + (summary.length > 120 ? "..." : ""),
      keywords: "",
      searchText,
      breadcrumb: `${changelogLabel} > ${version}`,
    });
  }

  // ─── 6. Team members (from team.json) ───
  const teamLabel = t("globalSearch.entries.page-team.label");
  for (const key of ["steve", "rickie", "cassie"]) {
    const name = tNs("team", `members.${key}.name`);
    const role = tNs("team", `members.${key}.role`);
    const quote = tNs("team", `members.${key}.quote`);
    entries.push({
      id: `team-${key}`,
      type: "content",
      path: "/team",
      icon: Users,
      label: `${name} — ${role}`,
      description: quote,
      keywords: "",
      searchText: `${name} ${role} ${quote}`,
      breadcrumb: `${teamLabel} > ${name}`,
    });
  }

  return entries;
}

/* ── Scoring ── */

export function scoreMatch(entry, query) {
  const q = query.toLowerCase();
  const label = entry.label.toLowerCase();
  const desc = entry.description.toLowerCase();
  const keywords = entry.keywords.toLowerCase();
  const breadcrumb = (entry.breadcrumb || "").toLowerCase();
  const searchText = (entry.searchText || "").toLowerCase();

  // Exact / prefix / contains on label
  if (label === q) return 100;
  if (label.startsWith(q)) return 90;
  if (label.includes(q)) return 70;

  // Keywords match
  if (keywords.includes(q)) return 50;

  // Breadcrumb match
  if (breadcrumb.includes(q)) return 45;

  // Description match
  if (desc.includes(q)) return 35;

  // Full-text content match
  if (searchText.includes(q)) return 25;

  // Multi-word: all words found
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    const allText = `${label} ${keywords} ${breadcrumb} ${desc} ${searchText}`;
    const matched = words.filter((w) => allText.includes(w));
    if (matched.length === words.length) return 40;
    if (matched.length > 0) return 18 * (matched.length / words.length);
  }

  return 0;
}

/* ── Snippet generation ── */

export function getSnippet(entry, query) {
  const q = query.toLowerCase();
  // Search in searchText first, then description
  const text = entry.searchText || entry.description || "";
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return null;

  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + q.length + 60);
  let snippet = text.slice(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet = snippet + "...";
  return snippet;
}
