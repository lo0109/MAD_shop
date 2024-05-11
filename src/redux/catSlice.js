// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCat } from "../service/fetchAPI";
// Define an initial state
const initialState = {
  categoryData: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

// Create an asynchronous thunk action
export const loadCatData = createAsyncThunk(
  "loadCategory",
  async (_, thunkAPI) => {
    const category = thunkAPI.getState().category?.categoryData;
    console.log("loadingCategoryAPI", category.length);
    if (category.length) return category;
    try {
      const ret = await fetchCat();
      return ret;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCatData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCatData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categoryData = action.payload;
      })
      .addCase(loadCatData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const showCategory = (state) => state.category;
export default categorySlice.reducer;
export const { setSelectedCategory } = categorySlice.actions;
