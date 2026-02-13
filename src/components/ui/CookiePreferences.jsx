import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const COOKIE_PREFS_KEY = "doxmind_cookie_preferences";

function getStoredPrefs() {
  try {
    const raw = localStorage.getItem(COOKIE_PREFS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { analytics: true, marketing: true };
}

function storePrefs(prefs) {
  localStorage.setItem(
    COOKIE_PREFS_KEY,
    JSON.stringify({ ...prefs, timestamp: new Date().toISOString() }),
  );
}

/* ── Toggle switch ── */

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
        disabled
          ? "cursor-not-allowed bg-white/20"
          : checked
            ? "cursor-pointer bg-white"
            : "cursor-pointer bg-white/20"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full transition-transform duration-200 ${
          disabled
            ? "translate-x-[1.375rem] bg-white/60"
            : checked
              ? "translate-x-[1.375rem] bg-black"
              : "translate-x-1 bg-white/60"
        }`}
      />
    </button>
  );
}

/* ── Cookie category row ── */

function CookieCategory({ title, description, checked, onChange, disabled }) {
  return (
    <div className="py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className={`text-[15px] font-semibold ${disabled ? "text-white/50" : "text-white"}`}>
            {title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/40">
            {description}
          </p>
        </div>
        <div className="shrink-0 pt-0.5">
          <Toggle checked={checked} onChange={onChange} disabled={disabled} />
        </div>
      </div>
    </div>
  );
}

/* ── Main modal ── */

export default function CookiePreferences({ open, onClose }) {
  const { t } = useTranslation();
  const [prefs, setPrefs] = useState(getStoredPrefs);

  // Sync from localStorage when opening
  useEffect(() => {
    if (open) setPrefs(getStoredPrefs());
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleDone = useCallback(() => {
    storePrefs(prefs);
    onClose();
  }, [prefs, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDone}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c0f18] border border-white/[0.08] shadow-2xl">
        <div className="px-7 pt-8 pb-7">
          {/* Title */}
          <h2 className="text-[22px] font-bold text-white leading-tight">
            {t("cookiePreferences.title")}
          </h2>

          {/* Description */}
          <p className="mt-4 text-[13px] leading-relaxed text-white/50">
            {t("cookiePreferences.description")}{" "}
            <Link
              to="/cookies-privacy"
              onClick={onClose}
              className="text-white/60 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/80"
            >
              {t("cookiePreferences.learnMore")}
            </Link>
          </p>

          {/* Cookie categories */}
          <div className="mt-5 divide-y divide-white/[0.06]">
            <CookieCategory
              title={t("cookiePreferences.necessary.title")}
              description={t("cookiePreferences.necessary.description")}
              checked={true}
              onChange={() => {}}
              disabled
            />
            <CookieCategory
              title={t("cookiePreferences.analytics.title")}
              description={t("cookiePreferences.analytics.description")}
              checked={prefs.analytics}
              onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
            />
            <CookieCategory
              title={t("cookiePreferences.marketing.title")}
              description={t("cookiePreferences.marketing.description")}
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
            />
          </div>

          {/* Done button */}
          <button
            onClick={handleDone}
            className="mt-6 w-full rounded-full bg-white py-3.5 text-[15px] font-semibold text-black transition-colors hover:bg-white/90"
          >
            {t("cookiePreferences.done")}
          </button>
        </div>
      </div>
    </div>
  );
}
