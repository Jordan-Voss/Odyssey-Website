import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ 
    light: lightColor || '#000',  // Default to black
    dark: darkColor || '#000'     // Default to black
  }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
