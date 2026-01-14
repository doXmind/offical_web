import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import CursorBlink from './CursorBlink';

const TypewriterText = ({
  text,
  delay = 0,
  speed = 30,
  showCursor = true,
  className = '',
  onComplete,
  enabled = true,
}) => {
  const { displayText, isTyping, isComplete } = useTypewriter(text, {
    charDelay: speed,
    startDelay: delay,
    onComplete,
    enabled,
  });

  return (
    <span className={className}>
      {displayText}
      {showCursor && (isTyping || !isComplete) && <CursorBlink />}
    </span>
  );
};

export default TypewriterText;
