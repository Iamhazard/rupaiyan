"use client";

import authReducer from "./Features/authSlice";
import incomeReducer from "./Features/incomeSlice";
import expenseReducer from "./Features/expenseSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    income: incomeReducer,
    expense: expenseReducer,
  },
});
