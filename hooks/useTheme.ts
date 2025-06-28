import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

/**
 * Custom hook for managing theme preference with localStorage
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // Check if user prefers dark mode at system level
    const prefersDark = 
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set theme based on localStorage or system preference
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Update document with current theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}; 