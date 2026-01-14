import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, Check, X } from 'lucide-react';
import { MockSidebar } from '../components';

const DiffAcceptScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  // Phase 0: Initial - show original text
  // Phase 1: AI suggests changes (diff appears)
  // Phase 2: Hover on accept button
  // Phase 3: First change accepted
  // Phase 4: Hover on second accept
  // Phase 5: Second change accepted
  // Phase 6: All changes processed, review complete

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }

    setPhase(0);

    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 2500);
    const t4 = setTimeout(() => setPhase(4), 3500);
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

  const change1Accepted = phase >= 3;
  const change2Accepted = phase >= 5;
  const showDiff = phase >= 1 && phase < 6;

  return (
    <div className="flex h-full w-full bg-black absolute inset-0">
      <MockSidebar />

      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
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

        {/* Review Mode Banner */}
        {showDiff && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              <span className="text-[10px] text-amber-400 font-medium">Review Mode</span>
              <span className="text-[10px] text-amber-400/60">
                {change1Accepted && change2Accepted ? '0' : change1Accepted ? '1' : '2'} pending changes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-0.5 text-[9px] text-red-400 hover:bg-red-500/10 rounded">
                Reject All
              </button>
              <button className="px-2 py-0.5 text-[9px] text-green-400 hover:bg-green-500/10 rounded">
                Accept All
              </button>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <h2 className="text-sm font-medium text-white mb-3">Introduction</h2>

          <div className="space-y-3 text-xs leading-relaxed">
            {/* First paragraph with diff */}
            <div>
              {!change1Accepted && showDiff ? (
                <div className="space-y-1">
                  {/* Deleted text */}
                  <span className="bg-red-500/15 text-gray-500 line-through px-1 rounded">
                    The product is good and helps users do things faster.
                  </span>

                  {/* Diff actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 my-1.5"
                  >
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 rounded">
                      <span className="text-[8px] text-gray-500 uppercase">Replace</span>
                      <motion.button
                        animate={phase === 2 ? { scale: 1.2 } : {}}
                        className="w-4 h-4 bg-green-500/80 hover:bg-green-500 rounded flex items-center justify-center"
                      >
                        <Check className="w-2.5 h-2.5 text-white" />
                      </motion.button>
                      <button className="w-4 h-4 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center">
                        <X className="w-2.5 h-2.5 text-white" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Inserted text preview */}
                  <div className="bg-green-500/15 border border-green-500/30 text-gray-300 px-2 py-1 rounded">
                    Our product delivers exceptional value by streamlining workflows and significantly improving user productivity.
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">
                  {change1Accepted
                    ? 'Our product delivers exceptional value by streamlining workflows and significantly improving user productivity.'
                    : 'The product is good and helps users do things faster.'}
                </p>
              )}
            </div>

            {/* Second paragraph with diff */}
            <div>
              {!change2Accepted && showDiff ? (
                <div className="space-y-1">
                  {/* Deleted text */}
                  <span className="bg-red-500/15 text-gray-500 line-through px-1 rounded">
                    It has many features that are useful.
                  </span>

                  {/* Diff actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 my-1.5"
                  >
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 rounded">
                      <span className="text-[8px] text-gray-500 uppercase">Replace</span>
                      <motion.button
                        animate={phase === 4 ? { scale: 1.2 } : {}}
                        className="w-4 h-4 bg-green-500/80 hover:bg-green-500 rounded flex items-center justify-center"
                      >
                        <Check className="w-2.5 h-2.5 text-white" />
                      </motion.button>
                      <button className="w-4 h-4 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center">
                        <X className="w-2.5 h-2.5 text-white" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Inserted text preview */}
                  <div className="bg-green-500/15 border border-green-500/30 text-gray-300 px-2 py-1 rounded">
                    The platform offers a comprehensive suite of features including real-time collaboration, AI-powered suggestions, and seamless integrations.
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">
                  {change2Accepted
                    ? 'The platform offers a comprehensive suite of features including real-time collaboration, AI-powered suggestions, and seamless integrations.'
                    : 'It has many features that are useful.'}
                </p>
              )}
            </div>

            {/* Static paragraph */}
            <p className="text-gray-400">
              Get started today and transform the way you work.
            </p>
          </div>

          {/* Success message when all accepted */}
          {phase >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg"
            >
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[10px] text-green-400">All changes applied successfully</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiffAcceptScene;
