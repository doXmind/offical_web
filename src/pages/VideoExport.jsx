import React, { useState, useEffect, useRef } from 'react';
import ContinuousDemo from '../components/home/FullDemoVideo/ContinuousDemo';

/**
 * VideoExport - A page designed for video recording
 *
 * Timeline:
 * - 0-108s: Full demo with intro/outro sequences built-in
 *
 * Total: 108 seconds (1:48)
 *
 * The ContinuousDemo component now includes:
 * - 12s IntroSequence (hook + abstract + brand)
 * - 88s Demo content
 * - 8s OutroSequence (stats + CTA)
 *
 * Usage:
 *   1. Start dev server: npm run dev
 *   2. Run export: node scripts/export-demo-video.js
 */

const TOTAL_DURATION = 108000; // 108 seconds

const VideoExport = () => {
  const [phase, setPhase] = useState('waiting'); // 'waiting' | 'recording' | 'complete'
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const demoRef = useRef(null);

  // Expose control API to Puppeteer
  useEffect(() => {
    window.__VIDEO_EXPORT__ = {
      start: () => {
        setPhase('recording');
        setStartTime(Date.now());
        // Start the demo playback via ref
        if (demoRef.current && demoRef.current.start) {
          demoRef.current.start();
        }
      },
      getPhase: () => phase,
      isComplete: () => phase === 'complete',
      isReady: () => true,
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

  // Track elapsed time
  useEffect(() => {
    if (phase !== 'recording') return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);

      if (elapsed >= TOTAL_DURATION) {
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

      {/* Recording - show ContinuousDemo */}
      {(phase === 'recording' || phase === 'complete') && (
        <div className="absolute inset-0 bg-black">
          <ContinuousDemo
            ref={demoRef}
            hideControls={true}
            autoPlay={false}
            onComplete={() => {
              setPhase('complete');
              window.__VIDEO_EXPORT_COMPLETE__ = true;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoExport;
