import axiosBaseQuery from "@/api/baseQueryWithAxios";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { AddressPredictionResponse, CurrentAddressResponse, GetAddressParams } from "./addressAPI.type";

export const addressAPI = createApi({
  reducerPath: "addressAPI",
  baseQuery: axiosBaseQuery(),
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
      query: ({lat,lng}) => ({
        url: `/api/address/current-location`,
        method: "GET",
        params: {
          lat,
          lng
          // automatically becomes ?search=Sultanwind road
        },
      }),
    }),

  }),
});

export const { useGetAddressSuggestionsQuery, useGetCurrentAddressQuery } = addressAPI;
