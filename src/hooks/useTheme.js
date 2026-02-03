import { useState, useEffect, useCallback } from 'react';

/**
 * useTheme - 主题切换 Hook
 *
 * 功能:
 * - 支持深色/浅色主题切换
 * - 尊重系统偏好设置 (prefers-color-scheme)
 * - 持久化用户选择到 localStorage
 * - 自动应用到 document.documentElement
 */
const useTheme = () => {
  // Initialize theme from localStorage or system preference
  const [theme, setThemeState] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      // Fall back to system preference
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    // Default to dark theme
    return 'dark';
  });

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
    }
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only auto-switch if user hasn't set a preference
      const stored = localStorage.getItem('theme');
      if (!stored) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Set specific theme
  const setTheme = useCallback((newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme);
    }
  }, []);

  // Check if dark mode
  const isDark = theme === 'dark';

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
};

export default useTheme;
