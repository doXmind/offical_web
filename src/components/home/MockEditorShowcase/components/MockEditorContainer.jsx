import React from 'react';
import { motion } from 'framer-motion';

const MockEditorContainer = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative border border-white/10 rounded-xl bg-black overflow-hidden flex flex-col"
      style={{
        aspectRatio: '16 / 10',
        boxShadow: '0 0 60px rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Window title bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-white/20" />
          <div className="w-3 h-3 rounded-full border border-white/20" />
          <div className="w-3 h-3 rounded-full border border-white/20" />
        </div>
        <span className="text-xs text-gray-600 font-medium">doXmind Editor</span>
        <div className="w-16" />
      </div>

      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">{children}</div>
    </motion.div>
  );
};

export default MockEditorContainer;
