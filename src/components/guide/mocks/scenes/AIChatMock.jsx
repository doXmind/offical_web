import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, FileText, MessageSquare, Sparkles, Send, Brain, Eye, FileEdit, Check, Loader2 } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const AI_CHAT_CONTENT = {
  userMessage: "Help me improve this paragraph to sound more professional",
  aiResponse: "I'll enhance the paragraph with more formal language and clearer structure...",
  originalText: "Writing is hard. Many people struggle to express their ideas clearly.",
  improvedText: "Effective writing requires deliberate practice. Many individuals encounter challenges articulating their ideas with precision.",
};

// Tool indicator component - matches Home page MockChatPanel
const ToolIndicator = ({ tool }) => {
  const toolConfig = {
    'view_document': { icon: Eye, label: 'Reading document' },
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

const AIChatMock = () => {
  const [phase, setPhase] = useState(0);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => {
      setPhase(3);
      setTools([{ name: 'view_document', status: 'running' }]);
    }, 1800);
    const t4 = setTimeout(() => {
      setPhase(4);
      setTools([
        { name: 'view_document', status: 'completed' },
        { name: 'edit_text', status: 'running' },
      ]);
    }, 2800);
    const t5 = setTimeout(() => {
      setPhase(5);
      setTools([
        { name: 'view_document', status: 'completed' },
        { name: 'edit_text', status: 'completed' },
      ]);
    }, 3800);
    const t6 = setTimeout(() => setPhase(6), 4300);
    const t7 = setTimeout(() => setPhase(7), 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, []);

  const isThinking = phase === 2;
  const showTools = phase >= 3 && phase <= 6;

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar */}
        <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 px-1">
            Files
          </div>
          <div className="space-y-1">
            {['AI Writing Guide.md', 'Project Notes.md', 'Meeting Summary.md'].map((file, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                  i === 0 ? 'bg-white/10 text-white' : 'text-gray-500'
                }`}
              >
                <FileText className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{file}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-2 border-b border-white/10 flex items-center gap-3">
            <Type className="w-3.5 h-3.5 text-gray-600" />
            <div className="flex gap-1">
              {['B', 'I', 'U'].map((btn) => (
                <div
                  key={btn}
                  className="w-6 h-6 flex items-center justify-center text-[10px] text-gray-600 border border-white/10 rounded"
                >
                  {btn}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 overflow-hidden">
            <h2 className="text-sm font-medium text-white mb-3">Introduction</h2>

            <div className="relative">
              {phase < 7 ? (
                <p
                  className={`text-xs text-gray-400 leading-relaxed transition-all duration-300 ${
                    phase >= 3 && phase < 7 ? 'bg-white/5 px-2 py-1 rounded border-l-2 border-blue-500/50' : ''
                  }`}
                >
                  {AI_CHAT_CONTENT.originalText}
                  {phase >= 3 && phase < 5 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2 text-[9px] text-blue-400"
                    >
                      ← AI is reading...
                    </motion.span>
                  )}
                  {phase >= 4 && phase < 6 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-2 text-[9px] text-blue-400"
                    >
                      ← Editing...
                    </motion.span>
                  )}
                </p>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-300 leading-relaxed bg-green-500/5 px-2 py-1 rounded border-l-2 border-green-500/50"
                >
                  {AI_CHAT_CONTENT.improvedText}
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Chat Panel - matches MockChatPanel */}
        <div className="w-48 h-full border-l border-white/10 bg-white/[0.02] flex flex-col">
          <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-medium">AI Assistant</span>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-hidden">
            {/* User message */}
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="max-w-[90%] px-2.5 py-1.5 bg-white/10 rounded-lg rounded-br-sm">
                  <p className="text-[10px] text-white leading-relaxed">{AI_CHAT_CONTENT.userMessage}</p>
                </div>
              </motion.div>
            )}

            {/* Thinking indicator */}
            {isThinking && (
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
            )}

            {/* Tool indicators */}
            {showTools && tools.length > 0 && (
              <div className="space-y-1.5 ml-1">
                {tools.map((tool, index) => (
                  <ToolIndicator key={`${tool.name}-${index}`} tool={tool} />
                ))}
              </div>
            )}

            {/* AI response */}
            {phase >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex"
              >
                <div className="max-w-[90%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg rounded-bl-sm">
                  <p className="text-[10px] text-gray-300 leading-relaxed">
                    {AI_CHAT_CONTENT.aiResponse}
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
      </div>
    </GuideMockContainer>
  );
};

export default AIChatMock;
