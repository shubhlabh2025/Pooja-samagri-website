export interface SubCategory {
  id: string;
  name: string;
  image: string;
  parent_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategoryResponse {
  data: SubCategory[];
}
