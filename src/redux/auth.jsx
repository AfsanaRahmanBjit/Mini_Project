import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
    userID: null,
    error: null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },

    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setToken, setRole, setUserID, setError, clearError } =
  authSlice.actions;

export default authSlice.reducer;
