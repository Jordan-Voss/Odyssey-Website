import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider as CustomThemeProvider } from '@/context/ThemeContext';
import { ThemedView } from '@/components/ThemedView';

export default function AdminLayout() {
  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <ThemedView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemedView>
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
} 