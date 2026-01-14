import React from 'react';
import { motion } from 'framer-motion';

const SceneIndicator = ({
  scenes,
  activeIndex,
  onSceneChange,
  sceneProgress = 0,
}) => {
  const sceneLabels = {
    'ai-chat': 'AI Chat',
    'quick-edit': 'Quick Edit',
    'mindlines': 'Mindmap',
    'autocomplete': 'Autocomplete',
    'knowledge-base': 'Knowledge Base',
    'diff-accept': 'Diff Review',
    'text-review': 'Text Review',
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      {/* Scene dots */}
      <div className="flex items-center gap-3">
        {scenes.map((scene, index) => (
          <button
            key={scene}
            onClick={() => onSceneChange(index)}
            className="relative group"
            aria-label={`Go to ${sceneLabels[scene]} scene`}
          >
            <div
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === activeIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/30 hover:bg-white/50'
                }
              `}
            />
            {/* Progress ring for active scene */}
            {index === activeIndex && (
              <svg
                className="absolute -inset-1 w-4 h-4"
                style={{ transform: 'rotate(-90deg)' }}
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <motion.circle
                  cx="8"
                  cy="8"
                  r="6"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray={`${(sceneProgress / 100) * 37.7} 37.7`}
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Scene label */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-gray-500"
      >
        {sceneLabels[scenes[activeIndex]]}
      </motion.div>
    </div>
  );
};

export default SceneIndicator;
