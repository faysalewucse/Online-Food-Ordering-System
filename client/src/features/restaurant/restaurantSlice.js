import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: undefined,
};

const authSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload.restaurants;
    },
  },
});

export const { setRestaurants } = authSlice.actions;
export default authSlice.reducer;
