import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Send, Brain, Eye, FileEdit, Search, Check, Loader2 } from 'lucide-react';

// Tool indicator component
const ToolIndicator = ({ tool }) => {
  const toolConfig = {
    'view_document': { icon: Eye, label: 'Reading document' },
    'search_document': { icon: Search, label: 'Searching document' },
    'edit_text': { icon: FileEdit, label: 'Editing text' },
  };

  const config = toolConfig[tool.name] || { icon: Sparkles, label: tool.name };
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex items-center gap-1.5 px-2 py-1 rounded text-[9px] border
        ${tool.status === 'running'
          ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
          : 'bg-green-500/10 border-green-500/20 text-green-400'}
      `}
    >
      {tool.status === 'running' ? (
        <>
          <Loader2 className="w-2.5 h-2.5 animate-spin" />
          <span>{config.label}...</span>
        </>
      ) : (
        <>
          <Icon className="w-2.5 h-2.5" />
          <span>{config.label}</span>
          <Check className="w-2.5 h-2.5" />
        </>
      )}
    </motion.div>
  );
};

// Thinking indicator with brain icon
const ThinkingIndicator = ({ isExpanded = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-1.5 px-2 py-1 rounded text-[9px] border bg-purple-500/10 border-purple-500/20 text-purple-400"
    >
      <Brain className="w-2.5 h-2.5" />
      <span>Thinking...</span>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-1.5 h-1.5 bg-purple-400 rounded-full"
      />
    </motion.div>
  );
};

const MockChatPanel = ({
  userMessage = '',
  aiResponse = '',
  showUserMessage = false,
  showAiResponse = false,
  isThinking = false,
  tools = [], // Array of { name, status: 'running' | 'completed' }
}) => {
  return (
    <div className="w-48 h-full border-l border-white/10 bg-white/[0.02] flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-gray-500" />
        <span className="text-[10px] text-gray-500 font-medium">AI Assistant</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 space-y-2 overflow-hidden">
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
        {isThinking && <ThinkingIndicator />}

        {/* Tool indicators */}
        {tools.length > 0 && (
          <div className="space-y-1.5 ml-1">
            {tools.map((tool, index) => (
              <ToolIndicator key={`${tool.name}-${index}`} tool={tool} />
            ))}
          </div>
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
