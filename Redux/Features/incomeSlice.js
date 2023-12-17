import incomeServices from "@/services/incomeServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchIncome = createAsyncThunk(
  "income/fetchIncome",
  async (data, thunkAPI) => {
    try {
      const response = await incomeServices.createIncome(data);
      if (!response || !response.Incomes || !Array.isArray(response.Incomes)) {
        throw new Error("Invalid response format");
      }
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
        error: "Failed to add income",
        details: error.response?.data,
      });
    }
  }
);

//fetch incomes of User

export const fetchAllIncome = createAsyncThunk(
  "income/fetchAllIncome",
  async (userId, thunkAPI) => {
    try {
      const response = await incomeServices.getIncomesByUserId(userId);

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

      if (Array.isArray(incomes) && incomes.length > 0) {
        state.totalIncomeValue = incomes.reduce((total, income) => {
          const amount = parseFloat(income.amount);

          return total + amount;
        }, 0);
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
export const selectIncome = (state) => state.income.incomes;
export default incomeSlice.reducer;
