import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import incomeReducer from "./Features/incomeSlice";
import expenseReducer from "./Features/expenseSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  income: incomeReducer,
  expense: expenseReducer,
});
export default rootReducer;
