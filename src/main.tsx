import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import ProductDetailsScreen from "./pages/ProductDetail/ProductDetail.tsx";
import SearchScreen from "./pages/Search/Search.tsx";
import SubCategoriesWithProductScreen from "./pages/SubCategoryWithProducts/SubCategoriesWithProduct.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryId" element={<SubCategoriesWithProductScreen />} />
        <Route path="/product/:productId" element={<ProductDetailsScreen />} />
        <Route path="/search" element={<SearchScreen />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
