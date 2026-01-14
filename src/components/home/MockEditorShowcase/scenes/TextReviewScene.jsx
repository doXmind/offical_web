import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, SpellCheck, Check, X, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import { MockSidebar } from '../components';

const TextReviewScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  // Phase 0: Initial - document text shown
  // Phase 1: Click Review button
  // Phase 2: Analyzing (loading)
  // Phase 3: Suggestions appear (underlines + panel)
  // Phase 4: Click on first suggestion
  // Phase 5: Accept first suggestion
  // Phase 6: Hover on second suggestion
  // Phase 7: Accept second suggestion, show success

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }

    setPhase(0);

    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setPhase(4), 3200);
    const t5 = setTimeout(() => setPhase(5), 4000);
    const t6 = setTimeout(() => setPhase(6), 5000);
    const t7 = setTimeout(() => setPhase(7), 5800);

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

  const suggestions = [
    {
      id: 1,
      category: 'correctness',
      type: 'GRAMMAR',
      original: 'Their going',
      replacement: "They're going",
      explanation: 'Use "they\'re" (contraction of they are)',
      color: '#EF4444', // red
    },
    {
      id: 2,
      category: 'clarity',
      type: 'CLARITY',
      original: 'very good',
      replacement: 'excellent',
      explanation: 'More concise word choice',
      color: '#3B82F6', // blue
    },
  ];

  const suggestion1Accepted = phase >= 5;
  const suggestion2Accepted = phase >= 7;
  const showPanel = phase >= 3;
  const isAnalyzing = phase === 2;

  return (
    <div className="flex h-full w-full bg-black absolute inset-0">
      <MockSidebar />

      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
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

          {/* Review Button */}
          <motion.button
            animate={phase === 1 ? { scale: [1, 1.1, 1] } : {}}
            className={`
              flex items-center gap-1.5 px-2 py-1 rounded text-[10px] transition-colors
              ${phase >= 1 && phase < 3 ? 'bg-white/10 text-white' : ''}
              ${phase >= 3 ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}
            `}
          >
            {isAnalyzing ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <SpellCheck className="w-3 h-3" />
            )}
            <span>{isAnalyzing ? 'Analyzing...' : 'Review'}</span>
            {phase >= 3 && !suggestion1Accepted && !suggestion2Accepted && (
              <span className="ml-1 px-1 py-0.5 bg-purple-500/30 rounded text-[8px]">2</span>
            )}
            {phase >= 5 && !suggestion2Accepted && (
              <span className="ml-1 px-1 py-0.5 bg-purple-500/30 rounded text-[8px]">1</span>
            )}
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <h2 className="text-sm font-medium text-white mb-3">Meeting Notes</h2>

          <div className="text-xs text-gray-400 leading-relaxed space-y-2">
            <p>
              {/* First sentence with suggestion */}
              {!suggestion1Accepted && phase >= 3 ? (
                <>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`
                      cursor-pointer transition-colors
                      ${phase === 4 ? 'bg-red-500/20 rounded px-0.5' : ''}
                    `}
                    style={{
                      textDecoration: 'underline wavy #EF4444',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    Their going
                  </motion.span>
                  {' '}to launch the product next month.
                </>
              ) : (
                <>
                  {suggestion1Accepted ? (
                    <span className="text-gray-300">They're going</span>
                  ) : (
                    'Their going'
                  )}
                  {' '}to launch the product next month.
                </>
              )}
            </p>

            <p>
              {/* Second sentence with suggestion */}
              The results have been{' '}
              {!suggestion2Accepted && phase >= 3 ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`
                    cursor-pointer transition-colors
                    ${phase === 6 ? 'bg-blue-500/20 rounded px-0.5' : ''}
                  `}
                  style={{
                    textDecoration: 'underline wavy #3B82F6',
                    textUnderlineOffset: '3px',
                  }}
                >
                  very good
                </motion.span>
              ) : (
                <span className={suggestion2Accepted ? 'text-gray-300' : ''}>
                  {suggestion2Accepted ? 'excellent' : 'very good'}
                </span>
              )}
              {' '}so far.
            </p>

            <p>We expect strong performance in Q4.</p>
          </div>

          {/* Popup when clicking suggestion */}
          {phase === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-20 top-28 w-48 bg-black border border-white/20 rounded-lg shadow-xl p-2 z-20"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[8px] rounded uppercase">
                  Grammar
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] mb-2">
                <span className="text-red-400 line-through">Their going</span>
                <span className="text-gray-500">→</span>
                <span className="text-green-400">They're going</span>
              </div>
              <p className="text-[9px] text-gray-500 mb-2">
                Use "they're" (contraction of they are)
              </p>
              <div className="flex gap-1.5">
                <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-[9px] hover:bg-green-500/30">
                  <Check className="w-2.5 h-2.5" />
                  Accept
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-white/5 text-gray-400 rounded text-[9px] hover:bg-white/10">
                  <X className="w-2.5 h-2.5" />
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}

          {/* Success message */}
          {phase >= 7 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg"
            >
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[10px] text-green-400">All suggestions reviewed</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Review Panel */}
      {showPanel && phase < 7 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-44 border-l border-white/10 bg-white/[0.02] flex flex-col"
        >
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-medium">Review</span>
            <span className="text-[9px] text-gray-500">
              {suggestion1Accepted && suggestion2Accepted ? '0' : suggestion1Accepted ? '1' : '2'} issues
            </span>
          </div>

          <div className="flex-1 p-2 space-y-2 overflow-hidden">
            {/* Correctness category */}
            {!suggestion1Accepted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`
                  p-2 rounded border transition-colors cursor-pointer
                  ${phase === 4 ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10 hover:border-white/20'}
                `}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span className="text-[9px] text-gray-400 uppercase">Correctness</span>
                </div>
                <div className="text-[10px]">
                  <span className="text-red-400 line-through">Their</span>
                  <span className="text-gray-500 mx-1">→</span>
                  <span className="text-green-400">They're</span>
                </div>
              </motion.div>
            )}

            {/* Clarity category */}
            {!suggestion2Accepted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className={`
                  p-2 rounded border transition-colors cursor-pointer
                  ${phase === 6 ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10 hover:border-white/20'}
                `}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span className="text-[9px] text-gray-400 uppercase">Clarity</span>
                </div>
                <div className="text-[10px]">
                  <span className="text-blue-400 line-through">very good</span>
                  <span className="text-gray-500 mx-1">→</span>
                  <span className="text-green-400">excellent</span>
                </div>
              </motion.div>
            )}

            {/* Empty state */}
            {suggestion1Accepted && suggestion2Accepted && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Check className="w-6 h-6 text-green-400 mb-2" />
                <span className="text-[10px] text-gray-500">All done!</span>
              </div>
            )}
          </div>

          {/* Panel actions */}
          {(!suggestion1Accepted || !suggestion2Accepted) && (
            <div className="px-2 py-2 border-t border-white/10 flex gap-1.5">
              <button className="flex-1 px-2 py-1 text-[9px] text-green-400 bg-green-500/10 rounded hover:bg-green-500/20">
                Accept All
              </button>
              <button className="flex-1 px-2 py-1 text-[9px] text-gray-400 bg-white/5 rounded hover:bg-white/10">
                Dismiss All
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TextReviewScene;
