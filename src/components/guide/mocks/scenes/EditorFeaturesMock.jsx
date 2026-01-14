import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, Bold, Code, List, Table, CheckSquare, FileText, Sparkles, MessageSquare, Send } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const EditorFeaturesMock = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Select text
      setTimeout(() => setPhase(2), 1200),  // Hover Bold
      setTimeout(() => setPhase(3), 1800),  // Click Bold
      setTimeout(() => setPhase(4), 2500),  // Text becomes bold
      setTimeout(() => setPhase(5), 3500),  // Show other features
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const features = [
    { icon: Code, label: 'Code Blocks' },
    { icon: List, label: 'Lists' },
    { icon: Table, label: 'Tables' },
    { icon: CheckSquare, label: 'Tasks' },
  ];

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar - matches MockSidebar */}
        <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 px-1">
            Files
          </div>
          <div className="space-y-1">
            {['My Document.md', 'Project Notes.md', 'README.md'].map((file, i) => (
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

          {/* Features list */}
          {phase >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-2">
                Also supports
              </div>
              <div className="space-y-1.5">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-[9px] text-gray-400"
                    >
                      <Icon className="w-3 h-3 text-white/60" />
                      <span>{feature.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="px-4 py-2 border-b border-white/10 flex items-center gap-3">
            <Type className="w-3.5 h-3.5 text-gray-600" />
            <div className="flex gap-1">
              {['B', 'I', 'U'].map((btn, i) => (
                <motion.div
                  key={btn}
                  animate={{
                    backgroundColor: phase >= 2 && phase < 4 && i === 0 ? 'rgba(255,255,255,0.2)' : 'transparent',
                    borderColor: phase >= 2 && phase < 4 && i === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
                    scale: phase === 3 && i === 0 ? 0.95 : 1,
                  }}
                  className="w-6 h-6 flex items-center justify-center text-[10px] text-gray-600 border border-white/10 rounded cursor-pointer"
                >
                  {btn}
                </motion.div>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <div className="flex gap-1">
              {[Code, List, Table, CheckSquare].map((Icon, i) => (
                <div
                  key={i}
                  className="w-6 h-6 flex items-center justify-center text-gray-600 border border-white/10 rounded"
                >
                  <Icon className="w-3 h-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <h2 className="text-sm font-medium text-white mb-3">My Document</h2>

            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Welcome to the rich Markdown editor.{' '}
              <motion.span
                animate={{
                  backgroundColor: phase >= 1 && phase < 4 ? 'rgba(255,255,255,0.2)' : 'transparent',
                  fontWeight: phase >= 4 ? 700 : 400,
                }}
                className="px-0.5 rounded"
              >
                This text can be formatted
              </motion.span>{' '}
              using the toolbar above.
            </p>

            {phase >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-[9px] text-green-400"
              >
                <Bold className="w-3 h-3" />
                Text formatted as bold!
              </motion.div>
            )}

            {/* Code block example */}
            {phase >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-white/5 border border-white/10 rounded"
              >
                <div className="text-[9px] text-gray-600 mb-1">// Code block example</div>
                <div className="text-[10px] text-green-400 font-mono">
                  const message = "Hello, World!";
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Chat Panel - matches MockChatPanel */}
        <div className="w-48 h-full border-l border-white/10 bg-white/[0.02] flex flex-col">
          <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-medium">AI Assistant</span>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-hidden">
            <div className="flex">
              <div className="max-w-[90%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg rounded-bl-sm">
                <p className="text-[10px] text-gray-300 leading-relaxed">
                  I can help you format and structure your documents.
                </p>
              </div>
            </div>
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

export default EditorFeaturesMock;
