import React from 'react';
import { footerLinks, companyInfo } from '../../core/constants';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="doXmind Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-semibold text-black">{companyInfo.name}</span>
            </div>
            <p className="text-gray-600 text-sm">
              {companyInfo.tagline}
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
                    className="text-gray-600 hover:text-black text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-black font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-black text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-black font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-black text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-black font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
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
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              {companyInfo.copyright}
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="/privacy"
                className="text-gray-600 hover:text-black text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-600 hover:text-black text-sm transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;