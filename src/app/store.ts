import { categoryAPI } from "@/features/category/categoryAPI";
import { configureStore } from "@reduxjs/toolkit";
import { subCategoryAPI } from "@/features/sub-category/subCategoryAPI";
import { productAPI } from "@/features/product/productAPI";
import { configurationAPI } from "@/features/configuration/configurationAPI";
import configurationReducer from "@/features/configuration/configurationSlice";
import locationReducer from "@/features/address/addressSlice"
import { addressAPI } from "@/features/address/AddresssAPI";

export const store = configureStore({
  reducer: {
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [subCategoryAPI.reducerPath]: subCategoryAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [addressAPI.reducerPath]: addressAPI.reducer,
    configuration: configurationReducer,
    [configurationAPI.reducerPath]: configurationAPI.reducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryAPI.middleware,
      subCategoryAPI.middleware,
      productAPI.middleware,
      addressAPI.middleware,
      configurationAPI.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
