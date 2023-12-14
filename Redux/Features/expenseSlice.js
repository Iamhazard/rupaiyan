import incomeServices from "@/services/incomeServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async (data, thunkAPI) => {
    try {
      const response = await incomeServices.createExpense(data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue({
        error: "Failed to add expenses",
        details: error.response?.data,
      });
    }
  }
);

//for getting all expenses

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (_, thunkAPI) => {
    try {
      const response = await incomeServices.getAllExpenses();
      // console.log("API response:", response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      console.log(error);
      return thunkAPI.rejectWithValue({
        error: "Failed to get all expenses",
        details: error.response?.data,
      });
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expense: [],
    expenses: [],
    status: "idle",
    amounts: 0,
    totalExpensesValue: 0,
    error: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      // console.log(state.userId);
    },
    CALCULATE_TOTAL_EXPENSES: (state, action) => {
      const expenses = action.payload;

      if (expenses && expenses) {
        state.totalExpensesValue = expenses.reduce(
          (total, expense) => total + parseFloat(expense.amount),
          0
        );
      } else {
        state.totalExpensesValue = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses = action.payload;
      })
      .addCase(fetchExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(fetchExpenses.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.expenses = action.payload;
      // console.log("Action Payload:", action.payload);
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const { setUserId, CALCULATE_TOTAL_EXPENSES } = expenseSlice.actions;

export default expenseSlice.reducer;
