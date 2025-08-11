import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import userReducer from "../features/userSlice.js";
import questReducer from "../features/questSlice.js";
import adminReducer from "../features/adminSlice.js";
import friendsReducer from "../features/friendsSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    quest: questReducer,
    admin: adminReducer,
    friends: friendsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
    