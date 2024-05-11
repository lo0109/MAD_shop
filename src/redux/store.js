import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./catSlice";
export default configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
  },
});
