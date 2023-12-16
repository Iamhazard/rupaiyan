import incomeServices from "@/services/incomeServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExpenseByUSer = createAsyncThunk(
  "expense/fetchExpenseByUSer",
  async (_, thunkAPI) => {
    try {
      const response = await incomeServices.getExpenseById();

      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue({
        error: "Failed to get  expenses by user",
        details: error.response?.data,
      });
    }
  }
);

//for getting  income by user

export const fetchIncomesByUser = createAsyncThunk(
  "expense/fetchIncomesByUser",
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    incomes: [],
    expenses: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseByUSer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenseByUSer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses = action.payload;
      })
      .addCase(fetchExpenseByUSer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(fetchIncomesByUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchIncomesByUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.expenses = action.payload;
      // console.log("Action Payload:", action.payload);
    });
    builder.addCase(fetchIncomesByUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const {} = userSlice.actions;

export default userSlice.reducer;
