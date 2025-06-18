import type { CartItem } from "@/features/cart/cartAPI.type";

export interface ReviewOrderProps {
  cartData: CartItem[];
}

export interface BillDetailProps {
  cartData: CartItem[];
}
