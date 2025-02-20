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

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
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
        <ThemedView style={[StyleSheet.absoluteFill, styles.overlay, { zIndex: 2 }]} />
        <ThemedView style={[styles.heroContent, { zIndex: 3 }]}>
          <ThemedText style={styles.heroTitle}>Odyssey Strength</ThemedText>
          <ThemedText style={styles.heroSubtitle}>An Epic Journey</ThemedText>
          <Link href="/(pages)/sign-up/page" style={styles.ctaButton}>
            <ThemedText style={styles.ctaButtonText}>JOIN TODAY</ThemedText>
          </Link>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    width: '100%',
    height: Dimensions.get('window').height,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000',
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
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    lineHeight: 72,
  },
  heroSubtitle: {
    fontSize: 28,
    textAlign: 'center',
    maxWidth: 800,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 20,
    lineHeight: 34,
  },
  ctaButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    padding: 60,
    alignItems: 'center',
  },
  darkSection: {
    backgroundColor: '#1A1A1A',
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
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    shadowColor: '#000',
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
    color: '#FFFFFF',
  },
  serviceDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#E0E0E0',
    lineHeight: 24,
  },
  learnMoreButton: {
    borderWidth: 2,
    borderColor: '#FF4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4444',
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