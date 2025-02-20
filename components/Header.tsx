import React from 'react';
import { StyleSheet, Image, ColorSchemeName } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface HeaderProps {
  colorScheme?: ColorSchemeName;
}

export function Header({ colorScheme }: HeaderProps) {
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
      case '/about':
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

const styles = StyleSheet.create({
  headerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
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
  },
  separator: {
    opacity: 0.5,
  },
}); 