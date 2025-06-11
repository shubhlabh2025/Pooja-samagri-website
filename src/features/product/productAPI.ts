import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/api/baseQueryWithAxios";
import type { GetProductsParams, ProductResponse } from "./productAPI.type";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, GetProductsParams>({
      query: ({
        page = 1,
        limit = 30,
        q,
        brand_name,
        price_min,
        price_max,
        category_id,
      }) => ({
        url: "/api/products",
        method: "GET",
        params: {
          page,
          limit,
          ...(category_id ? { category_id } : {}),
          ...(q ? { q } : {}),
          ...(brand_name ? { brand_name } : {}),
          ...(price_min ? { price_min } : {}),
          ...(price_max ? { price_max } : {}),
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productAPI;
