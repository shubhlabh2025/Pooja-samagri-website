export interface Category {
  id: string;
  name: string;
  image: string;
  priority: number;
  parent_id: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  nextPage?: number;
  prevPage?: number;
}

export interface CategoryResponse {
  data: Category[];
  meta: CategoryMeta;
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  q?: string;
  sort_by?: "priority" | "name" | "createdAt" | "updated_at";
  sort_order?: "ASC" | "DESC";
}

export interface GetCategoryByIdResponse {
  data: Category;
}
