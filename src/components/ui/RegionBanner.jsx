import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { getRegion, detectCountry } from '../../config/region';
import { useRegion } from '../../contexts/RegionContext';

const DISMISSED_KEY = 'doxmind_region_banner_dismissed';

export default function RegionBanner() {
  const { t } = useTranslation();
  const { switchRegion } = useRegion();
  const [show, setShow] = useState(false);
  const [suggestedRegion, setSuggestedRegion] = useState(null);

  useEffect(() => {
    if (import.meta.env.DEV) return;

    try {
      if (localStorage.getItem(DISMISSED_KEY)) return;
    } catch { return; }

    detectCountry().then((country) => {
      if (!country) return;
      const region = getRegion();
      const isCn = country === 'CN';

      if (region.id === 'global' && isCn) {
        setSuggestedRegion('cn');
        setShow(true);
      } else if (region.id === 'cn' && !isCn) {
        setSuggestedRegion('global');
        setShow(true);
      }
    });
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(DISMISSED_KEY, 'true');
    } catch { /* ignore */ }
    setShow(false);
  }

  function handleSwitch() {
    dismiss();
    switchRegion(suggestedRegion);
  }

  if (!show) return null;

  const message = suggestedRegion === 'cn'
    ? t('region.banner.suggestCn')
    : t('region.banner.suggestGlobal');

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#0c0f18]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-2.5 sm:px-8">
        <p className="text-[13px] text-white/60">{message}</p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleSwitch}
            className="rounded-md bg-white/[0.08] px-3 py-1 text-[12px] font-medium text-white/80 transition-colors hover:bg-white/[0.14] hover:text-white"
          >
            {t('region.banner.switch')}
          </button>
          <button
            onClick={dismiss}
            className="flex h-6 w-6 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60"
            aria-label={t('region.banner.dismiss')}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
