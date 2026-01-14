import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Paperclip } from 'lucide-react';

const MiniMockChatPanel = ({
  messages = [],
  showInput = true,
  isThinking = false,
  className = '',
}) => {
  return (
    <div className={`w-40 border-l border-white/10 bg-white/[0.02] flex flex-col ${className}`}>
      <div className="p-2 border-b border-white/10 flex items-center gap-1.5">
        <MessageSquare className="w-3 h-3 text-gray-500" />
        <span className="text-[9px] text-gray-500 uppercase tracking-wider">AI Chat</span>
      </div>

      <div className="flex-1 p-2 space-y-2 overflow-hidden">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`
              text-[9px] p-1.5 rounded
              ${msg.role === 'user'
                ? 'bg-white/10 text-gray-300 ml-4'
                : 'bg-white/5 text-gray-400 mr-4'
              }
            `}
          >
            {msg.content}
          </motion.div>
        ))}

        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 text-[9px] text-gray-500 p-1.5"
          >
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Thinking
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              .
            </motion.span>
          </motion.div>
        )}
      </div>

      {showInput && (
        <div className="p-2 border-t border-white/10">
          <div className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded">
            <Paperclip className="w-2.5 h-2.5 text-gray-600" />
            <span className="text-[8px] text-gray-600 flex-1">Ask AI...</span>
            <Send className="w-2.5 h-2.5 text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniMockChatPanel;
