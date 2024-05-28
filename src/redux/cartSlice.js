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
    fillCart(state, action) {
      const { items } = action.payload;
      state.items = [...items];
    },
    clearCart(state) {
      state.items = {};
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
export const cartItem = (state) => state.cart.items;
export const fillCartFromFetch = (token) => async (dispatch) => {
  try {
    const data = await fetchCart({ token });
    dispatch(fillCart({ items: data.items }));
  } catch (e) {
    console.log("Error in fillCartFromFetch", e.message);
  }
};
export const totalCart = (state) => {
  const items = Object.values(state.cart.items);
  return items.reduce((acc, item) => acc + item.price * item.qty, 0);
};
export const totalQty = (state) => {
  const items = Object.values(state.cart.items);
  return items.reduce((acc, item) => acc + item.qty, 0);
};
export default cartSlice.reducer;
