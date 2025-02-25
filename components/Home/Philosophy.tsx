import React from 'react';
import { StyleSheet, Image, Pressable, ViewStyle, TextStyle, ImageStyle, Platform, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';

export default function Philosophy() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      backgroundColor: currentTheme.colors.background,
      height: height *1.05,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageMobile: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
    },
    overlay: {
      position: 'absolute',
      top: '50%',
      right: '10%',
      width: '33%',
      backgroundColor: currentTheme.colors.overlay.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      borderRadius: 8,
      transform: Platform.OS === 'web' 
        ? 'translate(0, -50%)' as any
        : [{ translateY: '-50%' }] as any,
    },
    overlayMobile: {
      position: 'absolute',
      top: '50%',
      right: '5%',
      width: '90%',
      backgroundColor:currentTheme.colors.overlay.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
      borderRadius: 8,
      transform: Platform.OS === 'web' 
        ? 'translate(0, -50%)' as any
        : [{ translateY: '-50%' }] as any,
    },
    text: {
      color: currentTheme.colors.overlay.text,
      fontSize: 32,
      lineHeight: 42,
      textAlign: 'center',
      marginBottom: 30,
    },
    textMobile: {
      color: currentTheme.colors.text,
      fontSize: 32,
      lineHeight: 42,
      textAlign: 'center',
      marginBottom: 30,
    },
    button: {
      backgroundColor: currentTheme.colors.button.primary.background,
      borderWidth: 2,
      borderColor: currentTheme.colors.button.primary.text,
      padding: 16,
      width: '70%',
    },
    buttonMobile: {
      backgroundColor: currentTheme.colors.button.primary.background,
      borderWidth: 2,
      borderColor: currentTheme.colors.text,
      padding: 16,
      width: '100%',
    },
    buttonText: {
      color: currentTheme.colors.button.primary.text,
      fontSize: 16,
      textAlign: 'center',
    },
  });

  return (
    <ThemedView style={styles.container as ViewStyle}>
      <Image 
        source={isMobile ? require('@/assets/images/phspymobile.png') : require('@/assets/images/phspy.png')} 
        style={[
          isMobile ? styles.imageMobile : styles.image,
          Platform.OS === 'web' && {
            objectFit: 'cover',
            objectPosition: 'left center'
          }
        ] as ImageStyle}
        resizeMode="contain"
      />
      <ThemedView style={isMobile ? styles.overlayMobile : styles.overlay as ViewStyle}>
        <ThemedText style={isMobile ? styles.textMobile : styles.text as TextStyle}>
          We believe in working with the individual and provide an empathy
          driven powerlifting coaching service and a meaningful support network.
        </ThemedText>
        <Link href="/(pages)/about/page" asChild>
          <Pressable style={isMobile ? styles.buttonMobile : styles.button as ViewStyle}>
            <ThemedText style={styles.buttonText as TextStyle}>Our Philosophy</ThemedText>
          </Pressable>
        </Link>
      </ThemedView>
    </ThemedView>
  );
} 