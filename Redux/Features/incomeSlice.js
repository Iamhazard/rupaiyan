import incomeServices from "@/services/incomeServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  income: null,
  incomes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addIncomeAsync = createAsyncThunk(
  "incomes/addIncome",
  async (formData, thunkAPI) => {
    try {
      return await incomeServices.createIncome(formData);
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

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addIncomeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addIncomeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        console.log(action.payload);

        state.incomes.push(action.payload);
      })
      .addCase(addIncomeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
        alert("error while adding Income");
        console.error("Error while adding Income:", action);
      });
  },
});

export default incomeSlice.reducer;
