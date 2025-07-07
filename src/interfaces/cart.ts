import type { UserAddressPayload } from "@/features/address/addressAPI.type";
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

export interface CurrentlyUnavailableProps {
  cartData: CartItem[];
  handleRemoveItem: (productVariantId: string) => void;
}

export interface AddressCardProps {
  selectedAddress: UserAddressPayload | undefined | null;
  handleAdressDrawerOpen: () => void;
}
