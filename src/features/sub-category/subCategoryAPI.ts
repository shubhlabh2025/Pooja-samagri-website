import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/api/baseQueryWithAxios";
import type { SubCategoryResponse } from "./subCategoryAPI.type";

export const subCategoryAPI = createApi({
  reducerPath: "subCategoryAPI",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getSubCategories: builder.query<
      SubCategoryResponse,
      { parent_ids: string }
    >({
      query: ({ parent_ids }) => ({
        url: "/api/sub-categories",
        method: "GET",
        params: { parent_ids },
      }),
    }),
  }),
});

export const { useGetSubCategoriesQuery } = subCategoryAPI;
