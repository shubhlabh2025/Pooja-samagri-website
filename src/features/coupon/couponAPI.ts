import { axiosBaseQueryWithReauth } from "@/api/baseQueryWithReauth";
import type { CouponResponse } from "./couponAPI.type";
import { createApi } from "@reduxjs/toolkit/query/react";

export const couponAPI = createApi({
  reducerPath: "couponAPI",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    getCoupons: builder.query<CouponResponse, void>({
      query: () => ({
        url: "/api/coupons",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCouponsQuery } = couponAPI;
