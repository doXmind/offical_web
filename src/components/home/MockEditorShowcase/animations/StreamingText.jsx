import React, { useState, useEffect, useRef } from 'react';
import CursorBlink from './CursorBlink';

const StreamingText = ({
  text,
  delay = 0,
  chunkSize = 3,
  chunkDelay = 20,
  showCursor = true,
  className = '',
  onComplete,
  enabled = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  const isMountedRef = useRef(true);
  const currentTextRef = useRef(text);
  const isCompleteRef = useRef(false);

  // Track mounted state
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Keep onComplete ref updated without triggering effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Cleanup function
    const cleanup = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Text changed - reset completion state
    if (text !== currentTextRef.current) {
      currentTextRef.current = text;
      isCompleteRef.current = false;
    }

    if (!text || !enabled) {
      cleanup();
      if (isMountedRef.current) {
        setDisplayText('');
        setIsStreaming(false);
      }
      return cleanup;
    }

    // Already completed this text
    if (isCompleteRef.current) {
      return cleanup;
    }

    // Start fresh
    cleanup();
    if (isMountedRef.current) {
      setDisplayText('');
    }

    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      setIsStreaming(true);
      let currentIndex = 0;

      intervalRef.current = setInterval(() => {
        if (!isMountedRef.current) {
          cleanup();
          return;
        }

        if (currentIndex < text.length) {
          const nextIndex = Math.min(currentIndex + chunkSize, text.length);
          setDisplayText(text.slice(0, nextIndex));
          currentIndex = nextIndex;
        } else {
          cleanup();
          isCompleteRef.current = true;
          if (isMountedRef.current) {
            setIsStreaming(false);
            onCompleteRef.current?.();
          }
        }
      }, chunkDelay);
    }, delay);

    return cleanup;
  }, [text, delay, chunkSize, chunkDelay, enabled]);

  return (
    <span className={className}>
      {displayText}
      <CursorBlink className={showCursor && isStreaming ? '' : 'hidden'} />
    </span>
  );
};

export default StreamingText;
