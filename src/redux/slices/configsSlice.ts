import { ApiConfig } from "@/utilities";
import { createSlice } from "@reduxjs/toolkit";

interface ConfigSlice extends ApiConfig {}

const configEmptyState: ConfigSlice = {
  API_URL: "",
};

export const configSlice = createSlice({
  name: "config",
  initialState: { ...configEmptyState },
  reducers: {
    setConfig: (state, action) => (state = { ...action.payload }),
  },
});

export const { setConfig } = configSlice.actions;
