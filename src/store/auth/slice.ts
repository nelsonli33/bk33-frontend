import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
