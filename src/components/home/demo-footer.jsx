import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CookiePreferences from "../ui/CookiePreferences";
import { getAppBase, getRegion, isCnRegion } from "../../config/region";
import { useRegion } from "../../contexts/RegionContext";

/* ── SVG icon components ── */

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.8187 2H13.8544L9.407 7.08308L14.639 14H10.5424L7.33377 9.80492L3.66239 14H1.62547L6.38239 8.56308L1.36331 2H5.56393L8.46424 5.83446L11.8187 2ZM11.1042 12.7815H12.2322L4.951 3.15446H3.74054L11.1042 12.7815Z" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.4695 2.67188C14.0722 2.85846 14.5459 3.4062 14.7073 4.10321C14.9988 5.36528 15 8.00004 15 8.00004C15 8.00004 15 10.6348 14.7073 11.8969C14.5459 12.5939 14.0722 13.1416 13.4695 13.3282C12.3782 13.6667 7.99998 13.6667 7.99998 13.6667C7.99998 13.6667 3.62183 13.6667 2.53045 13.3282C1.92773 13.1416 1.45407 12.5939 1.29272 11.8969C1 10.6348 1 8.00004 1 8.00004C1 8.00004 1 5.36528 1.29272 4.10321C1.45407 3.4062 1.92773 2.85846 2.53045 2.67188C3.62183 2.33337 7.99998 2.33337 7.99998 2.33337C7.99998 2.33337 12.3782 2.33337 13.4695 2.67188ZM10.3422 8.00025L6.5319 10.2V5.80048L10.3422 8.00025Z" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.1 2H2.9C2.66131 2 2.43239 2.09482 2.2636 2.2636C2.09482 2.43239 2 2.66131 2 2.9V13.1C2 13.3387 2.09482 13.5676 2.2636 13.7364C2.43239 13.9052 2.66131 14 2.9 14H13.1C13.3387 14 13.5676 13.9052 13.7364 13.7364C13.9052 13.5676 14 13.3387 14 13.1V2.9C14 2.66131 13.9052 2.43239 13.7364 2.2636C13.5676 2.09482 13.3387 2 13.1 2ZM5.6 12.2H3.8V6.8H5.6V12.2ZM4.7 5.75C4.49371 5.7441 4.29373 5.67755 4.12505 5.55865C3.95637 5.43974 3.82647 5.27377 3.75158 5.08147C3.67669 4.88916 3.66012 4.67905 3.70396 4.47738C3.7478 4.27572 3.8501 4.09144 3.99807 3.94758C4.14604 3.80372 4.33312 3.70666 4.53594 3.66852C4.73876 3.63038 4.94832 3.65285 5.13844 3.73313C5.32856 3.8134 5.49081 3.94793 5.60491 4.11989C5.71902 4.29185 5.77992 4.49363 5.78 4.7C5.77526 4.98221 5.659 5.25107 5.45663 5.44782C5.25426 5.64457 4.98223 5.75321 4.7 5.75ZM12.2 12.2H10.4V9.356C10.4 8.504 10.04 8.198 9.572 8.198C9.43479 8.20714 9.30073 8.24329 9.17753 8.30439C9.05433 8.36548 8.94441 8.45032 8.85409 8.55402C8.76377 8.65771 8.69483 8.77824 8.65123 8.90866C8.60762 9.03908 8.59021 9.17683 8.6 9.314C8.59702 9.34192 8.59702 9.37008 8.6 9.398V12.2H6.8V6.8H8.54V7.58C8.71552 7.313 8.95666 7.09554 9.24031 6.94846C9.52397 6.80138 9.84065 6.7296 10.16 6.74C11.09 6.74 12.176 7.256 12.176 8.936L12.2 12.2Z" fill="currentColor" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M7.99998 1.30048C11.6833 1.30048 14.6666 4.28381 14.6666 7.96714C14.6663 9.36398 14.2279 10.7255 13.4132 11.8602C12.5985 12.9948 11.4484 13.8454 10.125 14.2921C9.79165 14.3588 9.66665 14.1505 9.66665 13.9755C9.66665 13.7505 9.67498 13.0338 9.67498 12.1421C9.67498 11.5171 9.46665 11.1171 9.22498 10.9088C10.7083 10.7421 12.2666 10.1755 12.2666 7.61714C12.2666 6.88381 12.0083 6.29214 11.5833 5.82548C11.65 5.65881 11.8833 4.97548 11.5166 4.05881C11.5166 4.05881 10.9583 3.87548 9.68331 4.74214C9.14998 4.59214 8.58331 4.51714 8.01665 4.51714C7.44998 4.51714 6.88331 4.59214 6.34998 4.74214C5.07498 3.88381 4.51665 4.05881 4.51665 4.05881C4.14998 4.97548 4.38331 5.65881 4.44998 5.82548C4.02498 6.29214 3.76665 6.89214 3.76665 7.61714C3.76665 10.1671 5.31665 10.7421 6.79998 10.9088C6.60831 11.0755 6.43331 11.3671 6.37498 11.8005C5.99165 11.9755 5.03331 12.2588 4.43331 11.2505C4.30831 11.0505 3.93331 10.5588 3.40831 10.5671C2.84998 10.5755 3.18331 10.8838 3.41665 11.0088C3.69998 11.1671 4.02498 11.7588 4.09998 11.9505C4.23331 12.3255 4.66665 13.0421 6.34165 12.7338C6.34165 13.2921 6.34998 13.8171 6.34998 13.9755C6.34998 14.1505 6.22498 14.3505 5.89165 14.2921C4.56385 13.8502 3.40893 13.0013 2.59072 11.866C1.77252 10.7307 1.33258 9.36657 1.33331 7.96714C1.33331 4.28381 4.31665 1.30048 7.99998 1.30048Z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.44062C9.96875 1.44062 10.2031 1.44687 10.9844 1.48437C11.7094 1.51875 12.1031 1.64375 12.3656 1.74687C12.7094 1.88437 12.9563 2.04687 13.2156 2.30625C13.4781 2.56875 13.6375 2.8125 13.775 3.15625C13.8781 3.41875 14.0031 3.8125 14.0375 4.5375C14.075 5.31875 14.0813 5.55312 14.0813 7.52188C14.0813 9.49375 14.075 9.72812 14.0375 10.5063C14.0031 11.2313 13.8781 11.625 13.775 11.8875C13.6375 12.2313 13.475 12.4781 13.2156 12.7375C12.9531 13 12.7094 13.1594 12.3656 13.2969C12.1031 13.4 11.7094 13.525 10.9844 13.5594C10.2031 13.5969 9.96875 13.6031 8 13.6031C6.02812 13.6031 5.79375 13.5969 5.01563 13.5594C4.29063 13.525 3.89688 13.4 3.63438 13.2969C3.29063 13.1594 3.04375 12.9969 2.78438 12.7375C2.52188 12.475 2.3625 12.2313 2.225 11.8875C2.12187 11.625 1.99688 11.2313 1.9625 10.5063C1.925 9.725 1.91875 9.49063 1.91875 7.52188C1.91875 5.55 1.925 5.31562 1.9625 4.5375C1.99688 3.8125 2.12187 3.41875 2.225 3.15625C2.3625 2.8125 2.525 2.56562 2.78438 2.30625C3.04688 2.04375 3.29063 1.88437 3.63438 1.74687C3.89688 1.64375 4.29063 1.51875 5.01563 1.48437C5.79687 1.44687 6.03125 1.44062 8 1.44062ZM8 0C5.99687 0 5.74375 0.009375 4.95312 0.046875C4.16562 0.084375 3.625 0.215625 3.15312 0.403125C2.6625 0.596875 2.24688 0.85625 1.83437 1.26875C1.42187 1.68125 1.1625 2.09687 0.96875 2.58437C0.78125 3.05937 0.65 3.59687 0.6125 4.38437C0.575 5.17812 0.565625 5.43125 0.565625 7.43437C0.565625 9.4375 0.575 9.69063 0.6125 10.4813C0.65 11.2688 0.78125 11.8094 0.96875 12.2813C1.1625 12.7719 1.42187 13.1875 1.83437 13.6C2.24688 14.0125 2.6625 14.275 3.15 14.4656C3.625 14.6531 4.1625 14.7844 4.95 14.8219C5.74062 14.8594 5.99375 14.8688 7.99688 14.8688C10 14.8688 10.2531 14.8594 11.0437 14.8219C11.8313 14.7844 12.3719 14.6531 12.8438 14.4656C13.3313 14.275 13.7469 14.0125 14.1594 13.6C14.5719 13.1875 14.8344 12.7719 15.025 12.2844C15.2125 11.8094 15.3438 11.2719 15.3813 10.4844C15.4188 9.69375 15.4281 9.44062 15.4281 7.4375C15.4281 5.43437 15.4188 5.18125 15.3813 4.39063C15.3438 3.60313 15.2125 3.0625 15.025 2.59062C14.8406 2.09687 14.5813 1.68125 14.1688 1.26875C13.7563 0.85625 13.3406 0.59375 12.8531 0.403125C12.3781 0.215625 11.8406 0.084375 11.0531 0.046875C10.2563 0.009375 10.0031 0 8 0Z" fill="currentColor" />
      <path d="M8 3.61563C5.89062 3.61563 4.18124 5.325 4.18124 7.43438C4.18124 9.54375 5.89062 11.2531 8 11.2531C10.1094 11.2531 11.8187 9.54375 11.8187 7.43438C11.8187 5.325 10.1094 3.61563 8 3.61563ZM8 9.80938C6.6875 9.80938 5.625 8.74688 5.625 7.43438C5.625 6.12188 6.6875 5.05938 8 5.05938C9.3125 5.05938 10.375 6.12188 10.375 7.43438C10.375 8.74688 9.3125 9.80938 8 9.80938Z" fill="currentColor" />
      <path d="M11.9781 3.45625C11.9781 3.9875 11.5469 4.41562 11.0188 4.41562C10.4875 4.41562 10.0594 3.98438 10.0594 3.45625C10.0594 2.925 10.4906 2.49687 11.0188 2.49687C11.5469 2.49687 11.9781 2.92812 11.9781 3.45625Z" fill="currentColor" />
    </svg>
  );
}

/* ── Language data (6 supported languages) ── */

const languages = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文", sub: "Chinese" },
  { code: "fr", label: "Français", sub: "French" },
  { code: "ja", label: "日本語", sub: "Japanese" },
  { code: "ko", label: "한국어", sub: "Korean" },
  { code: "es", label: "Español", sub: "Spanish" },
];

const socialLinks = [
  { label: "X", href: "https://x.com/doxmindofficial", icon: XIcon },
  { label: "YouTube", href: "https://www.youtube.com/@doxmind-official", icon: YouTubeIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/doxmind/", icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com/doxmind/", icon: InstagramIcon },
  { label: "GitHub", href: "https://github.com/doXmind", icon: GitHubIcon },
];

/* ── Footer link renderer ── */

function FooterLink({ label, href, external, action }) {
  const navigate = useNavigate();

  if (action) {
    return (
      <button
        onClick={action}
        className="text-[14px] text-white/60 transition-colors duration-200 hover:text-white"
      >
        {label}
      </button>
    );
  }

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className="text-[14px] text-white/60 transition-colors duration-200 hover:text-white"
      >
        {label}
        {external && (
          <span className="ml-0.5 inline-block text-[10px] align-super opacity-60">{"\u2197"}</span>
        )}
      </a>
    );
  }

  if (href.includes("#")) {
    const [path, hash] = href.split("#");
    return (
      <button
        onClick={() => {
          navigate(path);
          requestAnimationFrame(() => {
            setTimeout(() => {
              const el = document.getElementById(hash);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          });
        }}
        className="text-[14px] text-white/60 transition-colors duration-200 hover:text-white"
      >
        {label}
      </button>
    );
  }

  return (
    <Link
      to={href}
      className="text-[14px] text-white/60 transition-colors duration-200 hover:text-white"
    >
      {label}
    </Link>
  );
}

/* ── Globe icon ── */

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ── Language selector (pull-up panel) ── */

function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const searchRef = useRef(null);

  const selected = i18n.language?.startsWith("en") ? "en" : i18n.language;
  const current = languages.find((l) => l.code === selected) || languages[0];

  const filtered = search
    ? languages.filter(
      (l) =>
        l.label.toLowerCase().includes(search.toLowerCase()) ||
        (l.sub && l.sub.toLowerCase().includes(search.toLowerCase())),
    )
    : languages;

  const handleSelect = useCallback((code) => {
    i18n.changeLanguage(code);
    setOpen(false);
    setSearch("");
  }, [i18n]);

  // Close on Escape or click outside
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setSearch("");
      }
    }
    function onClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Focus search when opened
  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Pull-up panel */}
      <div
        className={`absolute bottom-full right-0 mb-2 w-[280px] origin-bottom rounded-2xl border border-white/[0.08] bg-[#0c0f18] shadow-2xl transition-all duration-200 ${open
            ? "pointer-events-auto scale-100 opacity-100 translate-y-0"
            : "pointer-events-none scale-95 opacity-0 translate-y-2"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <h3 className="text-[14px] font-semibold text-white">
            {t('footer.languageSelector.selectLanguage')}
          </h3>
          <button
            onClick={() => {
              setOpen(false);
              setSearch("");
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-white/50 transition-colors hover:bg-white/[0.12] hover:text-white"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Language list */}
        <div className="max-h-[280px] overflow-y-auto px-2 pb-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {filtered.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.06] ${lang.code === selected ? "bg-white/[0.04]" : ""
                }`}
            >
              <p className="text-[14px] font-medium text-white">
                {lang.label}
                {lang.sub && (
                  <span className="ml-2 font-normal text-white/40">
                    {lang.sub}
                  </span>
                )}
              </p>
              {lang.code === selected && (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0c0f18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-white/30">
              {t('footer.languageSelector.noResults')}
            </p>
          )}
        </div>

        {/* Search bar at bottom */}
        <div className="border-t border-white/[0.06] px-3 py-2.5">
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-white/30">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              placeholder={t('footer.languageSelector.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Trigger button — pill style */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${open
            ? "border-white/15 bg-white/[0.08] text-white/70"
            : "border-white/[0.08] bg-white/[0.04] text-white/50 hover:border-white/15 hover:text-white/70"
          }`}
      >
        <GlobeIcon />
        <span className="font-medium text-white/70">{current?.label}</span>
        {current?.sub && <span className="hidden sm:inline">{current.sub}</span>}
      </button>
    </div>
  );
}

/* ── Region switcher ── */

function RegionSwitcher() {
  const { t } = useTranslation();
  const { switchRegion } = useRegion();
  const currentIsCn = isCnRegion();

  function handleSwitch() {
    switchRegion(currentIsCn ? 'global' : 'cn');
  }

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-white/50 transition-colors duration-200 hover:border-white/15 hover:text-white/70"
      title={currentIsCn ? t('region.switcher.global') : t('region.switcher.cn')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span className="font-medium text-white/70">
        {currentIsCn ? t('region.switcher.cn') : t('region.switcher.global')}
      </span>
    </button>
  );
}

/* ── Main footer component ── */

export function DemoFooter() {
  const { t } = useTranslation();
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  const footerColumns = [
    {
      title: t('footer.columns.product.title'),
      links: [
        { label: t('footer.columns.product.aiEditor'), href: "/guide#editor" },
        { label: t('footer.columns.product.aiChat'), href: "/guide#chat" },
        { label: t('footer.columns.product.knowledgeBase'), href: "/guide#knowledge-base" },
        { label: t('footer.columns.product.presentationMode'), href: "/guide#presentation" },
        { label: t('footer.columns.product.compare'), href: "/compare" },
        { label: t('footer.columns.product.download'), href: `${getAppBase()}/`, external: true },
      ],
    },
    {
      title: t('footer.columns.resources.title'),
      links: [
        { label: t('footer.columns.resources.guide'), href: "/guide" },
        { label: t('footer.columns.resources.helpCenter'), href: "/guide#getting-started" },
        { label: t('footer.columns.resources.changelog'), href: "/changelog" },
        { label: t('footer.columns.resources.getStarted'), href: `${getAppBase()}/`, external: true },
      ],
    },
    {
      title: t('footer.columns.company.title'),
      links: [
        { label: t('footer.columns.company.aboutUs'), href: "/about" },
        { label: t('footer.columns.company.careers'), href: "/careers" },
        { label: t('footer.columns.company.contactSales'), href: "mailto:sales@doxmind.com" },
      ],
    },
    {
      title: t('footer.columns.terms.title'),
      links: [
        { label: t('footer.columns.terms.termsOfUse'), href: "/cookies-privacy" },
        { label: t('footer.columns.terms.privacyPolicy'), href: "/cookies-privacy" },
        { label: t('footer.columns.terms.cookieSettings'), action: () => setCookieModalOpen(true) },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0d14]">
      {/* Link columns */}
      <div className="mx-auto max-w-[1200px] px-8 pb-16 pt-20 sm:px-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
          {footerColumns.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-[13px] font-medium text-white/30">
                {group.title}
              </h3>
              <ul className="space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-8 py-8 sm:flex-row sm:justify-between sm:gap-4 sm:px-12 sm:py-5">
          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 transition-colors duration-200 hover:text-white/70"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Copyright + Manage Cookies */}
          <div className="flex items-center gap-2 text-[13px] text-white/25">
            <span>
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </span>
            <button
              onClick={() => setCookieModalOpen(true)}
              className="text-white/40 underline decoration-white/15 underline-offset-2 transition-colors duration-200 hover:text-white/70"
            >
              {t('footer.manageCookies')}
            </button>
          </div>

          {/* Region + Language selectors */}
          <div className="flex items-center gap-3">
            <RegionSwitcher />
            <LanguageSelector />
          </div>
        </div>
      </div>
      <CookiePreferences open={cookieModalOpen} onClose={() => setCookieModalOpen(false)} />
    </footer>
  );
}
