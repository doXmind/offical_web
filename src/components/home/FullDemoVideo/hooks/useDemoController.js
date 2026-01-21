import { useState, useEffect, useRef, useCallback } from 'react';

const SCENES = [
  { id: 'file-creation', duration: 8000, label: 'Create File' },
  { id: 'rich-editor', duration: 8000, label: 'Rich Editor' },
  { id: 'autocomplete', duration: 8000, label: 'AI Autocomplete' },
  { id: 'quick-edit', duration: 8000, label: 'Quick Edit' },
  { id: 'ai-chat', duration: 10000, label: 'AI Chat' },
  { id: 'knowledge-base', duration: 8000, label: 'Knowledge Base' },
  { id: 'text-review', duration: 8000, label: 'Text Review' },
  { id: 'diff-review', duration: 8000, label: 'Diff Review' },
  { id: 'mobile', duration: 8000, label: 'Mobile' },
  { id: 'mindlines', duration: 8000, label: 'Mindlines' },
];

export const useDemoController = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [sceneKey, setSceneKey] = useState(0);

  const timerRef = useRef(null);
  const progressRef = useRef(0);
  const isMountedRef = useRef(true);

  const currentScene = SCENES[currentIndex];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goToScene = useCallback((index) => {
    clearTimer();

    // Fade out
    setOpacity(0);

    setTimeout(() => {
      if (!isMountedRef.current) return;

      setCurrentIndex(index);
      setSceneKey(k => k + 1);
      progressRef.current = 0;
      setProgress(0);

      // Fade in
      setTimeout(() => {
        if (!isMountedRef.current) return;
        setOpacity(1);
      }, 50);
    }, 200);
  }, [clearTimer]);

  const nextScene = useCallback(() => {
    const next = (currentIndex + 1) % SCENES.length;
    goToScene(next);
  }, [currentIndex, goToScene]);

  const prevScene = useCallback(() => {
    const prev = currentIndex === 0 ? SCENES.length - 1 : currentIndex - 1;
    goToScene(prev);
  }, [currentIndex, goToScene]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) {
      clearTimer();
      return;
    }

    const duration = currentScene.duration;
    const interval = 100;
    const increment = (100 / (duration / interval));

    timerRef.current = setInterval(() => {
      if (!isMountedRef.current) return;

      progressRef.current += increment;

      if (progressRef.current >= 100) {
        clearTimer();
        nextScene();
      } else {
        setProgress(progressRef.current);
      }
    }, interval);

    return clearTimer;
  }, [currentIndex, isPlaying, currentScene.duration, clearTimer, nextScene]);

  // Reset progress when scene changes
  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);
  }, [currentIndex]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearTimer();
    };
  }, [clearTimer]);

  return {
    scenes: SCENES,
    currentIndex,
    currentScene,
    progress,
    isPlaying,
    opacity,
    sceneKey,
    goToScene,
    nextScene,
    prevScene,
    togglePlay,
    play,
    pause,
  };
};

export default useDemoController;
