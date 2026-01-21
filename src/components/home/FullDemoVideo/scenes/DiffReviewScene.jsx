import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';
import { DemoHeader, DemoToolbar, DemoSidebar } from '../components';
import { DIFF_REVIEW_CONTENT, UI_CONTENT } from '../constants/demoContent';
import { ITEM_SPRING, MOBILE_SPRINGS } from '../constants/animationConfig';

const DiffReviewScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [showBanner, setShowBanner] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [acceptedChanges, setAcceptedChanges] = useState([]);
  const [hoveredChange, setHoveredChange] = useState(null);
  const [showComplete, setShowComplete] = useState(false);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial
  // 1: Review Mode banner appears
  // 2: Diff changes appear
  // 3: Hover on first accept button
  // 4: Accept first change
  // 5: Hover on second accept
  // 6: Accept second change
  // 7: All changes applied

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setShowBanner(false);
      setShowDiff(false);
      setAcceptedChanges([]);
      setHoveredChange(null);
      setShowComplete(false);
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
    setShowBanner(false);
    setShowDiff(false);
    setAcceptedChanges([]);
    setHoveredChange(null);
    setShowComplete(false);

    addTimeout(() => {
      setPhase(1);
      setShowBanner(true);
    }, 500);

    addTimeout(() => {
      setPhase(2);
      setShowDiff(true);
    }, 1200);

    addTimeout(() => {
      setPhase(3);
      setHoveredChange(0);
    }, 2500);

    addTimeout(() => {
      setPhase(4);
      setAcceptedChanges([0]);
      setHoveredChange(null);
    }, 3500);

    addTimeout(() => {
      setPhase(5);
      setHoveredChange(1);
    }, 4500);

    addTimeout(() => {
      setPhase(6);
      setAcceptedChanges([0, 1]);
      setHoveredChange(null);
    }, 5500);

    addTimeout(() => {
      setPhase(7);
      setShowComplete(true);
    }, 6500);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isActive]);

  const renderDiffLine = () => {
    const changes = DIFF_REVIEW_CONTENT.changes;
    const pairs = [];
    for (let i = 0; i < changes.length; i += 2) {
      pairs.push({ delete: changes[i], insert: changes[i + 1], index: i / 2 });
    }

    return (
      <span>
        The project showed{' '}
        {pairs.map((pair, pairIdx) => {
          const isAccepted = acceptedChanges.includes(pairIdx);
          const isHovered = hoveredChange === pairIdx;

          if (isAccepted) {
            return (
              <motion.span
                key={pairIdx}
                initial={{ backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
                animate={{ backgroundColor: 'rgba(34, 197, 94, 0)' }}
                transition={{ duration: 0.5 }}
                className="text-green-300"
              >
                {pair.insert.text}
              </motion.span>
            );
          }

          return (
            <span key={pairIdx} className="relative inline">
              {/* Deleted text */}
              <span className="bg-red-500/20 text-red-300 line-through px-0.5 rounded">
                {pair.delete.text}
              </span>
              {' '}
              {/* Inserted text */}
              <span className="bg-green-500/20 text-green-300 px-0.5 rounded">
                {pair.insert.text}
              </span>
              {' '}
              {/* Accept/Reject buttons */}
              <span className="inline-flex items-center gap-1 ml-1">
                <motion.button
                  animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
                  className={`p-0.5 rounded transition-colors ${
                    isHovered ? 'bg-green-500/30' : 'bg-green-500/10 hover:bg-green-500/20'
                  }`}
                >
                  <Check className="w-3 h-3 text-green-400" />
                </motion.button>
                <button className="p-0.5 rounded bg-red-500/10 hover:bg-red-500/20">
                  <X className="w-3 h-3 text-red-400" />
                </button>
              </span>
              {pairIdx === 0 && ' while identifying '}
            </span>
          );
        })}
        .
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-black absolute inset-0">
      {/* Header */}
      <DemoHeader
        fileName="Quarterly Review.md"
        isDirty={acceptedChanges.length > 0}
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
          <DemoToolbar activeButtons={[]} />

          {/* Review Mode Banner */}
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', ...ITEM_SPRING }}
              className="flex items-center justify-between px-4 py-2 bg-amber-500/10 border-b border-amber-500/20"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-amber-400"
                />
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-amber-300">Review Mode</span>
                <span className="text-[10px] text-amber-400/70">
                  {2 - acceptedChanges.length} changes pending
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 py-1 text-[10px] text-green-400 bg-green-500/10 rounded hover:bg-green-500/20"
                >
                  Accept All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 py-1 text-[10px] text-red-400 bg-red-500/10 rounded hover:bg-red-500/20"
                >
                  Reject All
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 p-4 md:p-6 overflow-hidden">
          <div className="max-w-lg">
            <h1 className="text-lg md:text-xl font-bold text-white mb-4">
              Quarterly Review
            </h1>

            <div className="relative">
              {showDiff ? (
                <p className="text-xs md:text-sm text-gray-300 leading-loose">
                  {renderDiffLine()}
                </p>
              ) : (
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {DIFF_REVIEW_CONTENT.originalLine}
                </p>
              )}
            </div>

            {/* Changes summary */}
            {showDiff && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', ...ITEM_SPRING }}
                className="mt-6 p-3 bg-white/[0.02] border border-white/10 rounded-lg"
              >
                <h3 className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Changes</h3>
                <div className="space-y-2">
                  {DIFF_REVIEW_CONTENT.changes.filter(c => c.type === 'delete').map((change, idx) => {
                    const insertChange = DIFF_REVIEW_CONTENT.changes.find((c, i) => c.type === 'insert' && Math.floor(i / 2) === idx);
                    const isAccepted = acceptedChanges.includes(idx);
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isAccepted ? 0.5 : 1, x: 0 }}
                        transition={{ type: 'spring', ...ITEM_SPRING, delay: idx * 0.1 }}
                        className="flex items-center gap-2 text-[10px]"
                      >
                        {isAccepted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                          >
                            <Check className="w-3 h-3 text-green-400" />
                          </motion.div>
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-white/20" />
                        )}
                        <span className="text-red-400 line-through">{change.text}</span>
                        <span className="text-gray-600">→</span>
                        <span className="text-green-400">{insertChange?.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Complete message */}
            {showComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', ...MOBILE_SPRINGS.BOUNCY }}
                className="mt-4 flex items-center gap-2 text-xs text-green-400"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
                All changes applied
              </motion.div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffReviewScene;
