import { createSlice } from "@reduxjs/toolkit";
import { light, dark } from "../theme";
import { loadTheme } from "office-ui-fabric-react";

export enum Theme {
  Light,
  Dark,
}

const initialState = {
  type: Theme.Light,
  current: loadTheme(light),
};

const slice = createSlice({
  name: "theme-slice",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.type === Theme.Dark) {
        state.type = Theme.Light;
        state.current = loadTheme(light);
      } else {
        state.type = Theme.Dark;
        state.current = loadTheme(dark);
      }
    },
  },
});

export const { toggleTheme } = slice.actions;

export default slice.reducer;
