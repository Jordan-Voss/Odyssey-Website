import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, Animated, View, ViewStyle, TextStyle } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { navItems } from '@/constants/navigation';
import type { Route } from '@/constants/navigation';
import { useTheme } from '@/context/ThemeContext';

interface SubItem {
  label: string;
  href: Route;
}

interface BaseNavItem {
  label: string;
  href?: Route;
}

interface NavItemWithSubItems extends BaseNavItem {
  subItems: SubItem[];
}

type NavItem = BaseNavItem | NavItemWithSubItems;

const hasSubItems = (item: NavItem): item is NavItemWithSubItems => {
  return 'subItems' in item && Array.isArray(item.subItems);
};

interface NavDropdownProps {
  item: NavItem;
  isMobile?: boolean;
  style?: any;
  onClose?: () => void;
}

export function NavDropdown({ item, isMobile, style, onClose }: NavDropdownProps) {
  const pathname = usePathname();
  const { currentTheme } = useTheme();
  
  const activeColor = currentTheme.colors.primary;

  const [isOpen, setIsOpen] = useState(() => {
    if (hasSubItems(item)) {
      return item.subItems.some(subItem => subItem.href === pathname);
    }
    return false;
  });

  const [animation] = useState(new Animated.Value(isOpen ? 1 : 0));
  const [contentHeight, setContentHeight] = useState(0);

  // Use Animated.Value directly for height
  const heightAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight]
  });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const onLayout = (e: any) => {
    const height = e.nativeEvent.layout.height;
    if (height > 0 && height !== contentHeight) {
      setContentHeight(height);
    }
  };

  const isActive = (href?: Route) => pathname === href;
  const isParentActive = hasSubItems(item) && item.subItems.some(subItem => subItem.href === pathname);

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      backgroundColor: currentTheme.colors.background,
    },
    mobileContainer: {
      width: '100%',
    },
    dropdownContainer: {
      width: '100%',
    },
    dropdown: {
      position: 'relative',
      width: '100%',
      paddingLeft: 16,
      marginTop: 4,
    },
    link: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderColor: currentTheme.colors.border,
    },
    mainLink: {
      flex: 1,
    },
    linkText: {
      fontSize: 16,
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: currentTheme.colors.text,
    },
    subLink: {
      padding: 12,
      backgroundColor: currentTheme.colors.surface,
    },
    subLinkText: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
    },
    desktopDropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      minWidth: 200,
      borderRadius: 8,
      backgroundColor: currentTheme.colors.background,
      borderColor: currentTheme.colors.border,
      borderWidth: 1,
      shadowColor: currentTheme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 1000,
    },
    hoverArea: {
      position: 'relative',
    },
    mobileSubItems: {
      paddingLeft: 20,
    },
    mobileSubItem: {
      paddingVertical: 12,
    },
  });

  if (isMobile) {
    return (
      <View style={{ backgroundColor: 'red'}}>
        {hasSubItems(item) ? (
          <>
            <Pressable 
              style={styles.link} 
              onPress={() => setIsOpen(!isOpen)}
            >
              <ThemedText style={[
                styles.linkText,
                (isActive(item.href) || isParentActive) && { color: activeColor }
              ]}>
                {item.label}
              </ThemedText>
              <Animated.View style={{
                transform: [{
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  })
                }]
              }}>
                <Ionicons 
                  name="chevron-down"
                  size={24} 
                  color={currentTheme.colors.text} 
                />
              </Animated.View>
            </Pressable>
            <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
              <View 
                style={[styles.mobileSubItems]}
                onLayout={onLayout}
              >
                {item.subItems.map((subItem) => (
                  <Link key={subItem.href} href={subItem.href as any} asChild>
                    <Pressable 
                      style={styles.mobileSubItem}
                      onPress={onClose}
                    >
                      <ThemedText style={[
                        styles.subLinkText,
                        isActive(subItem.href) && { color: activeColor }
                      ]}>
                        {subItem.label}
                      </ThemedText>
                    </Pressable>
                  </Link>
                ))}
              </View>
            </Animated.View>
          </>
        ) : (
          <Link href={item.href as any} asChild>
            <Pressable style={styles.link} onPress={onClose}>
              <ThemedText style={[
                styles.linkText,
                (isActive(item.href) || isParentActive) && { color: activeColor }
              ]}>
                {item.label}
              </ThemedText>
            </Pressable>
          </Link>
        )}
      </View>
    );
  }

  return (
    <ThemedView style={[styles.container, isMobile && styles.mobileContainer]}>
      <Pressable 
        style={styles.hoverArea}
        onHoverIn={() => !isMobile && setIsOpen(true)}
        onHoverOut={() => !isMobile && setIsOpen(false)}
      >
        <ThemedView style={[styles.link, style]}>
          <Link 
            href={item.href as any}
            onPress={onClose}
            style={styles.mainLink}
          >
            <ThemedText style={[
              styles.linkText, 
              (isActive(item.href) || isParentActive) && { color: activeColor }
            ]}>
              {item.label}
            </ThemedText>
          </Link>
          {isMobile && (
            <Pressable onPress={() => setIsOpen(!isOpen)}>
              <Animated.View style={{
                transform: [{
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  })
                }]
              }}>
                <Ionicons name="chevron-down" size={18} color={currentTheme.colors.text} />
              </Animated.View>
            </Pressable>
          )}
        </ThemedView>
        {!isMobile && isOpen && hasSubItems(item) && (
          <ThemedView 
            style={[
              styles.desktopDropdown,
              { backgroundColor: currentTheme.colors.background }
            ]}
          >
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href as any}
                style={styles.subLink}
                onPress={onClose}
              >
                <ThemedText style={[
                  styles.subLinkText,
                  isActive(subItem.href) && { color: activeColor }
                ]}>
                  {subItem.label}
                </ThemedText>
              </Link>
            ))}
          </ThemedView>
        )}
      </Pressable>
    </ThemedView>
  );
}

export default NavDropdown; 