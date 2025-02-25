import React, { useState } from 'react';
import { TextStyle, ViewStyle, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function CoachesAdminPage() {
  const { currentTheme } = useTheme();
  const [isCreating, setIsCreating] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: currentTheme.colors.background,
    } as ViewStyle,
    
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    } as ViewStyle,
    
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    } as TextStyle,
    
    coachCard: {
      backgroundColor: currentTheme.colors.surface,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: currentTheme.colors.divider,
      marginBottom: 16,
    } as ViewStyle,
    
    addButton: {
      backgroundColor: currentTheme.colors.button.primary.background,
      padding: 12,
      borderRadius: 8,
    } as ViewStyle,
    
    buttonText: {
      color: currentTheme.colors.button.primary.text,
      fontSize: 16,
    } as TextStyle,
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Coaches</ThemedText>
        <Pressable 
          style={[styles.addButton]}
          onPress={() => setIsCreating(true)}
        >
          <ThemedText style={styles.buttonText}>Add New Coach</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
} 