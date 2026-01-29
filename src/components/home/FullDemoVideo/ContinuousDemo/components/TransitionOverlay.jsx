import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TransitionOverlay - Phase transition effects
 *
 * Provides various transition effects between demo phases:
 * - CROSSFADE: Smooth fade in/out (full opacity for clean transition)
 * - ZOOM_BLUR: Scale + blur effect (enhanced for visibility)
 * - SLIDE_LEFT: Slide from right to left with background
 * - FLASH: Quick white flash (optimized timing)
 * - WIPE: Horizontal wipe effect
 *
 * @param {Object} props
 * @param {boolean} props.isActive - Whether transition is currently active
 * @param {string} props.type - Transition type
 * @param {number} props.duration - Duration in milliseconds
 * @param {string} props.color - Background color (for CROSSFADE)
 * @param {string} props.phaseLabel - Optional label to show during transition
 */
const TransitionOverlay = ({
  isActive,
  type = 'CROSSFADE',
  duration = 500,
  color = 'black',
  phaseLabel = '',
}) => {
  const durationSec = duration / 1000;

  const variants = {
    // Smooth fade in/out - full opacity for clean scene change
    CROSSFADE: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },

    // Scale + blur effect - enhanced for better visibility
    ZOOM_BLUR: {
      initial: { opacity: 0, scale: 0.92, filter: 'blur(0px)' },
      animate: { opacity: 0.9, scale: 1.08, filter: 'blur(10px)' },
      exit: { opacity: 0, scale: 1, filter: 'blur(0px)' },
    },

    // Slide from right with background
    SLIDE_LEFT: {
      initial: { x: '100%', opacity: 1 },
      animate: { x: '0%', opacity: 1 },
      exit: { x: '-100%', opacity: 1 },
    },

    // Quick white flash - optimized timing with hold
    FLASH: {
      initial: { opacity: 0 },
      animate: { opacity: [0, 1, 1, 0.5, 0] },
      exit: { opacity: 0 },
    },

    // Horizontal wipe
    WIPE: {
      initial: { clipPath: 'inset(0 100% 0 0)' },
      animate: { clipPath: 'inset(0 0% 0 0)' },
      exit: { clipPath: 'inset(0 0 0 100%)' },
    },
  };

  const variant = variants[type] || variants.CROSSFADE;

  // Determine background color based on type
  const bgColor = type === 'FLASH' ? 'rgba(255, 255, 255, 0.98)' : color;

  // Custom easing for different effects
  const getEasing = () => {
    switch (type) {
      case 'FLASH':
        return [0.4, 0, 0.6, 1]; // Quick in, gradual out
      case 'ZOOM_BLUR':
        return [0.25, 0.1, 0.25, 1]; // Smooth cubic
      case 'SLIDE_LEFT':
        return [0.4, 0, 0.2, 1]; // Material design standard
      default:
        return 'easeInOut';
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          transition={{
            duration: durationSec,
            ease: getEasing(),
          }}
          style={{
            backgroundColor: bgColor,
          }}
        >
          {/* Phase label (optional, shown during non-flash transitions) */}
          {phaseLabel && type !== 'FLASH' && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="text-white/80 text-sm font-medium tracking-wider uppercase"
            >
              {phaseLabel}
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;
