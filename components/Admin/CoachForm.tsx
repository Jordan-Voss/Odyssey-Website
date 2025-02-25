import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Image, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';
import { useTheme } from '@/context/ThemeContext';
import { CoachDetail } from '@/types/coach';
import { supabase, updateCoach } from '@/lib/supabase';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CoachFormProps {
  coach: CoachDetail | null;
  onSave: (data: CoachDetail) => void;
  onCancel: () => void;
}
const { currentTheme } = useTheme();

const styles = StyleSheet.create({
  form: {
    gap: 16,
    padding: 20,
    backgroundColor: currentTheme.colors.surface,
    borderRadius: 8,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: currentTheme.colors.text,
  },
  arrayField: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    padding: 8,
    backgroundColor: currentTheme.colors.primary,
    borderRadius: 4,
  },
  removeButton: {
    padding: 4,
    backgroundColor: currentTheme.colors.status.error.background,
    borderRadius: 4,
    marginLeft: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 8,
    borderRadius: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  sublabel: {
    fontSize: 14,
    color: currentTheme.colors.text,
  },
});

function SortableTextItem({ text, onRemove, id, styles }: { text: string; onRemove: () => void; id: string; styles: any }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <ThemedView style={styles.arrayField}>
      {Platform.OS === 'web' ? (
        <div ref={setNodeRef} {...attributes} {...listeners} style={{ cursor: 'grab' }}>
          <ThemedText>⋮</ThemedText>
        </div>
      ) : (
        <View>
          <ThemedText>⋮</ThemedText>
        </View>
      )}
      <ThemedText>{text}</ThemedText>
      <Pressable style={styles.removeButton} onPress={onRemove}>
        <ThemedText style={{ color: '#FFFFFF' }}>Remove</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

function SortableImageItem({ img, onRemove, id, styles }: { img: string; onRemove: () => void; id: string; styles: any }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <View>
      {Platform.OS === 'web' ? (
        <div ref={setNodeRef} {...attributes} {...listeners} style={{ cursor: 'grab' }}>
          <Image source={{ uri: img }} style={styles.imagePreview} alt="Additional" />
        </div>
      ) : (
        <View>
          <Image source={{ uri: img }} style={styles.imagePreview} alt="Additional" />
        </View>
      )}
      <Pressable style={styles.removeButton} onPress={onRemove}>
        <ThemedText style={{ color: '#FFFFFF' }}>Remove</ThemedText>
      </Pressable>
    </View>
  );
}

