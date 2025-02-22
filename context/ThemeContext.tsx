import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, themes, getThemeById } from '@/constants/Themes';

interface ThemeContextType {
  currentTheme: Theme;
  setThemeById: (id: string) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themes[0],
  setThemeById: () => {},
  availableThemes: themes,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    // Load saved theme on startup
    AsyncStorage.getItem('themeId')
      .then((savedThemeId: string | null) => {
        if (savedThemeId) {
          setCurrentTheme(getThemeById(savedThemeId));
        }
      })
      .catch(console.error);
  }, []);

  const setThemeById = async (id: string) => {
    const theme = getThemeById(id);
    setCurrentTheme(theme);
    try {
      await AsyncStorage.setItem('themeId', id);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setThemeById,
      availableThemes: themes 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 