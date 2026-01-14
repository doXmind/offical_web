import React from 'react';
import { motion } from 'framer-motion';

const MockEditorContainer = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative border border-white/10 rounded-lg md:rounded-xl bg-black overflow-hidden flex flex-col"
      style={{
        aspectRatio: 'var(--editor-aspect-ratio, 4 / 5)',
        boxShadow: '0 0 60px rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* CSS custom property for responsive aspect ratio */}
      <style>{`
        @media (min-width: 640px) {
          :root { --editor-aspect-ratio: 16 / 10; }
        }
      `}</style>

      {/* Window title bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-white/20" />
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-white/20" />
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-white/20" />
        </div>
        <span className="text-[10px] md:text-xs text-gray-600 font-medium">doXmind Editor</span>
        <div className="w-10 md:w-16" />
      </div>

      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">{children}</div>
    </motion.div>
  );
};

export default MockEditorContainer;
