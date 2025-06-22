import type { Coupon } from "@/features/coupon/couponAPI.type";

export interface CouponsProps {
  couponsData: Coupon[];
  itemsTotal: number;
  discount: number;
  handleCouponChange: (coupon: Coupon | null) => void;
  selectedCoupon: Coupon | null;
}
