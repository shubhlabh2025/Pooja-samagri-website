import axiosBaseQuery from "@/api/baseQueryWithAxios";
import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  CategoryResponse,
  GetCategoriesParams,
  GetCategoryByIdResponse,
} from "./categoryAPI.type";

export const categoryAPI = createApi({
  reducerPath: "categoryAPI",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResponse, GetCategoriesParams>({
      query: ({
        page = 1,
        limit = 30,
        q,
        sort_by,
        sort_order,
      }: GetCategoriesParams) => ({
        url: "/api/categories",
        method: "GET",
        params: {
          page,
          limit,
          ...(q ? { q } : {}),
          ...(sort_by ? { sort_by } : {}),
          ...(sort_order ? { sort_order } : {}),
        },
      }),
    }),

    getInfiniteCategories: builder.infiniteQuery<
      CategoryResponse,
      GetCategoriesParams,
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          if (lastPage.meta.currentPage >= lastPage.meta.totalPages) {
            return undefined;
          }
          return lastPageParam + 1;
        },
      },
      query: ({ queryArg, pageParam }) => ({
        url: "/api/categories",
        method: "GET",
        params: {
          page: pageParam,
          limit: queryArg.limit || 30,
          ...(queryArg.q ? { q: queryArg.q } : {}),
          ...(queryArg.sort_by ? { sort_by: queryArg.sort_by } : {}),
          ...(queryArg.sort_order ? { sort_order: queryArg.sort_order } : {}),
        },
      }),
    }),

    getCategoryById: builder.query<GetCategoryByIdResponse, string>({
      query: (id: string) => ({
        url: `/api/categories/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetInfiniteCategoriesInfiniteQuery,
  useGetCategoryByIdQuery,
} = categoryAPI;
