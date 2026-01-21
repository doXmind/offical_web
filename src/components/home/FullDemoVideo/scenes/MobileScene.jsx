import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Edit3,
  Sparkles,
  MoreHorizontal,
  ChevronRight,
  ChevronUp,
  X,
  Wand2,
  Scissors,
  Maximize2,
  Check,
  Languages,
} from 'lucide-react';
import { MOBILE_CONTENT, UI_CONTENT } from '../constants/demoContent';
import {
  MOBILE_SPRINGS,
  MOBILE_V2,
  AI_PANEL_STATES,
  MOBILE_QUICK_ACTIONS,
} from '../constants/animationConfig';

// Quick action button component
const QuickActionButton = ({ icon: Icon, label }) => (
  <motion.button
    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 text-[9px] text-gray-300 whitespace-nowrap"
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', ...MOBILE_SPRINGS.SNAPPY }}
  >
    <Icon className="w-3 h-3" />
    {label}
  </motion.button>
);

const MobileScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [aiPanelState, setAiPanelState] = useState(AI_PANEL_STATES.CLOSED);
  const [showGestureHint, setShowGestureHint] = useState(false);
  const [gestureDirection, setGestureDirection] = useState('right');
  const [showDragHint, setShowDragHint] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial - desktop shrinking
  // 1: Mobile view
  // 2: Gesture hint (right swipe)
  // 3: Sidebar slides in
  // 4: Select file
  // 5: Bottom nav visible, selection appears
  // 6: Tap AI button -> Peek mode
  // 7: Show quick actions (peek with selection)
  // 8: Drag up hint
  // 9: Chat mode
  // 10: Full mode

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setShowSidebar(false);
      setAiPanelState(AI_PANEL_STATES.CLOSED);
      setShowGestureHint(false);
      setShowDragHint(false);
      setHasSelection(false);
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
    setShowSidebar(false);
    setAiPanelState(AI_PANEL_STATES.CLOSED);
    setShowGestureHint(false);
    setShowDragHint(false);
    setHasSelection(false);

    addTimeout(() => setPhase(1), 600);

    addTimeout(() => {
      setPhase(2);
      setShowGestureHint(true);
      setGestureDirection('right');
    }, 1200);

    addTimeout(() => {
      setPhase(3);
      setShowGestureHint(false);
      setShowSidebar(true);
    }, 2000);

    addTimeout(() => {
      setPhase(4);
    }, 2800);

    addTimeout(() => {
      setPhase(5);
      setShowSidebar(false);
      setHasSelection(true);
    }, 3400);

    addTimeout(() => {
      setPhase(6);
      setAiPanelState(AI_PANEL_STATES.PEEK);
    }, 4000);

    addTimeout(() => {
      setPhase(7);
    }, 4600);

    addTimeout(() => {
      setPhase(8);
      setShowDragHint(true);
    }, 5200);

    addTimeout(() => {
      setPhase(9);
      setShowDragHint(false);
      setAiPanelState(AI_PANEL_STATES.CHAT);
    }, 5800);

    addTimeout(() => {
      setPhase(10);
      setAiPanelState(AI_PANEL_STATES.FULL);
    }, 6800);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isActive]);

  // Calculate AI panel height based on state
  const getAIPanelHeight = () => {
    switch (aiPanelState) {
      case AI_PANEL_STATES.PEEK:
        return hasSelection ? 90 : 60;
      case AI_PANEL_STATES.CHAT:
        return '50%';
      case AI_PANEL_STATES.FULL:
        return '80%';
      default:
        return 0;
    }
  };

  const quickActionIcons = {
    improve: Wand2,
    shorten: Scissors,
    expand: Maximize2,
    fix: Check,
    translate: Languages,
  };

  return (
    <div className="flex h-full w-full bg-black absolute inset-0 items-center justify-center">
      {/* Phone frame */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', ...MOBILE_SPRINGS.SMOOTH }}
        className="relative w-48 md:w-56 h-[85%] bg-gray-950 rounded-[2rem] border-4 border-gray-800 overflow-hidden shadow-2xl"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-b-xl z-20" />

        {/* Screen content */}
        <div className="absolute inset-0 pt-6 pb-2 flex flex-col bg-black">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <div className="w-6" />
            <span className="text-[10px] text-gray-400 truncate">My Project Plan.md</span>
            <div className="w-6" />
          </div>

          {/* Editor content */}
          <div className="flex-1 p-3 overflow-hidden relative">
            <h1 className="text-sm font-bold text-white mb-2">Introduction</h1>
            <p className="text-[9px] text-gray-400 leading-relaxed">
              Welcome to doXmind, the{' '}
              {hasSelection ? (
                <span className="bg-blue-500/30 text-blue-200 px-0.5 rounded">
                  AI-powered writing
                </span>
              ) : (
                'AI-powered writing'
              )}{' '}
              studio that helps you write better, faster.
            </p>

            {/* Gesture hint */}
            <AnimatePresence>
              {showGestureHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ x: [0, 30, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] text-white">Swipe to open files</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          <div className="h-10 border-t border-white/10 flex items-center justify-around px-2">
            {[
              { icon: FileText, label: 'Files' },
              { icon: Edit3, label: 'Edit' },
              { icon: Sparkles, label: 'AI', isHighlighted: phase === 6 },
              { icon: MoreHorizontal, label: 'More' },
            ].map((item, idx) => (
              <motion.button
                key={item.label}
                animate={item.isHighlighted ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, repeat: item.isHighlighted ? Infinity : 0 }}
                className={`flex flex-col items-center gap-0.5 p-1.5 rounded ${
                  item.isHighlighted ? 'bg-blue-500/20' : ''
                }`}
              >
                <item.icon className={`w-4 h-4 ${item.isHighlighted ? 'text-blue-400' : 'text-gray-500'}`} />
                <span className={`text-[7px] ${item.isHighlighted ? 'text-blue-400' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Sidebar overlay */}
          <AnimatePresence>
            {showSidebar && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 z-10"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', ...MOBILE_SPRINGS.SMOOTH }}
                  className="absolute right-0 top-6 bottom-0 w-3/4 bg-gray-900 border-l border-white/10 z-20"
                >
                  <div className="flex items-center justify-between p-2 border-b border-white/10">
                    <span className="text-[10px] text-gray-400">Files</span>
                    <X className="w-3 h-3 text-gray-500" />
                  </div>
                  <div className="p-1">
                    {UI_CONTENT.files.map((file, idx) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[9px] ${
                          file.id === 'project' ? 'bg-white/10 text-white' : 'text-gray-400'
                        }`}
                      >
                        <FileText className="w-3 h-3" />
                        {file.name}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* AI Panel - Three-state system */}
          <AnimatePresence>
            {aiPanelState !== AI_PANEL_STATES.CLOSED && (
              <>
                {/* Backdrop for chat/full modes */}
                {aiPanelState !== AI_PANEL_STATES.PEEK && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 z-15"
                  />
                )}

                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0, height: getAIPanelHeight() }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', ...MOBILE_SPRINGS.SMOOTH }}
                  className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-white/10 z-20"
                  style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                >
                  {/* Drag Handle */}
                  <div className="flex justify-center py-2 cursor-grab">
                    <div className="w-10 h-1 bg-gray-600 rounded-full" />
                  </div>

                  {/* Drag up hint */}
                  <AnimatePresence>
                    {showDragHint && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[8px] text-white bg-blue-500/80 px-2 py-1 rounded-full"
                      >
                        <motion.div
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <ChevronUp className="w-3 h-3" />
                        </motion.div>
                        Drag to expand
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Panel Content */}
                  <div className="px-3 flex-1 overflow-hidden">
                    {aiPanelState === AI_PANEL_STATES.PEEK ? (
                      /* Peek Mode */
                      <div className="space-y-2">
                        {hasSelection ? (
                          /* Selection mode - Quick actions */
                          <>
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
                              <div className="flex-1 text-[9px] text-gray-400 truncate">
                                &quot;AI-powered writing...&quot;
                              </div>
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            </div>
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                              {MOBILE_QUICK_ACTIONS.map((action) => {
                                const Icon = quickActionIcons[action.id] || Wand2;
                                return (
                                  <QuickActionButton
                                    key={action.id}
                                    icon={Icon}
                                    label={action.label}
                                  />
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          /* Normal mode */
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <div className="flex-1 bg-white/5 rounded-full px-3 py-1.5 text-[9px] text-gray-500">
                              Ask AI anything...
                            </div>
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Chat/Full Mode */
                      <>
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          <span className="text-[10px] font-medium text-gray-300">AI Assistant</span>
                          <div className="flex-1" />
                          <X className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="space-y-2 overflow-y-auto" style={{ maxHeight: aiPanelState === AI_PANEL_STATES.FULL ? '150px' : '60px' }}>
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-[8px] text-gray-400">
                              How can I help you with your document today?
                            </p>
                          </div>
                          {aiPanelState === AI_PANEL_STATES.FULL && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex flex-wrap gap-1"
                            >
                              {['Summarize', 'Improve', 'Translate', 'Expand'].map((action) => (
                                <button
                                  key={action}
                                  className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[7px] text-gray-400"
                                >
                                  {action}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </div>
                        {/* Input area */}
                        <div className="absolute bottom-2 left-3 right-3">
                          <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-1.5">
                            <input
                              type="text"
                              readOnly
                              placeholder="Ask AI anything..."
                              className="flex-1 bg-transparent text-[9px] text-gray-300 placeholder-gray-600 outline-none"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 text-center"
      >
        <p className="text-xs text-gray-500">Mobile Experience</p>
        <p className="text-[10px] text-gray-600">
          {aiPanelState === AI_PANEL_STATES.PEEK && 'Peek Mode - Quick Actions'}
          {aiPanelState === AI_PANEL_STATES.CHAT && 'Chat Mode - 70% Height'}
          {aiPanelState === AI_PANEL_STATES.FULL && 'Full Mode - 90% Height'}
          {aiPanelState === AI_PANEL_STATES.CLOSED && 'Gesture navigation & responsive design'}
        </p>
      </motion.div>
    </div>
  );
};

export default MobileScene;
