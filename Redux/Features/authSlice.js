"use Client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "",
  username: "",
  user: {
    username: "",
    email: "",
  },
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
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_LOGOUT(state) {
      state.isLoggedIn = false;
      state.username = "";
      state.email = "";
      state.user = { username: "", email: "" }; //reset user
    }, //for saving data
    SET_USER(state, action) {
      const { username, email } = action.payload || {};
      state.user = { username, email };
    },
  },
});

export const { SET_LOGIN, SET_LOGOUT, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.username;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
