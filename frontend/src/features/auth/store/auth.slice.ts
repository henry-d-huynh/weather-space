import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | undefined;
  name: string | undefined;
  username: string | undefined;
};

const initialState: AuthState = {
  token: undefined,
  name: undefined,
  username: undefined,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; name: string; username: string }>,
    ) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.token = undefined;
      state.name = undefined;
      state.username = undefined;
    },
  },
});

const getToken = (state: AuthState) => state.token;
const getName = (state: AuthState) => state.name;
const getUsername = (state: AuthState) => state.username;
const isAuthenticated = (state: AuthState) => state.token !== undefined;

export const authSlice = {
  reducer: slice.reducer,
  actions: slice.actions,
  selectors: {
    getToken,
    getName,
    getUsername,
    isAuthenticated,
  },
};
