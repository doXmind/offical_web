import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink } from 'lucide-react';

const CTASection = ({
  title = "Join Our Beta Testing Program",
  subtitle = "Be among the first to experience the future of AI-powered writing. Your feedback shapes our development!",
  primaryButtonText = "Join Beta Testing",
  primaryButtonHref = "https://beta.doxmind.com/",
  primaryButtonExternal = true,
  secondaryButtonText = "View User Guide",
  secondaryButtonHref = "/guide",
  secondaryButtonExternal = false,
  footerText = "Free for all beta testers • No credit card required • Access immediately",
  showBorder = false,
  backgroundColor = "transparent",
  maxWidth = "max-w-4xl",
  padding = "p-6 md:p-12"
}) => {
  return (
    <section className="py-10 md:py-20 px-4">
      <div className={`${maxWidth} mx-auto text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`
            rounded-lg ${padding} transition-colors duration-300
            ${showBorder ? 'border border-white/10 hover:border-white/20' : ''}
            ${backgroundColor !== 'transparent' ? backgroundColor : ''}
          `}
        >
          <h2 className="text-2xl md:text-5xl font-extralight mb-2 md:mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-lg text-gray-500 mb-5 md:mb-8">
              {subtitle}
            </p>
          )}
          <div className="flex flex-row gap-2 md:gap-4 justify-center">
            {primaryButtonText && (
              <motion.a
                href={primaryButtonHref}
                target={primaryButtonExternal ? "_blank" : undefined}
                rel={primaryButtonExternal ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-8 py-2.5 md:py-4 bg-white text-black text-sm md:text-base font-medium rounded-lg hover:bg-gray-200 transition-all"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{primaryButtonText}</span>
                <span className="sm:hidden">Join Beta</span>
                {primaryButtonExternal && <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />}
              </motion.a>
            )}
            {secondaryButtonText && (
              <motion.a
                href={secondaryButtonHref}
                target={secondaryButtonExternal ? "_blank" : undefined}
                rel={secondaryButtonExternal ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-4 md:px-8 py-2.5 md:py-4 text-sm md:text-base border border-white/20 rounded-lg hover:bg-white/5 transition-all"
              >
                <span className="hidden sm:inline">{secondaryButtonText}</span>
                <span className="sm:hidden">Guide</span>
              </motion.a>
            )}
          </div>
          {footerText && (
            <p className="mt-4 md:mt-6 text-[10px] md:text-xs text-gray-600">
              {footerText}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;