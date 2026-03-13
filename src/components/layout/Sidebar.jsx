import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { path: "/", label: t('nav.home') },
    { path: "/about", label: t('nav.about') },
    { path: "/team", label: t('nav.team') },
    { path: "/careers", label: t('nav.careers') },
    { path: "/compare", label: t('nav.compare') },
    { path: "/pricing", label: t('nav.pricing') },
    { path: "/guide", label: t('nav.guide') },
    { path: "/changelog", label: t('nav.changelog') },
    ...(isAuthenticated ? [{ path: "/dashboard", label: t('nav.dashboard') }] : []),
    { path: "/cookies-privacy", label: t('nav.privacy') },
  ];

  async function handleLogout() {
    onClose();
    await logout();
    navigate('/');
  }

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
        className={`fixed left-0 top-0 bottom-0 w-56 z-20 flex flex-col bg-background border-r border-white/[0.06] transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"
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
              className={`block px-3 py-2.5 rounded-lg text-[15px] transition-colors duration-200 ${pathname === item.path
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
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 px-3 py-2">
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover border border-white/10" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-[10px] font-semibold text-white/60">
                    {(user?.username || user?.email || '?')[0].toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-white/50 truncate flex-1">
                  {user?.username || user?.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white/60 bg-white/[0.04] border border-white/[0.08] rounded-lg hover:bg-white/[0.08] hover:text-white hover:border-white/[0.12] transition-colors"
              >
                {t('nav.logOut')}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-white/[0.04] border border-white/[0.08] rounded-lg hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors"
            >
              {t('nav.logIn')}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
