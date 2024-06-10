import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../config";

// Async thunk action creator
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/reviews/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ rating, comment, productId, userId }, { dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}/reviews`, {
        rating,
        comment,
        productId,
        userId,
      });
      return response.data; // Return the newly added review data
    } catch (error) {
      throw error; // Throw error to be handled by Redux Toolkit
    }
  }
);

// Reducer slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    reviews: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = null;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = [...state.reviews, { ...action.payload }];
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default reviewsSlice.reducer;
