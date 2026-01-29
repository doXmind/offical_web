import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from '../ui/CookieConsent';
import { cn } from '../../core/utils';

const Layout = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className={cn('flex-1', className)}>
        {children}
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;