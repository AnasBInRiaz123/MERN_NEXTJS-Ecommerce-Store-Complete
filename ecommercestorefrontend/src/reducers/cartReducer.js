import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../config";

// Define the initial state
const initialState = {
  cart: [], // Ensure cart is initialized as an empty array
  loading: false,
  error: null,
};
// Dev Pulse Studio
// Fetch cart data from an API asynchronously using Axios
export const fetchCartItem = createAsyncThunk(
  "cart/fetchCartItem",
  async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/carts/user/${userId}`); // Modify this URL according to your API endpoint
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch cart data");
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "carts/addItemToCart",
  async ({ productId, userId, cartQuantity }) => {
    try {
      const response = await axios.post(`${baseUrl}/carts`, {
        productId,
        userId,
        cartQuantity,
      });
      return response.data; // Return the newly added review data
    } catch (error) {
      throw error; // Throw error to be handled by Redux Toolkit
    }
  }
);

// Delete item from cart asynchronously
export const deleteCartItem = createAsyncThunk(
  "carts/deleteCartItem",
  async (cartId) => {
    try {
      await axios.delete(`${baseUrl}/carts/${cartId}`);
      return cartId;
    } catch (error) {
      throw error;
    }
  }
);

// Delete all cart items for a given userId asynchronously
export const deleteAllCartsByUserId = createAsyncThunk(
  "cart/deleteAllCartsByUserId",
  async (userId) => {
    try {
      const response = await axios.delete(`${baseUrl}/carts/user/${userId}`);
      return response.data.deletedCount;
    } catch (error) {
      throw error;
    }
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCartItem.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCartItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.cart = payload;
      state.error = null;
    })
    .addCase(fetchCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [...state.cart, { ...action.payload }];
        state.error = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the deleted cart item from the state
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteAllCartsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllCartsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        // Remove all cart items for the given userId from the state
        state.cart = state.cart.filter((item) => item.userId !== action.payload);
        state.error = null;
      })
  
  },
});

export default cartSlice.reducer;
