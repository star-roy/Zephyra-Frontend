import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

// Initial state
const initialState = {
    userProfile: null,
    preferences: {
        notifications: true,
        privacy: 'public',
        language: 'en',
        theme: 'light'
    },
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

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/users/profile/${userId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
        }
    }
);

export const fetchCurrentUserProfile = createAsyncThunk(
    'user/fetchCurrentUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/users/my-profile');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch current user profile');
        }
    }
);

export const getUserSettings = createAsyncThunk(
    'user/getUserSettings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/users/settings');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch settings');
        }
    }
);

export const updateUserSettings = createAsyncThunk(
    'user/updateUserSettings',
    async (settings, { rejectWithValue }) => {
        try {
            const response = await api.post('/users/settings', settings);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update settings');
        }
    }
);

export const updateAccountDetails = createAsyncThunk(
    'user/updateAccountDetails',
    async ({ fullName, bio }, { rejectWithValue }) => {
        try {
            const response = await api.post('/users/update-account-details', { fullName, bio });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update account details');
        }
    }
);

export const updateUserAvatar = createAsyncThunk(
    'user/updateUserAvatar',
    async (avatarFile, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatarFile);
            
            const response = await api.post('/users/update-user-avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update avatar');
        }
    }
);

export const updateUserCoverImage = createAsyncThunk(
    'user/updateUserCoverImage',
    async (coverImageFile, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('coverImage', coverImageFile);
            
            const response = await api.post('/users/update-user-cover-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update cover image');
        }
    }
);

export const deleteUserAccount = createAsyncThunk(
    'user/deleteUserAccount',
    async ({ password, confirmDeletion }, { rejectWithValue }) => {
        try {
            const response = await api.delete('/users/delete-account', {
                data: { password, confirmDeletion }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete account');
        }
    }
);

export const fetchUserBadges = createAsyncThunk(
    'user/fetchUserBadges',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/badges/earned/${userId}`);
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
            const response = await api.get('/friends');
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
            const response = await api.get('/users/notifications');
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
            const response = await api.get('/users/completed-quests');
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
            const response = await api.post('/friends/request', { userId });
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
            const response = await api.patch(`/friends/accept/${requestId}`);
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
            await api.patch(`/users/notifications/${notificationId}/read`);
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
        clearUserData: () => {
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

                const backendStats = action.payload.stats;
                const user = action.payload.user;
                const currentLevel = backendStats?.level || user.level || 1;
                const totalXP = backendStats?.totalXP || user.xp || 0;
                const nextLevelXP = currentLevel * 100;
                const currentXP = totalXP % 100;
                
                state.stats = {
                    ...state.stats,
                    totalXP: totalXP,
                    currentXP: currentXP,
                    nextLevelXP: nextLevelXP,
                    level: currentLevel,
                    rank: backendStats?.rank || user.rank || 'Novice Explorer',
                    questsCompleted: backendStats?.questsCompleted || 0,
                    badgesEarned: action.payload.badges?.length || 0,
                    categoryXP: user.categoryXP || state.stats.categoryXP
                };
                state.profileCompleteness = user.profileCompleteness || 0;
                state.preferences = user.settings || state.preferences;
                state.badges = action.payload.badges || [];
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCurrentUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload.user;
                
                const backendStats = action.payload.stats;
                const currentLevel = backendStats?.level || 1;
                const totalXP = backendStats?.totalXP || action.payload.user.xp || 0;
                const nextLevelXP = currentLevel * 100;
                const currentXP = totalXP % 100;
                
                state.stats = {
                    ...state.stats,
                    totalXP: totalXP,
                    currentXP: currentXP,
                    nextLevelXP: nextLevelXP,
                    level: currentLevel,
                    rank: backendStats?.rank || 'Novice Explorer',
                    questsCompleted: backendStats?.questsCompleted || 0,
                    badgesEarned: action.payload.badges?.length || 0,
                    categoryXP: action.payload.user.categoryXP || state.stats.categoryXP
                };
                state.profileCompleteness = action.payload.user.profileCompleteness || 0;
                state.preferences = action.payload.user.settings || state.preferences;
                state.badges = action.payload.badges || [];
                state.error = null;
            })
            .addCase(fetchCurrentUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Get user settings
            .addCase(getUserSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserSettings.fulfilled, (state, action) => {
                state.loading = false;
            
                const settings = action.payload || {};
                state.preferences = {
                    notifications: state.preferences?.notifications || true,
                    privacy: settings.privacy?.profileVisibility || 'public',
                    language: settings.appPreferences?.language || 'en',
                    theme: settings.appPreferences?.theme || 'light',
                    dataSharing: settings.privacy?.dataSharing || false,
                    twoFactorAuth: settings.security?.twoFactorAuth || false
                };
            })
            .addCase(getUserSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update user settings
            .addCase(updateUserSettings.fulfilled, (state, action) => {
                const settings = action.payload || {};
                state.preferences = {
                    notifications: state.preferences?.notifications || true,
                    privacy: settings.privacy?.profileVisibility || 'public',
                    language: settings.appPreferences?.language || 'en',
                    theme: settings.appPreferences?.theme || 'light',
                    dataSharing: settings.privacy?.dataSharing || false,
                    twoFactorAuth: settings.security?.twoFactorAuth || false
                };
            })
            .addCase(updateUserSettings.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch badges
            .addCase(fetchUserBadges.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBadges.fulfilled, (state, action) => {
                state.loading = false;
                state.badges = action.payload;
            })
            .addCase(fetchUserBadges.rejected, (state, action) => {
                state.loading = false;
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
            .addCase(sendFriendRequest.fulfilled, (state) => {
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
            })
            
            // Update account details
            .addCase(updateAccountDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAccountDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
                state.error = null;
            })
            .addCase(updateAccountDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update user avatar
            .addCase(updateUserAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
                state.error = null;
            })
            .addCase(updateUserAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update user cover image
            .addCase(updateUserCoverImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserCoverImage.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
                state.error = null;
            })
            .addCase(updateUserCoverImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Delete user account
            .addCase(deleteUserAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserAccount.fulfilled, (state) => {
                // Account deleted successfully - clear all user data
                state.loading = false;
                state.userProfile = null;
                state.badges = [];
                state.friends = [];
                state.notifications = [];
                state.stats = { questsCompleted: 0, totalXP: 0, currentStreak: 0 };
                state.error = null;
            })
            .addCase(deleteUserAccount.rejected, (state, action) => {
                state.loading = false;
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
