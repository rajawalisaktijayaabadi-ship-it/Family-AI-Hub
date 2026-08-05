import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types/settings';
import { getItemIndexedDB, setItemIndexedDB } from '../utils/storage';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
  isDaytime: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [isDark, setIsDark] = useState(false);
  const [isDaytime, setIsDaytime] = useState(false);

  useEffect(() => {
    getItemIndexedDB<ThemeMode>('theme_preference').then((savedTheme) => {
      if (savedTheme && savedTheme !== 'light') {
        setThemeState(savedTheme);
      } else {
        // Reset legacy 'light' preference to 'dark'
        setThemeState('dark');
        setItemIndexedDB('theme_preference', 'dark');
      }
    });
  }, []);

  useEffect(() => {
    const evaluateTheme = () => {
      const root = document.documentElement;
      const hour = new Date().getHours();
      // Daytime: 06:00 - 17:59
      const daytimeNow = hour >= 6 && hour < 18;
      setIsDaytime(daytimeNow);

      let darkActive = true;
      if (theme === 'dark') {
        darkActive = true;
      } else if (theme === 'light') {
        darkActive = false;
      } else if (theme === 'auto' || theme === 'system') {
        // Otomatis: Siang background Gelap (dark), Malam background Terang (light)
        darkActive = true; // Default to dark for daytime/auto
      }

      setIsDark(darkActive);

      if (darkActive) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    evaluateTheme();

    const interval = setInterval(evaluateTheme, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [theme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    setItemIndexedDB('theme_preference', mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, isDaytime }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
