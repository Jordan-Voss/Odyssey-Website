import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Animated, ViewStyle, ImageStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    counterText: {
      color: currentTheme.colors.statNumber,
      fontSize: 80,
      fontWeight: 'bold',
      marginBottom: 10,
      lineHeight: 80,
    }
  });

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50; // Number of steps
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(target, Math.floor(step * increment));
      setCount(current);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <ThemedText style={styles.counterText}>{count}</ThemedText>;
}

export default function Gallery() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: 500,
      width: '100%',
      position: 'relative',
      backgroundColor: currentTheme.colors.surface,
    },
    title: {
      fontSize: 36,
      color: currentTheme.colors.text,
      textAlign: 'center',
      marginBottom: 40,
    },
    imagesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: '100%',
    },
    imageContainer: {
      width: '16.666%',
      height: '33.333%',
    },
    gridImage: {
      width: '100%',
      height: '100%',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      maxWidth: 1200,
      paddingHorizontal: 20,
    },
    statItem: {
      alignItems: 'center',
      width: '30%',
      flexDirection: 'column',
    },
    statLabel: {
      color: '#fff',
      fontSize: 24,
      textAlign: 'center',
      marginTop: 0,
      maxWidth: '80%',
    },
  });

  const baseImages = [
    require('@/assets/images/gallery/1.png'),
    require('@/assets/images/gallery/2.png'),
    require('@/assets/images/gallery/3.png'),
    require('@/assets/images/gallery/4.png'),
    require('@/assets/images/gallery/5.png'),
    require('@/assets/images/gallery/6.png'),
    require('@/assets/images/gallery/7.png'),
    require('@/assets/images/gallery/8.png'),
    require('@/assets/images/gallery/9.png'),
  ];

  const gridSize = 18;
  const getRandomImage = () => baseImages[Math.floor(Math.random() * baseImages.length)];
  
  // Start with random images
  const [currentImages, setCurrentImages] = useState(
    Array(gridSize).fill(null).map(() => getRandomImage())
  );
  const [nextImages, setNextImages] = useState(
    Array(gridSize).fill(null).map(() => getRandomImage())
  );
  const [fadeAnims] = useState(() => Array(gridSize).fill(null).map(() => new Animated.Value(1)));

  useEffect(() => {
    const changeImage = (index: number) => {
      // Prepare next image
      setNextImages(prev => {
        const newImages = [...prev];
        const currentImageIndex = baseImages.indexOf(prev[index]);
        const nextImageIndex = (currentImageIndex + 1) % baseImages.length;
        newImages[index] = baseImages[nextImageIndex];
        return newImages;
      });

      // Animate fade out/in
      Animated.sequence([
        Animated.timing(fadeAnims[index], {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start();

      // Update current image halfway through the animation
      setTimeout(() => {
        setCurrentImages(prev => {
          const newImages = [...prev];
          newImages[index] = nextImages[index];
          return newImages;
        });
      }, 1000);
    };

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * gridSize);
      changeImage(randomIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [nextImages]);

  return (
    <ThemedView style={styles.container as ViewStyle}>
      {/* <ThemedText style={styles.title}>Gallery</ThemedText> */}
      <ThemedView style={styles.imagesGrid}>
        {currentImages.map((img, index) => (
          <Animated.View 
            key={index}
            style={[
              styles.imageContainer,
              { opacity: fadeAnims[index] }
            ]}
          >
            <Image 
              source={img}
              style={styles.gridImage}
              resizeMode="cover"
            />
          </Animated.View>
        ))}
        
        <View style={styles.overlay}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Counter target={187}/>
              <ThemedText style={styles.statLabel}>Athletes (And Counting!)</ThemedText>
            </View>
            
            <View style={styles.statItem}>
              <Counter target={50}/>
              <ThemedText style={styles.statLabel}>National Champions</ThemedText>
            </View>
            
            <View style={styles.statItem}>
              <Counter target={9}/>
              <ThemedText style={styles.statLabel}>International Athletes</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
} 