import { useState, useEffect } from 'react';

/**
 * Custom hook to toggle and persist dark/light theme
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow_theme');
      if (saved) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'dark'; // default to modern dark theme for maximum visual impact
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('taskflow_theme', theme);
    } catch (e) {
      console.warn('Unable to save theme in localStorage', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
