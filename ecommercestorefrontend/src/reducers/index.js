// reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import singleProductReducer from './singleProductReducer';
import reviewsReducer from './reviewsReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  user: userReducer,
  product: singleProductReducer,
  reviews: reviewsReducer,
  cart: cartReducer,
  orders: orderReducer
});
// Dev Pulse Studio
export default rootReducer;
