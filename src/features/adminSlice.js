import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig.js";

// Initial state
const initialState = {
    adminActions: [],
    pendingQuests: [],
    allQuests: [], // Add this for quest moderation
    pagination: {},
    questPagination: {}, // Add separate pagination for quest moderation
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
            const response = await api.get('/admin/dashboard');
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
            const response = await api.get(`/admin/quests/pending?page=${page}&limit=${limit}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch pending quests');
        }
    }
);

export const fetchAllQuestsForAdmin = createAsyncThunk(
    'admin/fetchAllQuestsForAdmin',
    async ({ page = 1, limit = 20, status = 'all', category = 'all', search = '' }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ page, limit });
            if (status !== 'all') params.append('status', status);
            if (category !== 'all') params.append('category', category);
            if (search) params.append('search', search);
            
            const response = await api.get(`/admin/quests?${params}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch quests for admin');
        }
    }
);

export const approveQuest = createAsyncThunk(
    'admin/approveQuest',
    async ({ questId, feedback }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/admin/quests/${questId}/approve`, { feedback });
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
            const response = await api.patch(`/admin/quests/${questId}/reject`, { reason });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to reject quest');
        }
    }
);

export const deleteQuestByAdmin = createAsyncThunk(
    'admin/deleteQuestByAdmin',
    async (questId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/admin/quests/${questId}`);
            return { questId, data: response.data.data };
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || 'Failed to delete quest',
                status: error.response?.status,
                details: error.response?.data
            });
        }
    }
);

export const updateQuestByAdmin = createAsyncThunk(
    'admin/updateQuestByAdmin',
    async ({ questId, updateData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/quests/${questId}`, updateData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update quest');
        }
    }
);

export const fetchUsersForManagement = createAsyncThunk(
    'admin/fetchUsersForManagement',
    async ({ page = 1, limit = 20, search = '', role = 'all', status = 'all' }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ page, limit });
            if (search) params.append('search', search);
            if (role !== 'all') params.append('role', role);
            if (status !== 'all') params.append('status', status);
            
            const response = await api.get(`/admin/users?${params}`);
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
            const response = await api.patch(`/admin/users/${userId}/promote-admin`);
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
            const response = await api.patch(`/admin/users/${userId}/demote-user`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to demote admin');
        }
    }
);

export const suspendUser = createAsyncThunk(
    'admin/suspendUser',
    async ({ userId, reason }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/admin/users/${userId}/suspend`, { reason });
            return { ...response.data.data, userId };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to suspend user');
        }
    }
);

export const reactivateUser = createAsyncThunk(
    'admin/reactivateUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/admin/users/${userId}/reactivate`);
            return { ...response.data.data, userId };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to reactivate user');
        }
    }
);

