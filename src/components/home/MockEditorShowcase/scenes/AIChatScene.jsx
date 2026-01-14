import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type } from 'lucide-react';
import { MockSidebar, MockChatPanel } from '../components';
import { AI_CHAT_CONTENT } from '../constants/demoContent';

const AIChatScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }

    setPhase(0);

    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2500);
    const t4 = setTimeout(() => setPhase(4), 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive]);

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
            {phase < 4 ? (
              <p
                className={`text-xs text-gray-400 leading-relaxed transition-all duration-300 ${
                  phase >= 2 ? 'bg-white/5 px-2 py-1 rounded border-l-2 border-white/30' : ''
                }`}
              >
                {AI_CHAT_CONTENT.originalText}
              </p>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-300 leading-relaxed bg-white/5 px-2 py-1 rounded border-l-2 border-white/50"
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
        isThinking={phase === 2}
        showAiResponse={phase >= 3}
        aiResponseDelay={0}
      />
    </div>
  );
};

export default AIChatScene;
