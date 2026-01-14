import { useState, useEffect, useCallback, useRef } from 'react';
import { SCENE_DURATION } from '../constants/demoContent';

const SCENES = ['ai-chat', 'quick-edit', 'mindlines', 'autocomplete'];

export const useSceneManager = (options = {}) => {
  const {
    duration = SCENE_DURATION,
    autoPlay = true,
  } = options;

  const [activeScene, setActiveScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [sceneProgress, setSceneProgress] = useState(0);
  const progressRef = useRef(0);
  const isMountedRef = useRef(true);

  // Track mounted state
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Auto-advance scenes
  useEffect(() => {
    if (!isPlaying) return;

    progressRef.current = 0;
    setSceneProgress(0);

    const progressInterval = setInterval(() => {
      if (!isMountedRef.current) return;

      progressRef.current += (100 / (duration / 100));

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setSceneProgress(0);
        setActiveScene((s) => (s + 1) % SCENES.length);
        return; // Exit early after scene change to let effect re-run cleanly
      }

      setSceneProgress(progressRef.current);
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, duration, activeScene]);

  const goToScene = useCallback((index) => {
    progressRef.current = 0;
    setActiveScene(index);
    setSceneProgress(0);
  }, []);

  const nextScene = useCallback(() => {
    progressRef.current = 0;
    setActiveScene((prev) => (prev + 1) % SCENES.length);
    setSceneProgress(0);
  }, []);

  const prevScene = useCallback(() => {
    progressRef.current = 0;
    setActiveScene((prev) => (prev - 1 + SCENES.length) % SCENES.length);
    setSceneProgress(0);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return {
    activeScene,
    activeSceneName: SCENES[activeScene],
    sceneProgress,
    isPlaying,
    totalScenes: SCENES.length,
    goToScene,
    nextScene,
    prevScene,
    togglePlay,
    scenes: SCENES,
  };
};

export default useSceneManager;
