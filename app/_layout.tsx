import React, { useState, useEffect } from 'react';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/ThemedView';
import { Drawer } from '@/components/Drawer';
import { AnimatedMenuIcon } from '@/components/AnimatedMenuIcon';
import { navItems } from '@/constants/navigation';
import { NavDropdown } from '@/components/NavDropdown';
import { Header } from '@/components/Header';
import { ThemeProvider as CustomThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/context/ThemeContext';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

interface LayoutContentProps {
  insets: { top: number };
  isMobile: boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!loaded) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <LayoutContent 
        insets={insets}
        isMobile={isMobile}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </CustomThemeProvider>
  );
}

function LayoutContent({ insets, isMobile, isDrawerOpen, setIsDrawerOpen }: LayoutContentProps) {
  const { currentTheme } = useTheme();
  
  const linkStyle = {
    marginRight: 32,
    fontSize: 16,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    backgroundColor: currentTheme.colors.background,
  } as const;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
    },
    header: {
      height: 64 + insets.top,
      paddingTop: insets.top,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.colors.border,
      backgroundColor: currentTheme.colors.surface,
      zIndex: 10000,
      position: 'relative',
    },
  });

  return (
    <SafeAreaProvider style={{ backgroundColor: currentTheme.colors.background }}>
      <ThemedView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
        <ThemedView style={styles.header}>
          <Header />
          {isMobile ? (
            <Pressable onPress={() => setIsDrawerOpen(true)}>
              <AnimatedMenuIcon 
                isOpen={isDrawerOpen}
                onPress={() => setIsDrawerOpen(!isDrawerOpen)}
                color={currentTheme.colors.text}
              />
            </Pressable>
          ) : (
            <ThemedView style={{ flexDirection: 'row', gap: 32 }}>
              {navItems.map(item => (
                <NavDropdown
                  key={item.href}
                  item={item}
                  style={linkStyle}
                />
              ))}
            </ThemedView>
          )}
        </ThemedView>
        {isMobile && <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />}
        <ThemedView style={{ flex: 1, backgroundColor: 'green' }}>
          <Stack
            screenOptions={{ 
              headerShown: false,
              contentStyle: { backgroundColor: 'green' }
            }} 
          />
        </ThemedView>
      </ThemedView>
    </SafeAreaProvider>
  );
}
