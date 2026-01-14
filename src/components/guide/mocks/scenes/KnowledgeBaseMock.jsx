import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Database, Search, CheckCircle, Loader2, Sparkles, MessageSquare, Send } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const KnowledgeBaseMock = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Show drag hint
      setTimeout(() => setPhase(2), 1500),  // File dropping
      setTimeout(() => setPhase(3), 2500),  // Processing
      setTimeout(() => setPhase(4), 4000),  // Indexed
      setTimeout(() => setPhase(5), 5000),  // Search query
      setTimeout(() => setPhase(6), 6500),  // Search results
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar - matches MockSidebar */}
        <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
            <Database className="w-3 h-3" />
            Knowledge Base
          </div>

          {/* Drop Zone */}
          <motion.div
            className={`
              h-28 border-2 border-dashed rounded-lg flex flex-col items-center justify-center
              ${phase >= 2 && phase < 4 ? 'border-white/40 bg-white/5' : 'border-white/10'}
            `}
            animate={{
              borderColor: phase >= 2 && phase < 4 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
            }}
          >
            {phase < 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <Upload className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                <p className="text-[9px] text-gray-500">Drop PDF, Word</p>
              </motion.div>
            )}

            {phase >= 2 && phase < 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-10 h-12 bg-white/10 border border-white/20 rounded mx-auto mb-1 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white/60" />
                </div>
                <p className="text-[9px] text-white mb-1">research.pdf</p>
                {phase === 3 && (
                  <div className="flex items-center gap-1 justify-center text-[8px] text-gray-400">
                    <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
              </motion.div>
            )}

            {phase >= 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="flex items-center gap-1 justify-center text-[9px] text-green-400 mb-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Indexed!</span>
                </div>
                <div className="w-10 h-12 bg-white/10 border border-white/20 rounded mx-auto flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white/60" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Editor area - placeholder */}
        <div className="flex-1 flex flex-col border-r border-white/10">
          <div className="px-4 py-2 border-b border-white/10 flex items-center gap-3">
            <FileText className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-[10px] text-gray-500">Document Preview</span>
          </div>
          <div className="flex-1 p-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              Upload documents to your knowledge base. The AI will use them to provide contextual answers.
            </p>
          </div>
        </div>

        {/* Chat Panel - matches MockChatPanel */}
        <div className="w-48 h-full border-l border-white/10 bg-white/[0.02] flex flex-col">
          <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-medium">AI Assistant</span>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-hidden">
            {phase >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="max-w-[90%] px-2.5 py-1.5 bg-white/10 rounded-lg rounded-br-sm">
                  <p className="text-[10px] text-white leading-relaxed">What are the main findings?</p>
                </div>
              </motion.div>
            )}

            {phase >= 6 && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-[9px] border bg-blue-500/10 border-blue-500/20 text-blue-400"
                >
                  <Search className="w-2.5 h-2.5" />
                  <span>Searching knowledge base...</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex"
                >
                  <div className="max-w-[90%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg rounded-bl-sm">
                    <p className="text-[10px] text-gray-300 leading-relaxed">
                      Based on the paper, the main findings include: 1) Improved accuracy by 15%...
                    </p>
                  </div>
                </motion.div>
              </>
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

export default KnowledgeBaseMock;
