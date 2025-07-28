import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '../../core/utils';

const Layout = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className={cn('flex-1', className)}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;