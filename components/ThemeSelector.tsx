import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from './ThemedText';

export function ThemeSelector() {
  const { currentTheme, setThemeById, availableThemes } = useTheme();

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  themeButton: {
    padding: 10,
    borderRadius: 5,
  },
  activeTheme: {
    borderWidth: 2,
    borderColor: '#FFF',
  },
  themeName: {
    color: '#FFF',
  },
}); 