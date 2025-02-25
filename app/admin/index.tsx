'use client';

import React from 'react';
import { StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';

export default function AdminDashboard() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: currentTheme.colors.background,
      alignItems: 'center',
    } as ViewStyle,

    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginBottom: 24,
      alignSelf: 'flex-start',
      width: '100%',
      maxWidth: 800,
    } as TextStyle,

    grid: {
      flexDirection: 'column',
      gap: 20,
      maxWidth: 800,
      width: '100%',
    } as ViewStyle,

    card: {
      backgroundColor: currentTheme.colors.surface,
      padding: 24,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: currentTheme.colors.divider,
      width: '100%',
    } as ViewStyle,

    cardTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginBottom: 12,
    } as TextStyle,

    cardDescription: {
      fontSize: 16,
      color: currentTheme.colors.textSecondary,
      marginBottom: 16,
      lineHeight: 24,
    } as TextStyle,

    button: {
      backgroundColor: currentTheme.colors.button.primary.background,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    } as ViewStyle,

    buttonText: {
      color: currentTheme.colors.button.primary.text,
      fontSize: 16,
      fontWeight: 'bold',
    } as TextStyle,
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Admin Dashboard</ThemedText>
      
      <ThemedView style={styles.grid}>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Manage Coaches</ThemedText>
          <ThemedText style={styles.cardDescription}>
            Add, edit, or remove coaches. Update their profiles, qualifications, and visibility status.
          </ThemedText>
          <Link href="/admin/coach" asChild>
            <Pressable style={styles.button}>
              <ThemedText style={styles.buttonText}>Manage Coaches</ThemedText>
            </Pressable>
          </Link>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Theme Settings</ThemedText>
          <ThemedText style={styles.cardDescription}>
            Customize the look and feel of your site. Create and manage color themes.
          </ThemedText>
          <Link href="/admin/themes" asChild>
            <Pressable style={styles.button}>
              <ThemedText style={styles.buttonText}>Manage Themes</ThemedText>
            </Pressable>
          </Link>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
} 