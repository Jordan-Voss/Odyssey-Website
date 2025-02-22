import React from 'react';
import { StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';

export default function SpotifyComponent() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: 32,
      width: '90%',
      alignSelf: 'center',
      marginVertical: 20,
      backgroundColor: currentTheme.colors.surface,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: currentTheme.colors.priceText,
    }
  });

  const iframeStyle = {
    borderRadius: 12,
    marginBottom: '5%',
    width: '100%',
    height: 352,
  } as const;

  return (
    <ThemedView style={styles.container as ViewStyle}>
      <ThemedText style={styles.title as TextStyle}>Check Out Our Podcast!</ThemedText>
      {Platform.OS === 'web' && (
        <iframe
          style={iframeStyle}
          src="https://open.spotify.com/embed/show/7D5k6HgKinuD14Z6UWlYzV?utm_source=generator&theme=0"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
    </ThemedView>
  );
} 