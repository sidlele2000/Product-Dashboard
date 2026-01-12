import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  role: null,
};
const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
