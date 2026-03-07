import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, X, CornerDownLeft } from "lucide-react";
import { buildSearchIndex, scoreMatch, getSnippet } from "../../utils/search-index";

const TYPE_ORDER = ["page", "action", "content", "changelog"];

/* ── Component ── */
export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { t: tGuide } = useTranslation("guide");
  const { t: tHome } = useTranslation("home");
  const { t: tAbout } = useTranslation("about");
  const { t: tChangelog } = useTranslation("changelog");
  const { t: tTeam } = useTranslation("team");

  const hasQuery = query.trim().length > 0;

  // Helper that translates from any namespace
  const tNs = useCallback(
    (ns, key, opts) => {
      const translators = { guide: tGuide, home: tHome, about: tAbout, changelog: tChangelog, team: tTeam };
      return translators[ns]?.(key, opts) ?? key;
    },
    [tGuide, tHome, tAbout, tChangelog, tTeam]
  );

  // Build full-text search index from all i18n content
  const entries = useMemo(() => buildSearchIndex(t, tNs), [t, tNs]);

  const typeLabels = useMemo(
    () => ({
      page: t("globalSearch.groups.pages"),
      content: t("globalSearch.groups.features"),
      action: t("globalSearch.groups.actions"),
      changelog: t("globalSearch.groups.pages"),
    }),
    [t]
  );

  // Filter & score results
  const results = useMemo(() => {
    if (!hasQuery) return [];
    return entries
      .map((entry) => ({
        ...entry,
        score: scoreMatch(entry, query),
        snippet: getSnippet(entry, query),
      }))
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
  }, [query, hasQuery, entries]);

  // Group by type
  const grouped = useMemo(() => {
    const groups = {};
    for (const entry of results) {
      if (!groups[entry.type]) groups[entry.type] = [];
      groups[entry.type].push(entry);
    }
    return TYPE_ORDER
      .filter((tp) => groups[tp])
      .map((tp) => ({ type: tp, label: typeLabels[tp], items: groups[tp] }));
  }, [results, typeLabels]);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selected = listRef.current.querySelector("[data-selected='true']");
    if (selected) selected.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleSelect = useCallback(
    (entry) => {
      onClose();
      if (entry.path.startsWith("http")) {
        window.open(entry.path, "_blank", "noopener,noreferrer");
      } else if (entry.path.includes("#")) {
        const [path, hash] = entry.path.split("#");
        navigate(path);
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        });
      } else {
        navigate(entry.path);
      }
    },
    [navigate, onClose]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatResults[selectedIndex]) handleSelect(flatResults[selectedIndex]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [flatResults, selectedIndex, handleSelect, onClose]
  );

  // Ctrl/Cmd+K to close when open
  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* ── Full-screen background ── */}
          <div className="absolute inset-0 bg-[#0a0a0f]">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/4 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/[0.07] blur-[160px]" />
              <div className="absolute right-1/4 top-1/2 h-[500px] w-[600px] translate-x-1/4 rounded-full bg-violet-600/[0.05] blur-[140px]" />
              <div className="absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/[0.04] blur-[120px]" />
            </div>
          </div>

          {/* ── Header bar ── */}
          <header className="relative z-10 flex h-14 shrink-0 items-center justify-between px-5 sm:px-8">
            <Link
              to="/"
              onClick={onClose}
              className="text-2xl tracking-tight text-white/90"
            >
              <span className="font-light">do</span>
              <span className="font-black">X</span>
              <span className="font-light">mind</span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70"
                aria-label={t("globalSearch.close")}
              >
                <X className="h-[18px] w-[18px]" />
              </button>
              <Link
                to="/login"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                {t("nav.logIn")}
              </Link>
            </div>
          </header>

          {/* ── Centered search area ── */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
            <div className="w-full max-w-2xl -mt-20">
              {/* Search input row */}
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("globalSearch.placeholder")}
                  className="w-full bg-transparent py-3 pr-14 text-xl font-light tracking-wide text-white placeholder:text-white/25 outline-none sm:text-2xl border-b border-white/[0.08] focus:border-white/[0.16] transition-colors"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  className={`absolute right-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${hasQuery
                      ? "border-white/20 bg-white/[0.08] text-white hover:bg-white/[0.14]"
                      : "border-white/[0.06] bg-white/[0.03] text-white/20"
                    }`}
                  onClick={() => {
                    if (flatResults[selectedIndex]) handleSelect(flatResults[selectedIndex]);
                  }}
                  tabIndex={-1}
                  aria-label={t("globalSearch.open")}
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>

              {/* ── Results dropdown ── */}
              <AnimatePresence mode="wait">
                {hasQuery && (
                  <motion.div
                    ref={listRef}
                    className="mt-4 max-h-[min(60vh,540px)] overflow-y-auto overscroll-contain rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    role="listbox"
                  >
                    {flatResults.length === 0 ? (
                      <div className="px-6 py-14 text-center">
                        <p className="text-sm text-white/25">{t("globalSearch.noResults", { query })}</p>
                        <p className="mt-1.5 text-xs text-white/15">{t("globalSearch.tryDifferent")}</p>
                      </div>
                    ) : (
                      <div className="py-2">
                        {grouped.map((group) => (
                          <div key={group.type}>
                            <div className="px-5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-widest text-white/20">
                              {group.label}
                            </div>
                            {group.items.map((entry) => {
                              const idx = flatIndex++;
                              const isSelected = idx === selectedIndex;
                              const Icon = entry.icon;
                              const showSnippet = entry.snippet && entry.type !== "page" && entry.type !== "action";

                              return (
                                <button
                                  key={entry.id}
                                  data-selected={isSelected}
                                  className={`group flex w-full items-center gap-4 px-5 py-3 text-left transition-colors duration-75 ${isSelected ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                                    }`}
                                  onClick={() => handleSelect(entry)}
                                  onMouseEnter={() => setSelectedIndex(idx)}
                                  role="option"
                                  aria-selected={isSelected}
                                >
                                  <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-75 ${isSelected
                                        ? "bg-white/[0.10] text-white"
                                        : "bg-white/[0.04] text-white/40"
                                      }`}
                                  >
                                    <Icon className="h-[18px] w-[18px]" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    {/* Breadcrumb */}
                                    {entry.breadcrumb && (
                                      <p className="truncate text-[11px] text-white/20 mb-0.5">
                                        {entry.breadcrumb}
                                      </p>
                                    )}
                                    <p
                                      className={`truncate text-[15px] transition-colors duration-75 ${isSelected ? "text-white font-medium" : "text-white/70"
                                        }`}
                                    >
                                      {entry.label}
                                    </p>
                                    <p className="truncate text-[12px] text-white/25">
                                      {showSnippet ? entry.snippet : entry.description}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <div className="shrink-0 text-white/20">
                                      <CornerDownLeft className="h-3.5 w-3.5" />
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        ))}

                        {/* Footer hints */}
                        <div className="mt-1 flex items-center gap-4 border-t border-white/[0.04] px-5 py-2.5">
                          <span className="flex items-center gap-1.5 text-[11px] text-white/15">
                            <kbd className="rounded border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 text-[10px]">↑↓</kbd>
                            {t("globalSearch.navigate")}
                          </span>
                          <span className="flex items-center gap-1.5 text-[11px] text-white/15">
                            <kbd className="rounded border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 text-[10px]">↵</kbd>
                            {t("globalSearch.open")}
                          </span>
                          <span className="flex items-center gap-1.5 text-[11px] text-white/15">
                            <kbd className="rounded border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 text-[10px]">esc</kbd>
                            {t("globalSearch.close")}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