export const verifyQuestProof = createAsyncThunk(
    'admin/verifyQuestProof',
    async ({ questProgressId, taskOrder, status, feedback }, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                `/admin/quest-progress/${questProgressId}/task/${taskOrder}/verify`,
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
            const response = await api.get(`/admin/actions?${params}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin actions');
        }
    }
);

export const fetchAnalytics = createAsyncThunk(
    'admin/fetchAnalytics',
    async ({ timeframe = '30d' }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/admin/analytics?timeframe=${timeframe}`);
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
            const response = await api.post('/admin/badge/award', { userId, badgeId, reason });
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
            const response = await api.post('/admin/badges', badgeData, {
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
            const response = await api.get(`/admin/reports?${params}`);
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
            const response = await api.patch(`/admin/reports/${reportId}/resolve`, { action, reason });
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
                
                // Map backend response to frontend state structure
                const data = action.payload;
                
                state.userManagement = {
                    totalUsers: data.totalUsers || 0,
                    onlineUsers: data.activeUsers || 0,
                    activeUsers: data.activeUsers || 0,
                    newUsersToday: data.newUsersToday || 0,
                    users: state.userManagement.users
                };
                
                state.questManagement = {
                    totalQuests: data.totalQuests || 0,
                    pendingQuests: data.pendingQuests || 0,
                    approvedQuests: data.approvedQuests || 0,
                    rejectedQuests: data.rejectedQuests || 0
                };
                
                state.analytics = {
                    ...state.analytics,
                    monthlyGrowth: data.monthlyGrowth || 0,
                    systemHealth: data.systemHealth || 0,
                    pendingProofs: data.pendingProofs || 0
                };
                
                state.error = null;
            })
            .addCase(fetchAdminDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch pending quests
            .addCase(fetchPendingQuests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPendingQuests.fulfilled, (state, action) => {
                state.loading = false;
                // Backend returns { quests: [...], pagination: {...} }
                state.pendingQuests = action.payload.quests || [];
                state.pagination = action.payload.pagination || {};
                state.error = null;
            })
            .addCase(fetchPendingQuests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch all quests for admin
            .addCase(fetchAllQuestsForAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllQuestsForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                // Backend returns { quests: [...], pagination: {...}, statusStats: {...} }
                state.allQuests = action.payload.quests || [];
                state.questPagination = action.payload.pagination || {};
                if (action.payload.statusStats) {
                    state.questManagement = {
                        totalQuests: action.payload.statusStats.total || 0,
                        pendingQuests: action.payload.statusStats.pending || 0,
                        approvedQuests: action.payload.statusStats.approved || 0,
                        rejectedQuests: action.payload.statusStats.rejected || 0
                    };
                }
                state.error = null;
            })
            .addCase(fetchAllQuestsForAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Approve quest
            .addCase(approveQuest.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(approveQuest.fulfilled, (state, action) => {
                state.actionLoading = false;
                const questId = action.payload._id;
                // Remove from pending quests
                state.pendingQuests = state.pendingQuests.filter(q => q._id !== questId);
                // Update in all quests
                const questIndex = state.allQuests.findIndex(q => q._id === questId);
                if (questIndex !== -1) {
                    state.allQuests[questIndex].status = 'approved';
                }
                // Update counts
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
                // Remove from pending quests
                state.pendingQuests = state.pendingQuests.filter(q => q._id !== questId);
                // Update in all quests
                const questIndex = state.allQuests.findIndex(q => q._id === questId);
                if (questIndex !== -1) {
                    state.allQuests[questIndex].status = 'rejected';
                }
                // Update counts
                state.questManagement.rejectedQuests += 1;
                state.questManagement.pendingQuests -= 1;
            })
            .addCase(rejectQuest.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            
            // Delete quest by admin
            .addCase(deleteQuestByAdmin.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(deleteQuestByAdmin.fulfilled, (state, action) => {
                state.actionLoading = false;
                const questId = action.payload.questId;
                // Remove from all quest arrays
                state.pendingQuests = state.pendingQuests.filter(q => q._id !== questId);
                state.allQuests = state.allQuests.filter(q => q._id !== questId);
                // Update counts
                state.questManagement.totalQuests -= 1;
            })
            .addCase(deleteQuestByAdmin.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            
            // Update quest by admin
            .addCase(updateQuestByAdmin.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(updateQuestByAdmin.fulfilled, (state, action) => {
                state.actionLoading = false;
                const updatedQuest = action.payload;
                // Update in all quests
                const questIndex = state.allQuests.findIndex(q => q._id === updatedQuest._id);
                if (questIndex !== -1) {
                    state.allQuests[questIndex] = updatedQuest;
                }
                // Update in pending quests if it exists there
                const pendingIndex = state.pendingQuests.findIndex(q => q._id === updatedQuest._id);
                if (pendingIndex !== -1) {
                    state.pendingQuests[pendingIndex] = updatedQuest;
                }
            })
            .addCase(updateQuestByAdmin.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            
            // Fetch users for management
            .addCase(fetchUsersForManagement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersForManagement.fulfilled, (state, action) => {
                state.loading = false;
                // Backend returns { users: [...], pagination: {...} }
                state.userManagement.users = action.payload.users || [];
                state.pagination = action.payload.pagination || {};
                if (action.payload.pagination?.totalUsers) {
                    state.userManagement.totalUsers = action.payload.pagination.totalUsers;
                }
                state.error = null;
            })
            .addCase(fetchUsersForManagement.rejected, (state, action) => {
                state.loading = false;
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
            .addCase(suspendUser.pending, (state) => {
                state.actionLoading = true;
                state.error = null;
            })
            .addCase(suspendUser.fulfilled, (state, action) => {
                state.actionLoading = false;
                const userId = action.payload.userId;
                const userIndex = state.userManagement.users.findIndex(u => u._id === userId);
                if (userIndex !== -1) {
                    state.userManagement.users[userIndex].accountVerified = false;
                    state.userManagement.users[userIndex].suspensionReason = action.payload.suspensionReason;
                }
                state.error = null;
            })
            .addCase(suspendUser.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            
            // Reactivate user
            .addCase(reactivateUser.pending, (state) => {
                state.actionLoading = true;
                state.error = null;
            })
            .addCase(reactivateUser.fulfilled, (state, action) => {
                state.actionLoading = false;
                const userId = action.payload.userId;
                const userIndex = state.userManagement.users.findIndex(u => u._id === userId);
                if (userIndex !== -1) {
                    state.userManagement.users[userIndex].accountVerified = true;
                    state.userManagement.users[userIndex].suspensionReason = null;
                }
                state.error = null;
            })
            .addCase(reactivateUser.rejected, (state, action) => {
                state.actionLoading = false;
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
