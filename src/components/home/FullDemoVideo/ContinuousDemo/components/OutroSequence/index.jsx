import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * OutroSequence - CTA ending sequence for conversion
 * Black and white color scheme
 *
 * Phase 0 (0-4s): Value Recap - Three key achievements
 * Phase 1 (4-8s): CTA - Logo, tagline, and "Try it Free" button
 */

const PHASES = {
  VALUE_RECAP: { start: 0, end: 4000 },
  CTA: { start: 4000, end: 8000 },
};

// Animated checkmark component - white color
const AnimatedCheck = ({ delay = 0 }) => (
  <motion.svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    className="text-white inline-block ml-2"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
  >
    <motion.circle
      cx="10"
      cy="10"
      r="9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay, duration: 0.3 }}
    />
    <motion.path
      d="M6 10 L9 13 L14 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: delay + 0.2, duration: 0.2 }}
    />
  </motion.svg>
);

// Pulsing button effect - white/gray theme
const PulsingButton = ({ children }) => (
  <motion.div
    className="relative inline-block"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.5 }}
  >
    {/* Pulse rings */}
    <motion.div
      className="absolute inset-0 rounded-full bg-white/10"
      animate={{
        scale: [1, 1.3, 1.3],
        opacity: [0.5, 0, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
    <motion.div
      className="absolute inset-0 rounded-full bg-white/10"
      animate={{
        scale: [1, 1.3, 1.3],
        opacity: [0.5, 0, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeOut',
        delay: 0.5,
      }}
    />

    {/* Button - white background */}
    <motion.div
      className="relative px-8 py-3 bg-white rounded-full text-black font-medium text-lg shadow-lg shadow-white/10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const OutroSequence = ({ currentTime = 0, introDuration = 12000, demoDuration = 80000, outroDuration = 8000 }) => {
  // Calculate time within outro phase
  const outroStartTime = introDuration + demoDuration;
  const outroTime = Math.max(0, currentTime - outroStartTime);

  const { currentPhase, phaseProgress } = useMemo(() => {
    if (outroTime < PHASES.VALUE_RECAP.end) {
      return {
        currentPhase: 'VALUE_RECAP',
        phaseProgress: outroTime / PHASES.VALUE_RECAP.end,
      };
    }
    return {
      currentPhase: 'CTA',
      phaseProgress: (outroTime - PHASES.CTA.start) / (PHASES.CTA.end - PHASES.CTA.start),
    };
  }, [outroTime]);

  // Value recap items
  const valueItems = [
    { text: 'From blank page to 3,000 words', delay: 0.2 },
    { text: 'From sources to citations', delay: 0.7 },
    { text: 'From draft to polished', delay: 1.2 },
  ];

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Background gradient - subtle white/gray */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, rgba(0,0,0,1) 60%)'
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Animated particles/stars - white */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Phase 0: Value Recap (0-4s) */}
      <AnimatePresence>
        {currentPhase === 'VALUE_RECAP' && (
          <motion.div
            key="value-recap"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-5">
              {valueItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: phaseProgress > item.delay / 4 ? 1 : 0,
                    x: phaseProgress > item.delay / 4 ? 0 : -20,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <span className="text-xl md:text-2xl text-gray-300 font-light">
                    {item.text}
                  </span>
                  {phaseProgress > (item.delay + 0.3) / 4 && (
                    <AnimatedCheck delay={0} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: CTA (4-8s) */}
      <AnimatePresence>
        {currentPhase === 'CTA' && (
          <motion.div
            key="cta"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              {/* Logo */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                {/* Logo glow effect - white */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                </motion.div>

                {/* Logo text - white */}
                <div className="relative">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    doXmind
                  </motion.h1>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-lg md:text-xl text-gray-400 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Write Smarter. Think Deeper.
              </motion.p>

              {/* CTA Button */}
              <PulsingButton>
                Try it Free
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </PulsingButton>

              {/* Social proof hint */}
              <motion.p
                className="mt-6 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: phaseProgress > 0.5 ? 0.7 : 0 }}
                transition={{ duration: 0.4 }}
              >
                Join 10,000+ writers already using AI
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner decorations - white */}
      <motion.div
        className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </div>
  );
};

export default OutroSequence;
