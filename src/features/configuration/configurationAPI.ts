import axiosBaseQuery from "@/api/baseQueryWithAxios";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ConfigurationResponse } from "./configurationResponse.type";

export const configurationAPI = createApi({
  reducerPath: "configurationAPI",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAppConfigurations: builder.query<ConfigurationResponse, void>({
      query: () => ({
        url: `/api/configurations/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAppConfigurationsQuery } = configurationAPI;
