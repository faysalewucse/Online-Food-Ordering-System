import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  restaurant: undefined,
  restaurants: undefined,
};

const authSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    restaurantLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.restaurant = action.payload.restaurant;
    },
    restaurantLoggedOut: (state) => {
      state.accessToken = undefined;
      state.restaurant = undefined;
    },
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

export const {
  restaurantLoggedIn,
  restaurantLoggedOut,
  setRestaurants,
  setRestaurantStatusTrue,
} = authSlice.actions;
export default authSlice.reducer;
