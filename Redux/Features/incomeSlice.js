import incomeServices from "@/services/incomeServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchIncome = createAsyncThunk(
  "income/fetchIncome",
  async (data, thunkAPI) => {
    console.log(" from income slice", data);
    try {
      const response = await incomeServices.createIncome(data);
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
        error: "Failed to add income",
        details: error.response?.data,
      });
    }
  }
);

export const fetchAllIncome = createAsyncThunk(
  "income/fetchAllIncome",
  async (_, thunkAPI) => {
    try {
      const response = await incomeServices.getAllIncomes();

      return response;
    } catch (error) {
      const message =
        (error.response && error.response && error.response.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue({
        error: "Failed to add income",
        details: error.response,
      });
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    income: [],
    incomes: [],
    status: "idle",
    amount: 0,
    totalIncomeValue: 0,
    error: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    CALCULATE_TOTAL_INCOMES: (state, action) => {
      const incomes = action.payload;

      if (incomes && incomes) {
        state.totalIncomeValue = incomes.reduce(
          (total, income) => total + parseFloat(income.amount),
          0
        );
      } else {
        state.totalIncomeValue = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.incomes = action.payload;
      })
      .addCase(fetchIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchAllIncome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.incomes = action.payload;
      })
      .addCase(fetchAllIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setUserId, CALCULATE_TOTAL_INCOMES } = incomeSlice.actions;

export default incomeSlice.reducer;
