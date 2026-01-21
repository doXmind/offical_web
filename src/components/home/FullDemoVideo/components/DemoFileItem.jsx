import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MoreHorizontal } from 'lucide-react';
import { ITEM_SPRING } from '../constants/animationConfig';

// Format date to relative time
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

// Get name without .md extension
const getDisplayName = (name) => name?.replace(/\.md$/, '') || 'Untitled';

const DemoFileItem = ({
  file,
  isActive = false,
  showHoverActions = true,
  onClick,
  isNew = false,
}) => {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, x: -20 } : false}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: isNew ? 0.1 : 0 }}
      onClick={onClick}
      className={`group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-gray-400 hover:bg-white/5'
      }`}
    >
      {/* File Icon */}
      <FileText className={`h-4 w-4 flex-shrink-0 ${
        isActive ? 'text-blue-400' : 'text-gray-500'
      }`} />

      {/* File Info */}
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm ${
          isActive ? 'text-white' : 'text-gray-300'
        }`}>
          {getDisplayName(file.name)}
        </p>
        {file.updatedAt && (
          <p className="truncate text-xs text-gray-500">
            {formatDate(file.updatedAt)}
          </p>
        )}
      </div>

      {/* Actions (on hover) */}
      {showHoverActions && (
        <motion.button
          className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 flex items-center justify-center rounded text-gray-500 hover:text-gray-300 hover:bg-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', ...ITEM_SPRING }}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default DemoFileItem;
