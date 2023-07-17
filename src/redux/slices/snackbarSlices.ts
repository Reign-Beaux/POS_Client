import { AlertColors } from "common/consts";
import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

interface SnackbarSlice {
  isOpen: boolean;
  severity: AlertColor;
  message: string;
}

const snackbarEmptyState: SnackbarSlice = {
  isOpen: false,
  severity: AlertColors.SUCCESS,
  message: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: { ...snackbarEmptyState },
  reducers: {
    setSnackbar: (state, action) => (state = {...action.payload}),
    resetSnackbar: (state) => (state = snackbarEmptyState),
  },
});

export const { setSnackbar, resetSnackbar } = snackbarSlice.actions;