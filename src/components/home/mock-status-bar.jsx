import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MockStatusBar() {
  const { t } = useTranslation('mock');

  return (
    <div
      className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] text-white/20"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <Check className="h-3 w-3 text-green-400/50" />
      <span className="text-green-400/50">{t('status.saved')}</span>
      <span className="mx-1 text-white/10">&middot;</span>
      <span>{t('status.words')}</span>
      <span className="mx-1 text-white/10">&middot;</span>
      <span>{t('status.characters')}</span>
      <span className="mx-1 text-white/10">&middot;</span>
      <span>{t('status.readTime')}</span>
    </div>
  );
}
