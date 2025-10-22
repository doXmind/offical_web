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
  padding = "p-12"
}) => {
  return (
    <section className="py-20 px-4">
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
          <h2 className="text-4xl md:text-5xl font-extralight mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-500 mb-8">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryButtonText && (
              <motion.a
                href={primaryButtonHref}
                target={primaryButtonExternal ? "_blank" : undefined}
                rel={primaryButtonExternal ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                {primaryButtonText}
                {primaryButtonExternal && <ExternalLink className="w-4 h-4" />}
              </motion.a>
            )}
            {secondaryButtonText && (
              <motion.a
                href={secondaryButtonHref}
                target={secondaryButtonExternal ? "_blank" : undefined}
                rel={secondaryButtonExternal ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
              >
                {secondaryButtonText}
              </motion.a>
            )}
          </div>
          {footerText && (
            <p className="mt-6 text-xs text-gray-600">
              {footerText}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;