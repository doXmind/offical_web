import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// Editor embed URL - change this to your actual demo URL
const DEMO_URL = 'https://beta.doxmind.com/demo';

export function EmbeddedEditor({ className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Glow effect behind the container */}
      <div className="absolute -inset-4 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl blur-2xl" />

      {/* Main container with Codex-style styling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-black shadow-2xl"
        style={{
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.06),
            0 25px 50px -12px rgba(0, 0, 0, 0.6),
            0 0 80px -20px rgba(255, 255, 255, 0.03)
          `
        }}
      >
        {/* Window Header - macOS style */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all cursor-pointer" />
          </div>

          {/* Title */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-sm text-white/40 font-medium">doXmind Editor</span>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.08]">
              Live Demo
            </span>
          </div>
        </div>

        {/* Editor iframe container */}
        <div className="relative bg-[#0a0a0a]" style={{ aspectRatio: '16 / 9', minHeight: '600px' }}>
          {/* Loading skeleton */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
                <span className="text-sm text-white/40">Loading editor...</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
              <div className="flex flex-col items-center gap-4 text-center px-8">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Unable to load the editor demo</p>
                  <p className="text-white/30 text-xs">Please check your connection</p>
                </div>
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white underline underline-offset-2 transition-colors"
                >
                  Open in new tab →
                </a>
              </div>
            </div>
          )}

          {/* iframe */}
          <iframe
            src={`${DEMO_URL}?theme=dark&template=welcome`}
            title="doXmind Editor Demo"
            allow="clipboard-read; clipboard-write"
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full border-0 transition-opacity duration-500 ${
              isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ minHeight: '600px' }}
          />
        </div>

        {/* Mobile hint - Hidden on larger screens */}
        <div className="block md:hidden p-4 text-center text-xs text-white/30 border-t border-white/[0.06] bg-white/[0.02]">
          For the best experience, try on desktop
        </div>
      </motion.div>
    </div>
  );
}

export default EmbeddedEditor;
