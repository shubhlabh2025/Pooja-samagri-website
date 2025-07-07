import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryWithReauth } from "@/api/baseQueryWithReauth";
import type {
  CreateOrders,
  OrderResponse,
  RazorpayPaymentResponse,
  VerifyRazorpayPaymentResponse,
} from "./orderAPI.type";

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
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
        url: `/api/orders/verify-payment`,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useVerifyPaymentMutation } = orderAPI;
