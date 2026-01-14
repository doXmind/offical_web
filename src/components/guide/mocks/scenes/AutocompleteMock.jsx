import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, FileText, Sparkles } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const AUTOCOMPLETE_CONTENT = {
  typedText: "Today I want to discuss ",
  suggestion: "the importance of clear communication in modern workplaces.",
};

const AutocompleteMock = () => {
  const [phase, setPhase] = useState(0);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // Start typing
      setTimeout(() => setPhase(2), 2000),  // Pause
      setTimeout(() => setPhase(3), 2300),  // Show suggestion
      setTimeout(() => setPhase(4), 3000),  // Show Tab hint
      setTimeout(() => setPhase(5), 4000),  // Press Tab
      setTimeout(() => setPhase(6), 4500),  // Accept
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Typing effect
  useEffect(() => {
    if (phase < 1 || phase > 2) return;

    const text = AUTOCOMPLETE_CONTENT.typedText;
    if (typedChars >= text.length) return;

    const interval = setInterval(() => {
      setTypedChars(c => {
        if (c >= text.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [phase, typedChars]);

  const showSuggestion = phase >= 3 && phase < 5;
  const suggestionAccepted = phase >= 5;
  const showTabHint = phase === 4;

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar - matches MockSidebar */}
        <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 px-1">
            Files
          </div>
          <div className="space-y-1">
            {['Blog Post.md', 'Draft Notes.md', 'Ideas.md'].map((file, i) => (
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
          <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
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

            <div className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-500">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <Sparkles className="w-2.5 h-2.5" />
              <span>Autocomplete: On</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <h2 className="text-sm font-medium text-white mb-3">My Blog Post</h2>

            <div className="text-xs text-gray-400 leading-relaxed">
              {/* Typed text */}
              <span>{AUTOCOMPLETE_CONTENT.typedText.slice(0, typedChars)}</span>

              {/* Blinking cursor when paused */}
              {phase === 2 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-0.5 h-4 bg-white ml-0.5"
                />
              )}

              {/* Ghost suggestion */}
              {showSuggestion && (
                <span className="text-gray-600">{AUTOCOMPLETE_CONTENT.suggestion}</span>
              )}

              {/* Accepted text */}
              {suggestionAccepted && (
                <motion.span
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300"
                >
                  {AUTOCOMPLETE_CONTENT.suggestion}
                </motion.span>
              )}
            </div>

            {/* Tab hint */}
            {showTabHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2"
              >
                <div className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[10px] text-gray-400 font-mono">
                  Tab
                </div>
                <span className="text-[10px] text-gray-600">to accept</span>
              </motion.div>
            )}

            {/* Tab key press */}
            {phase === 5 && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center gap-2"
              >
                <div className="px-2 py-0.5 bg-white/20 border border-white/30 rounded text-[10px] text-white font-mono">
                  Tab
                </div>
              </motion.div>
            )}

            {/* Success indicator */}
            {phase >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-1.5 text-[10px] text-green-400"
              >
                <Sparkles className="w-3 h-3" />
                <span>Suggestion accepted!</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </GuideMockContainer>
  );
};

export default AutocompleteMock;
