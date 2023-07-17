import { createSlice } from "@reduxjs/toolkit";

interface ThemeSlice {
  isDarkMode: boolean
}

const initialState: ThemeSlice = {
  isDarkMode: localStorage.getItem("isDarkMode") === "true",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: { ...initialState },
  reducers: {
    setTheme: (state, action) => {
      const { isDarkMode } = action.payload;
      state.isDarkMode = isDarkMode;
      localStorage.setItem('isDarkMode', isDarkMode);
    },
  },
});

export const { setTheme } = themeSlice.actions;
