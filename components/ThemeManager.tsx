import React, { useState } from 'react';
import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from './ThemedText';

export function ThemeManager() {
  const { currentTheme, setThemeById, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = () => {
    // TODO: Replace with actual API call
    /* 
    const authenticate = async () => {
      try {
        const response = await fetch('/api/auth/theme', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    }
    authenticate();
    */

    // Temporary password check
    if (password === 'admin123') {
      setIsAuthenticated(true);
    }
  };

  const handleThemeChange = async (themeId: string) => {
    // TODO: Replace with actual API call
    /*
    try {
      const response = await fetch('/api/themes/change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId, password })
      });
      if (response.ok) {
        setThemeById(themeId);
      }
    } catch (error) {
      console.error('Theme change failed:', error);
    }
    */

    // Temporary direct change
    setThemeById(themeId);
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
      >
        <ThemedText style={styles.buttonText}>Theme Manager</ThemedText>
      </Pressable>

      {isOpen && (
        <View style={styles.dropdown}>
          {!isAuthenticated ? (
            <View style={styles.authContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Pressable 
                style={styles.authButton}
                onPress={handlePasswordSubmit}
              >
                <ThemedText>Submit</ThemedText>
              </Pressable>
            </View>
          ) : (
            <View style={styles.themeList}>
              {availableThemes.map(theme => (
                <Pressable
                  key={theme.id}
                  style={[
                    styles.themeButton,
                    { backgroundColor: theme.colors.primary },
                    currentTheme.id === theme.id && styles.activeTheme
                  ]}
                  onPress={() => handleThemeChange(theme.id)}
                >
                  <ThemedText style={styles.themeName}>{theme.name}</ThemedText>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 200,
  },
  authContainer: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 8,
    borderRadius: 4,
  },
  authButton: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  themeList: {
    gap: 10,
  },
  themeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  activeTheme: {
    borderWidth: 2,
    borderColor: '#000',
  },
  themeName: {
    color: '#FFF',
  },
}); 