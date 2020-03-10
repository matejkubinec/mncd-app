import { createTheme } from "office-ui-fabric-react";

const light = createTheme({
  palette: {
    themePrimary: "#0078d4",
    themeLighterAlt: "#eff6fc",
    themeLighter: "#deecf9",
    themeLight: "#c7e0f4",
    themeTertiary: "#71afe5",
    themeSecondary: "#2b88d8",
    themeDarkAlt: "#106ebe",
    themeDark: "#005a9e",
    themeDarker: "#004578",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff"
  }
});

const dark = createTheme({
  palette: {
    themePrimary: "#00ff08",
    themeLighterAlt: "#000a00",
    themeLighter: "#002901",
    themeLight: "#004d03",
    themeTertiary: "#009905",
    themeSecondary: "#00e007",
    themeDarkAlt: "#19ff21",
    themeDark: "#3dff44",
    themeDarker: "#70ff75",
    neutralLighterAlt: "#121212",
    neutralLighter: "#121212",
    neutralLight: "#121212",
    neutralQuaternaryAlt: "#121212",
    neutralQuaternary: "#121212",
    neutralTertiaryAlt: "#121212",
    neutralTertiary: "#fafafa",
    neutralSecondary: "#fbfbfb",
    neutralPrimaryAlt: "#fcfcfc",
    neutralPrimary: "#f7f7f7",
    neutralDark: "#fdfdfd",
    black: "#fefefe",
    white: "#292929"
  }
});

export { light, dark };
