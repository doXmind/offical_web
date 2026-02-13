import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";
import { Plus, TrendingUp, Bug } from "lucide-react";

const categoryConfig = {
  added: {
    icon: Plus,
    containerClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  improved: {
    icon: TrendingUp,
    containerClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  fixed: {
    icon: Bug,
    containerClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
};

export function CategoryBadge({ category }) {
  const { t } = useTranslation('changelog');
  const config = categoryConfig[category];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.containerClass,
      )}
    >
      <Icon className="h-3 w-3" />
      {t(`categories.${category}`)}
    </span>
  );
}
