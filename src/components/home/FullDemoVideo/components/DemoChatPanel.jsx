import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, User, Bot, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import DemoToolIndicator from './DemoToolIndicator';
import DemoThinkingIndicator from './DemoThinkingIndicator';
import { MOBILE_SPRINGS, ITEM_SPRING } from '../constants/animationConfig';

// Simple markdown renderer
const renderMarkdown = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('- ')) {
      return (
        <div key={idx} className="flex items-start gap-1 my-0.5">
          <span className="text-blue-400 text-[9px] mt-0.5">•</span>
          <span>{trimmed.slice(2)}</span>
        </div>
      );
    }
    return <p key={idx} className="mb-1">{trimmed}</p>;
  });
};

// Reference display
const ReferenceDisplay = ({ context, isExpanded, onToggle }) => (
  <div className="mt-1.5 border-t border-blue-400/20 pt-1.5">
    <button
      onClick={onToggle}
      className="flex w-full items-center gap-1 text-left text-[9px] opacity-80 hover:opacity-100"
    >
      <FileText className="w-2.5 h-2.5" />
      <span className="flex-1 truncate">Reference ({context.text?.length || 0} chars)</span>
      {isExpanded ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronRight className="w-2.5 h-2.5" />}
    </button>
    {isExpanded && (
      <div className="mt-1 max-h-[40px] overflow-y-auto rounded bg-black/20 px-1.5 py-1 text-[9px] opacity-70">
        {context.text}
      </div>
    )}
  </div>
);

// Chat message
const ChatMessage = ({ message }) => {
  const [isContextExpanded, setIsContextExpanded] = useState(false);
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', ...MOBILE_SPRINGS.SNAPPY }}
      className={`flex gap-1.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-blue-500 text-white' : 'bg-white/10'
      }`}>
        {isUser ? <User className="w-2.5 h-2.5" /> : <Bot className="w-2.5 h-2.5 text-gray-400" />}
      </div>

      <div className={`max-w-[85%] flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block rounded-lg px-2 py-1.5 text-[10px] leading-relaxed ${
          isUser ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-300'
        }`}>
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
            <div>{renderMarkdown(message.content)}</div>
          )}
        </div>
        <p className="mt-0.5 text-[9px] text-gray-600">{message.timestamp || '11:57'}</p>
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
}) => {
  const showSuggestions = messages.length === 0 && !isThinking && tools.length === 0;

  return (
    <div className="w-40 md:w-48 border-l border-white/10 bg-white/[0.02] flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-white/10 px-2.5 py-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[11px] font-medium text-white">AI Chat</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {showSuggestions && (
          <div className="flex flex-col items-center justify-center h-full py-4 text-center">
            <Sparkles className="w-6 h-6 text-gray-600 mb-2" />
            <p className="text-[10px] text-gray-500 max-w-[120px]">
              Ask AI to help you write or edit
            </p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </AnimatePresence>

        {isThinking && <DemoThinkingIndicator isThinking={isThinking} content={thinkingContent} />}

        {tools.length > 0 && (
          <div className="space-y-1.5 ml-6">
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

      {/* Input */}
      {showInput && (
        <div className="border-t border-white/10 p-2">
          <div className="relative flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5">
            <div className="flex-1 min-w-0 relative">
              <input
                type="text"
                value={inputValue}
                readOnly
                placeholder="Ask AI..."
                className="w-full bg-transparent text-[10px] text-gray-300 placeholder-gray-600 outline-none"
              />
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white"
                />
              )}
            </div>
            <motion.button
              className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded transition-colors ${
                inputValue.trim() ? 'bg-blue-500 text-white' : 'text-gray-500'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send className="w-3 h-3" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoChatPanel;
