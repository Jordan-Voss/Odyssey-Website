import React, { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Drawer } from '@/components/Drawer';
import { AnimatedMenuIcon } from '@/components/AnimatedMenuIcon';
import { navItems } from '@/constants/navigation';
import { NavDropdown } from '@/components/NavDropdown';
import { Header } from '@/components/Header';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const linkStyle = {
  marginRight: 32,
  fontSize: 16,
  textTransform: 'uppercase' as const,
  letterSpacing: 1,
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default function Layout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemedView style={styles.container}>
          <ThemedView 
            style={{ 
              height: 64 + insets.top,
              paddingTop: insets.top,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 12,
              borderBottomWidth: 1,
              borderBottomColor: Colors[colorScheme ?? 'light'].text,
              zIndex: 1000,
              position: 'relative',
            }}
          >
            <Header colorScheme={colorScheme} />
            {isMobile ? (
              <Pressable onPress={() => setIsDrawerOpen(true)}>
                <AnimatedMenuIcon 
                  isOpen={isDrawerOpen}
                  onPress={() => setIsDrawerOpen(!isDrawerOpen)}
                  color={Colors[colorScheme ?? 'light'].text}
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
          <Stack screenOptions={{ headerShown: false }} />
        </ThemedView>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
