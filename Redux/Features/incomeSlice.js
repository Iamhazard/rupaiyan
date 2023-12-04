import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  income: null,
  incomes: [],
  isError: false,
  isSucess: false,
  isLoading: false,
  message: "",
  category: [],
};

export const addIncomeAsync = createAsyncThunk(
  "incoem/addIncome",
  async (incomeData, thunkAPI) => {
    try {
      const response = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "Failed to add expense" });
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
        state.status = "loading";
      })
      .addCase(addIncomeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        (state.isSucess = false), (state.isError = false);
        console.log(action.payload);
        state.incomes.push(action.payload.data);
      })
      .addCase(addIncomeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        alert("error");
      });
  },
});

export default incomeSlice.reducer;
