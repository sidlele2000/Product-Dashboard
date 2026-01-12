import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authenticationSlice"
import orderReducer from "../slices/orderSlice"

export const store = configureStore({
  reducer: {
    orders: orderReducer, //reducer functions
    auth: authReducer,
  },
});
