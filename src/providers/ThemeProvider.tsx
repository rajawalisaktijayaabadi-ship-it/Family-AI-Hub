import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types/settings';
import { getItemIndexedDB, setItemIndexedDB } from '../utils/storage';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    getItemIndexedDB<ThemeMode>('theme_preference').then((savedTheme) => {
      if (savedTheme) {
        setThemeState(savedTheme);
      }
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const darkActive = theme === 'dark' || (theme === 'system' && systemPrefersDark);
    setIsDark(darkActive);

    if (darkActive) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    setItemIndexedDB('theme_preference', theme);
  }, [theme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
