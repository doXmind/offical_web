import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MockEditorContainer, SceneIndicator } from './components';
import { AIChatScene, QuickEditScene, MindlinesScene, AutocompleteScene } from './scenes';

const SCENES = ['ai-chat', 'quick-edit', 'mindlines', 'autocomplete'];
const SCENE_DURATION = 8000;

const sceneComponents = {
  'ai-chat': AIChatScene,
  'quick-edit': QuickEditScene,
  'mindlines': MindlinesScene,
  'autocomplete': AutocompleteScene,
};

const MockEditorShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [sceneKey, setSceneKey] = useState(0); // Force re-mount scenes

  const timerRef = useRef(null);
  const progressRef = useRef(0);

  // Go to specific scene
  const goToScene = useCallback((index) => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Fade out
    setOpacity(0);

    // After fade out, change scene
    setTimeout(() => {
      setCurrentIndex(index);
      setSceneKey(k => k + 1); // Force re-mount
      progressRef.current = 0;
      setProgress(0);

      // Fade in
      setTimeout(() => {
        setOpacity(1);
      }, 50);
    }, 200);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);

    timerRef.current = setInterval(() => {
      progressRef.current += (100 / (SCENE_DURATION / 100));

      if (progressRef.current >= 100) {
        // Time to switch scene
        clearInterval(timerRef.current);
        timerRef.current = null;

        const nextIndex = (currentIndex + 1) % SCENES.length;
        goToScene(nextIndex);
      } else {
        setProgress(progressRef.current);
      }
    }, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, goToScene]);

  const sceneName = SCENES[currentIndex];
  const SceneComponent = sceneComponents[sceneName];

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <MockEditorContainer>
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{ opacity }}
        >
          <SceneComponent key={sceneKey} isActive={opacity === 1} />
        </div>
      </MockEditorContainer>

      <SceneIndicator
        scenes={SCENES}
        activeIndex={currentIndex}
        onSceneChange={goToScene}
        sceneProgress={progress}
      />
    </div>
  );
};

export default MockEditorShowcase;
