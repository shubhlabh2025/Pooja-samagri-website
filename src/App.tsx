import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Cart from "./pages/Cart/Cart.tsx";
import ProductDetailsScreen from "./pages/ProductDetail/ProductDetail.tsx";
import SearchScreen from "./pages/Search/Search.tsx";
import SubCategoriesWithProductScreen from "./pages/SubCategoryWithProducts/SubCategoriesWithProduct.tsx";
import NotFound from "./components/error/NotFound.tsx";
import MainLayout from "./components/layout/MainLayout.tsx";
import CategoriesScreen from "./pages/Categories/Categories.tsx";
import ChatIcon from "./components/custom/ChatIcon.tsx";
import MainLayoutWithCart from "./components/layout/MainLayoutWithCart.tsx";
import Home from "./pages/Home/Home.tsx";
import { useGetAppConfigurationsQuery } from "./features/configuration/configurationAPI.ts";
import { HomeSkeleteon } from "./components/custom/skeletons/HomeSkeleton.tsx";
import ErrorScreen from "./components/error/ErrorScreen.tsx";
import { setData } from "./features/configuration/configurationSlice.ts";
import { useAppDispatch } from "./app/hooks.ts";
import { useEffect } from "react";

function App() {
  const { isLoading, data, isError } = useGetAppConfigurationsQuery();
  const dispatch = useAppDispatch(); // ✅ called unconditionally

  useEffect(() => {
    if (data) {
      dispatch(setData(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <HomeSkeleteon />;
  }

  if (!data || isError) {
    return <ErrorScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
              <ChatIcon />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            // <MainLayout>
            <Cart />
            // </MainLayout>
          }
        />
        <Route
          path="/categories/:categoryId"
          element={
            <MainLayoutWithCart>
              <SubCategoriesWithProductScreen />
            </MainLayoutWithCart>
          }
        />

        <Route
          path="/categories"
          element={
            <MainLayout>
              <CategoriesScreen />
            </MainLayout>
          }
        />

        <Route
          path="/products/:productId"
          element={
            <MainLayout>
              <ProductDetailsScreen />
            </MainLayout>
          }
        />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
