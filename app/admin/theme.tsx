import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function AdminPage() {
  const { currentTheme, setThemeById, availableThemes } = useTheme();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = () => {
    // TODO: Replace with actual API call
    if (password === 'admin123') {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.authContainer}>
          <ThemedText style={styles.title}>Admin Access</ThemedText>
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
            <ThemedText style={styles.buttonText}>Login</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Theme Manager</ThemedText>
        <View style={styles.themeList}>
          {availableThemes.map(theme => (
            <Pressable
              key={theme.id}
              style={[
                styles.themeButton,
                { backgroundColor: theme.colors.primary },
                currentTheme.id === theme.id && styles.activeTheme
              ]}
              onPress={() => setThemeById(theme.id)}
            >
              <ThemedText style={styles.themeName}>{theme.name}</ThemedText>
            </Pressable>
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    maxWidth: 600,
    width: '100%',
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  authContainer: {
    maxWidth: 400,
    width: '100%',
    marginHorizontal: 'auto',
    gap: 16,
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  authButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  themeList: {
    gap: 16,
  },
  themeButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTheme: {
    borderWidth: 2,
    borderColor: '#FFF',
  },
  themeName: {
    color: '#FFF',
    fontSize: 18,
  },
}); 