import incomeServices from "@/services/incomeServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async (data, thunkAPI) => {
    try {
      const response = await incomeServices.createExpense(data);
      const parsedData = JSON.parse(response.data);
      return parsedData;
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

//for getting all expenses of users

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (userId, thunkAPI) => {
    try {
      const response = await incomeServices.getExpensesByUserId(userId);

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
//for deleteing data
export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id, thunkAPI) => {
    console.log("slice", id);
    try {
      return await incomeServices.deleteExpenseById(id);
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
        error: "Failed to delele a expenses",
        details: error.response?.data,
      });
    }
  }
);

//for getting expense
export const getExpense = createAsyncThunk(
  "expense/getExpense",
  async (id, thunkAPI) => {
    try {
      const expense = await incomeServices.getExpenseById(id);

      return expense;
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
    expenses: {},
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
      if (Array.isArray(expenses) && expenses.length > 0) {
        state.totalExpensesValue = expenses.reduce((total, expense) => {
          const amount = parseFloat(expense.amount);

          return total + amount;
        }, 0);
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
        console.error("Error fetching expenses:", action.error.message);
        console.error(action.error.details);
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
    builder.addCase(deleteExpense.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteExpense.fulfilled, (action, state) => {
      state.status = "succeeded";
    });
    builder.addCase(deleteExpense.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      console.log(action.error.message);
    });
    builder.addCase(getExpense.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getExpense.fulfilled, (action, state) => {
      state.status = "succeeded";
      state.expense = action.payload;
    });
    builder.addCase(getExpense.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      console.log(action.error.message);
    });
  },
});
export const { setUserId, CALCULATE_TOTAL_EXPENSES } = expenseSlice.actions;
export const selectExpenses = (state) => state.expense.expenses;
export default expenseSlice.reducer;
