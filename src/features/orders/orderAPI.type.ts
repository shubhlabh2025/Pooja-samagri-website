interface OrderData {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: string[]; // you can change this to a specific type if your notes array has a defined structure
  offer_id: string | null;
  receipt: string | null;
  status: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: OrderData;
}

export interface CreateOrders {
  items: OrderItems[];
  address_id: string;
}

interface OrderItems {
  quantity: number;
  product_variant_id: string;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface VerifyRazorpayPaymentResponse {
  success: boolean;
  message: string;
  data: RazorpayPaymentResponse;
}
