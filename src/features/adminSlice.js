import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
    adminActions: [],
    pendingQuests: [],
    reportedContent: [],
    userManagement: {
        users: [],
        totalUsers: 0,
        onlineUsers: 0,
        newUsersToday: 0
    },
    questManagement: {
        totalQuests: 0,
        pendingQuests: 0,
        approvedQuests: 0,
        rejectedQuests: 0
    },
    analytics: {
        dailyActiveUsers: 0,
        weeklyActiveUsers: 0,
        monthlyActiveUsers: 0,
        totalQuestsCompleted: 0,
        totalXPAwarded: 0,
        popularCategories: []
    },
    permissions: {
        canManageUsers: false,
        canModerateQuests: false,
        canViewAnalytics: false,
        canManageBadges: false,
        canViewReports: false
    },
    loading: false,
    error: null,
    actionLoading: false
};

// Async thunks
export const fetchAdminDashboard = createAsyncThunk(
    'admin/fetchAdminDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/admin/dashboard');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin dashboard');
        }
    }
);

export const fetchPendingQuests = createAsyncThunk(
    'admin/fetchPendingQuests',
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/admin/quests/pending?page=${page}&limit=${limit}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch pending quests');
        }
    }
);

export const approveQuest = createAsyncThunk(
    'admin/approveQuest',
    async ({ questId, xpAmount }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/v1/admin/quests/${questId}/approve`, { xpAmount });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to approve quest');
        }
    }
);

export const rejectQuest = createAsyncThunk(
    'admin/rejectQuest',
    async ({ questId, reason }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/v1/admin/quests/${questId}/reject`, { reason });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to reject quest');
        }
    }
);

export const fetchUsersForManagement = createAsyncThunk(
    'admin/fetchUsersForManagement',
    async ({ page = 1, limit = 10, search = '' }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ page, limit, search });
            const response = await axios.get(`/api/v1/admin/users?${params}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);

export const promoteUserToAdmin = createAsyncThunk(
    'admin/promoteUserToAdmin',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/v1/admin/users/${userId}/promote`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to promote user');
        }
    }
);

export const demoteAdminToUser = createAsyncThunk(
    'admin/demoteAdminToUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/v1/admin/users/${userId}/demote`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to demote admin');
        }
    }
);

export const suspendUser = createAsyncThunk(
    'admin/suspendUser',
    async ({ userId, reason, duration }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/v1/admin/users/${userId}/suspend`, { reason, duration });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to suspend user');
        }
    }
);

export const reactivateUser = createAsyncThunk(
    'admin/reactivateUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/v1/admin/users/${userId}/reactivate`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to reactivate user');
        }
    }
);

export const verifyQuestProof = createAsyncThunk(
    'admin/verifyQuestProof',
    async ({ questProgressId, taskOrder, status, feedback }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `/api/v1/admin/quest-progress/${questProgressId}/task/${taskOrder}/verify`,
                { status, feedback }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to verify quest proof');
        }
    }
);

export const fetchAdminActions = createAsyncThunk(
    'admin/fetchAdminActions',
    async ({ page = 1, limit = 10, actionType = '' }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ page, limit });
            if (actionType) params.append('actionType', actionType);
            const response = await axios.get(`/api/v1/admin/actions?${params}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin actions');
        }
    }
);

export const fetchAnalytics = createAsyncThunk(
    'admin/fetchAnalytics',
    async ({ period = '7d' }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/admin/analytics?period=${period}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics');
        }
    }
);

export const awardBadgeToUser = createAsyncThunk(
    'admin/awardBadgeToUser',
    async ({ userId, badgeId, reason }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/admin/badges/award', { userId, badgeId, reason });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to award badge');
        }
    }
);

export const createBadge = createAsyncThunk(
    'admin/createBadge',
    async (badgeData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/admin/badges', badgeData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create badge');
        }
    }
);

export const fetchReportedContent = createAsyncThunk(
    'admin/fetchReportedContent',
    async ({ page = 1, limit = 10, type = 'all' }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ page, limit, type });
            const response = await axios.get(`/api/v1/admin/reports?${params}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reported content');
        }
    }
);

