import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavDropdown } from '@/components/NavDropdown';
import { navItems } from '@/constants/navigation';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Drawer({ isOpen, onClose }: DrawerProps) {
  const colorScheme = useColorScheme();
  const [slideAnim] = useState(new Animated.Value(-300));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, [isOpen]);

  return (
    <Animated.View style={[
      StyleSheet.absoluteFill,
      { 
        zIndex: 9999,
        opacity: fadeAnim,
        pointerEvents: isOpen ? 'auto' : 'none',
      }
    ]}>
      <TouchableOpacity
        style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
        onPress={onClose}
      />
      <Animated.View
        style={[
          styles.drawer,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            transform: [{ translateX: slideAnim }],
            zIndex: 10000,
          },
        ]}>
        <ThemedView style={styles.drawerContent}>
          {navItems.map(item => (
            <NavDropdown
              key={item.href}
              item={item}
              isMobile
              style={styles.drawerItem}
              onClose={onClose}
            />
          ))}
        </ThemedView>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    gap: 0,
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 0,
  },
}); 