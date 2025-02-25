import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Theme, ThemeColors } from '@/lib/supabase';
import ColorPicker from '@/components/ColorPicker';

interface ThemeEditorProps {
  theme?: Theme;
  onSave: (theme: Theme) => void;
  onCancel: () => void;
}

// Move styles outside components
const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 800,
    width: '100%',
    marginHorizontal: 'auto',
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  colorItem: { width: 150 },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
});

export default function ThemeEditor({ theme, onSave, onCancel }: ThemeEditorProps) {
  const [name, setName] = useState(theme?.name || 'New Theme');
  const [colors, setColors] = useState<ThemeColors>(theme?.colors || defaultThemeColors);
  const [activeColorKey, setActiveColorKey] = useState<string | null>(null);

  const handleColorChange = (key: string, value: string) => {
    setColors(prev => {
      const newColors = { ...prev };
      // Handle nested properties
      const keys = key.split('.');
      let target: any = newColors;  // Type as any for nested access
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      return newColors;
    });
  };

  const handlePickerOpen = (key: string | null) => {
    setActiveColorKey(prev => prev === key ? null : key);
  };

  const handleSave = () => {
    onSave({
      id: theme?.id || '',
      name,
      colors,
      is_active: theme?.is_active || false
    });
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Theme Name</ThemedText>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter theme name"
          />
        </ThemedView>

        {/* Main Colors */}
        <ColorSection
          title="Main Colors"
          colors={{
            primary: colors.primary,
            secondary: colors.secondary,
            tertiary: colors.tertiary,
          }}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        {/* Background Colors */}
        <ColorSection
          title="Background Colors"
          colors={{
            background: colors.background,
            surface: colors.surface,
            surfaceAlt: colors.surfaceAlt,
            surfaceHover: colors.surfaceHover,
          }}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        {/* Text Colors */}
        <ColorSection
          title="Text Colors"
          colors={{
            text: colors.text,
            textSecondary: colors.textSecondary,
            textTertiary: colors.textTertiary,
            textInverse: colors.textInverse,
            textDisabled: colors.textDisabled,
            link: colors.link,
            linkHover: colors.linkHover,
          }}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        {/* Button Colors */}
        <ButtonColorSection
          title="Button Colors"
          buttons={colors.button}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        {/* UI Elements */}
        <ColorSection
          title="UI Elements"
          colors={{
            divider: colors.divider,
            shadow: colors.shadow,
            overlay: {
              background: colors.overlay.background,
              text: colors.overlay.text
            }
          }}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        {/* Status Colors */}
        <ColorSection
          title="Status Colors"
          colors={{
            error: colors.status.error.background,
            success: colors.status.success.background,
            warning: colors.status.warning.background,
            info: colors.status.info.background,
            icon: colors.icon.primary,
          }}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        {/* Forms */}
        <ColorSection
          title="Forms"
          colors={{
            input: {
              background: colors.input.background,
              text: colors.input.text,
              border: colors.input.border,
              placeholder: colors.input.placeholder,
              focus: {
                background: colors.input.focus.background,
                border: colors.input.focus.border,
                shadow: colors.input.focus.shadow
              },
              error: {
                background: colors.input.error.background,
                border: colors.input.error.border,
                text: colors.input.error.text
              }
            },
          }}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        {/* Cards */}
        <ColorSection
          title="Cards"
          colors={{
            card: {
              background: colors.card.background,
              border: colors.card.border,
              shadow: colors.card.shadow,
              hover: {
                background: colors.card.hover.background,
                border: colors.card.hover.border,
                shadow: colors.card.hover.shadow
              }
            },
          }}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        {/* Navigation */}
        <ColorSection
          title="Navigation"
          colors={{
            nav: {
              background: colors.nav.background,
              text: colors.nav.text,
              hover: {
                background: colors.nav.hover.background,
                text: colors.nav.hover.text
              },
              active: {
                background: colors.nav.active.background,
                text: colors.nav.active.text,
                border: colors.nav.active.border
              }
            },
          }}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        {/* Misc UI */}
        <ColorSection
          title="Misc UI"
          colors={{
            divider: colors.divider,
            tooltip: {
              background: colors.tooltip.background,
              text: colors.tooltip.text,
              border: colors.tooltip.border
            },
          }}
          onChange={handleColorChange}
          onPickerOpen={handlePickerOpen}
          activeKey={activeColorKey}
        />

        <ThemedView style={styles.buttonContainer}>
          <Pressable 
            style={[styles.button, { backgroundColor: colors.status.success.background }]}
            onPress={handleSave}
          >
            <ThemedText>Save Theme</ThemedText>
          </Pressable>
          <Pressable 
            style={[styles.button, { backgroundColor: colors.status.error.background }]}
            onPress={onCancel}
          >
            <ThemedText>Cancel</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

interface ColorSectionProps {
  title: string;
  colors: Record<string, any>;
  onChange: (key: string, value: string) => void;
  onPickerOpen: (key: string | null) => void;
  activeKey: string | null;
}

interface ButtonColorSectionProps {
  title: string;
  buttons: Theme['colors']['button'];
  onChange: (key: string, value: string) => void;
  onPickerOpen: (key: string | null) => void;
  activeKey: string | null;
}

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPickerOpen: () => void;
  isPickerOpen: boolean;
}

function ColorSection({ title, colors, onChange, onPickerOpen, activeKey }: ColorSectionProps) {
  const renderColorInput = (key: string, value: any, parentKey = ''): JSX.Element | JSX.Element[] => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    
    if (typeof value === 'object') {
      return (
        <React.Fragment key={fullKey}>
          {Object.entries(value).map(([nestedKey, nestedValue]) => 
            renderColorInput(nestedKey, nestedValue, fullKey)
          )}
        </React.Fragment>
      );
    }

    return (
      <ColorInput
        key={fullKey}
        label={key}
        value={value}
        onChange={(newValue) => onChange(fullKey, newValue)}
        onPickerOpen={() => onPickerOpen(fullKey)}
        isPickerOpen={activeKey === fullKey}
      />
    );
  };

  return (
    <ThemedView style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <ThemedView style={styles.colorGrid}>
        {Object.entries(colors).map(([key, value]) => renderColorInput(key, value))}
      </ThemedView>
    </ThemedView>
  );
}

