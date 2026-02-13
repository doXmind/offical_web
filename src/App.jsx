import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { PanelLeft, Menu, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/layout/Sidebar';
import GlobalSearch from './components/search/GlobalSearch';
import Home from './pages/Home';
import About from './pages/About';
import Guide from './pages/Guide';
import CookiesPrivacy from './pages/CookiesPrivacy';
import Changelog from './pages/Changelog';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function Header({ sidebarOpen, onToggle, onSearchOpen }) {
  const { t } = useTranslation();

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
          <button
            onClick={onSearchOpen}
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t('nav.search')}
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline-block">{t('nav.search')}</span>
            <kbd className="hidden rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[11px] font-medium text-white/25 sm:inline-block">
              ⌘K
            </kbd>
          </button>
          <a
            href="https://beta.doxmind.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            {t('nav.logIn')}
          </a>
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
      <ScrollToTop />
      <Header sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onSearchOpen={openSearch} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <GlobalSearch open={searchOpen} onClose={closeSearch} />
      <div className={`transition-[margin] duration-300 ease-out ${sidebarOpen ? 'lg:ml-56' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/cookies-privacy" element={<CookiesPrivacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
