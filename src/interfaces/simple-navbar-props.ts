import type { Product } from "@/features/product/productAPI.type";

export interface SimpleNavBarProps {
  navBarText: string;
}

export interface SearchBoxProps {
  products: Product[];
  query: string;
}

export interface ProductCardInSearchBoxProps {
  product: Product;
}
