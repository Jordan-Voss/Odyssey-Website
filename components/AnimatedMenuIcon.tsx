import React, { useEffect } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';

interface AnimatedMenuIconProps {
  isOpen: boolean;
  onPress: () => void;
  color: string;
}

export function AnimatedMenuIcon({ isOpen, onPress, color }: AnimatedMenuIconProps) {
  const [topBar] = React.useState(new Animated.Value(0));
  const [middleBar] = React.useState(new Animated.Value(0));
  const [bottomBar] = React.useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(topBar, {
        toValue: isOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(middleBar, {
        toValue: isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(bottomBar, {
        toValue: isOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  const topBarStyle = {
    transform: [
      { rotate: topBar.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
      })},
      { translateY: topBar.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 9]
      })}
    ]
  };

  const middleBarStyle = {
    opacity: middleBar.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 0]
    }),
    transform: [
      { scaleX: middleBar.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.5, 0]
      })}
    ]
  };

  const bottomBarStyle = {
    transform: [
      { rotate: bottomBar.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-45deg']
      })},
      { translateY: bottomBar.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -9]
      })}
    ]
  };

  const styles = StyleSheet.create({
    container: {
      width: 22,
      height: 18,
      justifyContent: 'space-between',
      padding: 0,
    },
    bar: {
      height: 2,
      width: '100%',
      backgroundColor: '#000',
      borderRadius: 2,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Animated.View style={[styles.bar, { backgroundColor: color }, topBarStyle]} />
      <Animated.View style={[styles.bar, { backgroundColor: color }, middleBarStyle]} />
      <Animated.View style={[styles.bar, { backgroundColor: color }, bottomBarStyle]} />
    </TouchableOpacity>
  );
} 