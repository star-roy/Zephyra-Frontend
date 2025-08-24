import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

// Async thunks for friend operations
export const getUserFriends = createAsyncThunk(
  "friends/getUserFriends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/friends/my-friends");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch friends");
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  "friends/sendFriendRequest",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/friends/send-request", userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send friend request");
    }
  }
);

export const respondToFriendRequest = createAsyncThunk(
  "friends/respondToFriendRequest",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await api.post("/friends/respond-request", requestData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to respond to friend request");
    }
  }
);

export const getPendingRequests = createAsyncThunk(
  "friends/getPendingRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/friends/pending-requests");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch pending requests");
    }
  }
);

export const getSentRequests = createAsyncThunk(
  "friends/getSentRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/friends/sent-requests");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch sent requests");
    }
  }
);

export const removeFriend = createAsyncThunk(
  "friends/removeFriend",
  async (friendId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/friends/remove/${friendId}`);
      return { friendId, ...response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove friend");
    }
  }
);

export const blockUser = createAsyncThunk(
  "friends/blockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/friends/block/${userId}`);
      return { userId, ...response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to block user");
    }
  }
);

const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
    pendingRequests: [],
    sentRequests: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetFriendsState: (state) => {
      state.friends = [];
      state.pendingRequests = [];
      state.sentRequests = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user friends
      .addCase(getUserFriends.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = action.payload;
      })
      .addCase(getUserFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Send friend request
      .addCase(sendFriendRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sentRequests.push(action.payload);
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Respond to friend request
      .addCase(respondToFriendRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(respondToFriendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingRequests = state.pendingRequests.filter(
          req => req._id !== action.payload._id
        );
        if (action.payload.status === 'accepted') {
          state.friends.push(action.payload);
        }
      })
      .addCase(respondToFriendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Get pending requests
      .addCase(getPendingRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingRequests = action.payload;
      })
      .addCase(getPendingRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Get sent requests
      .addCase(getSentRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSentRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sentRequests = action.payload;
      })
      .addCase(getSentRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Remove friend
      .addCase(removeFriend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = state.friends.filter(
          friend => friend._id !== action.payload.friendId
        );
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Block user
      .addCase(blockUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = state.friends.filter(
          friend => friend._id !== action.payload.userId
        );
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetFriendsState } = friendsSlice.actions;
export default friendsSlice.reducer;
