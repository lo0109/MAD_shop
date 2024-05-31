import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "../service/orderService";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItemToOrder(state, action) {
      state.orders.push(action.payload);
    },
    fillOrder(state, action) {
      state.orders = action.payload.orders;
    },
    payOrder(state, action) {
      const id = action.payload;
      const order = state.orders.find((order) => order.id === id);
      if (order) {
        order.is_paid = 1;
      }
    },
    receiveOrder(state, action) {
      const id = action.payload;
      const order = state.orders.find((order) => order.id === id);
      console.log(id, "inside slice", order);

      if (order) {
        order.is_delivered = 1;
      }
    },
  },
});

export const { addItemToOrder, fillOrder, payOrder, receiveOrder } =
  orderSlice.actions;

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
