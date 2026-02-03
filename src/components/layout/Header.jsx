import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ExternalLink, BookOpen, ChevronDown } from 'lucide-react';
import { companyInfo } from '../../core/constants';
import { navigationData, simpleNavItems, ctaButtons } from '../../constants/navigation';
import { cn } from '../../core/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [borderOpacity, setBorderOpacity] = useState(0);
  const prevScrollY = useRef(0);
  const closeTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownHeight, setDropdownHeight] = useState('auto');
  const contentRefs = useRef({});

  // Ref for the root <nav> element so we can measure its size
  const headerRef = useRef(null);

  // Icon mapping for featured sections
  const iconMap = {
    'learn': BookOpen
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      // Calculate border opacity based on scroll
      // 0-50px: 0 opacity
      // 50-150px: 0 to 0.1 opacity
      // 150px+: 0.1 opacity
      let opacity = 0;
      if (currentY > 50) {
        opacity = Math.min((currentY - 50) / 100 * 0.1, 0.1);
      }
      setBorderOpacity(opacity);

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

  // Handle menu interactions
  const handleMenuEnter = (menuKey) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // If switching between menus, do it immediately
    if (isDropdownOpen && activeMenu !== menuKey) {
      setActiveMenu(menuKey);
    } else if (!isDropdownOpen) {
      // Opening for the first time - small delay for smoothness
      setIsDropdownOpen(true);
      setTimeout(() => {
        setActiveMenu(menuKey);
      }, 10);
    }
  };

  const handleMenuLeave = () => {
    // Delay closing to allow mouse to move between elements
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setActiveMenu(null);
    }, 200);
  };

  const handleDropdownEnter = () => {
    // Cancel close when entering dropdown
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleDropdownLeave = () => {
    // Close dropdown when leaving
    handleMenuLeave();
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Calculate dropdown height based on active menu
  useEffect(() => {
    if (activeMenu && contentRefs.current[activeMenu]) {
      const contentHeight = contentRefs.current[activeMenu].scrollHeight;
      setDropdownHeight(`${contentHeight}px`);
    }
  }, [activeMenu]);

  // ------------------------------------------------------------
  // Keep the global CSS variable --header-height up-to-date so
  // other components (e.g. Features page) can react to header
  // show/hide and size changes without bespoke JS calculations.
  // ------------------------------------------------------------
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateCssVar = () => {
      const height = header.classList.contains('-translate-y-full')
        ? 0
        : header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    };

    // Initial set
    updateCssVar();

    // Observe size changes
    const resizeObserver = new ResizeObserver(updateCssVar);
    resizeObserver.observe(header);

    // Also update when hide/show state changes
    const mutationObserver = new MutationObserver(updateCssVar);
    mutationObserver.observe(header, { attributes: true, attributeFilter: ['class', 'style'] });

    // Fallback in case of scroll-induced transforms we didn't capture
    window.addEventListener('scroll', updateCssVar, { passive: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', updateCssVar);
    };
  }, [hideHeader]);

  return (
    <nav
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 border-b',
        isScrolled || isDropdownOpen
          ? 'bg-black/80 backdrop-blur-xl'
          : 'bg-transparent',
        hideHeader ? '-translate-y-full' : 'translate-y-0'
      )}
      style={{
        borderBottomColor: isDropdownOpen
          ? 'rgba(255, 255, 255, 0.08)'
          : `rgba(255, 255, 255, ${borderOpacity})`
      }}
    >
      <div className="w-full px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="doXmind Logo"
                className="h-8 w-8"
              />
              <span className="text-xl tracking-tight">
                <span className="font-light">do</span>
                <span className="font-black">X</span>
                <span className="font-light">mind</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end flex-1">
            {/* Simple Navigation Items */}
            <div className="flex items-center gap-1">
              {simpleNavItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                )
              ))}
              
              {/* Mega Menu Navigation */}
              {Object.entries(navigationData).map(([key, data]) => (
                <div
                  key={key}
                  onMouseEnter={() => handleMenuEnter(key)}
                  onMouseLeave={handleMenuLeave}
                >
                  <button
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1",
                      activeMenu === key ? "text-white" : "text-gray-300 hover:text-white"
                    )}
                    aria-expanded={activeMenu === key}
                    aria-haspopup="true"
                  >
                    {data.label}
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeMenu === key ? "rotate-180" : ""
                    )} />
                  </button>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 ml-12">
              {ctaButtons.map((button) => (
                button.external ? (
                  <a
                    key={button.label}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "px-5 py-2 text-sm font-medium rounded-full transition-all duration-200",
                      button.variant === 'primary'
                        ? "bg-white/[0.04] border border-white/[0.12] text-white hover:bg-white/[0.08] hover:border-white/20"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {button.label}
                  </a>
                ) : (
                  <Link
                    key={button.label}
                    to={button.href}
                    className={cn(
                      "px-5 py-2 text-sm font-medium rounded-full transition-all duration-200",
                      button.variant === 'primary'
                        ? "bg-white/[0.04] border border-white/[0.12] text-white hover:bg-white/[0.08] hover:border-white/20"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {button.label}
                  </Link>
                )
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
          'md:hidden backdrop-blur-primary transition-all duration-300 overflow-hidden bg-black/95',
          isMobileMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {/* Mobile Simple Nav Items */}
          {simpleNavItems.map((item) => (
            item.href.startsWith('/') ? (
              <Link
                key={item.label}
                to={item.href}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          ))}
          
          <div className="border-t border-gray-800 my-4"></div>
          
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
          
          <div className="pt-4">
            {ctaButtons.map((button) => (
              button.external ? (
                <a
                  key={button.label}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block w-full px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 text-center mb-2",
                    button.variant === 'primary'
                      ? "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 hover:border-white/30"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  {button.label}
                </a>
              ) : (
                <Link
                  key={button.label}
                  to={button.href}
                  className={cn(
                    "block w-full px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 text-center mb-2",
                    button.variant === 'primary'
                      ? "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 hover:border-white/30"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  {button.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Unified Mega Menu Dropdown Container */}
      <div
        className={cn(
          "fixed left-0 right-0 top-16 transition-all duration-300 overflow-hidden",
          isDropdownOpen ? "visible" : "invisible"
        )}
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleDropdownLeave}
        ref={dropdownRef}
      >
        <div
          className={cn(
            "transition-all duration-300 transform bg-black",
            isDropdownOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          )}
          style={{
            boxShadow: isDropdownOpen
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
              : 'none'
          }}
        >
          <div 
            className="relative overflow-hidden transition-all duration-300"
            style={{ height: isDropdownOpen ? dropdownHeight : '0px' }}
          >
            {Object.entries(navigationData).map(([key, data]) => (
              <div
                key={key}
                ref={el => contentRefs.current[key] = el}
                className={cn(
                  "transition-all duration-300",
                  activeMenu === key ? "opacity-100 relative" : "opacity-0 pointer-events-none absolute inset-0"
                )}
              >
                <div className="max-w-7xl mx-auto px-8 py-8">
                  <div className="grid grid-cols-3 gap-12">
                    {data.sections.map((section, idx) => (
                      <div 
                        key={idx}
                        className={cn(
                          "transition-all duration-300",
                          activeMenu === key ? "opacity-100" : "opacity-0"
                        )}
                        style={{
                          transitionDelay: activeMenu === key ? `${idx * 50}ms` : '0ms'
                        }}
                      >
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                          {section.title}
                        </h3>
                        <ul className="space-y-3">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <a
                                href={item.href}
                                className="block text-sm text-gray-300 hover:text-white transition-colors duration-150 group"
                              >
                                <span className="flex items-center gap-2">
                                  {item.label}
                                  {item.external && (
                                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                  )}
                                </span>
                                {item.description && (
                                  <span className="text-xs text-gray-500 mt-1 block">
                                    {item.description}
                                  </span>
                                )}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Featured Section */}
                    {data.featured && (
                      <div 
                        className={cn(
                          "col-span-1 transition-all duration-300",
                          activeMenu === key ? "opacity-100" : "opacity-0"
                        )}
                        style={{
                          transitionDelay: activeMenu === key ? `${data.sections.length * 50}ms` : '0ms'
                        }}
                      >
                        <div className="h-full">
                          <a
                            href={data.featured.href}
                            className="block h-full rounded-lg p-6 bg-gray-800 hover:bg-gray-700 transition-all duration-200 group"
                          >
                            <div className="flex flex-col h-full">
                              <div className="inline-flex p-3 rounded-lg bg-white/10 self-start mb-4 text-white">
                                {iconMap[key] && React.createElement(iconMap[key], { className: "w-6 h-6" })}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                  {data.featured.title}
                                </p>
                                <p className="text-base font-medium text-white mb-2 group-hover:text-gray-300 transition-colors">
                                  {data.featured.subtitle}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {data.featured.description}
                                </p>
                              </div>
                              <div className="mt-auto pt-4">
                                <span className="text-sm text-white font-medium group-hover:text-gray-300">
                                  Learn more →
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;