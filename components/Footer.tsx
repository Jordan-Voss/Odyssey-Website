import React from 'react';
import { StyleSheet, ViewStyle, TextStyle, Pressable, Image, View,useWindowDimensions} from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  return (
    <ThemedView style={styles.container}>
      <Image 
        source={require('@/assets/images/footer-no-bg.png')}
        style={isMobile ? styles.footerImageMobile : styles.footerImage}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <ThemedView style={styles.linksContainer as ViewStyle}>
          {Object.entries(footerLinks).map(([section, links]) => (
            <ThemedView key={section} style={styles.section as ViewStyle}>
              <ThemedText style={styles.sectionTitle as TextStyle}>{section}</ThemedText>
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 20,
  },
  footerImage: {
    width: '100%',
    height: '330%', // Adjust this value as needed
    marginBottom: 20,
  },
  footerImageMobile: {
    width: '100%',
    height: '50%', // Adjust this value as needed
    marginBottom: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 48,
  },
  section: {
    minWidth: 160,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  link: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.8,
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 24,
    alignItems: 'center',
  },
  copyright: {
    color: '#fff',
    opacity: 0.6,
  },
}); 