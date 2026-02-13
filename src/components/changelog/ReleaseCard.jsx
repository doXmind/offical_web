import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate } from "../../data/changelog";

export function ReleaseCard({ release, index }) {
  const { t, i18n } = useTranslation('changelog');
  const vKey = `v${release.version.replace('.', '_')}`;

  return (
    <motion.article
      id={`release-${release.version}`}
      className="group relative scroll-mt-28"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      {/* Timeline connector dot (desktop) */}
      <div className="absolute -left-[41px] top-8 hidden h-4 w-4 items-center justify-center md:flex">
        <div className="h-2.5 w-2.5 rounded-full border-2 border-white/20 bg-background transition-colors group-hover:border-white/40" />
      </div>

      {/* Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        {/* Header row */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-sm font-semibold text-foreground">
            <Tag className="h-3.5 w-3.5 text-muted-foreground" />
            v{release.version}
          </span>

          <time
            dateTime={release.date}
            className="text-sm text-muted-foreground"
          >
            {formatDate(release.date, i18n.language)}
          </time>

          {release.highlight && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {t('majorRelease')}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold tracking-tight sm:text-2xl">
          {t(`releases.${vKey}.title`)}
        </h3>

        {/* Summary */}
        <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground">
          {t(`releases.${vKey}.summary`)}
        </p>

        {/* Change categories */}
        <div className="space-y-5">
          {release.categories.map((category) => {
            const items = t(`releases.${vKey}.${category}`, { returnObjects: true });
            if (!Array.isArray(items)) return null;
            return (
              <div key={category}>
                <div className="mb-2.5">
                  <CategoryBadge category={category} />
                </div>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
