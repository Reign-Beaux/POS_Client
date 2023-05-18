import { createSlice } from "@reduxjs/toolkit";

export interface ConfirmSlice {
  isOpen: boolean;
  message: string;
  responseConfirmation: boolean | null;
}

const confirmEmptyState: ConfirmSlice = {
  isOpen: false,
  message: "",
  responseConfirmation: null,
};

export const confirmSlice = createSlice({
  name: "confirm",
  initialState: { ...confirmEmptyState },
  reducers: {
    setConfirm: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.message = action.payload.message;
    },
    setResponse: (state, action) => {
      state.responseConfirmation = action.payload
    },
    resetConfirm: (state) => (state = confirmEmptyState),
  },
});

export const { setConfirm, setResponse, resetConfirm } = confirmSlice.actions;
