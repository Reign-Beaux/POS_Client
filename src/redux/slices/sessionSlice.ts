import { Feature } from "common/models";
import { createSlice } from "@reduxjs/toolkit";

interface SessionSlice {
  token: string;
  features: Feature[];
}

const initialState: SessionSlice = {
  token: "",
  features: [],
};

const getSession = (): SessionSlice => {
  let sessionString = localStorage.getItem("session");
  if (!sessionString) return initialState;

  return JSON.parse(sessionString) as SessionSlice;
}

export const sessionSlice = createSlice({
  name: "session",
  initialState: { ...getSession() },
  reducers: {
    setSession: (state, action) => {
      state.token = action.payload.token;
      state.features = action.payload.features;
      localStorage.setItem("session", JSON.stringify(action.payload));
    },
    logoutSession: (state) => {
      state.token = initialState.token;
      state.features = initialState.features;
      localStorage.removeItem("session");
    },
  },
});

export const { setSession, logoutSession } = sessionSlice.actions;
