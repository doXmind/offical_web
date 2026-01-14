import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GhostText = ({
  text,
  isVisible = false,
  isAccepted = false,
  delay = 0,
  className = '',
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isAccepted ? 1 : 0.4 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            delay: isAccepted ? 0 : delay,
          }}
          className={`${isAccepted ? 'text-white' : 'text-gray-500'} ${className}`}
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default GhostText;
