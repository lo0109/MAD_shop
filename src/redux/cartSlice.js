import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "../service/cartService";

const initialState = {
  items: [],
  // Array of items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      state.items.push(item); // Add the item to the array
    },
    removeItem(state, action) {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id); // Remove the item by filtering the array
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.qty = quantity; // Update the quantity of the item
      }
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.qty += 1; // Increase the quantity of the item
      }
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.qty > 1) {
        item.qty -= 1; // Decrease the quantity of the item
      }
    },
    fillCart(state, action) {
      const { items } = action.payload;
      state.items = items; // Replace the entire array of items
    },
    clearCart(state) {
      state.items = []; // Clear the array of items
    },
  },
});

export const {
  addItemToCart,
  removeItem,
  updateItemQuantity,
  decreaseQuantity,
  increaseQuantity,
  fillCart,
  clearCart,
} = cartSlice.actions;

export const cartItems = (state) => state.cart.items;

export const totalCart = (state) => {
  return state.cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);
};

export const totalQty = (state) => {
  return state.cart.items.reduce((acc, item) => acc + item.qty, 0);
};

export const fillCartFromFetch = (token) => async (dispatch) => {
  try {
    const data = await fetchCart({ token });
    dispatch(fillCart({ items: data.items }));
  } catch (e) {
    console.log("Error in fillCartFromFetch", e.message);
  }
};

export default cartSlice.reducer;
