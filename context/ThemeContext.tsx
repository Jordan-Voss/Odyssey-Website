import React, { createContext, useContext, useState, useEffect } from 'react';
import { getActiveTheme, getAllThemes, setActiveTheme, Theme } from '@/lib/supabase';

interface ThemeContextType {
  currentTheme: Theme;
  availableThemes: Theme[];
  setThemeById: (id: string) => Promise<void>;
  loadThemes: () => Promise<void>;
}

// Create context with a default value
const defaultTheme: Theme = {
  id: 'default',
  name: 'Default',
  colors: {
    primary: '#1E90FF',
    secondary: '#000000',
    
    background: '#000000',
    surface: '#000000',
    surfaceAlt: '#000000',
    
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textInverse: '#000000',
    priceText: '#FFFFFF',
    statNumber: '#FFFFFF',
    headerText: '#FFFFFF',
    button: {
      primary: {
        background: '#000000',
        text: '#FFFFFF',
        hover: '#1A1A1A',
        active: '#333333',
      },
      secondary: {
        background: '#000000',
        text: '#FFFFFF',
        hover: '#1A1A1A',
        active: '#333333',
      },
      cta: {
        background: '#000000',
        text: '#FFFFFF',
        hover: '#1A1A1A',
        active: '#333333',
      }
    },
    
    border: '#333333',
    shadow: '#000000',
    overlay: 'rgba(0,0,0,0.5)',
    
    error: '#FF5252',
    success: '#69F0AE',
    warning: '#FFB74D',
    info: '#64B5F6',
    card: {
      background: '#1E1E1E',
      border: '#333333',
      shadow: 'rgba(0,0,0,0.3)',
    },
    icon: '#FFFFFF',
  },
  is_active: true
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme,
  availableThemes: [defaultTheme],
  setThemeById: async () => {},
  loadThemes: async () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [availableThemes, setAvailableThemes] = useState<Theme[]>([defaultTheme]);

  async function loadThemes() {
    const themes = await getAllThemes();
    if (themes.length > 0) {
      setAvailableThemes(themes);
      const active = await getActiveTheme();
      if (active) {
        setCurrentTheme(active);
      } else {
        await setActiveTheme(themes[0].id);
        setCurrentTheme(themes[0]);
      }
    }
  }

  useEffect(() => {
    loadThemes();
  }, []);

  async function setThemeById(id: string) {
    const success = await setActiveTheme(id);
    if (success) {
      const newTheme = availableThemes.find(t => t.id === id);
      if (newTheme) {
        setCurrentTheme(newTheme);
      }
    }
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme, 
        availableThemes, 
        setThemeById, 
        loadThemes 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 