import axios from "axios";
import { logoutNoApi, refresh } from "./store/slices/auth-slice";
import { AppStore } from "./store/store";

let injectedStore: AppStore | undefined;

export const injectStore = (store: AppStore): void => {
  injectedStore = store;
};

export const axiosInstance = axios.create();
export const refreshInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  if (!injectedStore) {
    throw new Error("Store not injected");
  }
  const accessToken = injectedStore.getState().auth.accessToken;
  if (!accessToken) {
    return config;
  }
  return {
    ...config,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
});

const REFRESH_STATUS_CODE = 401;
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!injectedStore) {
      throw new Error("Store not injected");
    }
    const originalRequest = error.config;
    if (
      error.response.status === REFRESH_STATUS_CODE &&
      !originalRequest._retry
    ) {
      console.log("unauth");
      originalRequest._retry = true;
      const state = injectedStore.getState();
      if (!state.auth.refreshToken || !state.auth.user?.id) {
        console.log("no user");
        return Promise.reject(error);
      }
      try {
        await injectedStore
          .dispatch(
            refresh({
              refreshToken: state.auth.refreshToken,
              userId: state.auth.user.id,
            })
          )
          .unwrap();
      } catch {
        console.log("refresh failed");
        await injectedStore.dispatch(logoutNoApi()).unwrap();
      }
      return axiosInstance(originalRequest);
    } else if (error.response.status === REFRESH_STATUS_CODE) {
      console.log("retry failed");
      await injectedStore.dispatch(logoutNoApi()).unwrap();
    }
    return Promise.reject(error);
  }
);
