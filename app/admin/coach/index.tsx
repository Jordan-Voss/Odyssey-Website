import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CoachForm } from '@/components/Admin/CoachForm';
import { supabase, updateCoach } from '@/lib/supabase';
import { CoachDetail } from '@/types/coach';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function AdminCoaches() {
  const [coaches, setCoaches] = useState<CoachDetail[]>([]);
  const [editingCoach, setEditingCoach] = useState<CoachDetail | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
          <ThemedText style={styles.title}>Manage Coaches</ThemedText>
          <Pressable onPress={handleAddNew} style={styles.addButton}>
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
  onEdit 
}: { 
  coach: CoachDetail;
  onEdit: (coach: CoachDetail) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: coach.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };
  
  return (
    <div ref={setNodeRef}>
      <ThemedView style={[styles.coachItem, style]}>
        <div {...attributes} {...listeners} style={{ cursor: 'grab' }}>
          <ThemedText>⋮</ThemedText>
        </div>
        <ThemedText>{coach.name}</ThemedText>
        <ThemedText>({coach.show ? 'Visible' : 'Hidden'})</ThemedText>
        <Pressable onPress={() => onEdit(coach)} style={styles.editButton}>
          <ThemedText style={styles.buttonText}>Edit</ThemedText>
        </Pressable>
      </ThemedView>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
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
  },
  coachList: {
    gap: 10,
  },
  coachItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
}); 