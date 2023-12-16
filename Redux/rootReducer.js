import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import incomeReducer from "./Features/incomeSlice";
import expenseReducer from "./Features/expenseSlice";
import filterReducer from "./Features/filterSlice";
import userReducer from "./Features/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  income: incomeReducer,
  expense: expenseReducer,
  filter: filterReducer,
  user: userReducer,
});
export default rootReducer;
