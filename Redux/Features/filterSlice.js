import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    initialFilter: "daily",
  },
  reducers: {
    CHANGE_FILTER: (state, action) => {
      state.initialFilter = action.payload;
    },
  },
});

export const { CHANGE_FILTER } = filterSlice.actions;
export const selectinitialFilter = (state) => state.filter.initialFilter;
export default filterSlice.reducer;
