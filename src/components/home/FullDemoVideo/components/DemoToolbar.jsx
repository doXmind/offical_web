import React from 'react';
import { motion } from 'framer-motion';
import {
  Bold,
  Italic,
  Code,
  Heading1,
  List,
  Link,
  FileSearch,
  Loader2,
} from 'lucide-react';
import { ITEM_SPRING } from '../constants/animationConfig';

const ToolbarButton = ({ icon: Icon, isActive }) => {
  return (
    <div
      className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
        isActive
          ? 'bg-white/20 text-white'
          : 'text-gray-500 hover:text-gray-400 hover:bg-white/5'
      }`}
    >
      <Icon className="w-3 h-3" />
    </div>
  );
};

const ToolbarDivider = () => (
  <div className="w-px h-4 bg-white/10 mx-1" />
);

const DemoToolbar = ({
  activeButtons = [],
  showReview = false,
  isReviewActive = false,
  isReviewLoading = false,
}) => {
  const isActive = (name) => activeButtons.includes(name);

  return (
    <div className="flex items-center gap-0.5 px-2 py-1 border-b border-white/10 bg-white/[0.02]">
      {/* Minimal formatting */}
      <ToolbarButton icon={Bold} isActive={isActive('bold')} />
      <ToolbarButton icon={Italic} isActive={isActive('italic')} />
      <ToolbarButton icon={Code} isActive={isActive('code')} />
      <ToolbarDivider />
      <ToolbarButton icon={Heading1} isActive={isActive('h1')} />
      <ToolbarButton icon={List} isActive={isActive('bullet')} />
      <ToolbarButton icon={Link} isActive={isActive('link')} />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Review button */}
      {showReview && (
        <motion.button
          className={`flex items-center gap-1 h-6 px-2 rounded text-[10px] transition-colors ${
            isReviewActive ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-400 hover:bg-white/5'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', ...ITEM_SPRING }}
        >
          {isReviewLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <FileSearch className="w-3 h-3" />
          )}
          <span>Review</span>
        </motion.button>
      )}
    </div>
  );
};

export default DemoToolbar;
