import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface ThemedInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
}

export function ThemedInput({ value, onChangeText, placeholder, secureTextEntry, multiline }: ThemedInputProps) {
  const { currentTheme } = useTheme();
  
  const styles = StyleSheet.create({
    input: {
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: currentTheme.colors.border,
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.text,
      fontSize: 16,
    },
  });

  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={currentTheme.colors.textSecondary}
      multiline={multiline}
      secureTextEntry={secureTextEntry}
    />
  );
} 