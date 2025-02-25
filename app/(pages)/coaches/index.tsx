import React from 'react';
import { StyleSheet, ScrollView, Image, Pressable, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { CoachDetail } from '@/types/coach';
import { loadCoachImages } from '@/lib/supabase';

interface Coach {
  name: string;
  role: string;
  image: any;
  bio: string;
  qualifications: string[];
  socialLinks: {
    instagram?: string;
    youtube?: string;
    email?: string;
  };
}

const services = [
  {
    title: "1:1 COACHING",
    description: "Work directly with our expert coaches to develop a personalized training approach that fits your goals and lifestyle."
  },
  {
    title: "PROGRAMMING",
    description: "Get a customized training program designed specifically for your strength goals and competition plans."
  },
  {
    title: "TECHNIQUE ANALYSIS",
    description: "Detailed video analysis and feedback to help you optimize your lifting technique and efficiency."
  }
];

export default function CoachingPage() {
  const { currentTheme } = useTheme();
  const [coaches, setCoaches] = useState<CoachDetail[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  async function fetchCoaches() {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('show', true)
      .order('order_index');

    if (!error && data) {
      setCoaches(data);
    }
  }

  useEffect(() => {
    fetchCoaches();
  }, []);

  useEffect(() => {
    async function loadImages() {
      const urls = await loadCoachImages(coaches);
      setImageUrls(urls);
    }
    if (coaches.length > 0) {
      loadImages();
    }
  }, [coaches]);

  function handleSave(updatedCoach: CoachDetail) {
    fetchCoaches(); // Refresh the list after saving
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      minHeight: '100%',
    } as ViewStyle,
    content: {
      // maxWidth: 1200,
      width: '100%',
      marginHorizontal: 'auto',
      padding: 40,
      flex: 1,
    } as ViewStyle,
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: currentTheme.colors.text,
    } as TextStyle,
    coachesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 40,
      width: '100%',
    } as ViewStyle,
    coachCard: {
      width: 280,
      minWidth: 280,
      maxWidth: 280,
      minHeight: 850,
      backgroundColor: currentTheme.colors.surface,
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
    } as ViewStyle,
    coachImage: {
      width: '100%',
      height: 350,
      objectFit: 'cover',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    } as ImageStyle,
    coachInfo: {
      padding: 24,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: currentTheme.colors.primary,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    } as ViewStyle,
    coachInfoTop: {
      gap: 16,
      flex: 1,
    } as ViewStyle,
    coachInfoBottom: {
      gap: 16,
    } as ViewStyle,
    coachName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    } as TextStyle,
    coachRole: {
      fontSize: 18,
      color: currentTheme.colors.textSecondary,
      marginBottom: 8,
    } as TextStyle,
    coachBio: {
      fontSize: 16,
      color: currentTheme.colors.textSecondary,
      lineHeight: 24,
    } as TextStyle,
    qualifications: {
      marginTop: 16,
      gap: 8,
    } as ViewStyle,
    qualification: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
    } as TextStyle,
    socialLinks: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 16,
    } as ViewStyle,
    socialLink: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: currentTheme.colors.surfaceAlt,
    } as ViewStyle,
    socialLinkText: {
      color: currentTheme.colors.text,
      fontSize: 14,
    } as TextStyle,
    hero: {
      width: '100%',
      minHeight: 500,
      position: 'relative',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    } as ViewStyle,
    heroBackground: {
      position: 'absolute',
      top: '-50%',
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '150%',
      objectFit: 'fill',
      opacity: 1,
    } as ImageStyle,
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: currentTheme.colors.overlay.background,
      opacity: 0.3,
    } as ViewStyle,
    heroContent: {
      maxWidth: 800,
      alignItems: 'center',
      gap: 24,
      position: 'relative',
      zIndex: 1,
      backgroundColor: currentTheme.colors.surface,
      padding: 40,
      borderRadius: 12,
      opacity: 0.9,
    } as ViewStyle,
    heroTitle: {
      fontSize: 64,
      fontWeight: 'bold',
      textAlign: 'center',
      color: currentTheme.colors.text,
    } as TextStyle,
    heroSubtitle: {
      fontSize: 20,
      textAlign: 'center',
      color: currentTheme.colors.textSecondary,
      lineHeight: 32,
    } as TextStyle,
    ctaButton: {
      backgroundColor: currentTheme.colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 8,
      marginTop: 16,
    } as ViewStyle,
    ctaButtonText: {
      color: currentTheme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    } as TextStyle,
    servicesSection: {
      padding: 80,
      backgroundColor: currentTheme.colors.background,
    } as ViewStyle,
    sectionTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 48,
      color: currentTheme.colors.text,
    } as TextStyle,
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 32,
      maxWidth: 1200,
      marginHorizontal: 'auto',
    } as ViewStyle,
    serviceCard: {
      width: 350,
      padding: 32,
      backgroundColor: currentTheme.colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: currentTheme.colors.primary,
    } as ViewStyle,
    serviceTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: currentTheme.colors.text,
    } as TextStyle,
    serviceDescription: {
      fontSize: 16,
      color: currentTheme.colors.textSecondary,
      lineHeight: 24,
    } as TextStyle,
    readMoreLink: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: currentTheme.colors.primary,
      marginTop: 16,
    } as ViewStyle,
    readMoreText: {
      color: currentTheme.colors.text,
      fontSize: 14,
      fontWeight: 'bold',
    } as TextStyle,
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.hero}>
          <Image 
            source={require('@/assets/images/hero-background.png')}
            style={styles.heroBackground}
          />
          <ThemedView style={styles.heroOverlay} />
          <ThemedView style={styles.heroContent}>
            <ThemedText style={styles.heroTitle}>Expert Coaching</ThemedText>
            <ThemedText style={styles.heroSubtitle}>
              Our team of experienced coaches are here to help you reach your strength goals through personalized programming, 
              technique analysis, and ongoing support.
            </ThemedText>
            <Pressable 
              style={styles.ctaButton}
              onPress={() => window.open('https://odysseystrength.com/contact', '_blank')}
            >
              <ThemedText style={styles.ctaButtonText}>Start Your Journey</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.servicesSection}>
          <ThemedText style={styles.sectionTitle}>Our Services</ThemedText>
          <ThemedView style={styles.servicesGrid}>
            {services.map((service, index) => (
              <ThemedView key={index} style={styles.serviceCard}>
                <ThemedText style={styles.serviceTitle}>{service.title}</ThemedText>
                <ThemedText style={styles.serviceDescription}>{service.description}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>Our Coaches</ThemedText>
          <ThemedView style={styles.coachesGrid}>
            {coaches.map((coach, index) => (
              <ThemedView key={index} style={styles.coachCard}>
                <Image 
                  source={{ uri: coach.image_url }}
                  style={styles.coachImage} 
                  onError={(e) => console.error('Image load error:', coach.name, e.nativeEvent)}
                />
                <ThemedView style={styles.coachInfo}>
                  <ThemedView style={styles.coachInfoTop}>
                    <ThemedText style={styles.coachName}>{coach.name}</ThemedText>
                    <ThemedText style={styles.coachRole}>{coach.role}</ThemedText>
                    <ThemedText style={styles.coachBio}>{coach.bio}</ThemedText>
                    <ThemedView style={styles.qualifications}>
                      {coach.qualifications.map((qual, idx) => (
                        <ThemedText key={idx} style={styles.qualification}>
                          • {qual}
                        </ThemedText>
                      ))}
                    </ThemedView>
                  </ThemedView>
                  <ThemedView style={styles.coachInfoBottom}>
                    <ThemedView style={styles.socialLinks}>
                      {coach.social_links?.instagram && (
                        <Pressable 
                          style={styles.socialLink}
                          onPress={() => window.open(coach.social_links.instagram, '_blank')}
                        >
                          <ThemedText style={styles.socialLinkText}>Instagram</ThemedText>
                        </Pressable>
                      )}
                      {coach.social_links?.email && (
                        <Pressable 
                          style={styles.socialLink}
                          onPress={() => window.open(`mailto:${coach.social_links.email}`, '_blank')}
                        >
                          <ThemedText style={styles.socialLinkText}>Email</ThemedText>
                        </Pressable>
                      )}
                    </ThemedView>
                    <Link 
                      href={`/coaches/${coach.name.toLowerCase().replace(/\s+/g, '-')}`}
                      asChild
                    >
                      <Pressable style={styles.readMoreLink}>
                        <ThemedText style={styles.readMoreText}>Read More →</ThemedText>
                      </Pressable>
                    </Link>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
} 