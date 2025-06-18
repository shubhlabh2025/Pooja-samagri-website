import type { UserAddressPayload } from "@/features/address/addressAPI.type";
import type { Product, ProductVariant } from "@/features/product/productAPI.type";

export interface TriggerProductVariantBottomSheetProps {
  product: Product;
}

export interface TriggerAddressBottomSheetProps {
  addresses: UserAddressPayload[];
}




export interface AddToCartCounterProps {
  productVariant: ProductVariant;
}
