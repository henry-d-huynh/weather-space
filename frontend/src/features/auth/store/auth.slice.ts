import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type Loadable, LOADABLE_STATUS } from "../../../types/loadable.type";
import type {
  AuthenticatedUser,
  LoginCredentials,
} from "@weather-space/shared";
import { authService } from "../services/auth.service";

type AuthState = Loadable<AuthenticatedUser>;

const initialState: AuthState = {
  status: LOADABLE_STATUS.IDLE,
};

export const loginThunk = createAsyncThunk<AuthenticatedUser, LoginCredentials>(
  "auth/login",
  async (loginCredentials: LoginCredentials, { rejectWithValue }) => {
    const result = await authService.login(loginCredentials);
    if (!result.success) return rejectWithValue(result.errorMessage);
    return { ...result.data, username: loginCredentials.username };
  },
);

const slice = createSlice({
  name: "auth",
  initialState: initialState as AuthState,
  reducers: {
    logout: (): AuthState => ({ status: LOADABLE_STATUS.LOADING }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loginThunk.pending,
        (): AuthState => ({
          status: LOADABLE_STATUS.LOADING,
        }),
      )
      .addCase(loginThunk.fulfilled, (_state, action) => ({
        status: LOADABLE_STATUS.LOADED,
        data: action.payload,
      }))
      .addCase(loginThunk.rejected, (_state, action) => ({
        status: LOADABLE_STATUS.ERROR,
        error: action.error.message,
      }));
  },
});

const getAuth = (state: AuthState) => state;

export const authSlice = {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
    loginThunk,
  },
  selectors: {
    getAuth,
  },
};
