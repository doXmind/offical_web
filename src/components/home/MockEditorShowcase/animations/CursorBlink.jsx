import React from 'react';
import { motion } from 'framer-motion';

const CursorBlink = ({ className = '' }) => {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'steps(2)',
      }}
      className={`inline-block w-0.5 h-4 bg-white ml-0.5 ${className}`}
    />
  );
};

export default CursorBlink;
