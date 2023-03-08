import { apiSlice } from "../api/apiSlice";
import { setRestaurants } from "./restaurantSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: () => {
        return "/api/auth/getallres";
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setRestaurants({
              restaurants: result.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    addRestaurant: builder.mutation({
      query: (data) => ({
        url: "/api/auth/resregister",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {
        console.log(await queryFulfilled);
      },
    }),
  }),
});

export const { useGetRestaurantsQuery, useAddRestaurantMutation } = authApi;
