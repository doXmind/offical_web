import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Loader2,
  Eye,
  Check,
  X,
} from 'lucide-react';

const ToolbarButton = ({ icon: Icon, isActive, isHighlighted, size = 'small' }) => {
  const sizeClasses = size === 'small' ? 'w-5 h-5' : 'w-6 h-6';
  const iconSize = size === 'small' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <div className="relative">
      <div
        className={`${sizeClasses} flex items-center justify-center rounded transition-colors ${
          isActive
            ? 'bg-white/20 text-white'
            : isHighlighted
            ? 'bg-blue-500/30 text-blue-400'
            : 'text-gray-500 hover:text-gray-400'
        }`}
      >
        <Icon className={iconSize} />
      </div>
      {isHighlighted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 rounded ring-2 ring-blue-500/50"
        />
      )}
    </div>
  );
};

const ToolbarDivider = () => (
  <div className="w-px h-4 bg-white/10 mx-1" />
);

const ToolbarGroup = ({ children }) => (
  <div className="flex items-center gap-0.5">{children}</div>
);

const DemoToolbar = ({
  activeButtons = [],
  highlightedButtons = [],
  showAutocomplete = false,
  autocompleteMode = 'Auto',
  showReview = false,
  isReviewLoading = false,
  showDiffMode = false,
  pendingChanges = 0,
}) => {
  const isActive = (name) => activeButtons.includes(name);
  const isHighlighted = (name) => highlightedButtons.includes(name);

  return (
    <div className="relative">
      {/* Review Mode Banner - shown when diff mode is active */}
      <AnimatePresence>
        {showDiffMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between px-3 py-1.5 bg-amber-500/10 border-b border-amber-500/20"
          >
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] text-amber-300 font-medium">Review Mode</span>
              <motion.span
                key={pendingChanges}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-[10px] text-amber-400/80"
              >
                {pendingChanges} change{pendingChanges !== 1 ? 's' : ''} pending
              </motion.span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-red-400 hover:bg-red-500/10 rounded"
              >
                <X className="w-3 h-3" />
                Reject All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-white bg-green-600 hover:bg-green-500 rounded"
              >
                <Check className="w-3 h-3" />
                Accept All
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toolbar */}
      <div className="flex items-center gap-0.5 px-2 md:px-3 py-1.5 border-b border-white/10 bg-white/[0.02] flex-wrap">
      {/* History */}
      <ToolbarGroup>
        <ToolbarButton icon={Undo} />
        <ToolbarButton icon={Redo} />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Text Formatting */}
      <ToolbarGroup>
        <ToolbarButton icon={Bold} isActive={isActive('bold')} isHighlighted={isHighlighted('bold')} />
        <ToolbarButton icon={Italic} isActive={isActive('italic')} isHighlighted={isHighlighted('italic')} />
        <ToolbarButton icon={Strikethrough} />
        <ToolbarButton icon={Code} />
        <ToolbarButton icon={Highlighter} />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarGroup>
        <ToolbarButton icon={Heading1} isActive={isActive('h1')} isHighlighted={isHighlighted('h1')} />
        <ToolbarButton icon={Heading2} isActive={isActive('h2')} isHighlighted={isHighlighted('h2')} />
        <ToolbarButton icon={Heading3} />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarGroup>
        <ToolbarButton icon={List} isActive={isActive('bullet')} isHighlighted={isHighlighted('bullet')} />
        <ToolbarButton icon={ListOrdered} />
        <ToolbarButton icon={ListTodo} />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Blocks */}
      <ToolbarGroup>
        <ToolbarButton icon={Quote} />
        <ToolbarButton icon={Code2} />
        <ToolbarButton icon={Minus} />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Insert */}
      <ToolbarGroup>
        <ToolbarButton icon={Link} />
        <ToolbarButton icon={Image} />
        <ToolbarButton icon={Table} />
      </ToolbarGroup>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side */}
      <ToolbarGroup>
        <ToolbarButton icon={Search} />
      </ToolbarGroup>

      {showReview && (
        <>
          <ToolbarDivider />
          <div
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${
              isReviewLoading ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500'
            }`}
          >
            {isReviewLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <FileSearch className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">Review</span>
          </div>
        </>
      )}

      {showAutocomplete && (
        <>
          <ToolbarDivider />
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-blue-400 bg-blue-500/10">
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">{autocompleteMode}</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default DemoToolbar;
