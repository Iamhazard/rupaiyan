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

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    data: [],
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
      .addCase(fetchIncome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setUserId } = incomeSlice.actions;

export default incomeSlice.reducer;
