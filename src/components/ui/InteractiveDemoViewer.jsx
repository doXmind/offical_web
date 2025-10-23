import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, Loader2 } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import LightboxModal from './LightboxModal';
import { cn } from '../../core/utils';

const InteractiveDemoViewer = ({
  media,
  title,
  className = '',
  enableZoom = true,
  autoPlay = true,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  const handleMediaError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleClick = () => {
    if (enableZoom && !hasError) {
      setIsLightboxOpen(true);
    }
  };

  if (!media) {
    return (
      <div className={cn(
        "relative bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden",
        "flex items-center justify-center min-h-[300px]",
        className
      )}>
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <ZoomIn className="w-10 h-10 text-primary" />
          </div>
          <p className="text-sm text-gray-500">Interactive Demo</p>
          <p className="text-xs text-gray-600 mt-1">Available in Beta</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        ref={containerRef}
        className={cn(
          "relative group cursor-pointer rounded-2xl overflow-hidden",
          "bg-gray-900/80 backdrop-blur-md border border-white/10",
          "transition-all duration-500",
          "hover:border-primary/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]",
          enableZoom && "hover:-translate-y-2",
          className
        )}
        onClick={handleClick}
        whileHover={{ scale: enableZoom ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Loading skeleton */}
        {isLoading && isInView && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center z-10">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-sm text-gray-400">Failed to load demo</p>
              <p className="text-xs text-gray-600 mt-1">Please try again later</p>
            </div>
          </div>
        )}

        {/* Media content */}
        {isInView && (
          <div className="relative w-full h-full min-h-[300px]">
            {media.type === 'video' ? (
              <VideoPlayer
                src={media.src}
                autoPlay={autoPlay}
                loop={true}
                className="w-full h-full"
              />
            ) : (
              <img
                src={media.src}
                alt={title || 'Demo'}
                className="w-full h-full object-contain"
                onLoad={handleMediaLoad}
                onError={handleMediaError}
                loading="lazy"
              />
            )}
          </div>
        )}

        {/* Zoom hint overlay */}
        {enableZoom && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="p-4 bg-primary/90 rounded-full">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Click to enlarge</span>
            </motion.div>
          </motion.div>
        )}

        {/* Gradient border animation */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 animate-pulse-slow" />
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        media={media}
        title={title}
      />
    </>
  );
};

export default InteractiveDemoViewer;
