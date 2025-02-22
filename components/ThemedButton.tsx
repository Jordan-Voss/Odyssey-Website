import React from 'react';
import { Pressable, StyleSheet, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from './ThemedText';

interface ThemedButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'cta';
  style?: StyleProp<ViewStyle>;
}

export function ThemedButton({ label, variant = 'primary', style, ...props }: ThemedButtonProps) {
  const { currentTheme } = useTheme();
  const buttonTheme = currentTheme.colors.button[variant];

  const buttonStyles = StyleSheet.create({
    button: {
      backgroundColor: buttonTheme.background,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: buttonTheme.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <Pressable 
      style={({ pressed }) => [
        buttonStyles.button,
        style,
        pressed && { backgroundColor: buttonTheme.active }
      ]}
      {...props}
    >
      <ThemedText style={buttonStyles.buttonText}>{label}</ThemedText>
    </Pressable>
  );
} 