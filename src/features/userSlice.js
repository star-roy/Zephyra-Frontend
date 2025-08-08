import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
    userProfile: null,
    preferences: {
        notifications: true,
        privacy: 'public',
        language: 'en',
        theme: 'light'
    },
    achievements: [],
    badges: [],
    friends: [],
    notifications: [],
    activityHistory: [],
    completedQuests: [],
    loading: false,
    error: null,
    profileCompleteness: 0,
    stats: {
        totalXP: 0,
        level: 1,
        rank: 'Novice Explorer',
        questsCompleted: 0,
        currentStreak: 0,
        categoryXP: {
            Art: 0,
            Food: 0,
            History: 0,
            Culture: 0,
            Adventure: 0,
            HiddenGems: 0
        }
    }
};

// Async thunks
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/users/profile/${userId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axios.patch('/api/v1/users/update-profile', profileData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
        }
    }
);

export const updateUserSettings = createAsyncThunk(
    'user/updateUserSettings',
    async (settings, { rejectWithValue }) => {
        try {
            const response = await axios.patch('/api/v1/users/settings', { settings });
            return response.data.data.settings;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update settings');
        }
    }
);

export const fetchUserAchievements = createAsyncThunk(
    'user/fetchUserAchievements',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/users/achievements');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch achievements');
        }
    }
);

export const fetchUserBadges = createAsyncThunk(
    'user/fetchUserBadges',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/users/badges');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch badges');
        }
    }
);

export const fetchUserFriends = createAsyncThunk(
    'user/fetchUserFriends',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/friends');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch friends');
        }
    }
);

export const fetchUserNotifications = createAsyncThunk(
    'user/fetchUserNotifications',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/users/notifications');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
        }
    }
);

export const fetchCompletedQuests = createAsyncThunk(
    'user/fetchCompletedQuests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/users/completed-quests');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch completed quests');
        }
    }
);

export const sendFriendRequest = createAsyncThunk(
    'user/sendFriendRequest',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/friends/request', { userId });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send friend request');
        }
    }
);

export const acceptFriendRequest = createAsyncThunk(
    'user/acceptFriendRequest',
    async (requestId, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/v1/friends/accept/${requestId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to accept friend request');
        }
    }
);

export const markNotificationAsRead = createAsyncThunk(
    'user/markNotificationAsRead',
    async (notificationId, { rejectWithValue }) => {
        try {
            await axios.patch(`/api/v1/users/notifications/${notificationId}/read`);
            return notificationId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to mark notification as read');
        }
    }
);

// User slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        updatePreferences: (state, action) => {
            state.preferences = { ...state.preferences, ...action.payload };
        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                notification => notification.id !== action.payload
            );
        },
        updateStats: (state, action) => {
            state.stats = { ...state.stats, ...action.payload };
        },
        addXP: (state, action) => {
            const { amount, category } = action.payload;
            state.stats.totalXP += amount;
            if (category && state.stats.categoryXP[category] !== undefined) {
                state.stats.categoryXP[category] += amount;
            }
            // Update level based on XP
            state.stats.level = Math.floor(state.stats.totalXP / 500) + 1;
        },
        incrementQuestCount: (state) => {
            state.stats.questsCompleted += 1;
        },
        updateStreak: (state, action) => {
            state.stats.currentStreak = action.payload;
        },
        clearUserData: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch user profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload.user;
                state.stats = {
                    ...state.stats,
                    totalXP: action.payload.user.xp || 0,
                    level: action.payload.user.level || 1,
                    rank: action.payload.user.rank || 'Novice Explorer',
                    categoryXP: action.payload.user.categoryXP || state.stats.categoryXP
                };
                state.profileCompleteness = action.payload.user.profileCompleteness || 0;
                state.preferences = action.payload.user.settings || state.preferences;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update user profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = { ...state.userProfile, ...action.payload };
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update user settings
            .addCase(updateUserSettings.fulfilled, (state, action) => {
                state.preferences = action.payload;
            })
            .addCase(updateUserSettings.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch achievements
            .addCase(fetchUserAchievements.fulfilled, (state, action) => {
                state.achievements = action.payload;
            })
            .addCase(fetchUserAchievements.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch badges
            .addCase(fetchUserBadges.fulfilled, (state, action) => {
                state.badges = action.payload;
            })
            .addCase(fetchUserBadges.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch friends
            .addCase(fetchUserFriends.fulfilled, (state, action) => {
                state.friends = action.payload;
            })
            .addCase(fetchUserFriends.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch notifications
            .addCase(fetchUserNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload;
            })
            .addCase(fetchUserNotifications.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch completed quests
            .addCase(fetchCompletedQuests.fulfilled, (state, action) => {
                state.completedQuests = action.payload;
                state.stats.questsCompleted = action.payload.length;
            })
            .addCase(fetchCompletedQuests.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Send friend request
            .addCase(sendFriendRequest.fulfilled, (state, action) => {
                // Handle friend request sent (maybe add to pending requests)
                state.error = null;
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Accept friend request
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                state.friends.push(action.payload);
                state.error = null;
            })
            .addCase(acceptFriendRequest.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Mark notification as read
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                const notification = state.notifications.find(n => n.id === action.payload);
                if (notification) {
                    notification.read = true;
                }
            })
            .addCase(markNotificationAsRead.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {
    clearError,
    updatePreferences,
    addNotification,
    removeNotification,
    updateStats,
    addXP,
    incrementQuestCount,
    updateStreak,
    clearUserData
} = userSlice.actions;

export default userSlice.reducer;
