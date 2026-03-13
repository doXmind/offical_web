import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { History, ChevronDown, ChevronRight, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/seo/SEO";
import { getAppBase } from "../config/region";
import { ChevronGrid } from "../components/home/chevron-grid";
import { DemoFooter } from "../components/home/demo-footer";
import { ReleaseCard } from "../components/changelog/ReleaseCard";
import { releases, groupByYear } from "../data/changelog";
import { cn } from "../utils/cn";

/* ── Scroll-reveal helper (same as About.jsx) ── */

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

/* ── Active version detection via IntersectionObserver ── */

function useActiveVersion(versions) {
  const [activeVersion, setActiveVersion] = useState("");

  useEffect(() => {
    const ids = versions.map((v) => `release-${v.version}`);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveVersion(id.replace("release-", ""));
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

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
  }, [versions]);

  return activeVersion;
}

/* ── Version navigation (desktop sidebar + mobile dropdown) ── */

function VersionNav({ versions, activeVersion }) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation('changelog');

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav
        className="fixed right-8 top-24 hidden w-44 xl:block"
        aria-label="Version navigation"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('versions')}
        </p>
        <ul className="space-y-1">
          {versions.map((v) => (
            <li key={v.version}>
              <a
                href={`#release-${v.version}`}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors",
                  activeVersion === v.version
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Tag className="h-3 w-3 shrink-0" />
                v{v.version}
                <span className="ml-auto text-[10px] text-muted-foreground/60">
                  {new Date(v.date).toLocaleDateString(i18n.language, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible dropdown */}
      <div className="sticky top-14 z-20 mb-8 border-b border-border bg-background/80 backdrop-blur-sm xl:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <History className="h-4 w-4" />
            {activeVersion ? `v${activeVersion}` : t('allVersions')}
          </span>
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {open && (
          <ul className="max-h-60 overflow-y-auto border-t border-border px-4 pb-3 pt-2">
            {versions.map((v) => (
              <li key={v.version}>
                <a
                  href={`#release-${v.version}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                    activeVersion === v.version
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Tag className="h-3 w-3 shrink-0" />
                  v{v.version}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Changelog Page
   ═══════════════════════════════════════════════════════════ */

export default function Changelog() {
  const grouped = useMemo(() => groupByYear(releases), []);
  const activeVersion = useActiveVersion(releases);
  const { t } = useTranslation('changelog');

  return (
    <div className="min-h-screen bg-background">
      <SEO path="/changelog" />

      {/* Version navigation */}
      <VersionNav versions={releases} activeVersion={activeVersion} />

      {/* ─── Hero Section ─── */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-6">
        {/* Ambient gradient blobs */}
        <div className="pointer-events-none absolute inset-0">
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
          className="relative z-10 mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Heading */}
          <h1 className="fluid-hero font-bold tracking-tight text-gradient">
            {t('heading')}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ─── Timeline / Release Cards ─── */}
      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-4xl xl:pr-56">
          {/* Timeline container with vertical line */}
          <div className="relative md:pl-10">
            {/* Vertical timeline line (desktop only) */}
            <div className="absolute bottom-0 left-0 top-0 hidden w-px md:block">
              <div className="h-full w-full bg-gradient-to-b from-white/0 via-white/10 to-white/0" />
            </div>

            {/* Releases grouped by year */}
            {grouped.map(([year, yearReleases]) => (
              <div key={year} className="mb-16 last:mb-0">
                {/* Year heading */}
                <Reveal>
                  <div className="relative mb-8">
                    {/* Year dot on timeline (desktop) */}
                    <div className="absolute -left-[44px] top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center md:flex">
                      <div className="h-3 w-3 rounded-full bg-white/20" />
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      {year}
                    </h2>
                  </div>
                </Reveal>

                {/* Release cards for this year */}
                <div className="space-y-6">
                  {yearReleases.map((release, i) => (
                    <ReleaseCard
                      key={release.version}
                      release={release}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative overflow-hidden px-4 pb-36 pt-48 text-center lg:pb-44 lg:pt-60">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-[600px] w-[700px] rounded-full bg-blue-600/[0.12] blur-[120px]" />
          <div className="absolute -right-10 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
        </div>

        <ChevronGrid />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {t('cta.heading')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            {t('cta.description')}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`${getAppBase()}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              {t('cta.getStarted')}
            </a>
            <Link
              to="/guide"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-8 py-3 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              {t('cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <DemoFooter />
    </div>
  );
}
