import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Keyboard, Type, FileText, Sparkles, MessageSquare, Send } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const KeyboardShortcutsMock = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Select text
      setTimeout(() => setPhase(2), 1200),  // Press Ctrl
      setTimeout(() => setPhase(3), 1500),  // Press B
      setTimeout(() => setPhase(4), 1800),  // Release
      setTimeout(() => setPhase(5), 2200),  // Text becomes bold
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const shortcuts = [
    { keys: ['Ctrl', 'B'], action: 'Bold' },
    { keys: ['Ctrl', 'I'], action: 'Italic' },
    { keys: ['Ctrl', 'U'], action: 'Underline' },
    { keys: ['Ctrl', 'S'], action: 'Save' },
    { keys: ['Ctrl', 'Z'], action: 'Undo' },
  ];

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar - matches MockSidebar */}
        <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-600 uppercase tracking-wider mb-3 px-1">
            <Keyboard className="w-3 h-3" />
            Quick Reference
          </div>

          <div className="space-y-1.5">
            {shortcuts.map((shortcut, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`
                  flex items-center justify-between p-1.5 rounded
                  ${i === 0 && phase >= 2 ? 'bg-white/10 border border-white/20' : 'border border-transparent'}
                `}
              >
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, j) => (
                    <React.Fragment key={j}>
                      <span className="px-1.5 py-0.5 bg-white/10 border border-white/20 rounded text-[8px] text-gray-300">
                        {key}
                      </span>
                      {j < shortcut.keys.length - 1 && (
                        <span className="text-[8px] text-gray-600">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <span className="text-[9px] text-gray-500">{shortcut.action}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-2 bg-white/5 border border-white/10 rounded">
            <div className="text-[9px] text-gray-500 mb-1">Pro Tip</div>
            <p className="text-[8px] text-gray-600">
              Select text first, then use shortcuts for instant formatting.
            </p>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-2 border-b border-white/10 flex items-center gap-3">
            <Type className="w-3.5 h-3.5 text-gray-600" />
            <div className="flex gap-1">
              {['B', 'I', 'U'].map((btn, i) => (
                <motion.div
                  key={btn}
                  animate={{
                    backgroundColor: phase >= 3 && i === 0 ? 'rgba(255,255,255,0.2)' : 'transparent',
                    borderColor: phase >= 3 && i === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
                  }}
                  className="w-6 h-6 flex items-center justify-center text-[10px] text-gray-600 border border-white/10 rounded"
                >
                  {btn}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4">
            <h2 className="text-sm font-medium text-white mb-3">Document</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Use keyboard shortcuts for faster editing.{' '}
              <motion.span
                animate={{
                  backgroundColor: phase >= 1 && phase < 5 ? 'rgba(255,255,255,0.15)' : 'transparent',
                  fontWeight: phase >= 5 ? 700 : 400,
                }}
                className="px-0.5 rounded"
              >
                This text will be bold
              </motion.span>{' '}
              after pressing Ctrl+B.
            </p>

            {/* Keyboard visualization */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <motion.div
                animate={{
                  scale: phase >= 2 && phase < 4 ? 0.95 : 1,
                  backgroundColor: phase >= 2 && phase < 4 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                  borderColor: phase >= 2 && phase < 4 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                }}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded text-[10px] text-gray-300"
              >
                Ctrl
              </motion.div>
              <span className="text-gray-600">+</span>
              <motion.div
                animate={{
                  scale: phase === 3 ? 0.95 : 1,
                  backgroundColor: phase === 3 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                  borderColor: phase === 3 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                }}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded text-[10px] text-gray-300 font-bold"
              >
                B
              </motion.div>
            </div>

            {phase >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-[10px] text-green-400"
              >
                Text formatted as bold!
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
                  I can help you learn and use keyboard shortcuts efficiently.
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

export default KeyboardShortcutsMock;
