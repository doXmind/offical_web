import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  Plus,
  Brain,
  Eye,
  FileEdit,
  Check,
  Loader2,
  User,
  FileText,
  Globe,
  Quote,
  BookOpen,
  File,
  Presentation,
  Upload,
  X,
  ListTodo,
  Circle,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';

// Simple markdown renderer for AI messages
const FormattedMessage = ({ content }) => {
  // Split by newlines and process each line
  const lines = content.split('\n');

  // Helper to process bold text
  const processBoldText = (text) => {
    if (!text) return text;
    return text.split(/(\*\*[^*]+\*\*)/).map((part, partIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={partIdx} className="font-semibold text-white">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-1">
      {lines.map((line, idx) => {
        // Skip empty lines but preserve spacing
        if (!line.trim()) {
          return <div key={idx} className="h-1" />;
        }

        const trimmedLine = line.trim();

        // Check if it's a bullet point with •
        if (trimmedLine.startsWith('•')) {
          const bulletContent = trimmedLine.slice(1).trim();
          return (
            <div key={idx} className="flex gap-1.5 pl-1">
              <span className="text-blue-400 flex-shrink-0">•</span>
              <span>{processBoldText(bulletContent)}</span>
            </div>
          );
        }

        // Check if it's a bullet point with -
        if (trimmedLine.startsWith('- ')) {
          const bulletContent = trimmedLine.slice(2).trim();
          return (
            <div key={idx} className="flex gap-1.5 pl-1">
              <span className="text-blue-400 flex-shrink-0">•</span>
              <span>{processBoldText(bulletContent)}</span>
            </div>
          );
        }

        // Regular text with bold processing
        return <div key={idx}>{processBoldText(line)}</div>;
      })}
    </div>
  );
};

const ToolIndicator = ({ name, status }) => {
  // Tool icons matching doXmind's tool-indicator.tsx
  const icons = {
    view_document: Eye,
    search_in_document: Eye,
    str_replace_editor: FileEdit,
    insert_text: FileEdit,
    replace_document: FileEdit,
    search_knowledge_base: FileText,
    read_kb_document: FileText,
    list_kb_documents: FileText,
    web_search: Globe,
    web_fetch: Globe,
    read_skill_instructions: BookOpen,
  };
  const Icon = icons[name] || Eye;

  // Tool labels for display
  const labels = {
    view_document: 'Reading document',
    search_in_document: 'Searching document',
    str_replace_editor: 'Editing document',
    insert_text: 'Inserting content',
    replace_document: 'Replacing document',
    search_knowledge_base: 'Searching knowledge base',
    read_kb_document: 'Reading KB document',
    list_kb_documents: 'Listing KB documents',
    web_search: 'Searching the web',
    web_fetch: 'Fetching webpage',
    read_skill_instructions: 'Activating essay skill',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-1.5 text-[9px] text-gray-500 ml-3 py-0.5"
    >
      <div className="w-3.5 h-3.5 flex items-center justify-center">
        {status === 'running' ? (
          <Loader2 className="w-2.5 h-2.5 animate-spin text-blue-400" />
        ) : (
          <Check className="w-2.5 h-2.5 text-green-400" />
        )}
      </div>
      <Icon className="w-2.5 h-2.5" />
      <span>{labels[name] || name}</span>
    </motion.div>
  );
};

// Get icon for KB file type
const getKBFileIcon = (type) => {
  switch (type) {
    case 'pptx':
      return Presentation;
    case 'pdf':
    default:
      return File;
  }
};

// TODO Plan Component - shows agent execution plan
const TodoPlan = ({ items }) => {
  if (!items || items.length === 0) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-3 h-3 text-green-400" />;
      case 'in_progress':
        return <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />;
      default:
        return <Circle className="w-3 h-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-gray-500 line-through';
      case 'in_progress':
        return 'text-blue-300';
      default:
        return 'text-gray-400';
    }
  };

  const completedCount = items.filter(item => item.status === 'completed').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <ListTodo className="w-3 h-3 text-blue-400" />
          <span className="text-[9px] font-medium text-blue-300">Execution Plan</span>
        </div>
        <span className="text-[8px] text-gray-500">
          {completedCount}/{items.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(completedCount / items.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Todo items */}
      <div className="space-y-1">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex items-start gap-1.5 text-[8px] ${
              item.status === 'in_progress' ? 'bg-blue-500/10 rounded px-1 py-0.5 -mx-1' : ''
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getStatusIcon(item.status)}
            </div>
            <span className={getStatusColor(item.status)}>
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const DemoChatPanel = ({
  messages = [],
  inputValue = '',
  isTyping = false,
  isThinking = false,
  tools = [],
  kbFiles = [],
  selectedContent = null,
  webSearchEnabled = false,
  showAttachMenu = false,
  isUploading = false,
  uploadProgress = 0,
  currentUploadFile = null,
  todoPlan = [],
  showTodoPlan = false,
}) => {
  const containerRef = useRef(null);

  // Auto-scroll to bottom within the chat container only (not the page)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, tools, isThinking, kbFiles, todoPlan]);

  // Calculate total sections from all KB files
  const totalSections = kbFiles.reduce((sum, file) => sum + (file.sections || 0), 0);

  return (
    <div className="w-40 md:w-48 border-l border-white/10 bg-white/[0.01] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-1.5 px-2 py-2 border-b border-white/10">
        <Sparkles className="w-3 h-3 text-blue-400" />
        <span className="text-[10px] font-medium text-gray-300">AI Assistant</span>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-2 space-y-2 demo-scrollbar">
        {/* KB Upload progress indicator */}
        <AnimatePresence>
          {isUploading && uploadProgress > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="p-1.5 bg-white/5 border border-white/10 rounded"
            >
              <div className="flex items-center gap-1.5 text-[8px] text-gray-400 mb-1">
                <Upload className="w-2.5 h-2.5" />
                <span className="truncate flex-1">
                  {currentUploadFile?.name || 'Uploading...'}
                </span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="text-[7px] text-gray-500 mt-0.5">
                {uploadProgress < 100 ? `${uploadProgress}%` : 'Indexing...'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* KB Files indicator - show multiple files */}
        {kbFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-1.5 bg-white/5 border border-white/10 rounded"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] text-gray-400 font-medium">Knowledge Base</span>
              <span className="text-[7px] text-gray-500">{totalSections} sections</span>
            </div>
            <div className="space-y-0.5">
              <AnimatePresence mode="popLayout">
                {kbFiles.map((file, idx) => {
                  const FileIcon = getKBFileIcon(file.type);
                  return (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-1 text-[8px] text-gray-300"
                    >
                      <FileIcon className="w-2.5 h-2.5 flex-shrink-0" />
                      <span className="truncate flex-1">{file.name}</span>
                      <Check className="w-2 h-2 text-green-400" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Selected content indicator */}
        <AnimatePresence>
          {selectedContent && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded"
            >
              <div className="flex items-center gap-1 text-[8px] text-blue-400 mb-1">
                <Quote className="w-2.5 h-2.5" />
                <span>Selected text</span>
              </div>
              <p className="text-[8px] text-gray-400 line-clamp-2 italic">
                "{selectedContent}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-1.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                </div>
              )}
              <div
                className={`max-w-[90%] px-2 py-1.5 rounded-lg text-[9px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-500/20 text-blue-100'
                    : 'bg-white/5 text-gray-300'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <FormattedMessage content={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-2.5 h-2.5 text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Thinking indicator */}
        {isThinking && !showTodoPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-[9px] text-gray-500 py-1"
          >
            <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Brain className="w-2.5 h-2.5 text-blue-400 animate-pulse" />
            </div>
            <span>Thinking...</span>
          </motion.div>
        )}

        {/* TODO Plan - shows agent execution plan */}
        <AnimatePresence>
          {showTodoPlan && todoPlan.length > 0 && (
            <TodoPlan items={todoPlan} />
          )}
        </AnimatePresence>

        {/* Tool indicators */}
        <AnimatePresence>
          {tools.map((tool, index) => (
            <ToolIndicator key={`${tool.name}-${index}`} name={tool.name} status={tool.status} />
          ))}
        </AnimatePresence>
      </div>

      {/* Input - matches real doXmind design */}
      <div className="p-2 border-t border-white/10">
        {/* Attachment menu popup */}
        <AnimatePresence>
          {showAttachMenu && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              className="mb-2 p-1.5 bg-gray-900 border border-white/10 rounded-lg"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 px-2 py-1 text-[8px] text-gray-400 hover:bg-white/5 rounded cursor-pointer">
                  <Upload className="w-2.5 h-2.5" />
                  <span>Upload Document</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 text-[8px] text-gray-400 hover:bg-white/5 rounded cursor-pointer">
                  <FileText className="w-2.5 h-2.5" />
                  <span>Knowledge Base</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start gap-1.5 bg-white/5 rounded-xl px-2 py-2">
          {/* Attachment button with badge */}
          <div className="relative flex-shrink-0 mt-0.5">
            <div className={`w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer transition-colors ${showAttachMenu ? 'bg-white/10' : ''}`}>
              <Plus className="w-3.5 h-3.5 text-gray-400" />
            </div>
            {kbFiles.length > 0 && (
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-[7px] text-white font-medium">{kbFiles.length}</span>
              </div>
            )}
          </div>

          {/* Web search toggle */}
          <div className={`w-5 h-5 flex items-center justify-center rounded-full cursor-pointer transition-colors mt-0.5 ${webSearchEnabled ? 'bg-blue-500/20' : 'hover:bg-white/10'}`}>
            <Globe className={`w-3.5 h-3.5 ${webSearchEnabled ? 'text-blue-400' : 'text-gray-500'}`} />
          </div>

          {/* Text input area - with max height */}
          <div className="flex-1 min-w-0 py-0.5 max-h-[60px] overflow-hidden">
            <div className="text-[9px] text-gray-300 leading-relaxed line-clamp-4">
              {inputValue || <span className="text-gray-600">Ask AI...</span>}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-3 bg-white ml-0.5 align-middle"
                />
              )}
            </div>
          </div>

          {/* Send button */}
          <div className={`w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 transition-colors ${inputValue ? 'bg-blue-500 cursor-pointer' : ''}`}>
            <Send className={`w-3 h-3 ${inputValue ? 'text-white' : 'text-gray-500'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoChatPanel;
