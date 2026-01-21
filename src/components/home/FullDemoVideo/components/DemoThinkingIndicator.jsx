import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Loader2, ChevronRight } from 'lucide-react';

const DemoThinkingIndicator = ({
  isThinking = false,
  content = '',
  isExpanded = false,
  onToggleExpand,
}) => {
  const [localExpanded, setLocalExpanded] = useState(isExpanded);
  const expanded = onToggleExpand ? isExpanded : localExpanded;
  const handleToggle = () => {
    if (onToggleExpand) {
      onToggleExpand();
    } else {
      setLocalExpanded(!localExpanded);
    }
  };

  if (!content && !isThinking) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="mb-2"
    >
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-colors duration-200 w-full text-left ${
          isThinking
            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
            : 'bg-purple-500/5 border-purple-500/15 text-purple-400/70'
        }`}
      >
        <div className="relative flex-shrink-0">
          <Brain className="h-4 w-4" />
          {isThinking && (
            <motion.span
              className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 0 0 rgba(168, 85, 247, 0.4)',
                  '0 0 0 6px rgba(168, 85, 247, 0)',
                  '0 0 0 0 rgba(168, 85, 247, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
        <span className="font-medium truncate flex-1">
          {isThinking ? 'Thinking...' : 'Thought process'}
        </span>
        {isThinking && <Loader2 className="h-3 w-3 animate-spin" />}
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence>
        {expanded && content && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-1 px-3 py-2 text-[10px] text-gray-400 bg-white/5 rounded-lg border border-white/5 max-h-[200px] overflow-y-auto whitespace-pre-wrap">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DemoThinkingIndicator;
