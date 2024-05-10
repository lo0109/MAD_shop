// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCat } from "../service/fetchAPI";
// Define an initial state
const initialState = {
  categoryData: {},
  loading: false,
  error: null,
};

// Create an asynchronous thunk action
export const loadCatData = createAsyncThunk(
  "loadCategory",
  async (thunkAPI) => {
    const category = thunkAPI.getState().category?.categoryData.category;
    if (category) return { category: category };
    try {
      const ret = await fetchCat();
      return { category: ret };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCatData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCatData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { category } = action.payload;
        //why need to check again?
        if (!state.categoryData.category) state.categoryData = category;
      })
      .addCase(loadCatData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.categoryData = {};
      });
  },
});
export const selectCategory = (state) => state.category;
export default categorySlice.reducer;
