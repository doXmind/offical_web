import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Type, MessageSquare, Sparkles, Send } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const InterfaceOverviewMock = () => {
  const [highlightIndex, setHighlightIndex] = useState(-1);

  useEffect(() => {
    const sequence = [0, 1, 2, -1];
    let index = 0;

    const interval = setInterval(() => {
      setHighlightIndex(sequence[index]);
      index = (index + 1) % sequence.length;
    }, 2000);

    setTimeout(() => setHighlightIndex(0), 500);

    return () => clearInterval(interval);
  }, []);

  const labels = ['File Management', 'Writing Area', 'AI Assistant'];

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar - matches MockSidebar style */}
        <motion.div
          className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3 relative"
          animate={{
            borderColor: highlightIndex === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
          }}
        >
          {highlightIndex === 0 && (
            <motion.div
              className="absolute inset-0 bg-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
          <div className="relative z-10">
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
          {highlightIndex === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] rounded whitespace-nowrap z-20"
            >
              {labels[0]}
            </motion.div>
          )}
        </motion.div>

        {/* Editor - matches Home page editor style */}
        <motion.div
          className="flex-1 flex flex-col relative"
          animate={{
            boxShadow: highlightIndex === 1 ? 'inset 0 0 0 1px rgba(255,255,255,0.3)' : 'none',
          }}
        >
          {highlightIndex === 1 && (
            <motion.div
              className="absolute inset-0 bg-white/5 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
          <div className="px-4 py-2 border-b border-white/10 flex items-center gap-3 relative z-10">
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
          <div className="flex-1 p-4 relative z-10">
            <h2 className="text-sm font-medium text-white mb-3">AI Writing Guide</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Welcome to doXmind, your AI-powered writing assistant. This guide will help you get started with the key features.
            </p>
          </div>
          {highlightIndex === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] rounded whitespace-nowrap z-20"
            >
              {labels[1]}
            </motion.div>
          )}
        </motion.div>

        {/* Chat Panel - matches MockChatPanel style */}
        <motion.div
          className="w-48 h-full border-l border-white/10 bg-white/[0.02] flex flex-col relative"
          animate={{
            borderColor: highlightIndex === 2 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
          }}
        >
          {highlightIndex === 2 && (
            <motion.div
              className="absolute inset-0 bg-white/5 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
          <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2 relative z-10">
            <Sparkles className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-medium">AI Assistant</span>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-hidden relative z-10">
            <div className="flex justify-end">
              <div className="max-w-[90%] px-2.5 py-1.5 bg-white/10 rounded-lg rounded-br-sm">
                <p className="text-[10px] text-white leading-relaxed">How can I help?</p>
              </div>
            </div>
            <div className="flex">
              <div className="max-w-[90%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg rounded-bl-sm">
                <p className="text-[10px] text-gray-300 leading-relaxed">
                  I can help you write, edit, and improve your documents.
                </p>
              </div>
            </div>
          </div>
          <div className="px-3 py-2 border-t border-white/10 relative z-10">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg">
              <MessageSquare className="w-3 h-3 text-gray-600" />
              <span className="text-[10px] text-gray-600 flex-1">Ask anything...</span>
              <Send className="w-3 h-3 text-gray-600" />
            </div>
          </div>
          {highlightIndex === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] rounded whitespace-nowrap z-20"
            >
              {labels[2]}
            </motion.div>
          )}
        </motion.div>
      </div>
    </GuideMockContainer>
  );
};

export default InterfaceOverviewMock;
