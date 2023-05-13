import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: (data) => ({
        url: "/api/auth/addtocart",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          //   dispatch(
          //     addCartItem({
          //       cartItems: result.cartItems,
          //     })
          //   );
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateCartItem: builder.mutation({
      query: (data) => ({
        url: "/api/auth/addfood",
        method: "POST",
        body: data,
      }),
    }),
    addCartItem: builder.mutation({
      query: (data) => ({
        url: "/api/auth/addtocart",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          //   dispatch(
          //     restaurantLoggedIn({
          //       accessToken: result.data.accessToken,
          //       restaurant: result.data.restaurant,
          //     })
          //   );
        } catch (err) {
          // do nothing
        }
      },
    }),
    removeCartItem: builder.mutation({
      query: (data) => ({
        url: "/api/auth/addfood",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["Restaurant"],
    }),
  }),
});

export const { useAddCartItemMutation } = cartApi;
