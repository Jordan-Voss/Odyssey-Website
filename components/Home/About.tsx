import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { ThemedButton } from '@/components/ThemedButton';

export default function About() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: currentTheme.colors.surface,
      padding: 60,
    },
    content: {
      maxWidth: 1200,
      marginHorizontal: 'auto',
      alignItems: 'center',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginBottom: 30,
      textAlign: 'center',
    },
    text: {
      fontSize: 18,
      color: currentTheme.colors.textSecondary,
      textAlign: 'center',
      maxWidth: 800,
      lineHeight: 28,
    },
    button: {
      marginTop: 30,
    }
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>About Us</ThemedText>
        <ThemedText style={styles.text}>
          Let us handle the details of your athletic pursuit by working hard,
          allowing you to work smarter. You'll shine to your fullest potential.
        </ThemedText>
        <ThemedText style={styles.text}>
          We focus on being athlete-centric, responsive to data, and committed
          to relationships and coaching the whole athlete.
        </ThemedText>
        <ThemedText style={styles.text}>
          You're more than a set of numbers. We refine your lifting technique,
          your mind, your nutrition, and habits that will last a lifetime.
        </ThemedText>
        <ThemedButton 
          label="Learn More"
          variant="secondary"
          style={styles.button}
        />
      </ThemedView>
    </ThemedView>
  );
} 