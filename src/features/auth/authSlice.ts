import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ access_token: string }>,
    ) => {
      state.accessToken = action.payload.access_token;
      localStorage.setItem("accessToken", action.payload.access_token);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
