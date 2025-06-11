export interface Category {
  id: string;
  name: string;
  image: string;
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
}

export interface GetCategoryByIdResponse {
  data: Category;
}
