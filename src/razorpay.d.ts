import type { RazorpayPaymentResponse } from "./features/orders/orderAPI.type";

interface RazorpayInstance {
  open(): void;
  close(): void;
  on(event: string, handler: (response: RazorpayPaymentResponse) => void): void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

// This export is needed to make the file a module
export {};