function ButtonColorSection({ title, buttons, onChange, onPickerOpen, activeKey }: ButtonColorSectionProps) {
  return (
    <ThemedView style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      {Object.entries(buttons).map(([buttonType, buttonColors]) => (
        <ThemedView key={buttonType} style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{buttonType}</ThemedText>
          <ThemedView style={styles.colorGrid}>
            {Object.entries(buttonColors).map(([key, value]) => {
              // Skip nested objects (hover, active, disabled)
              if (typeof value === 'object') {
                // Handle nested properties
                return Object.entries(value).map(([nestedKey, nestedValue]) => (
                  <ColorInput
                    key={`${key}.${nestedKey}`}
                    label={`${key} ${nestedKey}`}
                    value={nestedValue}
                    onChange={(newValue) => onChange(`button.${buttonType}.${key}.${nestedKey}`, newValue)}
                    onPickerOpen={() => onPickerOpen(`button.${buttonType}.${key}.${nestedKey}`)}
                    isPickerOpen={activeKey === `button.${buttonType}.${key}.${nestedKey}`}
                  />
                ));
              }
              
              return (
                <ColorInput
                  key={key}
                  label={key}
                  value={value}
                  onChange={(newValue) => onChange(`button.${buttonType}.${key}`, newValue)}
                  onPickerOpen={() => onPickerOpen(`button.${buttonType}.${key}`)}
                  isPickerOpen={activeKey === `button.${buttonType}.${key}`}
                />
              );
            })}
          </ThemedView>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

function ColorInput({ label, value, onChange, onPickerOpen, isPickerOpen }: ColorInputProps) {
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleColorChange = (newColor: string) => {
    setTempValue(newColor);
    onChange(newColor);
  };

  const handlePickerClose = () => {
    onPickerOpen();  // This will set activeColorKey to null
  };

  return (
    <ThemedView style={styles.colorItem}>
      <ThemedText>{label}</ThemedText>
      <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable 
          style={[styles.colorPreview, { backgroundColor: tempValue }]}
          onPress={onPickerOpen}
        />
        <TextInput
          value={tempValue}
          onChangeText={handleColorChange}
          style={styles.input}
          placeholder="#000000"
        />
      </ThemedView>
      {isPickerOpen && (
        <ColorPicker
          color={tempValue}
          onChange={handleColorChange}
          onClose={handlePickerClose}  // Use our new handler
        />
      )}
    </ThemedView>
  );
}

const defaultThemeColors: ThemeColors = {
  // Main colors
  primary: '#1E90FF',
  secondary: '#333333',
  tertiary: '#666666',
  
  // Backgrounds
  background: '#000000',
  surface: '#121212',
  surfaceAlt: '#1A1A1A',
  surfaceHover: '#2A2A2A',
  
  // Text
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textTertiary: '#999999',
  textInverse: '#000000',
  textDisabled: '#666666',
  link: '#1E90FF',
  linkHover: '#1570CD',
  
  // Buttons
  button: {
    primary: {
      background: '#1E90FF',
      text: '#FFFFFF',
      border: '#1E90FF',
      hover: {
        background: '#1570CD',
        text: '#FFFFFF',
        border: '#1570CD'
      },
      active: {
        background: '#0E4C8B',
        text: '#FFFFFF',
        border: '#0E4C8B'
      },
      disabled: {
        background: '#666666',
        text: '#FFFFFF',
        border: '#666666'
      }
    },
    secondary: {
      background: '#333333',
      text: '#FFFFFF',
      border: '#333333',
      hover: {
        background: '#444444',
        text: '#FFFFFF',
        border: '#444444'
      },
      active: {
        background: '#555555',
        text: '#FFFFFF',
        border: '#555555'
      },
      disabled: {
        background: '#666666',
        text: '#FFFFFF',
        border: '#666666'
      }
    },
    cta: {
      background: '#00FF00',
      text: '#000000',
      border: '#00FF00',
      hover: {
        background: '#00CC00',
        text: '#000000',
        border: '#00CC00'
      },
      active: {
        background: '#009900',
        text: '#000000',
        border: '#009900'
      },
      disabled: {
        background: '#666666',
        text: '#FFFFFF',
        border: '#666666'
      }
    }
  },
  
  // Forms
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
  
  // Cards
  card: {
    background: '#1A1A1A',
    border: '#333333',
    shadow: 'rgba(0,0,0,0.1)',
    hover: {
      background: '#2A2A2A',
      border: '#1E90FF',
      shadow: 'rgba(30,144,255,0.2)'
    }
  },
  
  // Status
  status: {
    error: {
      background: '#FF000010',
      text: '#FF0000',
      border: '#FF0000'
    },
    success: {
      background: '#00FF0010',
      text: '#00FF00',
      border: '#00FF00'
    },
    warning: {
      background: '#FFA50010',
      text: '#FFA500',
      border: '#FFA500'
    },
    info: {
      background: '#0088FF10',
      text: '#0088FF',
      border: '#0088FF'
    }
  },
  
  // Navigation
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
  
  // Misc UI
  divider: '#333333',
  shadow: 'rgba(0,0,0,0.2)',
  overlay: {
    background: 'rgba(0,0,0,0.7)',
    text: '#FFFFFF'
  },
  tooltip: {
    background: '#000000',
    text: '#FFFFFF',
    border: '#333333'
  },
  icon: {
    primary: '#1E90FF',
    secondary: '#999999',
    disabled: '#666666'
  }
}; 