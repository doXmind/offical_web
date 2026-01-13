import React from 'react';
import { footerLinks, companyInfo } from '../../core/constants';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/logo-light.svg"
                alt="doXmind Logo"
                className="h-8 w-8"
              />
              <span className="text-xl tracking-tight text-black">
                <span className="font-light">do</span>
                <span className="font-black">X</span>
                <span className="font-light">mind</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              AI-powered writing assistant
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-black font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 hover:text-black text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-black font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 hover:text-black text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-black font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 hover:text-black text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <div className="text-center text-gray-600 text-sm">
            {companyInfo.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;