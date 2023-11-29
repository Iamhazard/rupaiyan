"use Client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

if (typeof window !== "undefined") {
  // Check if running on the client side
  const name = JSON.parse(localStorage.getItem("name"));
  initialState.name = name ? name : "";
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //for saving data
    SET_USER: (state, action) => {
      state.user.name = action.name;
      state.isLoggedIn = !!action.payload;
    },
  },
});

export const { SET_USER } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
