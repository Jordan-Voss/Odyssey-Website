import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { BlogPost, getAllBlogPosts } from '@/lib/supabase';

export default function BlogPage() {
  const { currentTheme } = useTheme();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const posts = await getAllBlogPosts();
    setPosts(posts);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
    },
    content: {
      maxWidth: 1200,
      width: '100%',
      marginHorizontal: 'auto',
      padding: 40,
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: currentTheme.colors.text,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 32,
      justifyContent: 'center',
    },
    postCard: {
      width: 350,
      backgroundColor: currentTheme.colors.surface,
      borderRadius: 12,
      overflow: 'hidden',
    },
    postImage: {
      width: '100%',
      height: 200,
      objectFit: 'cover',
    },
    postContent: {
      padding: 24,
      gap: 16,
    },
    postTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    postExcerpt: {
      fontSize: 16,
      color: currentTheme.colors.textSecondary,
      lineHeight: 24,
    },
    postMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    postDate: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>Blog</ThemedText>
          <ThemedView style={styles.grid}>
            {posts.map(post => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`} 
                asChild
              >
                <Pressable style={styles.postCard}>
                  {post.image_url && (
                    <Image 
                      source={{ uri: post.image_url }}
                      style={styles.postImage}
                    />
                  )}
                  <ThemedView style={styles.postContent}>
                    <ThemedText style={styles.postTitle}>
                      {post.title}
                    </ThemedText>
                    {post.excerpt && (
                      <ThemedText style={styles.postExcerpt}>
                        {post.excerpt}
                      </ThemedText>
                    )}
                    <ThemedView style={styles.postMeta}>
                      <ThemedText style={styles.postDate}>
                        {new Date(post.published_at).toLocaleDateString()}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                </Pressable>
              </Link>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
} 