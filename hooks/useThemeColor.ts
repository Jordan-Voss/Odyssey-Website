/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { Theme } from '@/constants/Themes';

export function useThemeColor(
  props: { [key in Theme['id']]?: string },
  colorName: keyof Theme['colors']
) {
  const { currentTheme } = useTheme();
  const colorFromProps = props[currentTheme.id];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return currentTheme.colors[colorName];
  }
}
