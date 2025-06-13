import type { Product } from "@/features/product/productAPI.type";

export interface ProductSectionProps {
  productData: Product[];
  totalProuducts: number;
  isFetching: boolean;
  onLoadMore: () => void;
  isLoadingMore?: boolean;
}
