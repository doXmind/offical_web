import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoPlayer = ({ src, className = '', autoPlay = true, loop = true }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const value = (video.currentTime / video.duration) * 100;
      setProgress(value || 0);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  // Auto-hide controls after 2s of no interaction
  useEffect(() => {
    if (!isHovering) return;

    setShowControls(true);
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isHovering, isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen().catch((err) => {
        console.error('Fullscreen error:', err);
      });
    }
  };

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover rounded-lg"
        onClick={togglePlay}
      />

      {/* Controls overlay */}
      <AnimatePresence>
        {(showControls || !isPlaying) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 rounded-lg"
          >
            {/* Progress bar */}
            <div
              className="w-full h-1.5 bg-gray-700 rounded-full cursor-pointer mb-3 overflow-hidden"
              onClick={handleProgressClick}
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="p-2 bg-black/60 backdrop-blur-lg hover:bg-primary rounded-lg transition-all"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>

                {/* Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  className="p-2 bg-black/60 backdrop-blur-lg hover:bg-primary rounded-lg transition-all"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-black/60 backdrop-blur-lg hover:bg-primary rounded-lg transition-all"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play button overlay when paused */}
      {!isPlaying && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Play video"
        >
          <div className="w-20 h-20 bg-primary/90 backdrop-blur-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <Play className="w-10 h-10 text-white ml-1" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default VideoPlayer;
