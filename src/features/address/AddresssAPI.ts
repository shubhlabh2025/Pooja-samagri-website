import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  AddressPredictionResponse,
  CreateUserAddressPayload,
  CurrentAddressResponse,
  GetAddressParams,
  UserAddressListResponse,
  UserAddressResponse,
} from "./addressAPI.type";
import { axiosBaseQueryWithReauth } from "@/api/baseQueryWithReauth";

export const addressAPI = createApi({
  reducerPath: "addressAPI",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    getAddressSuggestions: builder.query<AddressPredictionResponse, string>({
      query: (search: string) => ({
        url: `/api/address`,
        method: "GET",
        params: {
          search, // automatically becomes ?search=Sultanwind road
        },
      }),
    }),
    getCurrentAddress: builder.query<CurrentAddressResponse, GetAddressParams>({
      query: ({ lat, lng }) => ({
        url: `/api/address/current-location`,
        method: "GET",
        params: {
          lat,
          lng,
          // automatically becomes ?search=Sultanwind road
        },
      }),
    }),

    getUserAddressList: builder.query<UserAddressListResponse, void>({
      query: () => ({
        url: `/api/address/user`,
        method: "GET",
      }),
    }),



        addUserAddress: builder.mutation<UserAddressResponse, CreateUserAddressPayload>({
          query: (body) => ({
            url: "/api/address/user",
            method: "POST",
            data: body,
          }),
    
          // async onQueryStarted(_body, { dispatch, queryFulfilled }) {
          //   try {
          //     const { data: response } = await queryFulfilled;
    
          //     dispatch(
          //       cartAPI.util.updateQueryData("getCartItems", undefined, (draft) => {
          //         draft.data.push(response.data);
          //       }),
          //     );
          //   } catch {
          //     // Handle error if needed
          //   }
          // },
        }),
  }),
});

export const {
  useGetAddressSuggestionsQuery,
  useGetCurrentAddressQuery,
  useGetUserAddressListQuery,
  useAddUserAddressMutation,
} = addressAPI;
