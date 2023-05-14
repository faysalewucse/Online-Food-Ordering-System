import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
