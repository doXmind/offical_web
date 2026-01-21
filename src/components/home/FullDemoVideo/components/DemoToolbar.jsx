import React from 'react';
import { motion } from 'framer-motion';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Minus,
  Link,
  Image,
  Table,
  Undo,
  Redo,
  Highlighter,
  Sparkles,
  ChevronDown,
  Search,
  FileSearch,
  Sigma,
  Loader2,
} from 'lucide-react';
import { ITEM_SPRING } from '../constants/animationConfig';

const ToolbarButton = ({ icon: Icon, isActive, isHighlighted, size = 'default', label }) => {
  // Increased button sizes to match doxmind-mini
  const sizeClasses = size === 'small' ? 'w-7 h-7' : 'w-8 h-8';
  const iconSize = size === 'small' ? 'w-4 h-4' : 'w-4 h-4';

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', ...ITEM_SPRING }}
    >
      <div
        className={`${sizeClasses} flex items-center justify-center rounded transition-colors ${
          isActive
            ? 'bg-white/20 text-white'
            : isHighlighted
            ? 'bg-blue-500/30 text-blue-400'
            : 'text-gray-500 hover:text-gray-400 hover:bg-white/5'
        }`}
      >
        <Icon className={iconSize} />
      </div>
      {isHighlighted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 rounded ring-2 ring-blue-500/50"
        />
      )}
    </motion.div>
  );
};

const ToolbarDivider = () => (
  <div className="w-px h-6 bg-white/10 mx-2" />
);

const ToolbarGroup = ({ children }) => (
  <div className="flex items-center gap-0.5">{children}</div>
);

const DemoToolbar = ({
  activeButtons = [],
  highlightedButtons = [],
  showAutocomplete = true,
  autocompleteMode = 'Auto',
  showReview = true,
  isReviewActive = false,
  isReviewLoading = false,
  isSearchActive = false,
}) => {
  const isActive = (name) => activeButtons.includes(name);
  const isHighlighted = (name) => highlightedButtons.includes(name);

  return (
    <div className="flex items-center gap-1 px-2 md:px-3 py-1.5 md:py-2 border-b border-white/10 bg-white/[0.02] flex-wrap">
      {/* History */}
      <ToolbarGroup>
        <ToolbarButton icon={Undo} isActive={isActive('undo')} isHighlighted={isHighlighted('undo')} size="small" />
        <ToolbarButton icon={Redo} isActive={isActive('redo')} isHighlighted={isHighlighted('redo')} size="small" />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Text Formatting */}
      <ToolbarGroup>
        <ToolbarButton icon={Bold} isActive={isActive('bold')} isHighlighted={isHighlighted('bold')} size="small" />
        <ToolbarButton icon={Italic} isActive={isActive('italic')} isHighlighted={isHighlighted('italic')} size="small" />
        <ToolbarButton icon={Strikethrough} isActive={isActive('strike')} isHighlighted={isHighlighted('strike')} size="small" />
        <ToolbarButton icon={Code} isActive={isActive('code')} isHighlighted={isHighlighted('code')} size="small" />
        <ToolbarButton icon={Highlighter} isActive={isActive('highlight')} isHighlighted={isHighlighted('highlight')} size="small" />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarGroup>
        <ToolbarButton icon={Heading1} isActive={isActive('h1')} isHighlighted={isHighlighted('h1')} size="small" />
        <ToolbarButton icon={Heading2} isActive={isActive('h2')} isHighlighted={isHighlighted('h2')} size="small" />
        <ToolbarButton icon={Heading3} isActive={isActive('h3')} isHighlighted={isHighlighted('h3')} size="small" />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarGroup>
        <ToolbarButton icon={List} isActive={isActive('bullet')} isHighlighted={isHighlighted('bullet')} size="small" />
        <ToolbarButton icon={ListOrdered} isActive={isActive('ordered')} isHighlighted={isHighlighted('ordered')} size="small" />
        <ToolbarButton icon={ListTodo} isActive={isActive('task')} isHighlighted={isHighlighted('task')} size="small" />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Blocks */}
      <ToolbarGroup>
        <ToolbarButton icon={Quote} isActive={isActive('quote')} isHighlighted={isHighlighted('quote')} size="small" />
        <ToolbarButton icon={Code2} isActive={isActive('codeblock')} isHighlighted={isHighlighted('codeblock')} size="small" />
        <ToolbarButton icon={Minus} isActive={isActive('hr')} isHighlighted={isHighlighted('hr')} size="small" />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Insert */}
      <ToolbarGroup>
        <ToolbarButton icon={Link} isActive={isActive('link')} isHighlighted={isHighlighted('link')} size="small" />
        <ToolbarButton icon={Image} isActive={isActive('image')} isHighlighted={isHighlighted('image')} size="small" />
        <ToolbarButton icon={Table} isActive={isActive('table')} isHighlighted={isHighlighted('table')} size="small" />
        <ToolbarButton icon={Sigma} isActive={isActive('math')} isHighlighted={isHighlighted('math')} size="small" />
      </ToolbarGroup>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side */}
      <ToolbarGroup>
        <ToolbarButton icon={Search} isActive={isSearchActive || isActive('search')} isHighlighted={isHighlighted('search')} size="small" />
      </ToolbarGroup>

      {showReview && (
        <>
          <ToolbarDivider />
          <motion.button
            className={`flex items-center gap-1.5 h-8 px-2 rounded text-xs transition-colors ${
              isReviewActive ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-400 hover:bg-white/5'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', ...ITEM_SPRING }}
          >
            {isReviewLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileSearch className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Review</span>
          </motion.button>
        </>
      )}

      {showAutocomplete && (
        <>
          <ToolbarDivider />
          <motion.div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-purple-500/20 text-purple-400 cursor-pointer"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', ...ITEM_SPRING }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">{autocompleteMode}</span>
            <ChevronDown className="w-3 h-3" />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default DemoToolbar;
