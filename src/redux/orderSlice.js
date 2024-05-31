import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder, updateOrder } from "../service/orderService";
import { Alert } from "react-native";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItemToOrder(state, action) {
      state.orders.push(JSON.parse(action.payload));
    },
    fillOrder(state, action) {
      state.orders = action.payload.orders || [];
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
      if (order) {
        order.is_delivered = 1;
      }
    },
  },
});

export const { addItemToOrder, fillOrder, payOrder, receiveOrder } =
  orderSlice.actions;

export const orderRecord = (state) => state.order.orders;
export const fillOrderFromFetch = (token) => async (dispatch) => {
  try {
    const data = await fetchOrder({ token });
    dispatch(fillOrder({ orders: data.orders }));
  } catch (e) {
    console.log("Error in fillOrderFromFetch", e.message);
  }
};

export const payOrderToSever =
  ({ token, id }) =>
  async (dispatch) => {
    try {
      dispatch(payOrder(id));
      try {
        const data = await updateOrder({
          token,
          orderID: id,
          isPaid: 1,
          isDelivered: 0,
        });
        if (data.status === "OK") {
          Alert.alert("Pay successfully.");
        } else {
          Alert.alert("payment failed.", data.message);
        }
      } catch (e) {
        Alert.alert("payment failed", e.message);
      }
    } catch (e) {
      console.log("Error in payOrderToSever", e.message);
    }
  };

export const recOrderToSever =
  ({ token, id }) =>
  async (dispatch) => {
    try {
      dispatch(receiveOrder(id));
      try {
        const data = await updateOrder({
          token,
          orderID: id,
          isPaid: 1,
          isDelivered: 1,
        });
        if (data.status === "OK") {
          Alert.alert("Received successfully.");
        } else {
          Alert.alert("Received failed.", data.message);
        }
      } catch (e) {
        Alert.alert("Received failed", e.message);
      }
    } catch (e) {
      console.log("Error in payOrderToSever", e.message);
    }
  };

export default orderSlice.reducer;
