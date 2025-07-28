import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { companyInfo } from '../../core/constants';
import { navigationData, simpleNavItems, ctaButtons } from '../../constants/navigation';
import { cn } from '../../core/utils';
import Button from '../ui/Button';
import MegaMenu from '../navigation/MegaMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      if (currentY > prevScrollY.current && currentY > 100) {
        setHideHeader(true);
      } else if (currentY < prevScrollY.current) {
        setHideHeader(false);
      }

      prevScrollY.current = currentY;
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
        'fixed top-0 left-0 right-0 z-50 transform transition-all duration-300',
        isScrolled ? 'bg-black/90 backdrop-blur-primary' : 'bg-transparent',
        hideHeader ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="w-full px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-semibold">{companyInfo.name}</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end flex-1 gap-8">
            {/* Mega Menu Navigation */}
            <div className="flex items-center gap-1">
              {Object.entries(navigationData).map(([key, data]) => (
                <MegaMenu key={key} data={data} isScrolled={isScrolled} />
              ))}
              
              {/* Simple Navigation Items */}
              {simpleNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 ml-8">
              {ctaButtons.map((button) => (
                <Button
                  key={button.label}
                  variant={button.variant}
                  size="sm"
                  href={button.href}
                >
                  {button.label}
                </Button>
              ))}
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
          {/* Mobile Dropdown Sections */}
          {Object.entries(navigationData).map(([key, data]) => (
            <div key={key} className="py-2">
              <h3 className="px-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {data.label}
              </h3>
              <div className="mt-2 space-y-1">
                {data.sections.map((section, idx) => (
                  <div key={idx}>
                    {section.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-6 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="border-t border-gray-800 my-4"></div>
          
          {/* Mobile Simple Nav Items */}
          {simpleNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          
          <div className="pt-4">
            {ctaButtons.map((button) => (
              <Button
                key={button.label}
                variant={button.variant}
                size="sm"
                className="w-full mb-2"
                href={button.href}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;