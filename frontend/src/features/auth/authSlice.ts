import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import { signin, signup as signupUser } from "@/api/authClient";
import { LoginResponse } from "./types";

import serializeAxiosError from "@/utils/serializeAxiosError";
import { Status } from "@/types";
import httpClient from "@/api/Httpclient";

interface AuthState extends LoginResponse {
  status: Status;
  error?: SerializedError | null;
  isAuthenticated: boolean;
}

export const login = createAsyncThunk("auth/login", signin, {
  serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
});

export const signup = createAsyncThunk("auth/signup", signupUser, {
  serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
});

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }: PayloadAction<LoginResponse>) => {
      state.status = "succeeded";
      state.accessToken = payload.accessToken;
      state.user = payload.user;
      state.isAuthenticated = true;
      httpClient.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${payload.accessToken}`;
        return config;
      });
    },

    resetStatus: (state) => {
      state.status = "idle";
    },
  },

  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
      if (action.error.code === "401")
        state.error.message = "Verify Credentials";
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        authSlice.caseReducers.loginSuccess(state, action);
      }
    );

    builder.addCase(signup.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.error;
      if (action.error.code === "401")
        state.error.message = "Verify Credentials";
      state.status = "failed";
    });
    builder.addCase(
      signup.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        authSlice.caseReducers.loginSuccess(state, action);
      }
    );
  },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
