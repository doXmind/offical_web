import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from '../ui/CookieConsent';
import { cn } from '../../core/utils';

const Layout = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col light:bg-white light:text-gray-900 transition-colors duration-300">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Skip to main content
      </a>

      <Header />

      <main
        id="main-content"
        className={cn('flex-1', className)}
        tabIndex={-1}
      >
        {children}
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;