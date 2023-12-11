import incomeServices from "@/services/incomeServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async (data, thunkAPI) => {
    console.log(" from expense slice", data);
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
      const response = await incomeServices.getExpenses();
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
        error: "Failed to get all expenses",
        details: error.response?.data,
      });
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expense: null,
    expenses: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
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
    });
    builder.addCase(fetchExpenses.rejected, (state) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const { setUserId } = expenseSlice.actions;

export default expenseSlice.reducer;
