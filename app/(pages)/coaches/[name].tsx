import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { CoachDetail } from '@/types/coach';
import { supabase } from '@/lib/supabase';

export default function CoachProfile() {
  const { name } = useLocalSearchParams();
  const { currentTheme } = useTheme();
  const [coach, setCoach] = useState<CoachDetail | null>(null);

  useEffect(() => {
    async function fetchCoach() {
      const { data, error } = await supabase
        .from('coaches')
        .select('*')
        .eq('name', name.toString().split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '))
        .single();

      if (!error && data) {
        setCoach(data);
      }
    }
    fetchCoach();
  }, [name]);

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: currentTheme.colors.background,
    },
    hero: {
        padding: 60,
        backgroundColor: currentTheme.colors.surface,
        alignItems: 'center',
    },
    quote: {
        fontSize: 24,
        fontStyle: 'italic',
        textAlign: 'center',
        maxWidth: 800,
        marginBottom: 40,
        color: currentTheme.colors.text,
    },
    content: {
        maxWidth: 1200,
        width: '100%',
        marginHorizontal: 'auto',
        padding: 40,
    },
    section: {
        marginBottom: 60,
    },
    sectionTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 24,
        color: currentTheme.colors.text,
    },
    text: {
        fontSize: 18,
        lineHeight: 32,
        color: currentTheme.colors.textSecondary,
        marginBottom: 24,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        marginTop: 40,
    },
    image: {
        width: 280,
        height: 280,
        borderRadius: 12,
        objectFit: 'cover',
    },
    });
    if (!coach) return null;

    return (
      <ScrollView style={styles.container}>
        <ThemedView style={styles.hero}>
          <ThemedText style={styles.quote}>{coach.full_bio.intro}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Biography</ThemedText>
            <ThemedText style={styles.text}>{coach.full_bio.background}</ThemedText>
            <ThemedText style={styles.text}>{coach.full_bio.present}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.imageGrid}>
            {coach.images.map((image: string, index: number) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    );
  }