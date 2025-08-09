import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "/api/v1",
});

// We'll set up interceptors after store is available
let store = null;

export const setStore = (storeInstance) => {
  store = storeInstance;
  setupInterceptors();
};

const setupInterceptors = async () => {
  if (!store) return;

  // Import actions dynamically to avoid circular dependency
  const { refreshAccessToken, logoutUser } = await import("../features/authSlice");

  // Request interceptor: attach access token
  api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor: handle 401 and refresh token
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // If 401 and not already retried
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        store.getState().auth.refreshToken
      ) {
        originalRequest._retry = true;
        try {
          // Dispatch refreshAccessToken thunk
          const result = await store.dispatch(refreshAccessToken());
          if (refreshAccessToken.fulfilled.match(result)) {
            // Update Authorization header and retry
            const newToken = result.payload.accessToken;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return api(originalRequest);
          } else {
            // Refresh failed, logout
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
