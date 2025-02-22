import React from 'react';
import { StyleSheet, ViewStyle, TextStyle, Pressable, Image, View,useWindowDimensions} from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';

const footerLinks = {
  About: [
    { label: 'Our Story', href: '/(pages)/about/page' as const },
    { label: 'Team', href: '/(pages)/team/page' as const },
    { label: 'Careers', href: '/(pages)/careers/page' as const },
  ],
  Services: [
    { label: 'Coaching', href: '/(pages)/coaching/page' as const },
    { label: 'Programming', href: '/(pages)/programming/page' as const },
    { label: 'Workshops', href: '/(pages)/workshops/page' as const },
  ],
  Contact: [
    { label: 'Support', href: '/(pages)/support/page' as const },
    { label: 'Contact Us', href: '/(pages)/contact/page' as const },
    { label: 'FAQ', href: '/(pages)/faq/page' as const },
  ],
  Social: [
    { label: 'Instagram', href: 'https://instagram.com/odysseystrength' as const },
    { label: 'Facebook', href: 'https://facebook.com/odysseystrength' as const },
    { label: 'YouTube', href: 'https://youtube.com/odysseystrength' as const },
  ],
} as const;

export default function Footer() {
  const { currentTheme } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const styles = StyleSheet.create({
    footer: {
      backgroundColor: currentTheme.colors.surface,
      padding: 40,
      alignItems: 'center',
      width: '100%',
    },
    content: {
      maxWidth: 1200,
      width: '100%',
      alignItems: 'center',
    },
    linksContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 48,
    },
    section: {
      minWidth: 160,
      marginBottom: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginBottom: 16,
    },
    link: {
      color: currentTheme.colors.textSecondary,
      fontSize: 16,
      marginBottom: 8,
    },
    bottom: {
      borderTopWidth: 1,
      borderTopColor: currentTheme.colors.border,
      paddingTop: 24,
      width: '100%',
      alignItems: 'center',
    },
    copyright: {
      color: currentTheme.colors.textSecondary,
      fontSize: 14,
    },
    footerImage: {
      width: '100%',
      height: '330%',
      marginBottom: 20,
    },
    footerImageMobile: {
      width: '100%',
      height: '50%',
      marginBottom: 20,
    }
  });

  return (
    <ThemedView style={styles.footer as ViewStyle}>
      <Image 
        source={require('@/assets/images/footer-no-bg.png')}
        style={isMobile ? styles.footerImageMobile : styles.footerImage}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <ThemedView style={styles.linksContainer as ViewStyle}>
          {Object.entries(footerLinks).map(([section, links]) => (
            <ThemedView key={section} style={styles.section as ViewStyle}>
              <ThemedText style={styles.title as TextStyle}>{section}</ThemedText>
              {links.map((link) => (
                link.href.startsWith('http') ? (
                  <Pressable key={link.href} onPress={() => window.open(link.href, '_blank')}>
                    <ThemedText style={styles.link as TextStyle}>{link.label}</ThemedText>
                  </Pressable>
                ) : (
                  <Link key={link.href} href={link.href as any} asChild>
                    <Pressable>
                      <ThemedText style={styles.link as TextStyle}>{link.label}</ThemedText>
                    </Pressable>
                  </Link>
                )
              ))}
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.bottom as ViewStyle}>
          <ThemedText style={styles.copyright as TextStyle}>
            © {new Date().getFullYear()} Odyssey Strength. All rights reserved.
          </ThemedText>
        </ThemedView>
      </View>
    </ThemedView>
  );
} 