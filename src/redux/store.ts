import { configureStore } from "@reduxjs/toolkit";
import {
  ConfigSlice,
  ConfirmSlice,
  GlobalSlice,
  SessionSlice,
  SnackbarSlice,
  ThemeSlice,
  configSlice,
  confirmSlice,
  globaSlice,
  sessionSlice,
  snackbarSlice,
  themeSlice,
} from "./slices";

export interface POSReducer {
  config: ConfigSlice;
  confirm: ConfirmSlice;
  global: GlobalSlice;
  session: SessionSlice;
  snackbar: SnackbarSlice;
  theme: ThemeSlice;
}

export const ConfigStore = configureStore({
  reducer: {
    config: configSlice.reducer,
    confirm: confirmSlice.reducer,
    global: globaSlice.reducer,
    session: sessionSlice.reducer,
    snackbar: snackbarSlice.reducer,
    theme: themeSlice.reducer,
  },
});
