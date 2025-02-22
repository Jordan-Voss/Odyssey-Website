export interface Theme {
  id: string;
  name: string;
  colors: {
    // Main colors
    primary: string;      // Main brand color, used for highlights and CTAs
    secondary: string;    // Secondary brand color
    
    // Backgrounds
    background: string;   // Main page background
    surface: string;      // Cards, headers, elevated elements
    surfaceAlt: string;  // Alternative surface color for nested elements
    
    // Text
    text: string;        // Primary text
    textSecondary: string; // Secondary/muted text
    textInverse: string;   // Text on dark backgrounds
    priceText: string;  
    statNumber: string;    // Price text
    headerText: string;   // Header text
    // Interactive
    button: {
      primary: {
        background: string;
        text: string;
        hover: string;
        active: string;
      },
      secondary: {
        background: string;
        text: string;
        hover: string;
        active: string;
      },
      cta: {
        background: string;
        text: string;
        hover: string;
        active: string;
      }
    },
    
    // UI Elements
    border: string;      // Borders, dividers
    shadow: string;      // Shadow color
    overlay: string;     // Modal/drawer overlays
    
    // Cards & Sections
    card: {
      background: string;
      border: string;
      shadow: string;
    },
    
    // Status
    error: string;
    success: string;
    warning: string;
    info: string;
    icon: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'default-dark',
    name: 'Default Dark',
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
    }
  },
  {
    id: 'blue-gold',
    name: 'Blue & Gold',
    colors: {
      primary: '#FFD700',
      secondary: '#1E3A8A',
      
      background: '#1E3A8A',
      surface: '1E3A8A',
      surfaceAlt: '#264AAD',
      
      text: '#FFFFFF',
      textSecondary: '#FFE5B4',
      textInverse: '#0D2473',   
      priceText: '#FFD700',
      statNumber: '#FFD700',
      headerText: '#FFD700',
      button: {
        primary: {
          background: '#0D2473',
          text: '#FFD700',
          hover: '#1A3891',
          active: '#264AAD',
        },
        secondary: {
          background: '#0D2473',
          text: '#FFD700',
          hover: '#1A3891',
          active: '#264AAD',
        },
        cta: {
          background: '#0D2473',
          text: '#FFD700',
          hover: '#1A3891',
          active: '#264AAD',
        }
      },
      
      border: '#2B4BA8',
      shadow: '#061440',
      overlay: 'rgba(13,36,115,0.5)',
      
      error: '#FF5252',
      success: '#69F0AE',
      warning: '#FFB74D',
      info: '#64B5F6',
      card: {
        background: '#264AAD',
        border: '#2B4BA8',
        shadow: 'rgba(6,20,64,0.3)',
      },
      icon: '#FFFFFF',
    }
  },
  {
    id: 'default-light',
    name: 'Default Light',
    colors: {
      primary: '#1E90FF',
      secondary: '#4169E1',
      
      background: '#FFFFFF',
      surface: '#F5F5F5',
      surfaceAlt: '#EEEEEE',
      
      text: '#000000',
      textSecondary: '#666666',
      textInverse: '#FFFFFF',
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
      
      border: '#E0E0E0',
      shadow: '#000000',
      overlay: 'rgba(0,0,0,0.1)',
      
      error: '#FF0000',
      success: '#00FF00',
      warning: '#FFB74D',
      info: '#64B5F6',
      card: {
        background: '#FFFFFF',
        border: '#E0E0E0',
        shadow: 'rgba(0,0,0,0.1)',
      },
      icon: '#000000',
    }
  },
  {
    id: 'odyssey-dark',
    name: 'Odyssey Dark',
    colors: {
      primary: '#FF4081',
      secondary: '#FF80AB',
      
      background: '#1A1A1A',
      surface: '#2D2D2D',
      surfaceAlt: '#404040',
      
      text: '#FFFFFF',
      textSecondary: '#BBBBBB',
      textInverse: '#000000',
      priceText: '#FFFFFF',
      statNumber: '#FFFFFF',
      headerText: '#FFFFFF',
      button: {
        primary: {
          background: '#1A1A1A',
          text: '#FFFFFF',
          hover: '#2D2D2D',
          active: '#404040',
        },
        secondary: {
          background: '#1A1A1A',
          text: '#FFFFFF',
          hover: '#2D2D2D',
          active: '#404040',
        },
        cta: {
          background: '#1A1A1A',
          text: '#FFFFFF',
          hover: '#2D2D2D',
          active: '#404040',
        }
      },
      
      border: '#404040',
      shadow: '#000000',
      overlay: 'rgba(0,0,0,0.5)',
      
      error: '#FF5252',
      success: '#69F0AE',
      warning: '#FFB74D',
      info: '#64B5F6',
      card: {
        background: '#2D2D2D',
        border: '#404040',
        shadow: 'rgba(0,0,0,0.3)',
      },
      icon: '#FFFFFF',
      }
  }
];

export const getThemeById = (id: string): Theme => {
  return themes.find(theme => theme.id === id) || themes[0];
}; 