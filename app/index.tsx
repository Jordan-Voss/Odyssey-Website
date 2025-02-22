import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import About from '@/components/Home/About';
import Philosophy from '@/components/Home/Philosophy';
import Pricing from '@/components/Home/Pricing';
import SpotifyComponent from '@/components/Home/Spotify';
import Gallery from '@/components/Home/Gallery';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext';
import { ThemedButton } from '@/components/ThemedButton';

export default function HomePage() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
    },
    heroSection: {
      width: '100%',
      height: Dimensions.get('window').height,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: currentTheme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: -1,
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: 2,
    },
    heroContent: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      zIndex: 3,
      maxWidth: '80%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [
        { translateX: '-50%' },
        { translateY: '-50%' }
      ],
      flexDirection: 'column',
      gap: 20,
    },
    heroTitle: {
      fontSize: 64,
      fontWeight: 'bold',
      textAlign: 'center',
      color: currentTheme.colors.text,
      textShadowColor: currentTheme.colors.shadow,
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
      lineHeight: 72,
    },
    heroSubtitle: {
      fontSize: 28,
      textAlign: 'center',
      maxWidth: 800,
      color: currentTheme.colors.text,
      textShadowColor: currentTheme.colors.shadow,
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
      marginBottom: 20,
      lineHeight: 34,
    },
    ctaButton: {
      backgroundColor: currentTheme.colors.button.cta.background,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 5,
    },
    ctaButtonText: {
      color: currentTheme.colors.button.cta.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    section: {
      padding: 60,
      alignItems: 'center',
    },
    darkSection: {
      backgroundColor: currentTheme.colors.surface,
    },
    sectionTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
    },
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 30,
      maxWidth: 1200,
      width: '100%',
    },
    serviceCard: {
      width: 300,
      padding: 30,
      borderRadius: 10,
      backgroundColor: currentTheme.colors.card.background,
      borderColor: currentTheme.colors.card.border,
      borderWidth: 1,
      alignItems: 'center',
      shadowColor: currentTheme.colors.card.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    serviceTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: currentTheme.colors.text,
    },
    serviceDescription: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      color: currentTheme.colors.textSecondary,
      lineHeight: 24,
    },
    learnMoreButton: {
      borderWidth: 2,
      borderColor: currentTheme.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    learnMoreText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: currentTheme.colors.primary,
    },
    aboutContent: {
      maxWidth: 800,
    },
    aboutText: {
      fontSize: 18,
      lineHeight: 28,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.colors.background }]} contentContainerStyle={{ backgroundColor: currentTheme.colors.background }}>
      {/* Hero Section */}
      <ThemedView style={styles.heroSection}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}  
        >
          <source src={require('@/assets/videos/ody2.mp4')} type="video/mp4" />
        </video>
        <ThemedView style={[StyleSheet.absoluteFill, styles.overlay]} />
        <ThemedView style={styles.heroContent}>
          <ThemedText style={styles.heroTitle}>Odyssey Strength</ThemedText>
          <ThemedText style={styles.heroSubtitle}>An Epic Journey</ThemedText>
          <ThemedButton 
            label="JOIN TODAY"
            variant="cta"
            style={styles.ctaButton}
          />
        </ThemedView>
      </ThemedView>

      <About />
      <Philosophy />
      <Pricing />
      <SpotifyComponent />
      <Gallery />
      <Footer />
    </ScrollView>
  );
}

const services = [
  {
    title: '1:1 COACHING',
    description: 'Personalized coaching tailored to your specific goals with regular feedback and adjustments.',
    link: '/(pages)/coaching/page' as const
  },
  {
    title: 'PROGRAMMING',
    description: 'Custom training programs designed to maximize your strength gains and technical proficiency.',
    link: '/(pages)/coaching/page' as const
  },
  {
    title: 'TECHNIQUE ANALYSIS',
    description: 'Detailed video analysis and feedback to optimize your lifting technique.',
    link: '/(pages)/coaching/page' as const
  }
];
