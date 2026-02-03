import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Sparkles,
  FileText,
  ArrowUpFromLine,
  ArrowDownToLine,
  MessageSquare,
  Languages,
  Loader2,
  ChevronRight,
  MessageCircle,
  Wand2,
} from 'lucide-react';
import { DemoHeader, DemoToolbar } from '../components';
import { QUICK_EDIT_CONTENT } from '../constants/demoContent';
import { MENU_SPRING, ITEM_SPRING, QUICK_EDIT_OPTIONS } from '../constants/animationConfig';

const commandIcons = {
  grammar: CheckCircle,
  improve: Sparkles,
  simplify: FileText,
  expand: ArrowUpFromLine,
  shorten: ArrowDownToLine,
  tone: MessageSquare,
  translate: Languages,
};

const QuickEditScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [showSelection, setShowSelection] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredCommand, setHoveredCommand] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImproved, setIsImproved] = useState(false);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial - document visible
  // 1: Text selection appears
  // 2: Quick Edit menu appears
  // 3: Hover over commands
  // 4: Click Improve
  // 5: Loading
  // 6: Text transformed

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setShowSelection(false);
      setShowMenu(false);
      setHoveredCommand(null);
      setShowSubmenu(null);
      setIsLoading(false);
      setIsImproved(false);
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
    setShowSelection(false);
    setShowMenu(false);
    setHoveredCommand(null);
    setShowSubmenu(null);
    setIsLoading(false);
    setIsImproved(false);

    // Show selection
    addTimeout(() => {
      setPhase(1);
      setShowSelection(true);
    }, 500);

    // Show menu
    addTimeout(() => {
      setPhase(2);
      setShowMenu(true);
    }, 1200);

    // Hover grammar
    addTimeout(() => {
      setHoveredCommand('grammar');
    }, 1800);

    // Hover improve
    addTimeout(() => {
      setPhase(3);
      setHoveredCommand('improve');
    }, 2400);

    // Click improve
    addTimeout(() => {
      setPhase(4);
      setShowMenu(false);
      setIsLoading(true);
    }, 3200);

    // Show result
    addTimeout(() => {
      setPhase(5);
      setIsLoading(false);
      setIsImproved(true);
      setShowSelection(false);
    }, 4500);

    addTimeout(() => {
      setPhase(6);
    }, 5500);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isActive]);

  const renderText = () => {
    if (isImproved) {
      return (
        <span>
          The meeting was{' '}
          <motion.span
            initial={{ backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
            animate={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
            transition={{ duration: 1 }}
            className="text-green-300 px-0.5 rounded"
          >
            {QUICK_EDIT_CONTENT.improvedText}
          </motion.span>
          {' '}for the project success.
        </span>
      );
    }

    if (showSelection) {
      return (
        <span>
          The meeting was{' '}
          <span className="bg-blue-500/30 text-blue-200 px-0.5 rounded">
            {QUICK_EDIT_CONTENT.selectedText}
          </span>
          {' '}for the project success.
        </span>
      );
    }

    return QUICK_EDIT_CONTENT.originalText;
  };

  return (
    <div className="flex flex-col h-full w-full bg-black absolute inset-0">
      {/* Header */}
      <DemoHeader
        fileName="Meeting Notes.md"
        isDirty={isImproved}
        isSidebarOpen={false}
        isChatOpen={false}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* No sidebar - focus on Quick Edit menu */}
        <div className="flex-1 flex flex-col min-w-0">
          <DemoToolbar activeButtons={[]} />

          <div className="flex-1 p-4 md:p-6 overflow-hidden relative">
            <div className="max-w-lg">
              <h1 className="text-lg md:text-xl font-bold text-white mb-4">
                Meeting Notes
              </h1>

            <div className="relative">
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                {renderText()}
              </p>

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -right-2 top-0 flex items-center gap-1.5 text-[10px] text-blue-400"
                >
                  <motion.div
                    className="w-3 h-3 rounded-full border-2 border-blue-400 border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Improving...</span>
                </motion.div>
              )}

              {/* Quick Edit Menu - Vertical List Style like doxmind-mini */}
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ type: 'spring', ...MENU_SPRING }}
                    className="absolute left-0 mt-3 min-w-[180px] bg-gray-900 border border-white/10 rounded-lg p-1 shadow-xl z-10"
                  >
                    {/* Header */}
                    <div className="px-2 py-1.5 text-[10px] font-medium text-gray-500 flex items-center gap-1.5">
                      <Wand2 className="h-3 w-3" />
                      AI Quick Edit
                    </div>

                    <div className="h-px bg-white/10 my-1" />

                    {/* Menu Items - Vertical List */}
                    {QUICK_EDIT_OPTIONS.map((option) => {
                      const Icon = commandIcons[option.id] || Sparkles;
                      const isHovered = hoveredCommand === option.id;
                      const hasSubmenu = option.hasSubmenu;

                      return (
                        <motion.button
                          key={option.id}
                          onMouseEnter={() => {
                            setHoveredCommand(option.id);
                            if (hasSubmenu) setShowSubmenu(option.id);
                            else setShowSubmenu(null);
                          }}
                          whileHover={{ scale: 1.02, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', ...ITEM_SPRING }}
                          className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs outline-none transition-colors ${
                            isHovered
                              ? 'bg-white/10 text-white'
                              : 'text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1 text-left">{option.label}</span>
                          {hasSubmenu && (
                            <motion.span
                              animate={{ x: isHovered ? 2 : 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <ChevronRight className="h-3 w-3 text-gray-500" />
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}

                    <div className="h-px bg-white/10 my-1" />

                    {/* Ask in Chat option */}
                    <motion.button
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', ...ITEM_SPRING }}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-blue-400 hover:bg-blue-500/10"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Ask in Chat
                    </motion.button>

                    {/* Processing indicator */}
                    <AnimatePresence>
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="h-px bg-white/10 my-1" />
                          <div className="px-2 py-1.5 text-[10px] text-gray-500 flex items-center gap-1.5">
                            <motion.div
                              className="h-3 w-3 rounded-full border-2 border-blue-400 border-t-transparent"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            Processing...
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submenu for Tone/Translate */}
              <AnimatePresence>
                {showMenu && showSubmenu && (
                  <motion.div
                    initial={{ opacity: 0, x: -8, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -8, scale: 0.96 }}
                    transition={{ type: 'spring', ...MENU_SPRING }}
                    className="absolute left-[190px] mt-3 min-w-[120px] bg-gray-900 border border-white/10 rounded-lg p-1 shadow-xl z-20"
                    style={{ top: showSubmenu === 'tone' ? '120px' : '140px' }}
                  >
                    {QUICK_EDIT_OPTIONS.find(o => o.id === showSubmenu)?.submenu?.map((subItem) => (
                      <motion.button
                        key={subItem.id}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', ...ITEM_SPRING }}
                        className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
                      >
                        {subItem.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Success message */}
            {isImproved && phase >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', ...ITEM_SPRING }}
                className="mt-4 flex items-center gap-2 text-xs text-green-400"
              >
                <CheckCircle className="w-4 h-4" />
                Text improved successfully
              </motion.div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickEditScene;
