import { useState, useEffect, useCallback, useRef } from 'react';

export const useTypewriter = (text, options = {}) => {
  const {
    charDelay = 30,
    startDelay = 0,
    onComplete = () => {},
    enabled = true,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);
  const onCompleteRef = useRef(onComplete);
  const currentTextRef = useRef(text);
  const isCompletedRef = useRef(false);

  // Track mounted state
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Keep onComplete ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setDisplayText('');
      setIsComplete(false);
      setIsTyping(false);
    }
  }, []);

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
      isCompletedRef.current = false;
    }

    if (!text || !enabled) {
      cleanup();
      reset();
      return cleanup;
    }

    // Already completed this text
    if (isCompletedRef.current) {
      return cleanup;
    }

    cleanup();
    reset();

    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      setIsTyping(true);
      let currentIndex = 0;

      intervalRef.current = setInterval(() => {
        if (!isMountedRef.current) {
          cleanup();
          return;
        }

        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          cleanup();
          isCompletedRef.current = true;
          if (isMountedRef.current) {
            setIsTyping(false);
            setIsComplete(true);
            onCompleteRef.current?.();
          }
        }
      }, charDelay);
    }, startDelay);

    return cleanup;
  }, [text, charDelay, startDelay, enabled, reset]);

  return { displayText, isComplete, isTyping, reset };
};

export default useTypewriter;
