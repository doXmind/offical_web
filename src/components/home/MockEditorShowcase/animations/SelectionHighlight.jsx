import React from 'react';
import { motion } from 'framer-motion';

const SelectionHighlight = ({
  children,
  isSelected = false,
  delay = 0,
  duration = 0.3,
  className = '',
}) => {
  return (
    <span className={`relative inline ${className}`}>
      {isSelected && (
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{
            duration,
            delay,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0 bg-white/20 rounded-sm"
          style={{ zIndex: -1 }}
        />
      )}
      <span className={isSelected ? 'relative z-10' : ''}>{children}</span>
    </span>
  );
};

export default SelectionHighlight;
