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
    themePrimary: "#0095ff",
    themeLighterAlt: "#00060a",
    themeLighter: "#001829",
    themeLight: "#002d4d",
    themeTertiary: "#005999",
    themeSecondary: "#0083e0",
    themeDarkAlt: "#199fff",
    themeDark: "#3daeff",
    themeDarker: "#70c4ff",
    neutralLighterAlt: "#282828",
    neutralLighter: "#272727",
    neutralLight: "#252525",
    neutralQuaternaryAlt: "#232323",
    neutralQuaternary: "#212121",
    neutralTertiaryAlt: "#202020",
    neutralTertiary: "#c8c8c8",
    neutralSecondary: "#d0d0d0",
    neutralPrimaryAlt: "#dadada",
    neutralPrimary: "#ffffff",
    neutralDark: "#f4f4f4",
    black: "#f8f8f8",
    white: "#292929",
  }
});

export { light, dark };
