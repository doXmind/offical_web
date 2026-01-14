import React from 'react';
import { motion } from 'framer-motion';

const MindmapNode = ({
  label,
  level = 0,
  delay = 0,
  isRoot = false,
  isActive = false,
}) => {
  const sizes = {
    0: 'px-3 py-1.5 text-xs font-medium',
    1: 'px-2.5 py-1 text-xs',
    2: 'px-2 py-0.5 text-[10px]',
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className={`
        ${sizes[level] || sizes[2]}
        ${isRoot ? 'bg-white/10 border-white/40' : 'bg-white/5 border-white/20'}
        ${isActive ? 'border-white/60 bg-white/15' : ''}
        border rounded text-white whitespace-nowrap
      `}
    >
      {label}
    </motion.div>
  );
};

export default MindmapNode;
