import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Edit, MessageSquare, Menu, ChevronLeft, ChevronRight, Sparkles, Send } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const MobileExperienceMock = () => {
  const [phase, setPhase] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Show gesture hint
      setTimeout(() => { setPhase(2); setSidebarOpen(true); }, 1500),  // Swipe right - sidebar
      setTimeout(() => { setPhase(3); setSidebarOpen(false); }, 3000), // Close sidebar
      setTimeout(() => { setPhase(4); setChatOpen(true); }, 4000),     // Swipe left - chat
      setTimeout(() => { setPhase(5); setChatOpen(false); }, 5500),    // Close chat
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <GuideMockContainer aspectRatio="9 / 16" showTitleBar={false}>
      <div className="flex flex-col h-full w-full bg-black absolute inset-0">
        {/* Phone frame top notch */}
        <div className="h-6 bg-black flex items-center justify-center">
          <div className="w-16 h-4 bg-black rounded-b-xl border-b border-x border-white/10" />
        </div>

        {/* Mobile header */}
        <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
          <Menu className="w-4 h-4 text-gray-500" />
          <span className="text-[10px] text-white font-medium">My Document</span>
          <MessageSquare className="w-4 h-4 text-gray-500" />
        </div>

        {/* Main content area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Editor content */}
          <div className="p-3">
            <h2 className="text-sm font-medium text-white mb-2">Notes</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Write your content here. Swipe gestures provide quick access to files and AI chat.
            </p>
          </div>

          {/* Gesture hint */}
          {phase === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/60"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <motion.div
                    animate={{ x: [-10, 10, -10] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center gap-1 text-white/60"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-[10px]">Swipe</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
                <p className="text-[9px] text-gray-400">Navigate with gestures</p>
              </div>
            </motion.div>
          )}

          {/* Sidebar overlay */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: sidebarOpen ? '0%' : '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 left-0 w-3/4 bg-black border-r border-white/10 z-10"
          >
            <div className="p-3">
              <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 px-1">Files</div>
              {['Document.md', 'Notes.md', 'Ideas.md'].map((file, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs mb-1 ${i === 0 ? 'bg-white/10 text-white' : 'text-gray-500'}`}
                >
                  <FileText className="w-3 h-3" />
                  <span className="truncate">{file}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Chat overlay */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: chatOpen ? '0%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 right-0 w-3/4 bg-black border-l border-white/10 z-10 flex flex-col"
          >
            <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-gray-500" />
              <span className="text-[10px] text-gray-500 font-medium">AI Assistant</span>
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="flex justify-end">
                <div className="max-w-[90%] px-2.5 py-1.5 bg-white/10 rounded-lg rounded-br-sm">
                  <p className="text-[10px] text-white leading-relaxed">Help with this doc</p>
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[90%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg rounded-bl-sm">
                  <p className="text-[10px] text-gray-300 leading-relaxed">I can help you improve and expand your writing...</p>
                </div>
              </div>
            </div>
            <div className="px-3 py-2 border-t border-white/10">
              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                <MessageSquare className="w-3 h-3 text-gray-600" />
                <span className="text-[10px] text-gray-600 flex-1">Ask anything...</span>
                <Send className="w-3 h-3 text-gray-600" />
              </div>
            </div>
          </motion.div>

          {/* Swipe indicator */}
          {phase === 2 && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 50, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/2 left-0 -translate-y-1/2"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          )}

          {phase === 4 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: -50, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/2 right-0 -translate-y-1/2"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom navigation */}
        <div className="px-2 py-2 border-t border-white/10 flex items-center justify-around bg-black">
          <div className={`flex flex-col items-center gap-0.5 ${sidebarOpen ? 'text-white' : 'text-gray-500'}`}>
            <FileText className="w-4 h-4" />
            <span className="text-[8px]">Files</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-white">
            <Edit className="w-4 h-4" />
            <span className="text-[8px]">Editor</span>
          </div>
          <div className={`flex flex-col items-center gap-0.5 ${chatOpen ? 'text-white' : 'text-gray-500'}`}>
            <MessageSquare className="w-4 h-4" />
            <span className="text-[8px]">Chat</span>
          </div>
        </div>

        {/* Home indicator */}
        <div className="h-5 flex items-center justify-center">
          <div className="w-24 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </GuideMockContainer>
  );
};

export default MobileExperienceMock;
