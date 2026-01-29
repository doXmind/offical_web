import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AbstractVisuals from './AbstractVisuals';
import BrandReveal from './BrandReveal';
import HookSequence from './HookSequence';

/**
 * IntroSequence - 12-second cinematic intro with hook + abstract visuals
 *
 * Phase 0 (0-3s): Hook - "2,847 words. 60 seconds." value proposition
 * Phase 1 (3-9s): Abstract Visuals - dynamic lines, geometric shapes, particles
 * Phase 2 (9-12s): Brand Reveal - logo + tagline + transition
 */

const PHASES = {
  HOOK: { start: 0, end: 3000 },        // New: 3s hook for immediate value
  ABSTRACT: { start: 3000, end: 9000 }, // Shortened: 6s abstract visuals
  BRAND: { start: 9000, end: 12000 },   // 3s brand reveal
};

const IntroSequence = ({ currentTime = 0, duration = 12000 }) => {
  const { currentPhase, phaseProgress } = useMemo(() => {
    if (currentTime < PHASES.HOOK.end) {
      return {
        currentPhase: 'HOOK',
        phaseProgress: currentTime / PHASES.HOOK.end
      };
    }
    if (currentTime < PHASES.ABSTRACT.end) {
      return {
        currentPhase: 'ABSTRACT',
        phaseProgress: (currentTime - PHASES.ABSTRACT.start) / (PHASES.ABSTRACT.end - PHASES.ABSTRACT.start)
      };
    }
    return {
      currentPhase: 'BRAND',
      phaseProgress: (currentTime - PHASES.BRAND.start) / (PHASES.BRAND.end - PHASES.BRAND.start)
    };
  }, [currentTime]);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Phase 0: Hook (0-3s) - Immediate value proposition */}
      <AnimatePresence>
        {currentPhase === 'HOOK' && (
          <motion.div
            key="hook"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <HookSequence progress={phaseProgress} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: Abstract Visuals (3-9s) */}
      <AnimatePresence>
        {currentPhase === 'ABSTRACT' && (
          <motion.div
            key="abstract"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <AbstractVisuals progress={phaseProgress} currentTime={currentTime - PHASES.ABSTRACT.start} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Brand Reveal (9-12s) */}
      <AnimatePresence>
        {currentPhase === 'BRAND' && (
          <motion.div
            key="brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <BrandReveal progress={phaseProgress} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroSequence;
