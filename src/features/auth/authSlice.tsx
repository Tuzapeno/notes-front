import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

import type { AuthState, UserCredentials } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  accessToken: null,
  id: null,
};

const AuthSlice = createAppSlice({
  name: "auth",
  initialState: initialState,
  reducers: (create) => ({
    logout: create.reducer((state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.accessToken = null;
      state.id = null;
    }),
    login: create.reducer((state, action: PayloadAction<UserCredentials>) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.id = action.payload.id;
    }),
  }),
  selectors: {
    selectAuth: (state) => state.isAuthenticated,
    selectUser: (state) => state.username,
    selectAccessToken: (state) => state.accessToken,
    selectId: (state) => state.id,
  },
});

export const { logout, login } = AuthSlice.actions;

export const { selectAuth, selectUser, selectAccessToken, selectId } =
  AuthSlice.selectors;

export default AuthSlice;
