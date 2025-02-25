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
    tertiary: '#666666',
    
    background: '#000000',
    surface: '#000000',
    surfaceAlt: '#000000',
    surfaceHover: '#1A1A1A',
    
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textTertiary: '#999999',
    textInverse: '#000000',
    textDisabled: '#666666',
    link: '#1E90FF',
    linkHover: '#1570CD',
    
    divider: '#333333',
    
    button: {
      primary: {
        background: '#000000',
        text: '#FFFFFF',
        border: '#000000',
        hover: {
          background: '#1A1A1A',
          text: '#FFFFFF',
          border: '#1A1A1A'
        },
        active: {
          background: '#333333',
          text: '#FFFFFF',
          border: '#333333'
        },
        disabled: {
          background: '#666666',
          text: '#FFFFFF',
          border: '#666666'
        }
      },
      secondary: {
        background: '#000000',
        text: '#FFFFFF',
        border: '#000000',
        hover: {
          background: '#1A1A1A',
          text: '#FFFFFF',
          border: '#1A1A1A'
        },
        active: {
          background: '#333333',
          text: '#FFFFFF',
          border: '#333333'
        },
        disabled: {
          background: '#666666',
          text: '#FFFFFF',
          border: '#666666'
        }
      },
      cta: {
        background: '#000000',
        text: '#FFFFFF',
        border: '#000000',
        hover: {
          background: '#1A1A1A',
          text: '#FFFFFF',
          border: '#1A1A1A'
        },
        active: {
          background: '#333333',
          text: '#FFFFFF',
          border: '#333333'
        },
        disabled: {
          background: '#666666',
          text: '#FFFFFF',
          border: '#666666'
        }
      }
    },
    
    shadow: '#000000',
    overlay: {
      background: 'rgba(0,0,0,0.5)',
      text: '#FFFFFF'
    },
    
    status: {
      error: {
        background: '#FF5252',
        text: '#FFFFFF',
        border: '#FF5252'
      },
      success: {
        background: '#69F0AE',
        text: '#000000',
        border: '#69F0AE'
      },
      warning: {
        background: '#FFB74D',
        text: '#000000',
        border: '#FFB74D'
      },
      info: {
        background: '#64B5F6',
        text: '#FFFFFF',
        border: '#64B5F6'
      }
    },
    card: {
      background: '#1E1E1E',
      border: '#333333',
      shadow: 'rgba(0,0,0,0.3)',
      hover: {
        background: '#2A2A2A',
        border: '#444444',
        shadow: 'rgba(0,0,0,0.4)'
      }
    },
    icon: {
      primary: '#FFFFFF',
      secondary: '#AAAAAA',
      disabled: '#666666'
    },
    input: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      border: '#333333',
      placeholder: '#999999',
      focus: {
        background: '#2A2A2A',
        border: '#1E90FF',
        shadow: 'rgba(30,144,255,0.2)'
      },
      error: {
        background: '#FF000010',
        border: '#FF0000',
        text: '#FF0000'
      }
    },
    nav: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      hover: {
        background: '#2A2A2A',
        text: '#1E90FF'
      },
      active: {
        background: '#2A2A2A',
        text: '#1E90FF',
        border: '#1E90FF'
      }
    },
    tooltip: {
      background: '#000000',
      text: '#FFFFFF',
      border: '#333333'
    },
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