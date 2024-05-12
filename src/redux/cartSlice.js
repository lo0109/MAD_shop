import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
  items: {}, // Object of items in the cart, keyed by item ID
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const { id, item } = action.payload;
      state.items[id] = item; // Assign the item to the state by its ID
    },
    removeItem(state, action) {
      const { id } = action.payload;
      delete state.items[id];
    },

    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        state.items[id].qty = quantity; // Update the quantity of the item
      }
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      if (state.items[id]) {
        state.items[id].qty += 1; // Increase the quantity of the item
      }
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      if (state.items[id] && state.items[id].qty > 1) {
        state.items[id].qty -= 1; // Decrease the quantity of the item
      }
    },
  },
});

export const {
  addItemToCart,
  removeItem,
  updateItemQuantity,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
