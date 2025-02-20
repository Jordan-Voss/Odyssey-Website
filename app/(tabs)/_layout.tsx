import React from 'react';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

import { ThemedView } from '@/components/ThemedView';
import { Drawer } from '@/components/Drawer';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';  
import { ThemedText } from '@/components/ThemedText';

export default function Layout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isMobile = width < 768;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const linkStyle = {
    marginRight: 20,
    fontSize: 16,
  };

  return (
    <>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView 
          style={{ 
            height: 60 + insets.top, 
            paddingTop: insets.top,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme ?? 'light'].text
          }}
        >
          {isMobile ? (
            <Pressable onPress={() => setIsDrawerOpen(true)}>
              <Ionicons 
                name="menu" 
                size={24} 
                color={Colors[colorScheme ?? 'light'].text} 
              />
            </Pressable>
          ) : (
            <>
              <Link href="/" style={linkStyle}>
                <ThemedText>Home</ThemedText>
              </Link>
              <Link href="/explore" style={linkStyle}>
                <ThemedText>Explore</ThemedText>
              </Link>
            </>
          )}
        </ThemedView>
        {isMobile && <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />}
        <Stack screenOptions={{ headerShown: false }} />
      </ThemedView>
    </>
  );
}
