import React from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Search,
  Replace,
  FileEdit,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  BookOpen,
  Globe,
  Link2,
} from 'lucide-react';

// Get icon component for a tool type
const getToolIcon = (toolName) => {
  const icons = {
    view_document: Eye,
    read_document: Eye,
    str_replace_editor: Replace,
    insert_text: FileEdit,
    replace_document: FileEdit,
    edit_text: FileEdit,
    search_in_document: Search,
    apply_edits: Check,
    search_knowledge_base: BookOpen,
    search_knowledge: BookOpen,
    read_kb_document: BookOpen,
    list_kb_documents: BookOpen,
    web_search: Globe,
    web_fetch: Link2,
  };
  return icons[toolName] || Sparkles;
};

// Get display name for a tool
const getToolDisplayName = (toolName) => {
  const names = {
    view_document: 'Reading document',
    read_document: 'Reading document',
    str_replace_editor: 'Editing text',
    insert_text: 'Inserting text',
    replace_document: 'Replacing document',
    edit_text: 'Editing text',
    search_in_document: 'Searching document',
    apply_edits: 'Applying changes',
    search_knowledge_base: 'Searching knowledge base',
    search_knowledge: 'Searching knowledge base',
    read_kb_document: 'Reading KB document',
    list_kb_documents: 'Listing KB documents',
    web_search: 'Searching the web',
    web_fetch: 'Fetching URL',
  };
  return names[toolName] || toolName.replace(/_/g, ' ');
};

// Status-based styling configuration
const STATUS_STYLES = {
  running: {
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
    text: 'text-blue-400',
  },
  completed: {
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.3)',
    text: 'text-green-400',
  },
  error: {
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.3)',
    text: 'text-red-400',
  },
};

const DemoToolIndicator = ({ name, status = 'running', message }) => {
  const Icon = getToolIcon(name);
  const displayName = getToolDisplayName(name);
  const currentStyle = STATUS_STYLES[status] || STATUS_STYLES.running;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border ${currentStyle.text}`}
      style={{
        backgroundColor: currentStyle.bg,
        borderColor: currentStyle.border,
      }}
    >
      {status === 'running' && (
        <>
          <div className="relative">
            <Icon className="h-4 w-4 flex-shrink-0" />
            <motion.span
              className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="truncate font-medium">{displayName}...</span>
          <Loader2 className="h-3 w-3 animate-spin ml-auto" />
        </>
      )}
      {status === 'completed' && (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
          </motion.div>
          <span className="truncate">{message || displayName}</span>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
          >
            <Check className="h-3 w-3 ml-auto" />
          </motion.div>
        </>
      )}
      {status === 'error' && (
        <>
          <motion.div
            animate={{ x: [0, -2, 2, -2, 0] }}
            transition={{ duration: 0.4 }}
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
          </motion.div>
          <span className="truncate">{message || 'Error'}</span>
        </>
      )}
    </motion.div>
  );
};

export default DemoToolIndicator;
