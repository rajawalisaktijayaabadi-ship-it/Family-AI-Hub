import React, { createContext, useContext, useEffect, useState } from 'react';
import { LanguageCode } from '../types/settings';
import { getTranslation, TRANSLATIONS } from '../utils/i18n';
import { getItemIndexedDB, setItemIndexedDB } from '../utils/storage';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof typeof TRANSLATIONS['id']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('id');

  useEffect(() => {
    getItemIndexedDB<LanguageCode>('language_preference').then((savedLang) => {
      if (savedLang) {
        setLanguageState(savedLang);
      }
    });
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    setItemIndexedDB('language_preference', lang);
  };

  const t = (key: keyof typeof TRANSLATIONS['id']) => getTranslation(language, key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
