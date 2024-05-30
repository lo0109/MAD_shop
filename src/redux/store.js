import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./catSlice";
import cartReducer from "./cartSlice";
import loginReducer from "./loginSlice";
import orderReducer from "./orderSlice";
export default configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    login: loginReducer,
    order: orderReducer,
  },
});
