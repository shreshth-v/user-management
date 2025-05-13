import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

// Check Auth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/check");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Admin Login
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/admin-login", formData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isCheckingAuth: false,
    isLoggingIn: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
      })

      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