export const resolveReport = createAsyncThunk(
    'admin/resolveReport',
    async ({ reportId, action, reason }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/v1/admin/reports/${reportId}/resolve`, { action, reason });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to resolve report');
        }
    }
);

// Admin slice
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setActionLoading: (state, action) => {
            state.actionLoading = action.payload;
        },
        updatePermissions: (state, action) => {
            state.permissions = { ...state.permissions, ...action.payload };
        },
        addAdminAction: (state, action) => {
            state.adminActions.unshift(action.payload);
        },
        updateQuestStatus: (state, action) => {
            const { questId, status } = action.payload;
            const questIndex = state.pendingQuests.findIndex(q => q._id === questId);
            if (questIndex !== -1) {
                if (status === 'approved' || status === 'rejected') {
                    state.pendingQuests.splice(questIndex, 1);
                }
            }
        },
        updateUserInList: (state, action) => {
            const { userId, updates } = action.payload;
            const userIndex = state.userManagement.users.findIndex(u => u._id === userId);
            if (userIndex !== -1) {
                state.userManagement.users[userIndex] = { 
                    ...state.userManagement.users[userIndex], 
                    ...updates 
                };
            }
        },
        clearAdminData: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch admin dashboard
            .addCase(fetchAdminDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.userManagement = action.payload.userStats || state.userManagement;
                state.questManagement = action.payload.questStats || state.questManagement;
                state.analytics = action.payload.analytics || state.analytics;
                state.permissions = action.payload.permissions || state.permissions;
                state.error = null;
            })
            .addCase(fetchAdminDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch pending quests
            .addCase(fetchPendingQuests.fulfilled, (state, action) => {
                state.pendingQuests = action.payload.quests || action.payload;
            })
            .addCase(fetchPendingQuests.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Approve quest
            .addCase(approveQuest.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(approveQuest.fulfilled, (state, action) => {
                state.actionLoading = false;
                const questId = action.payload._id;
                state.pendingQuests = state.pendingQuests.filter(q => q._id !== questId);
                state.questManagement.approvedQuests += 1;
                state.questManagement.pendingQuests -= 1;
            })
            .addCase(approveQuest.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            
            // Reject quest
            .addCase(rejectQuest.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(rejectQuest.fulfilled, (state, action) => {
                state.actionLoading = false;
                const questId = action.payload._id;
                state.pendingQuests = state.pendingQuests.filter(q => q._id !== questId);
                state.questManagement.rejectedQuests += 1;
                state.questManagement.pendingQuests -= 1;
            })
            .addCase(rejectQuest.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            
            // Fetch users for management
            .addCase(fetchUsersForManagement.fulfilled, (state, action) => {
                state.userManagement.users = action.payload.users || action.payload;
                if (action.payload.totalUsers) {
                    state.userManagement.totalUsers = action.payload.totalUsers;
                }
            })
            .addCase(fetchUsersForManagement.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Promote user to admin
            .addCase(promoteUserToAdmin.fulfilled, (state, action) => {
                const userId = action.payload._id;
                const userIndex = state.userManagement.users.findIndex(u => u._id === userId);
                if (userIndex !== -1) {
                    state.userManagement.users[userIndex].role = 'admin';
                }
            })
            .addCase(promoteUserToAdmin.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Demote admin to user
            .addCase(demoteAdminToUser.fulfilled, (state, action) => {
                const userId = action.payload._id;
                const userIndex = state.userManagement.users.findIndex(u => u._id === userId);
                if (userIndex !== -1) {
                    state.userManagement.users[userIndex].role = 'user';
                }
            })
            .addCase(demoteAdminToUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Suspend user
            .addCase(suspendUser.fulfilled, (state, action) => {
                const userId = action.payload._id;
                const userIndex = state.userManagement.users.findIndex(u => u._id === userId);
                if (userIndex !== -1) {
                    state.userManagement.users[userIndex].suspended = true;
                    state.userManagement.users[userIndex].suspensionReason = action.payload.suspensionReason;
                }
            })
            .addCase(suspendUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Reactivate user
            .addCase(reactivateUser.fulfilled, (state, action) => {
                const userId = action.payload._id;
                const userIndex = state.userManagement.users.findIndex(u => u._id === userId);
                if (userIndex !== -1) {
                    state.userManagement.users[userIndex].suspended = false;
                    state.userManagement.users[userIndex].suspensionReason = null;
                }
            })
            .addCase(reactivateUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Verify quest proof
            .addCase(verifyQuestProof.fulfilled, (state) => {
                // Handle quest proof verification success
                state.error = null;
            })
            .addCase(verifyQuestProof.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch admin actions
            .addCase(fetchAdminActions.fulfilled, (state, action) => {
                state.adminActions = action.payload.actions || action.payload;
            })
            .addCase(fetchAdminActions.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch analytics
            .addCase(fetchAnalytics.fulfilled, (state, action) => {
                state.analytics = { ...state.analytics, ...action.payload };
            })
            .addCase(fetchAnalytics.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Award badge to user
            .addCase(awardBadgeToUser.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(awardBadgeToUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Create badge
            .addCase(createBadge.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(createBadge.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch reported content
            .addCase(fetchReportedContent.fulfilled, (state, action) => {
                state.reportedContent = action.payload.reports || action.payload;
            })
            .addCase(fetchReportedContent.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Resolve report
            .addCase(resolveReport.fulfilled, (state, action) => {
                const reportId = action.payload._id;
                state.reportedContent = state.reportedContent.filter(r => r._id !== reportId);
            })
            .addCase(resolveReport.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {
    clearError,
    setActionLoading,
    updatePermissions,
    addAdminAction,
    updateQuestStatus,
    updateUserInList,
    clearAdminData
} = adminSlice.actions;

export default adminSlice.reducer;
