import { Colors, ElevationShadows } from './types'

export const baseColors = {
  primary: '#007994',
  secondary: "#2D2E3",
  tertiary: '#2b2e3b'
}

export const lightColors: Colors = {
    ...baseColors,
    textPrimary: "#000000de",
    textSecondary: "#505363",
    textDisabled: "#393B3B",
    textHighlight: '#03b2cb',
    textInverted: "#fff",
    red: "#d32f2f",
    blue: "#00B4C9",
    green: "#388e3c",
    card: "#eef2f3",
    gradient: "linear-gradient(117deg, #eef2f3, #222832)",
    bg: "#eef2f3",
    buttonSurface: "#03b2cb",
    buttonText: "",
    border: "#00B4C9",
    disabled: "#eef2f3",
}

export const darkColors: Colors = {
    ...baseColors,
    textPrimary: "#fff",
    textSecondary: "#878a9b",
    textHighlight: '#14a1c1',
    textDisabled: "#393B3B",
    textInverted: "#000",
    red: "#d32f2f",
    blue: "#00B4C9",
    green: "#388e3c",
    card: "#111722",
    gradient: "linear-gradient(117deg, #111722, #222832)",
    bg: "#0A0E17",
    buttonSurface: "#007994",
    buttonText: "",
    border: "#00B4C9",
    disabled: "#eef2f3",
}

const _lightShadows: ElevationShadows = {
    default: "-2px 2px 4px rgb(29 30 30 / 20%), 2px -2px 4px rgb(29 30 30 / 20%), -2px -2px 4px #00799429, 2px 2px 5px rgb(29 30 30 / 90%), inset 1px 1px 2px rgb(45 48 48 / 30%), inset -1px -1px 2px rgb(29 30 30 / 47%);",
    card: "-2px 2px 4px rgb(29 30 30 / 20%), 2px -2px 4px rgb(29 30 30 / 20%), -2px -2px 4px #00799429, 2px 2px 5px rgb(29 30 30 / 90%), inset 1px 1px 2px rgb(45 48 48 / 30%), inset -1px -1px 2px rgb(29 30 30 / 47%);",
    hover: "1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(143, 144, 149, 0.5), inset -2px 2px 4px rgba(143, 144, 149, 0.2), inset 2px -2px 4px rgba(143, 144, 149, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.9), inset 2px 2px 5px rgba(143, 144, 149, 0.9);",
}

const _darkShadows: ElevationShadows = {
  default: "-2px 2px 4px rgb(29 30 30 / 20%), 2px -2px 4px rgb(29 30 30 / 20%), -2px -2px 4px #00799429, 2px 2px 5px rgb(29 30 30 / 90%), inset 1px 1px 2px rgb(45 48 48 / 30%), inset -1px -1px 2px rgb(29 30 30 / 47%);",
  card: "-2px 2px 4px rgb(29 30 30 / 20%), 2px -2px 4px rgb(29 30 30 / 20%), -2px -2px 4px #00799429, 2px 2px 5px rgb(29 30 30 / 90%), inset 1px 1px 2px rgb(45 48 48 / 30%), inset -1px -1px 2px rgb(29 30 30 / 47%);",
  hover: "inset -2px 2px 4px rgba(15, 16, 16, 0.2), inset 2px -2px 4px rgba(15, 16, 16, 0.2), inset -2px -2px 4px rgba(59, 62, 62, 0.9), inset 2px 2px 5px rgba(15, 16, 16, 0.9);",
}

export const lightShadows: ElevationShadows = {
  ..._lightShadows,
}

export const darkShadows: ElevationShadows = {
  ..._darkShadows,
}