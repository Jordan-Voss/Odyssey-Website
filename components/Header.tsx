import React from 'react';
import { StyleSheet, Image, ColorSchemeName } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useTheme } from '@/context/ThemeContext';


export function Header() {
  const { currentTheme } = useTheme();
  const styles = StyleSheet.create({
    headerLink: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
      backgroundColor: currentTheme.colors.background,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      height: '100%',
    },
    logo: {
      width: 60,
      height: '100%',
      marginVertical: -8,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.headerText,
    },
    separator: {
      opacity: 0.5,
    },
  }); 
  const pathname = usePathname();
  const isHome = pathname === '/';

  const getPageTitle = () => {
    // Remove (pages) from pathname for comparison
    const normalizedPath = pathname.replace('/(pages)', '').replace(/\/$/, '');
    
    switch (normalizedPath) {
      case '/coaching':
        return 'COACHING';
      case '/coaching/personal':
        return 'PERSONAL TRAINING';
      case '/coaching/programming':
        return 'PROGRAMMING';
      case '/coaching/technique':
        return 'TECHNIQUE ANALYSIS';
      case '/about/page':
        return 'ABOUT';
      case '/about/team':
        return 'OUR TEAM';
      case '/about/philosophy':
        return 'PHILOSOPHY';
      case '/contact/page':
        return 'CONTACT';
      case '/':
        return 'ODYSSEY';
      default:
        return 'ODYSSEY';
    }
  };

  return (
    <Link href="/" style={styles.headerLink}>
      <ThemedView style={styles.headerContent}>
        <Image 
          source={require('@/assets/images/ody2.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <ThemedText style={styles.headerText}>
          {getPageTitle()}
        </ThemedText>
      </ThemedView>
    </Link>
  );
}

