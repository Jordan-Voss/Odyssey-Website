import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function CoachingPage() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        {/* <ThemedText style={styles.title}>Coaching</ThemedText> */}
        {/* Add coaching content here */}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 