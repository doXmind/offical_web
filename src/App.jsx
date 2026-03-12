import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { PanelLeft, Menu, Search, LayoutDashboard, LogOut, ExternalLink, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/layout/Sidebar';
import GlobalSearch from './components/search/GlobalSearch';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BillingProvider } from './contexts/BillingContext';
import { RegionProvider, useRegion } from './contexts/RegionContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { getAccessToken } from './api/client';
import { getAppBase, isCnRegion } from './config/region';
import RegionBanner from './components/ui/RegionBanner';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Guide = lazy(() => import('./pages/Guide'));
const Team = lazy(() => import('./pages/Team'));
const CookiesPrivacy = lazy(() => import('./pages/CookiesPrivacy'));
const Changelog = lazy(() => import('./pages/Changelog'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Careers = lazy(() => import('./pages/Careers'));
const Compare = lazy(() => import('./pages/Compare'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function UserMenu() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const initial = (user?.username || user?.email || '?')[0].toUpperCase();

  async function handleLogout() {
    setOpen(false);
    await logout();
    navigate('/');
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.06]"
      >
        {user?.avatar_url ? (
          <img src={user.avatar_url} alt="" className="w-7 h-7 rounded-full object-cover border border-white/10" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-xs font-semibold text-white/60">
            {initial}
          </div>
        )}
        <ChevronDown className={`w-3 h-3 text-white/30 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/[0.08] bg-[#141519] shadow-xl py-1.5 z-50">
          <div className="px-3.5 py-2.5 border-b border-white/[0.06]">
            <p className="text-sm font-medium text-white truncate">{user?.username || user?.email}</p>
            <p className="text-xs text-white/30 truncate">{user?.email}</p>
          </div>

          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            {t('nav.dashboard')}
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              const token = getAccessToken();
              const url = token
                ? `${getAppBase()}/auth/callback?token=${encodeURIComponent(token)}`
                : `${getAppBase()}/`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {t('nav.openEditor', 'Open Editor')}
          </button>

          <div className="border-t border-white/[0.06] mt-1 pt-1">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t('nav.logOut')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HeaderRegionSwitcher() {
  const { t } = useTranslation();
  const { switchRegion } = useRegion();
  const currentIsCn = isCnRegion();

  return (
    <button
      onClick={() => switchRegion(currentIsCn ? 'global' : 'cn')}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70"
      title={currentIsCn ? t('region.switcher.global') : t('region.switcher.cn')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span className="font-medium">{currentIsCn ? t('region.switcher.cn') : t('region.switcher.global')}</span>
    </button>
  );
}

function Header({ sidebarOpen, onToggle, onSearchOpen }) {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-30 border-b border-white/10">
      <div className="flex items-center justify-between h-full px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="text-2xl tracking-tight text-foreground">
            <span className="font-light">do</span>
            <span className="font-black">X</span>
            <span className="font-light">mind</span>
          </Link>
          <button
            onClick={onToggle}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <PanelLeft className="w-[18px] h-[18px]" />
          </button>
        </div>
        <div className="flex items-center gap-5">
          <HeaderRegionSwitcher />
          <button
            onClick={onSearchOpen}
            className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t('nav.search')}
          >
            <Search className="h-4 w-4" />
          </button>
          {!isLoading && (
            isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                {t('nav.logIn')}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Global Ctrl/Cmd+K shortcut
  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Router>
      <RegionProvider>
        <AuthProvider>
          <BillingProvider>
            <ScrollToTop />
            <RegionBanner />
            <Header sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onSearchOpen={openSearch} />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <GlobalSearch open={searchOpen} onClose={closeSearch} />
            <div className={`transition-[margin] duration-300 ease-out ${sidebarOpen ? 'lg:ml-56' : ''}`}>
              <Suspense fallback={<div className="min-h-screen" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/guide" element={<Guide />} />
                  <Route path="/changelog" element={<Changelog />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/cookies-privacy" element={<CookiesPrivacy />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/auth/callback" element={<Login />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </BillingProvider>
        </AuthProvider>
      </RegionProvider>
    </Router>
  );
}

export default App;
