import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

// Get name without .md extension
const getDisplayName = (name) => name?.replace(/\.md$/, '') || 'Untitled';

const DemoFileItem = ({
  file,
  isActive = false,
  onClick,
  isNew = false,
}) => {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, x: -10 } : false}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, delay: isNew ? 0.1 : 0 }}
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-1.5 rounded px-1.5 py-1 transition-colors ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-gray-400 hover:bg-white/5'
      }`}
    >
      {/* File Icon */}
      <FileText className={`h-3 w-3 flex-shrink-0 ${
        isActive ? 'text-blue-400' : 'text-gray-500'
      }`} />

      {/* File Name */}
      <span className={`truncate text-[11px] ${
        isActive ? 'text-white' : 'text-gray-300'
      }`}>
        {getDisplayName(file.name)}
      </span>
    </motion.div>
  );
};

export default DemoFileItem;
