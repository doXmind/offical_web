import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  Paperclip,
  Trash2,
  User,
  Settings,
  Square,
  Bot,
  FileText,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import DemoToolIndicator from './DemoToolIndicator';
import DemoThinkingIndicator from './DemoThinkingIndicator';
import { MOBILE_SPRINGS, ITEM_SPRING } from '../constants/animationConfig';

// Simple markdown renderer for demo - matches doxmind-mini's marked output
const renderMarkdown = (text) => {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  let inList = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-1 my-2">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Heading 3 (###)
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={idx} className="text-[11px] font-semibold text-gray-200 mt-2 mb-1">
          {trimmed.slice(4)}
        </h4>
      );
      return;
    }

    // Heading 2 (##)
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h3 key={idx} className="text-xs font-semibold text-white mt-2 mb-1">
          {trimmed.slice(3)}
        </h3>
      );
      return;
    }

    // Bullet list
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      inList = true;
      const content = trimmed.slice(2);
      // Parse inline formatting
      const formatted = content
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-[10px]">$1</code>');

      listItems.push(
        <li key={idx} className="flex items-start gap-1.5">
          <span className="text-blue-400 mt-0.5 text-[10px]">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
        </li>
      );
      return;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      inList = true;
      const content = trimmed.replace(/^\d+\.\s/, '');
      const num = trimmed.match(/^(\d+)\./)[1];
      const formatted = content
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');

      listItems.push(
        <li key={idx} className="flex items-start gap-1.5">
          <span className="text-gray-500 text-[10px] min-w-[14px]">{num}.</span>
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
        </li>
      );
      return;
    }

    // Empty line
    if (!trimmed) {
      flushList();
      return;
    }

    // Normal paragraph with inline formatting
    flushList();
    const formatted = trimmed
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-[10px]">$1</code>');

    elements.push(
      <p key={idx} className="mb-1.5" dangerouslySetInnerHTML={{ __html: formatted }} />
    );
  });

  flushList();
  return elements;
};

const SuggestionButton = ({ text, onClick }) => (
  <motion.button
    onClick={onClick}
    className="w-full px-3 py-2 text-xs bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-gray-300 transition-colors text-left"
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ type: 'spring', ...ITEM_SPRING }}
  >
    {text}
  </motion.button>
);

// Reference context display - matches doxmind-mini's MessageContextItemDisplay
const ReferenceDisplay = ({ context, isExpanded, onToggle }) => {
  const label = context.type === 'image'
    ? `Reference: Image${context.alt ? ` (${context.alt})` : ''}`
    : `Reference (${context.text?.length || 0} chars)`;

  return (
    <div className="mt-2 border-t border-blue-400/20 pt-2">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-1.5 text-left text-[10px] opacity-80 hover:opacity-100 transition-opacity"
      >
        <FileText className="w-3 h-3 flex-shrink-0" />
        <span className="flex-1 truncate">{label}</span>
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
        )}
      </button>
      {isExpanded && (
        <div className="mt-1.5 max-h-[60px] overflow-y-auto rounded bg-black/20 px-2 py-1.5 text-[10px] opacity-70 whitespace-pre-wrap">
          {context.text}
        </div>
      )}
    </div>
  );
};

// Chat message component - matches doxmind-mini's ChatMessage exactly
const ChatMessage = ({ message }) => {
  const [isContextExpanded, setIsContextExpanded] = useState(false);
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', ...MOBILE_SPRINGS.SNAPPY }}
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-500 text-white' : 'bg-white/10'
        }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-gray-400" />
        )}
      </div>

      {/* Content */}
      <div className={`max-w-[85%] flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className={`inline-block rounded-lg px-2.5 py-2 text-xs leading-relaxed ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-white/5 text-gray-300'
          }`}
        >
          {isUser ? (
            <>
              <p className="whitespace-pre-wrap text-left">{message.content}</p>
              {message.context && (
                <ReferenceDisplay
                  context={message.context}
                  isExpanded={isContextExpanded}
                  onToggle={() => setIsContextExpanded(!isContextExpanded)}
                />
              )}
            </>
          ) : (
            <div className="prose-demo">
              {renderMarkdown(message.content)}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className="mt-1 text-[10px] text-gray-600">
          {message.timestamp || '11:57'}
        </p>
      </div>
    </motion.div>
  );
};

const DemoChatPanel = ({
  messages = [],
  isThinking = false,
  thinkingContent = '',
  tools = [],
  inputValue = '',
  showInput = true,
  isTyping = false,
  isStreaming = false,
  attachmentHighlight = false,
  showClearButton = false,
  onClear,
}) => {
  const showSuggestions = messages.length === 0 && !isThinking && tools.length === 0;

  return (
    <div className="w-48 md:w-56 border-l border-white/10 bg-white/[0.02] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-semibold text-white">AI Assistant</h2>
        </div>
        <div className="flex items-center gap-1">
          {showClearButton && messages.length > 0 && (
            <motion.button
              onClick={onClear}
              className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Empty State with Suggestions */}
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center h-full py-8 text-center"
          >
            <Sparkles className="w-8 h-8 text-gray-600 mb-4" />
            <h3 className="font-medium text-gray-300 mb-2 text-sm">Start a conversation</h3>
            <p className="text-xs text-gray-500 max-w-[180px] mb-4">
              Ask me to help you write, edit, or improve your document.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <SuggestionButton text="Write a report" />
              <SuggestionButton text="Improve style" />
              <SuggestionButton text="Summarize" />
            </div>
          </motion.div>
        )}

        {/* Message List */}
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </AnimatePresence>

        {/* Thinking Indicator */}
        {isThinking && (
          <DemoThinkingIndicator
            isThinking={isThinking}
            content={thinkingContent}
          />
        )}

        {/* Tool Indicators */}
        {tools.length > 0 && (
          <div className="space-y-2 ml-8">
            {tools.map((tool, index) => (
              <DemoToolIndicator
                key={`${tool.name}-${index}`}
                name={tool.name}
                status={tool.status}
                message={tool.message}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      {showInput && (
        <div className="border-t border-white/10 p-3">
          <div className="relative flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5">
            {/* Attachment Button */}
            <motion.button
              className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded transition-colors ${
                attachmentHighlight
                  ? 'text-blue-400 bg-blue-500/20'
                  : 'text-gray-500 hover:text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Paperclip className="w-4 h-4" />
            </motion.button>
            {attachmentHighlight && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded ring-2 ring-blue-500/50"
              />
            )}

            {/* Settings Button */}
            <motion.button
              className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-gray-500 hover:text-gray-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-4 h-4" />
            </motion.button>

            {/* Input Field */}
            <div className="flex-1 min-w-0 relative">
              <input
                type="text"
                value={inputValue}
                readOnly
                placeholder="Ask AI anything..."
                className="w-full bg-transparent text-xs text-gray-300 placeholder-gray-600 outline-none"
              />
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white"
                />
              )}
            </div>

            {/* Send/Stop Button */}
            {isStreaming ? (
              <motion.button
                className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-gray-500 hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Square className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded transition-colors ${
                  inputValue.trim()
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
          <p className="mt-2 text-center text-[10px] text-gray-600 hidden md:block">
            Press Enter to send
          </p>
        </div>
      )}
    </div>
  );
};

export default DemoChatPanel;
