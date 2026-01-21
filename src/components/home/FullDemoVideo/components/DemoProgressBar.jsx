import React from 'react';
import { motion } from 'framer-motion';

const DemoProgressBar = ({
  scenes,
  currentIndex,
  progress,
  onSceneChange,
}) => {
  return (
    <div className="mt-4 md:mt-6">
      {/* Scene indicators */}
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            onClick={() => onSceneChange(index)}
            className="group relative flex flex-col items-center"
          >
            {/* Dot indicator */}
            <div
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : index < currentIndex
                  ? 'bg-white/60'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />

            {/* Progress arc for current scene */}
            {index === currentIndex && (
              <svg
                className="absolute -top-1 -left-1 w-4 h-4 md:w-5 md:h-5 -rotate-90"
                viewBox="0 0 20 20"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress / 100) * 50.26} 50.26`}
                  initial={{ strokeDasharray: '0 50.26' }}
                  animate={{ strokeDasharray: `${(progress / 100) * 50.26} 50.26` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </svg>
            )}

            {/* Tooltip label */}
            <span className="absolute -bottom-6 text-[9px] md:text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {scene.label}
            </span>
          </button>
        ))}
      </div>

      {/* Scene label */}
      <div className="text-center">
        <span className="text-xs md:text-sm text-gray-400">
          {scenes[currentIndex]?.label}
        </span>
        <span className="text-[10px] md:text-xs text-gray-600 ml-2">
          {currentIndex + 1} / {scenes.length}
        </span>
      </div>
    </div>
  );
};

export default DemoProgressBar;
