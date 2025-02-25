import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable, ViewStyle, TextStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CoachForm } from '@/components/Admin/CoachForm';
import { supabase, updateCoach } from '@/lib/supabase';
import { CoachDetail } from '@/types/coach';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTheme } from "@/context/ThemeContext";

export default function CoachAdminPage() {
  const { currentTheme } = useTheme();
  const [coaches, setCoaches] = useState<CoachDetail[]>([]);
  const [editingCoach, setEditingCoach] = useState<CoachDetail | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: currentTheme.colors.background,
      alignItems: 'center',
    } as ViewStyle,
    
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      width: '100%',
      maxWidth: 800,
    } as ViewStyle,
    
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    } as TextStyle,
    
    coachList: {
      width: '100%',
      maxWidth: 800,
      flexDirection: 'column',
      gap: 16,
    } as ViewStyle,
    
    coachCard: {
      backgroundColor: currentTheme.colors.surface,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: currentTheme.colors.divider,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    } as ViewStyle,
    
    addButton: {
      backgroundColor: currentTheme.colors.button.primary.background,
      padding: 12,
      borderRadius: 8,
    } as ViewStyle,
    
    editButton: {
      backgroundColor: currentTheme.colors.button.primary.background,
      padding: 8,
      borderRadius: 4,
    } as ViewStyle,
    
    buttonText: {
      color: currentTheme.colors.button.primary.text,
      fontSize: 16,
    } as TextStyle,
    
    coachText: {
      color: currentTheme.colors.text,
      fontSize: 16,
    } as TextStyle,
    
    coachStatus: {
      color: currentTheme.colors.textSecondary,
      fontSize: 14,
    } as TextStyle,
  });

  async function fetchAllCoaches() {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .order('order_index');

    if (!error && data) {
      setCoaches(data);
    }
  }

  useEffect(() => {
    fetchAllCoaches();
  }, []);

  function handleAddNew() {
    const newCoach: Partial<CoachDetail> = {
      name: '',
      images: [],
      show: true,
      order_index: coaches.length,
      full_bio: {
        intro: '',
        background: '',
        present: ''
      },
      achievements: [],
      role: '',
      bio: '',
      image_url: '',
      qualifications: [],
      social_links: {}
    };
    setEditingCoach(newCoach as unknown as CoachDetail);
  }

  async function handleSave(coach: Partial<CoachDetail>) {
    try {
      if (!coach.id) {
        const newCoachData = {
          name: coach.name,
          role: coach.role,
          bio: coach.bio,
          image_url: coach.image_url,
          qualifications: coach.qualifications,
          social_links: coach.social_links,
          full_bio: coach.full_bio,
          achievements: coach.achievements,
          images: coach.images,
          show: coach.show,
          order_index: coach.order_index,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const { data, error } = await supabase
          .from('coaches')
          .insert(newCoachData)
          .select()
          .single();
        
        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        console.log('Created new coach:', data);
      } else {
        await updateCoach(coach as CoachDetail);
      }
      
      await fetchAllCoaches();
      setEditingCoach(null);
    } catch (error) {
      console.error('Error saving coach:', error);
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = coaches.findIndex(coach => coach.id === active.id);
    const newIndex = coaches.findIndex(coach => coach.id === over.id);
    
    const newCoaches = arrayMove(coaches, oldIndex, newIndex);
    
    // Update order_index for all affected coaches
    const updates = newCoaches.map((coach, index) => ({
      ...coach,
      order_index: index
    }));

    setCoaches(updates);
    
    // Update all coaches with new order
    for (const coach of updates) {
      await updateCoach(coach);
    }
  }

  return (
    <ScrollView>
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
        
        {editingCoach ? (
          <CoachForm 
            coach={editingCoach}
            onSave={handleSave}
            onCancel={() => setEditingCoach(null)}
          />
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={coaches.map(coach => coach.id)} 
              strategy={verticalListSortingStrategy}
            >
              <ThemedView style={styles.coachList}>
                {coaches.map((coach) => (
                  <SortableCoachItem 
                    key={coach.id} 
                    coach={coach} 
                    onEdit={setEditingCoach}
                    onRefresh={fetchAllCoaches}
                  />
                ))}
              </ThemedView>
            </SortableContext>
          </DndContext>
        )}
      </ThemedView>
    </ScrollView>
  );
}

function SortableCoachItem({ 
  coach, 
  onEdit,
  onRefresh
}: { 
  coach: CoachDetail;
  onEdit: (coach: CoachDetail) => void;
  onRefresh: () => Promise<void>;
}) {
  const { currentTheme } = useTheme();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: coach.id });
  const [isDeleting, setIsDeleting] = useState(false);

  const styles = StyleSheet.create({
    coachCard: {
      backgroundColor: currentTheme.colors.surface,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: currentTheme.colors.divider,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    } as ViewStyle,
    
    editButton: {
      backgroundColor: currentTheme.colors.button.primary.background,
      padding: 8,
      borderRadius: 4,
    } as ViewStyle,
    
    buttonText: {
      color: currentTheme.colors.button.primary.text,
      fontSize: 16,
    } as TextStyle,
    
    coachText: {
      color: currentTheme.colors.text,
      fontSize: 16,
    } as TextStyle,
    
    coachStatus: {
      color: currentTheme.colors.textSecondary,
      fontSize: 14,
    } as TextStyle,
    
    actionButtons: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    } as ViewStyle,

    deleteButton: {
      backgroundColor: currentTheme.colors.status.error.background,
      padding: 8,
      borderRadius: 4,
    } as ViewStyle,

    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: currentTheme.colors.divider,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: coach.show ? currentTheme.colors.primary : 'transparent',
    } as ViewStyle,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };
  
  async function handleVisibilityToggle() {
    try {
      await updateCoach({
        ...coach,
        show: !coach.show
      });
      await onRefresh();
    } catch (error) {
      console.error('Error updating visibility:', error);
    }
  }

  async function handleDelete() {
    try {
      const { error } = await supabase
        .from('coaches')
        .delete()
        .eq('id', coach.id);
      
      if (error) throw error;
      await onRefresh();
    } catch (error) {
      console.error('Error deleting coach:', error);
    }
  }

  return (
    <div ref={setNodeRef}>
      <ThemedView style={[styles.coachCard, style]}>
        <div {...attributes} {...listeners} style={{ cursor: 'grab' }}>
          <ThemedText>⋮</ThemedText>
        </div>
        
        <Pressable 
          style={styles.checkbox}
          onPress={handleVisibilityToggle}
        >
          {coach.show && <ThemedText>✓</ThemedText>}
        </Pressable>
        
        <ThemedText style={styles.coachText}>{coach.name}</ThemedText>
        
        <ThemedView style={styles.actionButtons}>
          <Pressable onPress={() => onEdit(coach)} style={styles.editButton}>
            <ThemedText style={styles.buttonText}>Edit</ThemedText>
          </Pressable>
          
          {isDeleting ? (
            <ThemedView style={styles.actionButtons}>
              <ThemedText style={styles.coachStatus}>Delete?</ThemedText>
              <Pressable onPress={handleDelete} style={styles.deleteButton}>
                <ThemedText style={styles.buttonText}>Yes</ThemedText>
              </Pressable>
              <Pressable 
                onPress={() => setIsDeleting(false)} 
                style={styles.editButton}
              >
                <ThemedText style={styles.buttonText}>No</ThemedText>
              </Pressable>
            </ThemedView>
          ) : (
            <Pressable 
              onPress={() => setIsDeleting(true)} 
              style={styles.deleteButton}
            >
              <ThemedText style={styles.buttonText}>Delete</ThemedText>
            </Pressable>
          )}
        </ThemedView>
      </ThemedView>
    </div>
  );
} 