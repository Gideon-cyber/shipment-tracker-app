/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  blue: {
    background: "#2F50C1",
    inactive: "#EAE7F2",
    inactiveText: "#A7A3B3",
    backgroundHover: "#4169E1",
    lightHover: "#D9E6FD",
    secondaryInactive: "#F4F2F8",
    secondaryInactiveText: "#CDCAD9",
  },
  grey: {
    text: "#757281",
    labelText: "#58536E",
  },
};
