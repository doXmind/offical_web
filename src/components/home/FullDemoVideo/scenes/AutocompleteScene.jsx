import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { DemoHeader, DemoToolbar, DemoSidebar } from '../components';
import { AUTOCOMPLETE_CONTENT, UI_CONTENT } from '../constants/demoContent';
import { ITEM_SPRING, MOBILE_SPRINGS } from '../constants/animationConfig';

const AutocompleteScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showGhostText, setShowGhostText] = useState(false);
  const [showTabHint, setShowTabHint] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial
  // 1: Typing "Today I want to discuss"
  // 2: Pause, cursor blinking
  // 3: Ghost text appears
  // 4: Tab hint appears
  // 5: Tab pressed, ghost text becomes solid
  // 6: Continue typing or done

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setTypedText('');
      setShowGhostText(false);
      setShowTabHint(false);
      setIsAccepted(false);
      setShowCursor(true);
      return;
    }

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const addTimeout = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
    };

    // Reset
    setPhase(0);
    setTypedText('');
    setShowGhostText(false);
    setShowTabHint(false);
    setIsAccepted(false);
    setShowCursor(true);

    // Type the initial text
    const text = AUTOCOMPLETE_CONTENT.typedText;
    let charIdx = 0;

    addTimeout(() => {
      setPhase(1);
      const typeInterval = setInterval(() => {
        if (charIdx < text.length) {
          setTypedText(text.slice(0, charIdx + 1));
          charIdx++;
        } else {
          clearInterval(typeInterval);
        }
      }, 60);
      timeoutsRef.current.push(typeInterval);
    }, 300);

    // Pause and show ghost text
    addTimeout(() => {
      setPhase(2);
    }, 2000);

    addTimeout(() => {
      setPhase(3);
      setShowGhostText(true);
    }, 2800);

    // Show Tab hint
    addTimeout(() => {
      setPhase(4);
      setShowTabHint(true);
    }, 3600);

    // Accept with Tab
    addTimeout(() => {
      setPhase(5);
      setShowTabHint(false);
      setIsAccepted(true);
      setShowGhostText(false);
    }, 4800);

    // Final state
    addTimeout(() => {
      setPhase(6);
    }, 5500);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isActive]);

  const fullText = isAccepted
    ? AUTOCOMPLETE_CONTENT.typedText + AUTOCOMPLETE_CONTENT.suggestion
    : typedText;

  return (
    <div className="flex flex-col h-full w-full bg-black absolute inset-0">
      {/* Header */}
      <DemoHeader
        fileName="Daily Thoughts.md"
        isDirty={typedText.length > 0}
        isSidebarOpen={true}
        isChatOpen={false}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <DemoSidebar
          files={UI_CONTENT.files}
          activeFileId="project"
        />

        <div className="flex-1 flex flex-col min-w-0">
          <DemoToolbar
            activeButtons={[]}
            showAutocomplete={true}
            autocompleteMode="Auto"
          />

          <div className="flex-1 p-4 md:p-6 overflow-hidden">
            <div className="max-w-lg">
              <h1 className="text-lg md:text-xl font-bold text-white mb-4">
                Daily Thoughts
              </h1>

            <div className="relative">
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                {fullText}
                {/* Ghost text suggestion */}
                {showGhostText && !isAccepted && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ type: 'spring', ...MOBILE_SPRINGS.SMOOTH }}
                    className="text-gray-500 italic"
                  >
                    {AUTOCOMPLETE_CONTENT.suggestion}
                  </motion.span>
                )}
                {/* Cursor */}
                {showCursor && !showGhostText && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-4 bg-white ml-0.5"
                  />
                )}
              </p>

              {/* Tab hint */}
              <AnimatePresence>
                {showTabHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: 'spring', ...ITEM_SPRING }}
                    className="absolute -bottom-8 left-0"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="px-2 py-1 bg-white/10 border border-white/30 rounded text-[10px] text-white font-mono ring-2 ring-white/20"
                      >
                        Tab
                      </motion.div>
                      <span className="text-[10px] text-gray-500">
                        {AUTOCOMPLETE_CONTENT.tabHint}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accepted indicator */}
            {isAccepted && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', ...MOBILE_SPRINGS.BOUNCY }}
                className="mt-6 flex items-center gap-2 text-[10px] text-green-400"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}
                  className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <Check className="w-3 h-3" />
                </motion.div>
                Suggestion accepted
              </motion.div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutocompleteScene;
