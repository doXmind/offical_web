import React from 'react';
import { motion } from 'framer-motion';

const CTASection = ({
  title = "Ready to Transform Your Workflow?",
  subtitle = "Join thousands of teams already using DocMindLLM to create better content faster",
  primaryButtonText = "Get Started Free",
  primaryButtonAction,
  secondaryButtonText = "Schedule Demo",
  secondaryButtonAction,
  footerText = "No credit card required • 14-day free trial • Cancel anytime",
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={primaryButtonAction}
                className="px-8 py-4 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-all"
              >
                {primaryButtonText}
              </motion.button>
            )}
            {secondaryButtonText && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={secondaryButtonAction}
                className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
              >
                {secondaryButtonText}
              </motion.button>
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