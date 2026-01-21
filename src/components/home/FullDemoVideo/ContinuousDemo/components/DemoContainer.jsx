import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const DemoContainer = ({
  children,
  isPlaying,
  onTogglePlay,
  progress,
  currentPhase,
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
      {/* CSS custom property for responsive aspect ratio + dark scrollbar */}
      <style>{`
        @media (min-width: 640px) {
          :root { --editor-aspect-ratio: 16 / 10; }
        }
        .demo-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .demo-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .demo-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .demo-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .demo-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
      `}</style>

      {/* Window title bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2">
          <img alt="doXmind Logo" className="h-6 w-6" src="/logo.svg" />
          <span className="text-sm tracking-tight">
            <span className="font-light">do</span>
            <span className="font-black">X</span>
            <span className="font-light">mind</span>
          </span>
          {currentPhase && (
            <span className="text-[9px] md:text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
              {currentPhase}
            </span>
          )}
        </div>
        <div className="w-10 md:w-16" />
      </div>

      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>

      {/* Play/Pause overlay - appears on hover */}
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
    </motion.div>
  );
};

export default DemoContainer;
