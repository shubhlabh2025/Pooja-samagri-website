import { categoryAPI } from "@/features/category/categoryAPI";
import { configureStore } from "@reduxjs/toolkit";
import { subCategoryAPI } from "@/features/sub-category/subCategoryAPI";
import { productAPI } from "@/features/product/productAPI";

export const store = configureStore({
  reducer: {
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [subCategoryAPI.reducerPath]: subCategoryAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryAPI.middleware,
      subCategoryAPI.middleware,
      productAPI.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
