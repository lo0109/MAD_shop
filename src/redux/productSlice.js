// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduct } from "../service/fetchAPI";
// Define an initial state
const initialState = {
  productData: [],
  loading: false,
  error: null,
};

// Create an asynchronous thunk action
export const loadProductData = createAsyncThunk(
  "loadProduct",
  async (_, thunkAPI) => {
    const product = thunkAPI.getState().product?.productData;
    console.log("loadingProductAPI", product.length);
    if (product.length) return product;
    try {
      const ret = await fetchProduct();
      return ret;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productData = action.payload;
      })
      .addCase(loadProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const showProduct = (state) => state.product;
export default productSlice.reducer;
