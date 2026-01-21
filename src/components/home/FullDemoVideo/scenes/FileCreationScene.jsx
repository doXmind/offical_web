import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { DemoHeader, DemoToolbar, DemoSidebar } from '../components';
import { FILE_CREATION_CONTENT } from '../constants/demoContent';
import { MENU_SPRING, ITEM_SPRING } from '../constants/animationConfig';

const FileCreationScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [files, setFiles] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial - empty sidebar
  // 1: + button highlighted
  // 2: Modal appears
  // 3: Typing filename
  // 4: Click Create
  // 5: File appears in sidebar
  // 6: Editor ready with cursor

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setFiles([]);
      setInputText('');
      setShowModal(false);
      setShowCursor(false);
      return;
    }

    // Clear previous timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const addTimeout = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
    };

    // Reset state
    setPhase(0);
    setFiles([]);
    setInputText('');
    setShowModal(false);
    setShowCursor(false);

    addTimeout(() => setPhase(1), 500);
    addTimeout(() => {
      setPhase(2);
      setShowModal(true);
    }, 1200);

    // Type filename character by character
    const fileName = FILE_CREATION_CONTENT.newFileName;
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < fileName.length) {
        setInputText(fileName.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);
    addTimeout(() => clearInterval(typeInterval), 4500);

    addTimeout(() => setPhase(3), 1800);
    addTimeout(() => setPhase(4), 4000);
    addTimeout(() => {
      setShowModal(false);
      setPhase(5);
      setFiles([{ id: 'new', name: `${fileName}.md`, isNew: true }]);
    }, 4500);
    addTimeout(() => {
      setPhase(6);
      setShowCursor(true);
    }, 5000);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      clearInterval(typeInterval);
    };
  }, [isActive]);

  const currentFileName = files.length > 0 ? `${FILE_CREATION_CONTENT.newFileName}.md` : 'Untitled';

  return (
    <div className="flex flex-col h-full w-full bg-black absolute inset-0">
      {/* Header */}
      <DemoHeader
        fileName={currentFileName}
        isDirty={false}
        isSidebarOpen={true}
        isChatOpen={false}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DemoSidebar
          files={files}
          activeFileId={files.length > 0 ? 'new' : null}
          isCreateHighlighted={phase === 1}
        />

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <DemoToolbar activeButtons={[]} />

          {/* Editor Content */}
          <div className="flex-1 p-4 md:p-6 flex items-center justify-center">
          {phase < 5 ? (
            <div className="text-center">
              <p className="text-xs text-gray-600">Click + to create a new file</p>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-left"
              >
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm">Start writing...</span>
                  {showCursor && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-0.5 h-4 bg-white ml-0.5"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Create File Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', ...MENU_SPRING }}
              className="bg-gray-900 border border-white/10 rounded-lg p-4 w-64 md:w-72 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white">Create New File</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="mb-4">
                <label className="text-[10px] text-gray-500 block mb-1">File name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    readOnly
                    className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500/50"
                    placeholder="Enter file name..."
                  />
                  {phase >= 3 && phase < 4 && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white"
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', ...ITEM_SPRING }}
                  className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  animate={phase === 4 ? { scale: [1, 0.95, 1] } : {}}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', ...ITEM_SPRING }}
                  className={`px-3 py-1.5 text-xs rounded transition-colors ${
                    inputText
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-700 text-gray-500'
                  }`}
                >
                  Create
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileCreationScene;
