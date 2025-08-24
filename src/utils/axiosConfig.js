import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "/api/v1",
});

// Store reference for Redux store
let store = null;

export const setStore = (storeInstance) => {
  store = storeInstance;
  setupInterceptors();
};

const setupInterceptors = async () => {
  if (!store) return;


  const { refreshAccessToken, logoutUser } = await import("../features/authSlice");


  api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        store.getState().auth.refreshToken
      ) {
        originalRequest._retry = true;
        try {
          const result = await store.dispatch(refreshAccessToken());
          if (refreshAccessToken.fulfilled.match(result)) {
            const newToken = result.payload.accessToken;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return api(originalRequest);
          } else {
            store.dispatch(logoutUser());
          }
        } catch {
          store.dispatch(logoutUser());
        }
      }
      return Promise.reject(error);
    }
  );
};

export default api;
