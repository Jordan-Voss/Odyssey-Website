import React from 'react';
import { StyleSheet, View, Pressable, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/lib/supabase';

interface ThemePreviewProps {
  theme: Theme;
}

export default function ThemePreview({ theme }: ThemePreviewProps) {
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      marginTop: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 12,
    },
    card: {
      padding: 16,
      backgroundColor: theme.colors.card.background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.card.border,
      shadowColor: theme.colors.card.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    input: {
      padding: 8,
      backgroundColor: theme.colors.input.background,
      borderWidth: 1,
      borderColor: theme.colors.input.border,
      borderRadius: 4,
      color: theme.colors.input.text,
    },
    // Add button styles for each type
    buttonPrimary: {
      padding: 12,
      backgroundColor: theme.colors.button.primary.background,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.button.primary.border,
    },
    // ... add more styles for other elements
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.sectionTitle}>Theme Preview</ThemedText>
      
      {/* Typography */}
      <View style={styles.section}>
        <ThemedText style={{ color: theme.colors.text }}>Regular Text</ThemedText>
        <ThemedText style={{ color: theme.colors.textSecondary }}>Secondary Text</ThemedText>
        <ThemedText style={{ color: theme.colors.link }}>Link Text</ThemedText>
      </View>

      {/* Buttons */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Pressable style={styles.buttonPrimary}>
            <ThemedText style={{ color: theme.colors.button.primary.text }}>
              Primary Button
            </ThemedText>
          </Pressable>
          {/* Add secondary and CTA buttons */}
        </View>
      </View>

      {/* Cards */}
      <View style={styles.section}>
        <View style={styles.card}>
          <ThemedText>Sample Card Content</ThemedText>
        </View>
      </View>

      {/* Form Elements */}
      <View style={styles.section}>
        <TextInput 
          style={styles.input}
          placeholder="Sample Input"
          placeholderTextColor={theme.colors.input.placeholder}
        />
      </View>

      {/* Status Messages */}
      <View style={styles.section}>
        <View style={{ backgroundColor: theme.colors.status.success.background, padding: 12, borderRadius: 4 }}>
          <ThemedText style={{ color: theme.colors.status.success.text }}>
            Success Message
          </ThemedText>
        </View>
        {/* Add error, warning, and info messages */}
      </View>
    </ThemedView>
  );
} 