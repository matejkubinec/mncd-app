import { createSlice } from "@reduxjs/toolkit";
import { light, dark } from "../theme";
import { loadTheme } from "office-ui-fabric-react";

const initialState = {
  name: "light",
  current: loadTheme(dark)
};

const slice = createSlice({
  name: "theme-slice",
  initialState: initialState,
  reducers: {
    toggleTheme: state => {
      if (state.name === "dark") {
        state = { name: "light", current: loadTheme(light) };
      } else {
        state = { name: "dark", current: loadTheme(dark) };
      }
    }
  }
});

export const { toggleTheme } = slice.actions;

export default slice.reducer;
