import { apiSlice } from "../api/apiSlice";
import { setRestaurants, restaurantLoggedIn } from "./restaurantSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    restaurantLogin: builder.mutation({
      query: (data) => ({
        url: "/api/auth/reslogin",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              restaurant: result.data.restaurant,
            })
          );

          dispatch(
            restaurantLoggedIn({
              accessToken: result.data.accessToken,
              restaurant: result.data.restaurant,
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
    getRestaurants: builder.query({
      query: () => {
        return "/api/auth/getallres";
      },
      providesTags: ["Restaurants"],
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
    makeStatusTrue: builder.mutation({
      query: (email) => ({
        url: "/api/auth/makestatustrue",
        method: "PUT",
        body: email,
      }),
      invalidatesTags: ["Restaurants"],
    }),
  }),
});

export const {
  useRestaurantLoginMutation,
  useGetRestaurantsQuery,
  useAddRestaurantMutation,
  useMakeStatusTrueMutation,
} = authApi;
