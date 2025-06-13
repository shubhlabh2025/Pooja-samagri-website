import axiosBaseQuery from "@/api/baseQueryWithAxios";
import type { ConfigurationModel } from "@/interfaces/configuration";
import { createApi } from "@reduxjs/toolkit/query/react";

export const configurationAPI = createApi({
  reducerPath: "configurationAPI",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({


    getAppConfigurations: builder.query<ConfigurationModel, void>({
      query: () => ({
        url: `/api/configurations/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAppConfigurationsQuery } = configurationAPI;
