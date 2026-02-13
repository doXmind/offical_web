import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: "/", label: t('nav.home') },
    { path: "/about", label: t('nav.about') },
    { path: "/guide", label: t('nav.guide') },
    { path: "/changelog", label: t('nav.changelog') },
    { path: "/cookies-privacy", label: t('nav.privacy') },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-56 z-20 flex flex-col bg-background border-r border-white/[0.06] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Spacer for header */}
        <div className="h-14 shrink-0" />

        {/* Navigation */}
        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`block px-3 py-2.5 rounded-lg text-[15px] transition-colors duration-200 ${
                pathname === item.path
                  ? "bg-white/[0.08] text-white font-medium"
                  : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom CTA */}
        <div className="px-4 pb-6">
          <a
            href="https://beta.doxmind.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-white/[0.04] border border-white/[0.08] rounded-lg hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors"
          >
            {t('nav.logIn')}
          </a>
        </div>
      </aside>
    </>
  );
}
