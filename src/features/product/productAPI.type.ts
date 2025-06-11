export interface ProductVariant {
  id: string;
  product_id: string;
  display_label: string;
  name: string;
  description: string;
  mrp: number;
  price: number;
  image: string[];
  brand_name: string;
  out_of_stock: boolean;
  default_variant: boolean;
  min_quantity: number;
  max_quantity: number;
  total_available_quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  product_variants: ProductVariant[];
}

export interface ProductMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ProductResponse {
  data: Product[];
  meta: ProductMeta;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  q?: string;
  brand_name?: string;
  price_min?: number;
  price_max?: number;
  category_id?: string;
}
