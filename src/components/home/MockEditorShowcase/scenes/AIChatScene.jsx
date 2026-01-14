import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type } from 'lucide-react';
import { MockSidebar, MockChatPanel } from '../components';
import { AI_CHAT_CONTENT } from '../constants/demoContent';

const AIChatScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [tools, setTools] = useState([]);
  // Phase 0: Initial
  // Phase 1: User sends message
  // Phase 2: AI thinking
  // Phase 3: Tool 1 - Reading document (running)
  // Phase 4: Tool 1 completed, Tool 2 - Editing text (running)
  // Phase 5: Tool 2 completed
  // Phase 6: AI response appears
  // Phase 7: Document updated

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setTools([]);
      return;
    }

    setPhase(0);
    setTools([]);

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
  }, [isActive]);

  const isThinking = phase === 2;
  const showTools = phase >= 3 && phase <= 6;

  return (
    <div className="flex h-full w-full bg-black absolute inset-0">
      <MockSidebar />

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
                {/* Reading indicator */}
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
                {/* Editing indicator */}
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

      <MockChatPanel
        userMessage={AI_CHAT_CONTENT.userMessage}
        aiResponse={AI_CHAT_CONTENT.aiResponse}
        showUserMessage={phase >= 1}
        isThinking={isThinking}
        tools={showTools ? tools : []}
        showAiResponse={phase >= 6}
      />
    </div>
  );
};

export default AIChatScene;
