import { DefaultTheme } from "styled-components";
import { darkColors, darkShadows, lightColors, lightShadows } from "./colors";
import layouts from "./layouts";

export const light: DefaultTheme = {
  ...layouts,
  isDark: false,
  colors: lightColors,
  shadows: lightShadows
}
export const dark: DefaultTheme = {
  ...layouts,
  isDark: true,
  colors: darkColors,
  shadows: darkShadows,
};