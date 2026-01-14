import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, Clipboard, FileText, Type, Sparkles, MessageSquare, Send, Brain } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const ImageAnalysisMock = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Show paste action
      setTimeout(() => setPhase(2), 1500),  // Image appears
      setTimeout(() => setPhase(3), 2500),  // Analyzing
      setTimeout(() => setPhase(4), 4500),  // Results
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar - matches MockSidebar */}
        <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 px-1">
            Files
          </div>
          <div className="space-y-1">
            {['Chart Analysis.md', 'Screenshot Notes.md', 'OCR Results.md'].map((file, i) => (
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

          {/* Supported formats hint */}
          <div className="mt-4 p-2 bg-white/5 border border-white/10 rounded">
            <div className="flex items-center gap-1 text-[9px] text-gray-500 mb-1">
              <Image className="w-3 h-3" />
              <span>Supports:</span>
            </div>
            <ul className="space-y-0.5 text-[8px] text-gray-600 ml-4">
              <li>- Screenshots</li>
              <li>- Charts</li>
              <li>- Documents</li>
              <li>- Handwriting</li>
            </ul>
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

          <div className="flex-1 p-4">
            <h2 className="text-sm font-medium text-white mb-3">Chart Analysis</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Paste or drop images into the chat to analyze them with Claude Vision.
            </p>

            {/* Paste hint */}
            {phase === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center gap-2 text-[10px] text-gray-500"
              >
                <motion.div
                  animate={{ scale: [1, 0.95, 1] }}
                  transition={{ duration: 0.3, repeat: 2 }}
                  className="px-2 py-1 bg-white/10 border border-white/20 rounded flex items-center gap-1"
                >
                  <Clipboard className="w-3 h-3" />
                  <span>Ctrl+V</span>
                </motion.div>
                <span>Paste image...</span>
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
            {/* User message with image */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="max-w-[90%]">
                  <div className="px-2.5 py-1.5 bg-white/10 rounded-lg rounded-br-sm mb-1">
                    <p className="text-[10px] text-white leading-relaxed mb-1">Analyze this chart:</p>
                    <div className="w-24 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded flex items-center justify-center">
                      <div className="flex items-end gap-0.5 h-8">
                        {[40, 65, 45, 80, 55].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.1 }}
                            className="w-3 bg-white/40 rounded-t"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Thinking indicator */}
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-[9px] border bg-purple-500/10 border-purple-500/20 text-purple-400"
              >
                <Brain className="w-2.5 h-2.5" />
                <span>Analyzing image...</span>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                />
              </motion.div>
            )}

            {/* AI Response */}
            {phase >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex"
              >
                <div className="max-w-[90%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg rounded-bl-sm">
                  <p className="text-[10px] text-gray-300 leading-relaxed">
                    I can see a bar chart with 5 data points. Peak at position 4 (~80%), showing an upward trend.
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

export default ImageAnalysisMock;
