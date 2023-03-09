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
    setRestaurantStatusTrue: (state, action) => {
      state.restaurants = state.restaurants.map((restaurant) => {
        console.log(JSON.stringify(restaurant));
        if (restaurant.res_email === action.payload.email) {
          return [...restaurant, (restaurant.status = true)];
        } else return restaurant;
      });
    },
  },
});

export const { setRestaurants, setRestaurantStatusTrue } = authSlice.actions;
export default authSlice.reducer;
