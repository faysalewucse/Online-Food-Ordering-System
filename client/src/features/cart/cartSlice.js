import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.cartItems = action.payload;
    },
    removeFromCart: (state, action) => {},
  },
});

export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
