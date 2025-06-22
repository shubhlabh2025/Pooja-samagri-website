import type { CartItem } from "@/features/cart/cartAPI.type";
import type { Coupon } from "@/features/coupon/couponAPI.type";

export interface ReviewOrderProps {
  cartData: CartItem[];
}

export interface BillDetailProps {
  itemsTotal: number;
  discount: number;
  selectedCoupon: Coupon | null;
}
