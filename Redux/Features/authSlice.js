"use Client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userFormData, { rejectWithValue }) => {
    try {
      const response = await signIn("credentials", {
        email: userFormData.email,
        password: userFormData.password,
        redirect: false, // Set redirect to false to handle redirection manually
      });
      console.log("Full response:", response);
      console.log("Error details:", response?.error);

      if (response.error) {
        throw new Error(response.error);
      }
      //if signSucessfull you can return user data
      const userData = response?.data;

      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      // Use rejectWithValue to provide error details to the rejection action
      return rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { username, email } = action.payload;
      state.isLoggedIn = true;
      state.username = username;
      state.email = email;
      state.user = { username, email };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.error("Login failed:", action.payload);
    });
  },
});

export const { SET_LOGIN, SET_LOGOUT, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.username;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
