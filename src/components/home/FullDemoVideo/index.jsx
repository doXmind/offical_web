import React from 'react';
import { DemoContainer, DemoProgressBar } from './components';
import {
  FileCreationScene,
  RichEditorScene,
  AutocompleteScene,
  QuickEditScene,
  AIChatScene,
  KnowledgeBaseScene,
  TextReviewScene,
  DiffReviewScene,
  MobileScene,
  MindlinesScene,
} from './scenes';
import { useDemoController } from './hooks/useDemoController';

const sceneComponents = {
  'file-creation': FileCreationScene,
  'rich-editor': RichEditorScene,
  'autocomplete': AutocompleteScene,
  'quick-edit': QuickEditScene,
  'ai-chat': AIChatScene,
  'knowledge-base': KnowledgeBaseScene,
  'text-review': TextReviewScene,
  'diff-review': DiffReviewScene,
  'mobile': MobileScene,
  'mindlines': MindlinesScene,
};

const FullDemoVideo = () => {
  const {
    scenes,
    currentIndex,
    currentScene,
    progress,
    isPlaying,
    opacity,
    sceneKey,
    goToScene,
    togglePlay,
  } = useDemoController();

  const SceneComponent = sceneComponents[currentScene.id];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <DemoContainer
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      >
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{ opacity }}
        >
          <SceneComponent key={sceneKey} isActive={opacity === 1} />
        </div>
      </DemoContainer>

      <DemoProgressBar
        scenes={scenes}
        currentIndex={currentIndex}
        progress={progress}
        onSceneChange={goToScene}
      />
    </div>
  );
};

export default FullDemoVideo;
