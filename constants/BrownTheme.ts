import { Theme } from "@react-navigation/native";

export const BrownTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(0, 0, 0)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(243, 239, 229)',
    text: 'rgb(135, 79, 31)',
    border: 'rgb(135, 79, 31)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'sans-serif',
      fontWeight: '600',
    },
    heavy: {
      fontFamily: 'sans-serif',
      fontWeight: '700',
    },
  },
};
