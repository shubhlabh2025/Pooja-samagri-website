import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import ProductDetailsScreen from "./pages/ProductDetail/ProductDetail.tsx";
import SearchScreen from "./pages/Search/Search.tsx";
import SubCategoriesWithProductScreen from "./pages/SubCategoryWithProducts/SubCategoriesWithProduct.tsx";
import NotFound from "./components/error/NotFound.tsx";
import MainLayout from "./components/layout/MainLayout.tsx";
import CategoriesScreen from "./pages/Categories/Categories.tsx";
import ChatIcon from "./components/custom/ChatIcon.tsx";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import MainLayoutWithCart from "./components/layout/MainLayoutWithCart.tsx";
import ConfigLoader from "./app/configLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
      <ConfigLoader/>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <App />
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
    </StrictMode>
  </Provider>,
);
