'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeModeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};

export const ThemeModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Vérifier si on est côté client
    if (typeof window === 'undefined') {
      return false; // Valeur par défaut côté serveur
    }
    // Récupérer la préférence sauvegardée ou utiliser la préférence système
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(newValue));
      }
      return newValue;
    });
  };

  useEffect(() => {
    // Vérifier si on est côté client
    if (typeof window === 'undefined') {
      return;
    }
    
    // Écouter les changements de préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return (
    <ThemeModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};