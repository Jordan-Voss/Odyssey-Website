import React from 'react';
import { StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';

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

const coaches: Coach[] = [
  {
    name: "Bryce Krawczyk",
    role: "Head Coach & Founder",
    image: require('@/assets/images/coach2.png'),  // Add this image to assets
    bio: "Bryce is an IPF World Champion and has been coaching athletes in powerlifting for over a decade. He brings extensive experience in programming and technique development.",
    qualifications: [
      "IPF World Champion",
      "Multiple National Records",
      "15+ Years Coaching Experience",
      "BSc Kinesiology"
    ],
    socialLinks: {
      instagram: "https://instagram.com/bryce_tsa",
      youtube: "https://youtube.com/@thestrengthathlete",
      email: "bryce@odysseystrength.com"
    }
  },
  {
    name: "Jordan Moffatt",
    role: "Senior Coach",
    image: require('@/assets/images/coach2.png'),  // Add this image to assets
    bio: "Jordan specializes in helping athletes optimize their technique and develop sustainable training approaches. His methodical approach has helped numerous athletes reach their competitive goals.",
    qualifications: [
      "Elite Powerlifter",
      "Provincial Champion",
      "8+ Years Coaching Experience",
      "Certified Strength & Conditioning Specialist"
    ],
    socialLinks: {
      instagram: "https://instagram.com/jordan_tsa",
      email: "jordan@odysseystrength.com"
    }
  },
  // Add more coaches as needed
];

export default function CoachingPage() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      minHeight: '100%',
    },
    content: {
      maxWidth: 1200,
      width: '100%',
      marginHorizontal: 'auto',
      padding: 40,
      flex: 1,
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: currentTheme.colors.text,
    },
    coachesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 40,
    },
    coachCard: {
      width: 350,
      backgroundColor: currentTheme.colors.surface,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: currentTheme.colors.border,
    },
    coachImage: {
      width: '100%',
      height: 400,
      objectFit: 'cover',
    },
    coachInfo: {
      padding: 24,
      gap: 16,
    },
    coachName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    coachRole: {
      fontSize: 18,
      color: currentTheme.colors.textSecondary,
      marginBottom: 8,
    },
    coachBio: {
      fontSize: 16,
      color: currentTheme.colors.textSecondary,
      lineHeight: 24,
    },
    qualifications: {
      marginTop: 16,
      gap: 8,
    },
    qualification: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
    },
    socialLinks: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 16,
    },
    socialLink: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: currentTheme.colors.surfaceAlt,
    },
    socialLinkText: {
      color: currentTheme.colors.text,
      fontSize: 14,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>Our Coaches</ThemedText>
          <ThemedView style={styles.coachesGrid}>
            {coaches.map((coach, index) => (
              <ThemedView key={index} style={styles.coachCard}>
                <Image source={coach.image} style={styles.coachImage} />
                <ThemedView style={styles.coachInfo}>
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
                  <ThemedView style={styles.socialLinks}>
                    {coach.socialLinks.instagram && (
                      <Pressable 
                        style={styles.socialLink}
                        onPress={() => window.open(coach.socialLinks.instagram, '_blank')}
                      >
                        <ThemedText style={styles.socialLinkText}>Instagram</ThemedText>
                      </Pressable>
                    )}
                    {coach.socialLinks.email && (
                      <Pressable 
                        style={styles.socialLink}
                        onPress={() => window.open(`mailto:${coach.socialLinks.email}`, '_blank')}
                      >
                        <ThemedText style={styles.socialLinkText}>Email</ThemedText>
                      </Pressable>
                    )}
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