import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryWithReauth } from "@/api/baseQueryWithReauth";
import type {
  CreateOrders,
  getOrdersParams,
  getOrdersResponse,
  OrderByIdResponse,
  orderPageParam,
  OrderResponse,
  RazorpayPaymentResponse,
  VerifyRazorpayPaymentResponse,
} from "./orderAPI.type";

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    getOrders: builder.infiniteQuery<
      getOrdersResponse,
      getOrdersParams,
      orderPageParam
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
        url: "/api/orders",
        method: "GET",
        params: {
          page: pageParam,
          limit: queryArg.limit || 30,
        },
      }),
    }),

    getOrderById: builder.query<OrderByIdResponse, string>({
      query: (id: string) => ({
        url: `api/orders/${id}`,
        method: "GET",
      }),
    }),

    createOrder: builder.mutation<OrderResponse, CreateOrders>({
      query: (body) => ({
        url: `/api/orders/`,
        method: "POST",
        data: body,
      }),
    }),

    verifyPayment: builder.mutation<
      VerifyRazorpayPaymentResponse,
      RazorpayPaymentResponse
    >({
      query: (body) => ({
        url: `/api/orders/payment-verification`,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetOrdersInfiniteQuery,
} = orderAPI;
