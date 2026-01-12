import { createSlice } from "@reduxjs/toolkit";
const generateOrderId = () => `${Date.now()}`;
const initialState = {
  orders: [],
};
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const { items, status = "Pending" } = action.payload;
      const totalPrice = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );

      const newOrder = {
        id: generateOrderId(),
        items,
        totalPrice,
        createdAt: new Date().toISOString(),
        status,
      };

      state.orders.push(newOrder);
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) order.status = status;
    },

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
  },
});

export const { createOrder, updateOrderStatus, deleteOrder } =
  ordersSlice.actions;

export default ordersSlice.reducer;
