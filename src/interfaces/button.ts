import type { Product, ProductVariant } from "@/features/product/productAPI.type";

export interface TriggerProductVariantBottomSheetProps {
  product: Product;
}

export interface AddToCartCounterProps {
  productVariant: ProductVariant;
}
