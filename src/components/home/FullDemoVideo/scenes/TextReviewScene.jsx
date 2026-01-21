import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { DemoHeader, DemoToolbar, DemoSidebar } from '../components';
import { TEXT_REVIEW_CONTENT, UI_CONTENT } from '../constants/demoContent';
import { ITEM_SPRING, MOBILE_SPRINGS, MENU_SPRING } from '../constants/animationConfig';

const issueColors = {
  grammar: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', underline: 'decoration-red-500' },
  clarity: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', underline: 'decoration-blue-500' },
  tone: { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400', underline: 'decoration-purple-500' },
  engagement: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', underline: 'decoration-green-500' },
};

const TextReviewScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showIssues, setShowIssues] = useState(false);
  const [activeIssue, setActiveIssue] = useState(null);
  const [fixedIssues, setFixedIssues] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial
  // 1: Click Review button
  // 2: Analyzing...
  // 3: Issues appear with underlines
  // 4: Panel opens
  // 5: Click first issue
  // 6: Accept suggestion
  // 7: Second issue
  // 8: All reviewed

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setIsAnalyzing(false);
      setShowIssues(false);
      setActiveIssue(null);
      setFixedIssues([]);
      setShowPanel(false);
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
    setIsAnalyzing(false);
    setShowIssues(false);
    setActiveIssue(null);
    setFixedIssues([]);
    setShowPanel(false);

    addTimeout(() => setPhase(1), 500);

    addTimeout(() => {
      setPhase(2);
      setIsAnalyzing(true);
    }, 1000);

    addTimeout(() => {
      setPhase(3);
      setIsAnalyzing(false);
      setShowIssues(true);
    }, 2200);

    addTimeout(() => {
      setPhase(4);
      setShowPanel(true);
    }, 2800);

    addTimeout(() => {
      setPhase(5);
      setActiveIssue(0);
    }, 3500);

    addTimeout(() => {
      setPhase(6);
      setFixedIssues([0]);
      setActiveIssue(null);
    }, 4300);

    addTimeout(() => {
      setPhase(7);
      setActiveIssue(1);
    }, 5000);

    addTimeout(() => {
      setPhase(8);
      setFixedIssues([0, 1]);
      setActiveIssue(null);
    }, 5800);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isActive]);

  const renderTextWithIssues = () => {
    const issues = TEXT_REVIEW_CONTENT.textWithIssues;
    let text = TEXT_REVIEW_CONTENT.fullText;

    if (!showIssues) {
      return <span>{text}</span>;
    }

    // Render with highlights
    return (
      <span>
        {issues.map((issue, idx) => {
          const colors = issueColors[issue.issue];
          const isFixed = fixedIssues.includes(idx);
          const isActive = activeIssue === idx;

          if (isFixed) {
            return (
              <motion.span
                key={idx}
                initial={{ backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
                animate={{ backgroundColor: 'rgba(34, 197, 94, 0)' }}
                transition={{ duration: 1 }}
                className="text-green-300"
              >
                {issue.suggestion}
              </motion.span>
            );
          }

          return (
            <span
              key={idx}
              className={`relative cursor-pointer underline decoration-wavy ${colors.underline} ${
                isActive ? colors.bg + ' rounded px-0.5' : ''
              }`}
            >
              {issue.text}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute left-0 top-full mt-1 ${colors.bg} ${colors.border} border rounded p-2 z-10 whitespace-nowrap`}
                >
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className={`${colors.text}`}>{issue.issue}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-white">{issue.suggestion}</span>
                    <button className="p-1 hover:bg-green-500/20 rounded">
                      <Check className="w-3 h-3 text-green-400" />
                    </button>
                    <button className="p-1 hover:bg-red-500/20 rounded">
                      <X className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                </motion.div>
              )}
            </span>
          );
        }).reduce((prev, curr, idx) => {
          if (idx === 0) return [curr];
          // Add text between issues
          const textParts = ['', '. They ', ' completed all milestones ahead of schedule.'];
          return [...prev, textParts[idx - 1] || '', curr];
        }, [])}
        {' completed all milestones ahead of schedule.'}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-black absolute inset-0">
      {/* Header */}
      <DemoHeader
        fileName="Progress Report.md"
        isDirty={fixedIssues.length > 0}
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
            showReview={true}
            isReviewActive={phase >= 1}
            isReviewLoading={isAnalyzing}
          />

          <div className="flex-1 p-4 md:p-6 overflow-hidden">
            <div className="max-w-lg">
              <h1 className="text-lg md:text-xl font-bold text-white mb-4">
                Progress Report
              </h1>

            {/* Analyzing indicator */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', ...ITEM_SPRING }}
                className="flex items-center gap-2 mb-4 text-xs text-blue-400"
              >
                <motion.div
                  className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Analyzing text...
              </motion.div>
            )}

            <div className="relative">
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                {renderTextWithIssues()}
              </p>
            </div>

            {/* Issue count */}
            {showIssues && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', ...ITEM_SPRING }}
                className="mt-4 flex items-center gap-4 text-[10px]"
              >
                <span className="text-red-400">{TEXT_REVIEW_CONTENT.issueCount - fixedIssues.length} issues</span>
                <span className="text-green-400">{fixedIssues.length} fixed</span>
              </motion.div>
            )}

            {/* All reviewed */}
            {phase >= 8 && fixedIssues.length >= 2 && (
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
                All suggestions reviewed
              </motion.div>
            )}
            </div>
          </div>
        </div>

        {/* Review Panel */}
        <AnimatePresence>
          {showPanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 180, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', ...MENU_SPRING }}
            className="border-l border-white/10 bg-white/[0.01] overflow-hidden"
          >
            <div className="p-3">
              <h3 className="text-xs font-medium text-white mb-3">Review</h3>
              <div className="space-y-2">
                {TEXT_REVIEW_CONTENT.textWithIssues.map((issue, idx) => {
                  const colors = issueColors[issue.issue];
                  const isFixed = fixedIssues.includes(idx);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', ...ITEM_SPRING, delay: idx * 0.1 }}
                      className={`p-2 rounded text-[10px] ${
                        isFixed ? 'bg-green-500/10 border-green-500/20' : colors.bg
                      } border ${isFixed ? 'border-green-500/20' : colors.border + '/20'}`}
                    >
                      <div className={`font-medium mb-1 ${isFixed ? 'text-green-400' : colors.text}`}>
                        {isFixed ? '✓ Fixed' : issue.issue}
                      </div>
                      <div className="text-gray-400">
                        {isFixed ? issue.suggestion : `"${issue.text}" → "${issue.suggestion}"`}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TextReviewScene;
