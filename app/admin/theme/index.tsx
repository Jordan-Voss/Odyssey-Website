import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ThemeManager() {
  const { currentTheme, setThemeById, availableThemes } = useTheme();

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