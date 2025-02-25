import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable, ViewStyle, TextStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Theme, getAllThemes, setActiveTheme, updateTheme } from '@/lib/supabase';
import { useTheme } from '@/context/ThemeContext';
import ThemeEditor from './ThemeEditor';

export default function ThemesPage() {
  const { currentTheme } = useTheme();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [editingTheme, setEditingTheme] = useState<Theme | undefined>();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadThemes();
  }, []);

  async function loadThemes() {
    const themes = await getAllThemes();
    setThemes(themes);
  }

  async function handleSetActive(themeId: string) {
    await setActiveTheme(themeId);
    loadThemes();
  }

  async function handleSaveTheme(theme: Theme) {
    const success = await updateTheme(theme);
    if (success) {
      setEditingTheme(undefined);
      setIsCreating(false);
      await loadThemes();
      if (theme.is_active) {
        window.location.reload();
      }
    } else {
      alert('Failed to save theme');
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: currentTheme.colors.background,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    } as ViewStyle,
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    } as TextStyle,
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 20,
    },
    themeCard: {
      backgroundColor: currentTheme.colors.surface,
      padding: 24,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: currentTheme.colors.divider,
      gap: 16,
    } as ViewStyle,
    themeName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginBottom: 12,
    } as TextStyle,
    colorPreview: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    } as ViewStyle,
    colorSwatch: {
      width: 32,
      height: 32,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: currentTheme.colors.divider,
    } as ViewStyle,
    buttonContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
    },
    addButton: {
      backgroundColor: currentTheme.colors.button.secondary.background,
      padding: 12,
      borderRadius: 8,
    } as ViewStyle,
    buttonText: {
      color: currentTheme.colors.button.primary.text,
      fontSize: 16,
    } as TextStyle,
    actionButton: {
      padding: 8,
      borderRadius: 4,
      alignItems: 'center',
      flex: 1,
    } as ViewStyle,
  });

  if (editingTheme || isCreating) {
    return (
      <ThemeEditor 
        theme={editingTheme}
        onSave={handleSaveTheme}
        onCancel={() => {
          setEditingTheme(undefined);
          setIsCreating(false);
        }}
      />
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Theme Management</ThemedText>
          <Pressable 
            style={styles.addButton}
            onPress={() => setIsCreating(true)}
          >
            <ThemedText style={styles.buttonText}>Create New Theme</ThemedText>
          </Pressable>
        </ThemedView>

        <ThemedView style={styles.grid}>
          {themes.map(theme => (
            <ThemedView key={theme.id} style={styles.themeCard}>
              <ThemedText style={styles.themeName}>{theme.name}</ThemedText>
              
              <ThemedView style={styles.colorPreview}>
                <ThemedView 
                  style={[styles.colorSwatch, { backgroundColor: theme.colors.primary }]} 
                />
                <ThemedView 
                  style={[styles.colorSwatch, { backgroundColor: theme.colors.secondary }]} 
                />
                <ThemedView 
                  style={[styles.colorSwatch, { backgroundColor: theme.colors.background }]} 
                />
              </ThemedView>

              <ThemedView style={styles.buttonContainer}>
                <Pressable 
                  style={[
                    styles.actionButton, 
                    { backgroundColor: currentTheme.colors.button.primary.background }
                  ]}
                  onPress={() => setEditingTheme(theme)}
                >
                  <ThemedText style={styles.buttonText}>Edit</ThemedText>
                </Pressable>
                {!theme.is_active && (
                  <Pressable 
                    style={[
                      styles.actionButton, 
                      { backgroundColor: currentTheme.colors.button.secondary.background }
                    ]}
                    onPress={() => handleSetActive(theme.id)}
                  >
                    <ThemedText style={styles.buttonText}>Set Active</ThemedText>
                  </Pressable>
                )}
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
} 