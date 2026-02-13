import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";

export function MockSidebar() {
  const { t } = useTranslation('mock');

  const outlineItems = [
    { level: 1, key: "item1", active: true },
    { level: 2, key: "item2", active: false },
    { level: 2, key: "item3", active: false },
    { level: 2, key: "item4", active: false },
    { level: 1, key: "item5", active: false },
    { level: 2, key: "item6", active: false },
  ];

  return (
    <div
      className="flex h-full w-[160px] shrink-0 flex-col"
      style={{
        background: "rgba(255,255,255,0.015)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center justify-between px-3.5 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
          {t('sidebar.outline')}
        </span>
      </div>
      <div className="px-2 py-1">
        {outlineItems.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
              item.active && "bg-white/[0.06]"
            )}
            style={{ paddingLeft: item.level === 2 ? 24 : 8 }}
          >
            <div
              className={cn(
                "shrink-0 rounded-full",
                item.level === 1 ? "h-2 w-2" : "h-1.5 w-1.5",
                item.active ? "bg-blue-400" : "bg-white/20"
              )}
            />
            <span
              className={cn(
                "truncate text-[11px] leading-tight",
                item.level === 1 ? "font-medium" : "font-normal",
                item.active ? "text-white/90" : "text-white/35"
              )}
            >
              {t(`sidebar.${item.key}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