export function CoachForm({ coach, onSave, onCancel }: CoachFormProps) {
  const { currentTheme } = useTheme();
  const defaultCoach = {
    name: '',
    role: '',
    image_url: '',
    bio: '',
    qualifications: [],
    social_links: { instagram: '', email: '' },
    full_bio: { intro: '', background: '', present: '' },
    achievements: [],
    images: [],
    order_index: 0,
    show: true
  } as unknown as CoachDetail;

  const [formData, setFormData] = useState<CoachDetail>(coach || defaultCoach);

  const [newQualification, setNewQualification] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  const sensors = useSensors(useSensor(PointerSensor));

  const [activeId, setActiveId] = useState<string | null>(null);

  async function handleImageUpload(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('Odyssey')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return;
    }

    const { data } = supabase.storage
      .from('Odyssey')
      .getPublicUrl(fileName);

    setFormData({ ...formData, image_url: data.publicUrl });
  }

  async function handleAdditionalImageUpload(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${formData.images.length + 1}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('Odyssey')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return;
    }

    const { data } = supabase.storage
      .from('Odyssey')
      .getPublicUrl(fileName);

    setFormData({ 
      ...formData, 
      images: [...formData.images, data.publicUrl]
    });
  }

  async function handleSave() {
    try {
      onSave(formData);
    } catch (error) {
      console.error('Failed to save coach:', error);
    }
  }

  function handleDragEnd(event: DragEndEvent, items: string[], setItems: (items: string[]) => void) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(item => item === active.id);
    const newIndex = items.findIndex(item => item === over.id);
    
    setItems(arrayMove(items, oldIndex, newIndex));
  }

  return (
    <ThemedView style={styles.form}>
      <ThemedView style={styles.field}>
        <ThemedText style={styles.label}>Name</ThemedText>
        <ThemedInput
          value={formData.name}
          onChangeText={(text: string) => setFormData({ ...formData, name: text })}
        />
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText style={styles.label}>Role</ThemedText>
        <ThemedInput
          value={formData.role}
          onChangeText={(text: string) => setFormData({ ...formData, role: text })}
        />
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText style={styles.label}>Bio</ThemedText>
        <ThemedInput
          value={formData.bio}
          onChangeText={(text: string) => setFormData({ ...formData, bio: text })}
          multiline
        />
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText style={styles.label}>Profile Image</ThemedText>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
        {formData.image_url && (
          <img src={formData.image_url} style={styles.imagePreview} alt="Profile" />
        )}
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText style={styles.label}>Additional Images</ThemedText>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleAdditionalImageUpload(file);
          }}
        />
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={(event) => setActiveId(event.active.id as string)}
          onDragEnd={(event) => {
            setActiveId(null);
            handleDragEnd(event, formData.images, (newItems) => setFormData({ ...formData, images: newItems }));
          }}
        >
          <SortableContext items={formData.images} strategy={verticalListSortingStrategy}>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              {formData.images.map((img) => (
                <SortableImageItem 
                  key={img} 
                  id={img}
                  img={img}
                  onRemove={() => {
                    const newImages = formData.images.filter(i => i !== img);
                    setFormData({ ...formData, images: newImages });
                  }}
                  styles={styles}
                />
              ))}
            </View>
          </SortableContext>
          <DragOverlay adjustScale={true} dropAnimation={null}>
            {activeId && formData.images.includes(activeId) ? (
              <img src={activeId} style={styles.imagePreview} alt="Dragging" />
            ) : null}
          </DragOverlay>
        </DndContext>
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText style={styles.label}>Qualifications</ThemedText>
        <ThemedView style={styles.arrayField}>
          <ThemedInput
            value={newQualification}
            onChangeText={setNewQualification}
            placeholder="Add qualification"
          />
          <Pressable
            style={styles.addButton}
            onPress={() => {
              if (newQualification) {
                setFormData({
                  ...formData,
                  qualifications: [...formData.qualifications, newQualification]
                });
                setNewQualification('');
              }
            }}
          >
            <ThemedText style={{ color: '#FFFFFF' }}>Add</ThemedText>
          </Pressable>
        </ThemedView>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={(event) => setActiveId(event.active.id as string)}
          onDragEnd={(event) => {
            setActiveId(null);
            handleDragEnd(event, formData.qualifications, (newItems) => 
              setFormData({ ...formData, qualifications: newItems })
            );
          }}
        >
          <SortableContext items={formData.qualifications} strategy={verticalListSortingStrategy}>
            {formData.qualifications.map((qual) => (
              <SortableTextItem 
                key={qual} 
                id={qual}
                text={qual}
                onRemove={() => {
                  const newQuals = formData.qualifications.filter(q => q !== qual);
                  setFormData({ ...formData, qualifications: newQuals });
                }}
                styles={styles}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId && formData.qualifications.includes(activeId) ? (
              <ThemedView style={styles.arrayField}>
                <ThemedText>⋮ {activeId}</ThemedText>
              </ThemedView>
            ) : null}
          </DragOverlay>
        </DndContext>
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText style={styles.label}>Achievements</ThemedText>
        <ThemedView style={styles.arrayField}>
          <ThemedInput
            value={newAchievement}
            onChangeText={setNewAchievement}
            placeholder="Add achievement"
          />
          <Pressable
            style={styles.addButton}
            onPress={() => {
              if (newAchievement) {
                setFormData({
                  ...formData,
                  achievements: [...formData.achievements, newAchievement]
                });
                setNewAchievement('');
              }
            }}
          >
            <ThemedText style={{ color: '#FFFFFF' }}>Add</ThemedText>
          </Pressable>
        </ThemedView>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => handleDragEnd(
            event, 
            formData.achievements,
            (newItems) => setFormData({ ...formData, achievements: newItems })
          )}
        >
          <SortableContext items={formData.achievements} strategy={verticalListSortingStrategy}>
            {formData.achievements.map((achievement) => (
              <SortableTextItem 
                key={achievement} 
                id={achievement}
                text={achievement}
                onRemove={() => {
                  const newAchievements = formData.achievements.filter(a => a !== achievement);
                  setFormData({ ...formData, achievements: newAchievements });
                }}
                styles={styles}
              />
            ))}
          </SortableContext>
        </DndContext>
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText style={styles.label}>Full Bio</ThemedText>
        <ThemedText style={styles.sublabel}>Intro</ThemedText>
        <ThemedInput
          value={formData.full_bio.intro}
          onChangeText={(text) => setFormData({
            ...formData,
            full_bio: { ...formData.full_bio, intro: text }
          })}
          multiline
        />
        <ThemedText style={styles.sublabel}>Background</ThemedText>
        <ThemedInput
          value={formData.full_bio.background}
          onChangeText={(text) => setFormData({
            ...formData,
            full_bio: { ...formData.full_bio, background: text }
          })}
          multiline
        />
        <ThemedText style={styles.sublabel}>Present</ThemedText>
        <ThemedInput
          value={formData.full_bio.present}
          onChangeText={(text) => setFormData({
            ...formData,
            full_bio: { ...formData.full_bio, present: text }
          })}
          multiline
        />
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText style={styles.label}>Social Links</ThemedText>
        <ThemedText style={styles.sublabel}>Instagram</ThemedText>
        <ThemedInput
          value={formData.social_links.instagram || ''}
          onChangeText={(text) => setFormData({
            ...formData,
            social_links: { ...formData.social_links, instagram: text }
          })}
        />
        <ThemedText style={styles.sublabel}>Email</ThemedText>
        <ThemedInput
          value={formData.social_links.email || ''}
          onChangeText={(text) => setFormData({
            ...formData,
            social_links: { ...formData.social_links, email: text }
          })}
        />
      </ThemedView>

      <ThemedView style={styles.toggleContainer}>
        <ThemedText style={styles.label}>Show Coach</ThemedText>
        <Pressable
          onPress={() => {
            const newShow = !formData.show;
            console.log('Toggling show to:', newShow);
            setFormData({ ...formData, show: newShow });
          }}
          style={[
            styles.button,
            { 
              backgroundColor: formData.show 
                ? currentTheme.colors.status.success.background 
                : currentTheme.colors.status.error.background 
            }
          ]}
        >
          <ThemedText style={{ color: '#FFFFFF' }}>
            {formData.show ? 'Visible' : 'Hidden'}
          </ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.buttons}>
        <Pressable 
          style={[
            styles.button, 
            { backgroundColor: currentTheme.colors.status.error.background }
          ]}
          onPress={onCancel}
        >
          <ThemedText style={{ color: '#FFFFFF' }}>Cancel</ThemedText>
        </Pressable>
        <Pressable 
          style={[styles.button, { backgroundColor: currentTheme.colors.primary }]}
          onPress={handleSave}
        >
          <ThemedText style={{ color: '#FFFFFF' }}>Save</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
} 