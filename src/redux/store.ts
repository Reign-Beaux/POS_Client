import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  configSlice,
  confirmSlice,
  globaSlice,
  sessionSlice,
  snackbarSlice,
  themeSlice
} from "./slices";

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

type RootState = ReturnType<typeof ConfigStore.getState>;
type AppDispatch = typeof ConfigStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

