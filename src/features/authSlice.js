import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
    isAuthenticated: false,
    userData: null,
    loading: false,
    error: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    role: null,
    isEmailVerified: false,
    registrationEmail: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/users/login', { email, password });
            const { user, accessToken, refreshToken } = response.data.data;
            
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            
            return { user, accessToken, refreshToken };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/users/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async ({ email, verificationCode }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/users/verify-email', { email, verificationCode });
            const { user, accessToken, refreshToken } = response.data.data;
            
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            
            return { user, accessToken, refreshToken };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Email verification failed');
        }
    }
);

export const resendVerificationCode = createAsyncThunk(
    'auth/resendVerificationCode',
    async (email, { rejectWithValue }) => {
        try {
            await axios.post('/api/v1/users/resend-verification-code', { email });
            return { message: 'Verification code sent successfully' };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to resend verification code');
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            await axios.post('/api/v1/users/request-password-reset', { email });
            return { message: 'Password reset code sent to your email' };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send password reset code');
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ email, resetCode, newPassword, confirmPassword }, { rejectWithValue }) => {
        try {
            await axios.post('/api/v1/users/reset-password', { email, resetCode, newPassword, confirmPassword });
            return { message: 'Password reset successful' };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Password reset failed');
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { refreshToken } = getState().auth;
            const response = await axios.post('/api/v1/users/refresh-token', { refreshToken });
            const { accessToken } = response.data.data;
            
            localStorage.setItem('accessToken', accessToken);
            return { accessToken };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Token refresh failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        try {
            await axios.post('/api/v1/users/logout');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return {};
        } catch {
            // Even if logout fails on server, clear local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return {};
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setRegistrationEmail: (state, action) => {
            state.registrationEmail = action.payload;
        },
        clearRegistrationEmail: (state) => {
            state.registrationEmail = null;
        },
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        updateUserProfile: (state, action) => {
            if (state.userData) {
                state.userData = { ...state.userData, ...action.payload };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.userData = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.role = action.payload.user.role;
                state.isEmailVerified = action.payload.user.accountVerified;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.registrationEmail = action.payload.email;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Verify Email
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.userData = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.role = action.payload.user.role;
                state.isEmailVerified = true;
                state.registrationEmail = null;
                state.error = null;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Resend verification code
            .addCase(resendVerificationCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resendVerificationCode.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(resendVerificationCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Reset password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Refresh token
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
            })
            .addCase(refreshAccessToken.rejected, (state) => {
                state.isAuthenticated = false;
                state.userData = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.role = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            })
            
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.userData = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.role = null;
                state.isEmailVerified = false;
                state.registrationEmail = null;
                state.error = null;
            });
    },
});

export const { 
    clearError, 
    setRegistrationEmail, 
    clearRegistrationEmail, 
    setTokens, 
    updateUserProfile 
} = authSlice.actions;

export default authSlice.reducer;
