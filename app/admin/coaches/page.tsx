import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { supabase } from '@/lib/supabase';
import { CoachDetail } from '@/types/coach';
import { CoachForm } from '@/components/Admin/CoachForm';

export default function AdminCoachesPage() {
  const { currentTheme } = useTheme();
  const [coaches, setCoaches] = useState<CoachDetail[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<CoachDetail | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCoaches();
  }, []);

  async function fetchCoaches() {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .order('order_index');

    if (error) {
      console.error('Error fetching coaches:', error);
      return;
    }

    setCoaches(data);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    addButton: {
      backgroundColor: currentTheme.colors.primary,
      padding: 10,
      borderRadius: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    coachList: {
      marginBottom: 20,
    },
    coachItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: currentTheme.colors.surface,
      borderRadius: 8,
      marginBottom: 10,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Manage Coaches</ThemedText>
        <Pressable 
          style={styles.addButton}
          onPress={() => {
            setSelectedCoach(null);
            setIsEditing(true);
          }}
        >
          <ThemedText style={styles.buttonText}>Add New Coach</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.coachList}>
        {coaches.map((coach) => (
          <ThemedView key={coach.id} style={styles.coachItem}>
            <ThemedText>{coach.name}</ThemedText>
            <ThemedView style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable 
                style={[styles.addButton, { backgroundColor: currentTheme.colors.secondary }]}
                onPress={() => {
                  setSelectedCoach(coach);
                  setIsEditing(true);
                }}
              >
                <ThemedText style={styles.buttonText}>Edit</ThemedText>
              </Pressable>
              <Pressable 
                style={[styles.addButton, { backgroundColor: currentTheme.colors.error }]}
                onPress={async () => {
                  if (confirm('Are you sure you want to delete this coach?')) {
                    await supabase
                      .from('coaches')
                      .delete()
                      .eq('id', coach.id);
                    fetchCoaches();
                  }
                }}
              >
                <ThemedText style={styles.buttonText}>Delete</ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>

      {isEditing && (
        <CoachForm 
          coach={selectedCoach}
          onSave={async (coachData) => {
            if (selectedCoach) {
              await supabase
                .from('coaches')
                .update(coachData)
                .eq('id', selectedCoach.id);
            } else {
              await supabase
                .from('coaches')
                .insert([coachData]);
            }
            setIsEditing(false);
            fetchCoaches();
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </ScrollView>
  );
} 