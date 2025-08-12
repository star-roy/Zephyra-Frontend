import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

// Initial state
const initialState = {
    quests: [],
    ongoingQuests: [],
    completedQuests: [],
    userCreatedQuests: [],
    recommendedQuests: [],
    featuredQuests: [],
    popularQuests: [],
    dashboardStats: {
        totalOngoing: 0,
        totalCompleted: 0,
        totalCreated: 0
    },
    currentQuest: null,
    questProgress: {},
    questTasks: [],
    questTips: [],
    questFiles: [],
    questRoutes: [],
    questReviews: [],
    loading: false,
    dashboardLoading: false,
    error: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalQuests: 0,
        hasNextPage: false,
        hasPreviousPage: false
    },
    filters: {
        category: 'all',
        difficulty: 'all',
        status: 'all',
        sortBy: 'newest',
        searchQuery: ''
    }
};

// Async thunks
export const fetchQuests = createAsyncThunk(
    'quest/fetchQuests',
    async ({ page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({
                page,
                limit,
                ...filters
            });
            const response = await api.get(`/quests?${params}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch quests');
        }
    }
);

export const fetchQuestById = createAsyncThunk(
    'quest/fetchQuestById',
    async (questId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/quests/${questId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch quest');
        }
    }
);

export const createQuest = createAsyncThunk(
    'quest/createQuest',
    async (questData, { rejectWithValue }) => {
        try {
            const response = await api.post('/quests/create-quest', questData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create quest');
        }
    }
);

export const updateQuest = createAsyncThunk(
    'quest/updateQuest',
    async ({ questId, questData }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/quests/${questId}`, questData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update quest');
        }
    }
);

export const deleteQuest = createAsyncThunk(
    'quest/deleteQuest',
    async (questId, { rejectWithValue }) => {
        try {
            await api.delete(`/quests/${questId}`);
            return questId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete quest');
        }
    }
);

export const startQuest = createAsyncThunk(
    'quest/startQuest',
    async (questId, { rejectWithValue }) => {
        try {
            const response = await api.post('/quest-progress/start', { questId });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to start quest');
        }
    }
);

export const completeQuestTask = createAsyncThunk(
    'quest/completeQuestTask',
    async ({ questId, taskOrder, proofData }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `/quest-progress/task-proof/${questId}/${taskOrder}`,
                proofData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to complete task');
        }
    }
);

export const submitQuestProof = createAsyncThunk(
    'quest/submitQuestProof',
    async ({ questId, proofData }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `/quest-progress/${questId}/submit-proof`,
                proofData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to submit proof');
        }
    }
);

export const fetchQuestProgress = createAsyncThunk(
    'quest/fetchQuestProgress',
    async (questId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/quest-progress/${questId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch quest progress');
        }
    }
);

export const fetchMyQuestDashboard = createAsyncThunk(
    'quest/fetchMyQuestDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/quests/my-dashboard');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch quest dashboard');
        }
    }
);

export const fetchOngoingQuests = createAsyncThunk(
    'quest/fetchOngoingQuests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/quest-progress/ongoing');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch ongoing quests');
        }
    }
);

export const fetchUserCreatedQuests = createAsyncThunk(
    'quest/fetchUserCreatedQuests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/quests/my-quests');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user created quests');
        }
    }
);

export const fetchQuestTasks = createAsyncThunk(
    'quest/fetchQuestTasks',
    async (questId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/v1/quest-tasks/${questId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch quest tasks');
        }
    }
);

export const fetchQuestReviews = createAsyncThunk(
    'quest/fetchQuestReviews',
    async (questId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/v1/quest-reviews/${questId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch quest reviews');
        }
    }
);

export const submitQuestReview = createAsyncThunk(
    'quest/submitQuestReview',
    async ({ questId, reviewData }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/v1/quest-reviews/${questId}`, reviewData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to submit review');
        }
    }
);

export const searchQuests = createAsyncThunk(
    'quest/searchQuests',
    async ({ query, filters = {} }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({
                search: query,
                ...filters
            });
            const response = await api.get(`/quests/search?${params}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to search quests');
        }
    }
);

