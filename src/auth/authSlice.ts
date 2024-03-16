import client from "../services/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthModel, RecordModel } from "pocketbase";

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface AuthState {
  userId: string | null;
  userData: AuthModel | null;
  token: string | null;
  isValid: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  errorMessage: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  userId: string;
  userData: RecordModel;
}

export const logIn = createAsyncThunk<AuthResponse, LoginData>(
  "auth/login",
  async ({ email, password }: LoginData, { rejectWithValue }) => {
    try {
      const authData = await client
        .collection("users")
        .authWithPassword(email, password);

      return {
        token: authData.token,
        userId: authData.record.id,
        userData: authData.record,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData: SignUpData, { rejectWithValue }) => {
    try {
      const record = await client.collection("users").create({
        ...userData,
        emailVisibility: true,
      });

      return {
        token: client.authStore.token,
        userId: record.id,
        userData: record,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState: AuthState = {
  userId: null, // Now can be string or null
  userData: client.authStore.model, // Assuming AuthModel or null
  token: client.authStore.token, // Now can be string or null
  isValid: client.authStore.isValid,
  status: "idle",
  error: null,
  errorMessage: "", // Assuming this is always a string, including an empty string
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      client.authStore.clear();
      state.token = null;
      state.userId = null;
      state.isValid = false;
    },
    clearError: (state) => {
      state.error = null;
      state.errorMessage = "";
    },
    refreshAuthData: (state) => {
      const item = client.authStore;

      state.userData = item.model;
      state.token = item.token;
      state.isValid = item.isValid;
    },
    setLoading: (state, action) => {
      state.status = action.payload ? "loading" : "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.status = "loading";
        state.error = null; // Reset errors on a new login attempt
        state.errorMessage = "";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.userData = action.payload.userData;
        state.isValid = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";

        if (typeof action.payload === "string") {
          state.errorMessage = action.payload;
        } else {
          state.errorMessage = "Failed to log in. Please try again later.";
        }
      })

      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.userData = action.payload.userData;
        state.isValid = true;
      })
      .addCase(signUp.rejected, (state) => {
        // Error handling similar to that of logIn
        state.status = "failed";
      });
  },
});

export const { logout, refreshAuthData, setLoading } = authSlice.actions;
export const pocketBaseAuthReducer = authSlice.reducer;
