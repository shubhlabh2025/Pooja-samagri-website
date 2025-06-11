import type { Category } from "@/features/category/categoryAPI.type";
import type { SubCategory } from "@/features/sub-category/subCategoryAPI.type";

export interface SubCategorySidebarProps {
  selectedCategoryId: string;
  categoryData: Category;
  subCategoryData: SubCategory[];
  handleUpdateCategory: (newCategoryId: string, newCategoryName: string) => void;
}
