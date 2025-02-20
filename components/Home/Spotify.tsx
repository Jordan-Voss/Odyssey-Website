import React from 'react';
import { StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function SpotifyComponent() {
  return (
    <ThemedView style={styles.container as ViewStyle}>
      <ThemedText style={styles.title as TextStyle}>Check Out Our Podcast!</ThemedText>
      {Platform.OS === 'web' && (
        <iframe
          style={styles.iframe}
          src="https://open.spotify.com/embed/show/7D5k6HgKinuD14Z6UWlYzV?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  iframe: {
    borderRadius: 12,
    marginBottom: '5%',
  } as any, // needed for web-specific style
}); 