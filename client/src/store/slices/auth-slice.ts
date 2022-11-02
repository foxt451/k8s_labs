import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosInstance, refreshInstance } from "../../axios";
import { ENV } from "../../env";
import {
  RefreshTokenPayload,
  RefreshTokenResponse,
} from "../../types/auth/RefreshTokenPayload";
import { SignInPayload, SignInResponse } from "../../types/auth/SignInPayload";
import { SignUpPayload, SignUpResponse } from "../../types/auth/SignUpPayload";
import { User } from "../../types/auth/User";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(refresh.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    });

    builder.addMatcher(isAnyOf(logout.fulfilled, logoutNoApi.fulfilled), () => {
      return initialState;
    });

    builder.addMatcher(
      isAnyOf(login.fulfilled, register.fulfilled),
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.user = payload.user;
      }
    );
  },
});

export const login = createAsyncThunk<SignInResponse, SignInPayload>(
  "auth/login",
  async (payload) => {
    return (
      await axiosInstance.post<SignInResponse>(
        `${ENV.authApiPrefix}/sign-in`,
        payload
      )
    ).data;
  }
);

export const register = createAsyncThunk<SignUpResponse, SignUpPayload>(
  "auth/register",
  async (payload) => {
    return (
      await axiosInstance.post<SignUpResponse>(
        `${ENV.authApiPrefix}/sign-up`,
        payload
      )
    ).data;
  }
);

export const logout = createAsyncThunk("auth/logout", async (payload) => {
  await axiosInstance.post(`${ENV.authApiPrefix}/logout`);
});

export const logoutNoApi = createAsyncThunk("auth/logoutNoApi", async () =>
  Promise.resolve()
);

let refreshPromise: Promise<AxiosResponse<RefreshTokenResponse>> | null = null;
export const refresh = createAsyncThunk<
  RefreshTokenResponse,
  RefreshTokenPayload
>("auth/refresh", async (payload) => {
  let newTokens: RefreshTokenResponse;
  if (refreshPromise) {
    newTokens = (await refreshPromise).data;
  } else {
    refreshPromise = refreshInstance.post<RefreshTokenResponse>(
      `${ENV.authApiPrefix}/refresh`,
      payload
    );
    newTokens = (await refreshPromise).data;
    refreshPromise = null;
  }
  return newTokens;
});

export const authReducer = authSlice.reducer;
