import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "../service/orderService";

const initialState = {
  orders: [], // Object of items in the cart, keyed by item ID
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItemToOrder(state, action) {
      state.orders.push(action.payload.order);
    },
  },
});

export const { addItemToOrder } = orderSlice.actions;

export const fillOrderFromFetch = (token) => async (dispatch) => {
  try {
    const data = await fetchOrder({ token });
    dispatch(fillOrder({ orders: data.orders }));
  } catch (e) {
    console.log("Error in fillOrderFromFetch", e.message);
  }
};
export const orderRecord = (state) => state.order.orders;
export default orderSlice.reducer;
