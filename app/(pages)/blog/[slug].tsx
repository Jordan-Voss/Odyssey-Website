import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { BlogPost, getBlogPostBySlug } from '@/lib/supabase';

export default function BlogPostPage() {
  const { slug } = useLocalSearchParams();
  const { currentTheme } = useTheme();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) {
      loadPost(slug as string);
    }
  }, [slug]);

  async function loadPost(slug: string) {
    const post = await getBlogPostBySlug(slug);
    setPost(post);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
    },
    content: {
      maxWidth: 800,
      width: '100%',
      marginHorizontal: 'auto',
      padding: 40,
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      marginBottom: 24,
      color: currentTheme.colors.text,
    },
    meta: {
      marginBottom: 40,
    },
    date: {
      fontSize: 16,
      color: currentTheme.colors.textSecondary,
    },
    image: {
      width: '100%',
      height: 400,
      objectFit: 'cover',
      marginBottom: 40,
      borderRadius: 12,
    },
    body: {
      fontSize: 18,
      lineHeight: 32,
      color: currentTheme.colors.text,
    },
  });

  if (!post) {
    return (
      <ThemedView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>{post.title}</ThemedText>
          <ThemedView style={styles.meta}>
            <ThemedText style={styles.date}>
              {new Date(post.published_at).toLocaleDateString()}
            </ThemedText>
          </ThemedView>
          {post.image_url && (
            <Image 
              source={{ uri: post.image_url }}
              style={styles.image}
            />
          )}
          <ThemedText style={styles.body}>{post.content}</ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
} 