export const fetchFeaturedQuests = createAsyncThunk(
    'quest/fetchFeaturedQuests',
    async (limit = 4, { rejectWithValue }) => {
        try {
            const response = await api.get(`/quests/featured?limit=${limit}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured quests');
        }
    }
);

export const fetchPopularQuests = createAsyncThunk(
    'quest/fetchPopularQuests',
    async (limit = 4, { rejectWithValue }) => {
        try {
            const response = await api.get(`/quests/popular?limit=${limit}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch popular quests');
        }
    }
);

// Quest slice
const questSlice = createSlice({
    name: "quest",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setCurrentQuest: (state, action) => {
            state.currentQuest = action.payload;
        },
        clearCurrentQuest: (state) => {
            state.currentQuest = null;
        },
        updateFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: 'all',
                difficulty: 'all',
                status: 'all',
                sortBy: 'newest',
                searchQuery: ''
            };
        },
        updateQuestProgress: (state, action) => {
            const { questId, progress } = action.payload;
            state.questProgress[questId] = progress;
        },
        markTaskComplete: (state, action) => {
            const { questId, taskOrder } = action.payload;
            if (state.questProgress[questId]) {
                state.questProgress[questId].completed_tasks.push(taskOrder);
            }
        },
        clearQuestData: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch quests
            .addCase(fetchQuests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuests.fulfilled, (state, action) => {
                state.loading = false;
                // Handle different response structures from backend
                if (action.payload.docs) {
                    // Paginated response from aggregatePaginate
                    state.quests = action.payload.docs;
                    state.pagination = {
                        currentPage: action.payload.page,
                        totalPages: action.payload.totalPages,
                        totalQuests: action.payload.totalDocs,
                        hasNextPage: action.payload.hasNextPage,
                        hasPreviousPage: action.payload.hasPrevPage
                    };
                } else if (action.payload.quests) {
                    // Nested quests response
                    state.quests = action.payload.quests;
                    state.pagination = action.payload.pagination;
                } else {
                    // Direct array response
                    state.quests = action.payload;
                }
                state.error = null;
            })
            .addCase(fetchQuests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch quest by ID
            .addCase(fetchQuestById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestById.fulfilled, (state, action) => {
                state.loading = false;
                // Handle both nested and direct quest data structures
                if (action.payload.quest) {
                    // If data comes in nested format from comprehensive endpoint
                    state.currentQuest = action.payload;
                } else {
                    // If data comes directly as quest object
                    state.currentQuest = action.payload;
                }
                state.error = null;
            })
            .addCase(fetchQuestById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Create quest
            .addCase(createQuest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createQuest.fulfilled, (state, action) => {
                state.loading = false;
                state.userCreatedQuests.unshift(action.payload);
                state.error = null;
            })
            .addCase(createQuest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update quest
            .addCase(updateQuest.fulfilled, (state, action) => {
                const index = state.userCreatedQuests.findIndex(q => q._id === action.payload._id);
                if (index !== -1) {
                    state.userCreatedQuests[index] = action.payload;
                }
                if (state.currentQuest && state.currentQuest._id === action.payload._id) {
                    state.currentQuest = action.payload;
                }
            })
            .addCase(updateQuest.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Delete quest
            .addCase(deleteQuest.fulfilled, (state, action) => {
                state.userCreatedQuests = state.userCreatedQuests.filter(q => q._id !== action.payload);
                if (state.currentQuest && state.currentQuest._id === action.payload) {
                    state.currentQuest = null;
                }
            })
            .addCase(deleteQuest.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Start quest
            .addCase(startQuest.fulfilled, (state, action) => {
                state.ongoingQuests.push(action.payload);
                state.questProgress[action.payload.quest_id] = action.payload;
            })
            .addCase(startQuest.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Complete quest task
            .addCase(completeQuestTask.fulfilled, (state, action) => {
                const questId = action.payload.quest_id;
                state.questProgress[questId] = action.payload;
            })
            .addCase(completeQuestTask.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Submit quest proof
            .addCase(submitQuestProof.fulfilled, (state, action) => {
                const questId = action.payload.quest_id;
                state.questProgress[questId] = action.payload;
            })
            .addCase(submitQuestProof.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch quest progress
            .addCase(fetchQuestProgress.fulfilled, (state, action) => {
                const questId = action.payload.quest_id;
                state.questProgress[questId] = action.payload;
            })
            .addCase(fetchQuestProgress.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch my quest dashboard (comprehensive data)
            .addCase(fetchMyQuestDashboard.pending, (state) => {
                state.dashboardLoading = true;
                state.error = null;
            })
            .addCase(fetchMyQuestDashboard.fulfilled, (state, action) => {
                state.dashboardLoading = false;
                state.ongoingQuests = action.payload.ongoingQuests;
                state.completedQuests = action.payload.completedQuests;
                state.userCreatedQuests = action.payload.userCreatedQuests;
                state.recommendedQuests = action.payload.recommendedQuests;
                state.dashboardStats = action.payload.stats;
                state.error = null;
            })
            .addCase(fetchMyQuestDashboard.rejected, (state, action) => {
                state.dashboardLoading = false;
                state.error = action.payload;
            })
            
            // Fetch ongoing quests (separate endpoint)
            .addCase(fetchOngoingQuests.fulfilled, (state, action) => {
                state.ongoingQuests = action.payload;
                action.payload.forEach(quest => {
                    state.questProgress[quest.quest_id] = quest;
                });
            })
            .addCase(fetchOngoingQuests.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch user created quests
            .addCase(fetchUserCreatedQuests.fulfilled, (state, action) => {
                state.userCreatedQuests = action.payload;
            })
            .addCase(fetchUserCreatedQuests.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch quest tasks
            .addCase(fetchQuestTasks.fulfilled, (state, action) => {
                state.questTasks = action.payload;
            })
            .addCase(fetchQuestTasks.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch quest reviews
            .addCase(fetchQuestReviews.fulfilled, (state, action) => {
                state.questReviews = action.payload;
            })
            .addCase(fetchQuestReviews.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Submit quest review
            .addCase(submitQuestReview.fulfilled, (state, action) => {
                state.questReviews.unshift(action.payload);
            })
            .addCase(submitQuestReview.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Search quests
            .addCase(searchQuests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchQuests.fulfilled, (state, action) => {
                state.loading = false;
                state.quests = action.payload.quests;
                state.pagination = action.payload.pagination;
                state.error = null;
            })
            .addCase(searchQuests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch featured quests
            .addCase(fetchFeaturedQuests.fulfilled, (state, action) => {
                state.featuredQuests = action.payload;
            })
            .addCase(fetchFeaturedQuests.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // Fetch popular quests  
            .addCase(fetchPopularQuests.fulfilled, (state, action) => {
                state.popularQuests = action.payload;
            })
            .addCase(fetchPopularQuests.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {
    clearError,
    setCurrentQuest,
    clearCurrentQuest,
    updateFilters,
    clearFilters,
    updateQuestProgress,
    markTaskComplete,
    clearQuestData
} = questSlice.actions;

export default questSlice.reducer;
