import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`p-6 border border-white/10 rounded-lg bg-white/5 hover:border-white/20 transition-colors ${className}`}
    >
      {Icon && (
        <div className="mb-3">
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      {title && (
        <h4 className="text-lg font-medium mb-2 text-white">{title}</h4>
      )}
      {description && (
        <p className="text-sm text-gray-400">{description}</p>
      )}
      {children}
    </motion.div>
  );
};

export default FeatureCard;
