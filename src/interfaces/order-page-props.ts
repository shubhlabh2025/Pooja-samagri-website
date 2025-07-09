import type { AllOrderDetail } from "@/features/orders/orderAPI.type";

export interface OrderDetailMainCardProps {
  orderDetails: AllOrderDetail;
}

export interface DelhiveryDetailCardProps {
  orderAddress: AllOrderDetail["order_address"];
}
