import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Send } from 'lucide-react';

const MockChatPanel = ({
  userMessage = '',
  aiResponse = '',
  showUserMessage = false,
  showAiResponse = false,
  isThinking = false,
}) => {
  return (
    <div className="w-48 h-full border-l border-white/10 bg-white/[0.02] flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-gray-500" />
        <span className="text-[10px] text-gray-500 font-medium">AI Assistant</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 space-y-3 overflow-hidden">
        {/* User message */}
        {showUserMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <div className="max-w-[90%] px-2.5 py-1.5 bg-white/10 rounded-lg rounded-br-sm">
              <p className="text-[10px] text-white leading-relaxed">{userMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Thinking indicator */}
        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-gray-500"
          >
            <div className="flex gap-0.5">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                className="w-1 h-1 bg-gray-500 rounded-full"
              />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-1 h-1 bg-gray-500 rounded-full"
              />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-1 h-1 bg-gray-500 rounded-full"
              />
            </div>
            <span className="text-[9px]">Thinking...</span>
          </motion.div>
        )}

        {/* AI response */}
        {showAiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex"
          >
            <div className="max-w-[90%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg rounded-bl-sm">
              <p className="text-[10px] text-gray-300 leading-relaxed">
                {aiResponse}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-white/10">
        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg">
          <MessageSquare className="w-3 h-3 text-gray-600" />
          <span className="text-[10px] text-gray-600 flex-1">Ask anything...</span>
          <Send className="w-3 h-3 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default MockChatPanel;
