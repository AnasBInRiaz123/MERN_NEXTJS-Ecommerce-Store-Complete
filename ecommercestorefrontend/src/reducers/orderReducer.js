import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../config";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrderByUserId = createAsyncThunk(
  "orders/fetchOrderByUserId",
  async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch Order data");
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ userId, products, totalAmount, shippingAddress, shippingAddressGoogleMap, contactNumber }) => {
    try {
      const response = await axios.post(`${baseUrl}/orders`, {
        userId, products, totalAmount, shippingAddress,shippingAddressGoogleMap, contactNumber
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/orders`);
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch Order data");
    }
  }
);


export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ orderId, status }) => { // Make sure to receive status as a parameter
    try {
      const response = await axios.put(`${baseUrl}/orders/${orderId}`, { status }); // Send status in the request body
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);




const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByUserId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload;
        state.error = null;
      })
      .addCase(fetchOrderByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = [...state.orders, { ...action.payload }];
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.error;
      })
      builder
  .addCase(fetchAllOrders.pending, (state) => {
    state.loading = true;
  })
  .addCase(fetchAllOrders.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.orders = payload;
    state.error = null;
  })
  .addCase(fetchAllOrders.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  })

      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrderIndex = state.orders.findIndex(order => order._id === action.payload._id);
        if (updatedOrderIndex !== -1) {
          state.orders[updatedOrderIndex] = action.payload;
        }
        state.error = null;
      })      
      .addCase(updateOrder.rejected, (state, action) => {
        state.error = action.error;
      })
 
  },
});

export default orderSlice.reducer;
