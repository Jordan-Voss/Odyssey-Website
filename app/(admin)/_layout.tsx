import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider as CustomThemeProvider } from '@/context/ThemeContext';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/context/ThemeContext';

export default function AdminLayout() {
  const { currentTheme } = useTheme();
  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <ThemedView style={{ flex: 1, backgroundColor: currentTheme.colors.background }}>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemedView>
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
} 