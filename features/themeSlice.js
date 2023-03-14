import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: {
    background: "#f3f4f6",
    element: "#fff",
  },
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme(state) {
      state.colors.background = "#000";
      state.colors.element = "#ccc";
      state.darkMode = true;
    },
    setDefaultTheme(state) {
      state.colors.background = "#f3f4f6";
      state.colors.element = "#fff";
      state.darkMode = false;
    },
  },
});

export const { setDarkTheme, setDefaultTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme;

export default themeSlice.reducer;
