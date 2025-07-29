import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Sparkles, Code2, BookOpen } from 'lucide-react';

const MegaMenu = ({ data, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);

  // Icon mapping for featured sections
  const iconMap = {
    'Features': Sparkles,
    'Developers': Code2,
    'Resources': BookOpen
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Small delay to prevent flickering
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <button
        className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {data.label}
      </button>

      {/* Mega Menu Content - Full width dropdown */}
      <div
        className={`fixed left-0 right-0 top-16 w-full transition-all duration-300 ease-out ${
          isOpen 
            ? 'opacity-100 visible z-40' 
            : 'opacity-0 invisible -z-10'
        }`}
      >
        <div 
          className={`${
            isScrolled 
              ? 'bg-black/95 backdrop-blur-sm' 
              : 'bg-black'
          }`}
          style={{
            clipPath: isOpen 
              ? 'inset(0 0 0 0)' 
              : 'inset(0 0 100% 0)',
            transition: 'clip-path 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="grid grid-cols-3 gap-12">
              {data.sections.map((section, idx) => (
                <div 
                  key={idx}
                  className={`transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${idx * 50}ms`
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
                          className="block text-sm text-gray-300 hover:text-primary transition-colors duration-150 group"
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
                  className={`col-span-1 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${data.sections.length * 50}ms`
                  }}
                >
                  <div className="h-full">
                    <a
                      href={data.featured.href}
                      className="block h-full rounded-lg p-6 bg-gray-800 hover:bg-gray-700 transition-all duration-200 group"
                    >
                      <div className="flex flex-col h-full">
                        <div className="inline-flex p-3 rounded-lg bg-primary/10 self-start mb-4 text-primary">
                          {iconMap[data.label] && (
                            <>{React.createElement(iconMap[data.label], { className: "w-6 h-6" })}</>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            {data.featured.title}
                          </p>
                          <p className="text-base font-medium text-white mb-2 group-hover:text-primary transition-colors">
                            {data.featured.subtitle}
                          </p>
                          <p className="text-sm text-gray-400">
                            {data.featured.description}
                          </p>
                        </div>
                        <div className="mt-auto pt-4">
                          <span className="text-sm text-primary font-medium group-hover:text-primary-dark">
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
      </div>
    </div>
  );
};

export default MegaMenu;