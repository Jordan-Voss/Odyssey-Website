import { View, type ViewProps } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, ...props }: ViewProps) {
  const { currentTheme } = useTheme();
  
  return (
    <View 
      style={[
        { backgroundColor: currentTheme.colors.background },
        style
      ]} 
      {...props} 
    />
  );
}
