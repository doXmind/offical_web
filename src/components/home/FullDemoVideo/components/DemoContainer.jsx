import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const DemoContainer = ({
  children,
  isPlaying,
  onTogglePlay,
  showControls = true,
  showWindowBar = false, // Option to show macOS-style window bar
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative border border-white/10 rounded-lg md:rounded-xl bg-black overflow-hidden flex flex-col group"
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

      {/* Optional Window title bar (macOS style) */}
      {showWindowBar && (
        <div className="flex-shrink-0 flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] md:text-xs text-gray-500 font-medium">doXmind Editor</span>
          <div className="w-10 md:w-16" />
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {children}
      </div>

      {/* Play/Pause overlay - appears on hover */}
      {showControls && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-50"
          onClick={onTogglePlay}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 md:w-10 md:h-10 text-white" />
            ) : (
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default DemoContainer;
