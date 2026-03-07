import { useState, useEffect, useRef } from 'react';

/**
 * Progressively reveals characters of `text` after `delay` ms.
 * @param {string} text - Full text to reveal
 * @param {boolean} active - Whether to start the reveal (tied to inView)
 * @param {number} delay - Milliseconds to wait before starting
 * @param {number} speed - Milliseconds per character (default: 40)
 * @returns {string} The currently visible portion of text
 */
export function useTypingReveal(text, active, delay = 0, speed = 40) {
  const [charCount, setCharCount] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCharCount(text.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCharCount((prev) => {
          if (prev >= text.length) {
            clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [active, text, delay, speed]);

  return text.slice(0, charCount);
}
