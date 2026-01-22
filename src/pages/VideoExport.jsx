import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLogo, GlitchProvider } from '../components/ui/AnimatedLogo';
import ContinuousDemo from '../components/home/FullDemoVideo/ContinuousDemo';

/**
 * VideoExport - A page designed for video recording
 *
 * Timeline:
 * - 0-4s: Logo intro animation
 * - 4-104s: Demo content (100 seconds)
 * - 104-108s: Logo outro animation
 *
 * Total: 108 seconds
 *
 * Usage:
 *   1. Start dev server: npm run dev
 *   2. Run export: npm run export-video
 */

const INTRO_DURATION = 4000;
const DEMO_DURATION = 100000;
const OUTRO_DURATION = 4000;
const TOTAL_DURATION = INTRO_DURATION + DEMO_DURATION + OUTRO_DURATION;

const VideoExport = () => {
  const [phase, setPhase] = useState('waiting'); // 'waiting' | 'intro' | 'demo' | 'outro' | 'complete'
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Start recording when signaled by Puppeteer or after a short delay
  useEffect(() => {
    // Expose control API to Puppeteer
    window.__VIDEO_EXPORT__ = {
      start: () => {
        setPhase('intro');
        setStartTime(Date.now());
      },
      getPhase: () => phase,
      isComplete: () => phase === 'complete',
      getDuration: () => TOTAL_DURATION,
    };

    // Auto-start after 1 second if not controlled by Puppeteer
    const autoStartTimer = setTimeout(() => {
      if (phase === 'waiting') {
        window.__VIDEO_EXPORT__.start();
      }
    }, 1000);

    return () => {
      clearTimeout(autoStartTimer);
      delete window.__VIDEO_EXPORT__;
    };
  }, [phase]);

  // Phase transitions based on elapsed time
  useEffect(() => {
    if (phase === 'waiting' || phase === 'complete') return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);

      if (elapsed < INTRO_DURATION) {
        if (phase !== 'intro') setPhase('intro');
      } else if (elapsed < INTRO_DURATION + DEMO_DURATION) {
        if (phase !== 'demo') setPhase('demo');
      } else if (elapsed < TOTAL_DURATION) {
        if (phase !== 'outro') setPhase('outro');
      } else {
        setPhase('complete');
        window.__VIDEO_EXPORT_COMPLETE__ = true;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase, startTime]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Debug overlay */}
      <div className="video-export-debug absolute top-4 right-4 z-[100] text-white/50 text-xs font-mono">
        <div>Phase: {phase}</div>
        <div>Time: {formatTime(elapsedTime)} / {formatTime(TOTAL_DURATION)}</div>
        <div className="w-32 h-1 bg-white/20 mt-1 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/60"
            style={{ width: `${(elapsedTime / TOTAL_DURATION) * 100}%` }}
          />
        </div>
      </div>

      {/* Waiting state */}
      {phase === 'waiting' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white/50 text-sm">Preparing...</div>
        </div>
      )}

      {/* Intro */}
      {phase === 'intro' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <LogoAnimation />
        </div>
      )}

      {/* Demo - use key to prevent re-mounting */}
      {phase === 'demo' && (
        <div className="absolute inset-0 bg-black">
          <div className="w-full h-full flex items-center justify-center py-8">
            <style>{`
              .video-export-demo-wrapper > div > .mt-4 { display: none !important; }
            `}</style>
            <div className="video-export-demo-wrapper w-full">
              <ContinuousDemo />
            </div>
          </div>
        </div>
      )}

      {/* Outro */}
      {(phase === 'outro' || phase === 'complete') && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <LogoAnimation />
        </div>
      )}
    </div>
  );
};

const LogoAnimation = () => {
  return (
    <GlitchProvider enableGlitchLoop={true}>
      <div className="text-white flex flex-col items-center">
        <AnimatedLogo size="2xl" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 text-white/60 text-lg tracking-wide"
        >
          AI-Powered Writing Assistant
        </motion.p>
      </div>
    </GlitchProvider>
  );
};

export default VideoExport;
