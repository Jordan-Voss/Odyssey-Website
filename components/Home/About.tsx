import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function About() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Focus on what matters most</ThemedText>
      
      <ThemedView style={styles.textContainer}>
        <ThemedView style={styles.column}>
          <ThemedText style={styles.text}>
            Let us handle the details of your athletic pursuit by working hard,
            allowing you to work smarter. You'll shine to your fullest potential.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.column}>
          <ThemedText style={styles.text}>
            We focus on being athlete-centric, responsive to data, and committed
            to relationships and coaching the whole athlete.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.column}>
          <ThemedText style={styles.text}>
            You're more than a set of numbers. We refine your lifting technique,
            your mind, your nutrition, and habits that will last a lifetime.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -80,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    maxWidth: 1200,
  },
  column: {
    flex: 1,
    minWidth: 300,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
}); 