import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type } from 'lucide-react';
import { MockSidebar } from '../components';
import { AUTOCOMPLETE_CONTENT } from '../constants/demoContent';

const AutocompleteScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [continuedChars, setContinuedChars] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setTypedChars(0);
      setContinuedChars(0);
      return;
    }

    setPhase(0);
    setTypedChars(0);
    setContinuedChars(0);

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 2300);
    const t4 = setTimeout(() => setPhase(4), 3000);
    const t5 = setTimeout(() => setPhase(5), 4000);
    const t6 = setTimeout(() => setPhase(6), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isActive]);

  // Typing animation for main text
  useEffect(() => {
    if (phase < 1 || phase > 2) return;

    const text = AUTOCOMPLETE_CONTENT.typedText;
    if (typedChars >= text.length) return;

    const timer = setInterval(() => {
      setTypedChars(c => {
        if (c >= text.length) {
          clearInterval(timer);
          return c;
        }
        return c + 1;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [phase, typedChars]);

  // Typing animation for continued text
  useEffect(() => {
    if (phase < 6) return;

    const text = AUTOCOMPLETE_CONTENT.continuedText;
    if (continuedChars >= text.length) return;

    const timer = setInterval(() => {
      setContinuedChars(c => {
        if (c >= text.length) {
          clearInterval(timer);
          return c;
        }
        return c + 1;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [phase, continuedChars]);

  const showSuggestion = phase >= 3 && phase < 5;
  const suggestionAccepted = phase >= 5;
  const showTabHint = phase === 4;

  return (
    <div className="flex h-full w-full bg-black absolute inset-0">
      <MockSidebar />

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
            <span>Autocomplete: On</span>
          </div>
        </div>

        <div className="flex-1 p-4">
          <h2 className="text-sm font-medium text-white mb-3">My Blog Post</h2>

          <div className="text-xs text-gray-400 leading-relaxed">
            {/* Typed text */}
            <span>
              {AUTOCOMPLETE_CONTENT.typedText.slice(0, typedChars)}
            </span>

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
              <span className="text-gray-600">
                {AUTOCOMPLETE_CONTENT.suggestion}
              </span>
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

            {/* Continued text */}
            {phase >= 6 && (
              <>
                <br />
                <br />
                <span>
                  {AUTOCOMPLETE_CONTENT.continuedText.slice(0, continuedChars)}
                </span>
              </>
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
        </div>
      </div>
    </div>
  );
};

export default AutocompleteScene;
