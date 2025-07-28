import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks, companyInfo } from '../../core/constants';
import { cn } from '../../core/utils';
import Button from '../ui/Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-black/90 backdrop-blur-primary'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-semibold">{companyInfo.name}</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Main Navigation */}
            <div className="flex items-center space-x-6">
              {navLinks.main.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Secondary Navigation */}
            <div className="flex items-center space-x-4">
              <a
                href={navLinks.secondary[0].href}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                {navLinks.secondary[0].name}
              </a>
              <Button variant="primary" size="sm">
                Try DocMindLLM
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden bg-black/95 backdrop-blur-primary transition-all duration-300 overflow-hidden',
          isMobileMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.main.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          
          <div className="border-t border-gray-800 my-4"></div>
          
          <a
            href={navLinks.secondary[0].href}
            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {navLinks.secondary[0].name}
          </a>
          
          <div className="pt-4">
            <Button variant="primary" size="sm" className="w-full">
              Try DocMindLLM
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;