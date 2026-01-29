import React, { useEffect, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

/**
 * BrandReveal - Final brand reveal with logo, tagline, and transition
 * Clean, minimal, powerful
 */

// Logo quadrant paths
const QUADRANTS = [
  'M6 0 Q0 0 0 6 L0 32 L40 40 L32 0 Z',
  'M48 0 L40 40 L80 32 L80 6 Q80 0 74 0 Z',
  'M0 48 L40 40 L32 80 L6 80 Q0 80 0 74 Z',
  'M40 40 L80 48 L80 74 Q80 80 74 80 L48 80 Z',
];

const WHITE = '#ffffff';
const GRAY = '#9ca3af';
const DARK_GRAY = '#6b7280';

const BrandReveal = ({ progress = 0 }) => {
  const mainControls = useAnimationControls();
  const glitchControls1 = useAnimationControls();
  const glitchControls2 = useAnimationControls();

  // Glitch effect
  const triggerGlitch = useCallback(async () => {
    await Promise.all([
      glitchControls1.start({
        x: [0, -4, -2, -4, 0],
        opacity: [0, 0.6, 0.4, 0.5, 0],
        transition: { duration: 0.25 }
      }),
      glitchControls2.start({
        x: [0, 4, 2, 4, 0],
        opacity: [0, 0.6, 0.4, 0.5, 0],
        transition: { duration: 0.25 }
      }),
      mainControls.start({
        x: [0, -2, 2, -1, 1, 0],
        transition: { duration: 0.25 }
      })
    ]);
  }, [mainControls, glitchControls1, glitchControls2]);

  // Trigger glitch at start
  useEffect(() => {
    if (progress > 0.05 && progress < 0.15) {
      triggerGlitch();
    }
  }, [progress, triggerGlitch]);

  // Animation phases
  const logoVisible = progress > 0.05;
  const textVisible = progress > 0.2;
  const taglineVisible = progress > 0.4;
  const transitionStarted = progress > 0.7;

  // Transition effect
  const transitionProgress = transitionStarted ? (progress - 0.7) / 0.3 : 0;
  const logoScale = transitionStarted ? 1 - transitionProgress * 0.6 : 1;
  const logoY = transitionStarted ? -transitionProgress * 150 : 0;

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Background editor preview (appears during transition) */}
      {transitionStarted && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: transitionProgress }}
          style={{
            backgroundColor: '#1a1a2e',
            filter: `blur(${20 * (1 - transitionProgress)}px)`,
          }}
        >
          {/* Simplified editor layout preview */}
          <div className="absolute inset-0 flex opacity-50">
            <div className="w-48 h-full" style={{ backgroundColor: '#12121e' }} />
            <div className="flex-1" style={{ backgroundColor: '#1a1a2e' }} />
            <div className="w-72 h-full" style={{ backgroundColor: '#12121e' }} />
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        style={{
          transform: `scale(${logoScale}) translateY(${logoY}px)`,
        }}
      >
        {/* Logo */}
        <div className="relative" style={{ width: 100, height: 100 }}>
          {/* Glitch layer 1 */}
          <motion.svg
            animate={glitchControls1}
            className="absolute"
            width="100"
            height="100"
            viewBox="0 0 80 80"
            style={{ opacity: 0 }}
          >
            {QUADRANTS.map((path, i) => (
              <path key={i} d={path} fill={GRAY} />
            ))}
          </motion.svg>

          {/* Glitch layer 2 */}
          <motion.svg
            animate={glitchControls2}
            className="absolute"
            width="100"
            height="100"
            viewBox="0 0 80 80"
            style={{ opacity: 0 }}
          >
            {QUADRANTS.map((path, i) => (
              <path key={i} d={path} fill={DARK_GRAY} />
            ))}
          </motion.svg>

          {/* Main logo */}
          <motion.div animate={mainControls}>
            <motion.svg
              width="100"
              height="100"
              viewBox="0 0 80 80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: logoVisible ? 1 : 0,
                scale: logoVisible ? 1 : 0.8,
              }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {QUADRANTS.map((path, i) => (
                <motion.path
                  key={i}
                  d={path}
                  fill={WHITE}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: logoVisible ? 1 : 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    filter: `drop-shadow(0 0 8px ${GRAY})`,
                  }}
                />
              ))}
            </motion.svg>
          </motion.div>
        </div>

        {/* Brand text: doXmind */}
        <motion.div
          className="flex items-baseline text-5xl tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: textVisible ? 1 : 0,
            y: textVisible ? 0 : 20,
          }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-light" style={{ color: WHITE }}>do</span>
          <motion.span
            className="font-black"
            style={{ color: WHITE }}
            animate={textVisible ? {
              textShadow: [`0 0 0px ${GRAY}`, `0 0 10px ${GRAY}`, `0 0 5px ${GRAY}`],
            } : {}}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          >
            X
          </motion.span>
          <span className="font-light" style={{ color: WHITE }}>mind</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg font-light tracking-wide"
          style={{ color: GRAY }}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: taglineVisible ? 1 : 0,
            y: taglineVisible ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          AI-Powered Writing, Reimagined
        </motion.p>

        {/* Underline */}
        <motion.div
          className="h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${GRAY}, transparent)`,
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: taglineVisible ? 200 : 0,
            opacity: taglineVisible ? 1 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.div>

      {/* Final flash effect */}
      {progress > 0.95 && (
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 0.15 }}
          style={{ backgroundColor: WHITE }}
        />
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </div>
  );
};

export default BrandReveal;
