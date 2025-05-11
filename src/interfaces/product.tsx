import type { Category } from "./category";
import type { ProductCategory } from "./product-categories";
import type { ProductVariant } from "./product-variant";
import type { SubCategory } from "./sub-category";

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
  out_of_stock: boolean;
  category_id: number;
  SubCategory: SubCategory;
  ProductCategories: ProductCategory[];
  ProductsVariants: ProductVariant[];
}