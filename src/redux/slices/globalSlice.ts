import { createSlice } from "@reduxjs/toolkit";

export interface GlobalSlice {
  selectedModule: number;
}

const globalEmptyState: GlobalSlice = {
  selectedModule: parseInt(localStorage.getItem("selectedModule") ?? "0"),
};

export const globaSlice = createSlice({
  name: "global",
  initialState: { ...globalEmptyState },
  reducers: {
    setSelectedModule: (state, action) => {
      localStorage.setItem("selectedModule", action.payload);
      state.selectedModule = action.payload
    },
  },
});

export const { setSelectedModule } = globaSlice.actions;