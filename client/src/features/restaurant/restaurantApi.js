import { apiSlice } from "../api/apiSlice";
import {
  setRestaurants,
  restaurantLoggedIn,
  setRestaurant,
} from "./restaurantSlice";

export const restaurantApi = apiSlice.injectEndpoints({
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
    addItemToRestaurant: builder.mutation({
      query: (data) => ({
        url: "/api/auth/addfood",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["Restaurant"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //optimistic update of items
        console.log(arg);
        const pathResult = dispatch(
          apiSlice.util.updateQueryData(
            "getRestaurant",
            { email: arg.res_email },
            (draft) => {
              console.log(arg, JSON.stringify(draft));
              // const draftConversation = draft.data.find((c) => c.id == arg.id);
              // draftConversation.message = arg.data.message;
              // draftConversation.timestamp = arg.data.timestamp;
            }
          )
        );

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
    getRestaurant: builder.query({
      query: (resId) => ({
        url: `/api/auth/get_res/${resId}`,
        method: "GET",
      }),
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
  useGetRestaurantQuery,
  useAddRestaurantMutation,
  useMakeStatusTrueMutation,
  useAddItemToRestaurantMutation,
} = restaurantApi;
