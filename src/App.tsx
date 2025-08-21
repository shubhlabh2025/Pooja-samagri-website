import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Cart from "./pages/Cart/Cart.tsx";
import ProductDetailsScreen from "./pages/ProductDetail/ProductDetail.tsx";
import SubCategoriesWithProductScreen from "./pages/SubCategoryWithProducts/SubCategoriesWithProduct.tsx";
import NotFound from "./components/error/NotFound.tsx";
import MainLayout from "./components/layout/MainLayout.tsx";
import CategoriesScreen from "./pages/Categories/Categories.tsx";
import ChatIcon from "./components/custom/ChatIcon.tsx";
import MainLayoutWithCart from "./components/layout/MainLayoutWithCart.tsx";
import Home from "./pages/Home/Home.tsx";
import { HomeSkeleteon } from "./components/skeletons/HomeSkeleton.tsx";
import ErrorScreen from "./components/error/ErrorScreen.tsx";
import {
  selectConfiguration,
  setData,
} from "./features/configuration/configurationSlice.ts";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { useEffect } from "react";
import { useGetAppConfigurationsQuery } from "./features/configuration/configurationAPI.ts";
import { useGeolocation } from "./hooks/location.ts";
import Address from "./pages/Address/Address.tsx";
import UserProfilePage from "./pages/Profile/UserProfile.tsx";
import PaymentPage from "./pages/Payment/PaymentPage.tsx";
import Orders from "./pages/Orders/Orders.tsx";
import OrderDetail from "./pages/Orders/OrderDetail/OrderDetail.tsx";
import PaymentSuccess from "./pages/Payment/PaymentSuccess.tsx";
import PaymentFailure from "./pages/Payment/PaymentFailure.tsx";
import { useGetUserDetailsQuery } from "./features/user/userApi.ts";
import Policies from "./pages/Policies.tsx";

function App() {
  useGeolocation();
  const dispatch = useAppDispatch();
  const configState = useAppSelector(selectConfiguration);

  const {
    isLoading: isQueryLoading,
    data: queryData,
    isError: isQueryError,
  } = useGetAppConfigurationsQuery();
  useGetUserDetailsQuery();

  // Load configuration into store only once
  useEffect(() => {
    if (!configState.data && queryData) {
      dispatch(setData(queryData));
    }
  }, [configState.data, queryData, dispatch]);

  // Show loading until data is in store
  if (isQueryLoading && !configState.data) {
    return <HomeSkeleteon />;
  }

  // Show error only if both store and query are empty/failing
  if (
    (!configState.data && isQueryError) ||
    (!configState.data && !queryData)
  ) {
    return <ErrorScreen />;
  }

  // If config is available in store, render app
  if (configState.data) {
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
          <Route path="/orders">
            <Route index element={<Orders />} />
            <Route path=":orderId" element={<OrderDetail />} />
          </Route>
          <Route path="cart">
            <Route index element={<Cart />} />
            <Route path="payment-page" element={<PaymentPage />} />
            <Route path="order-success" element={<PaymentSuccess />} />
            <Route path="order-failure" element={<PaymentFailure />} />
          </Route>
          <Route
            path="/categories/:categoryId"
            element={
              <MainLayoutWithCart>
                <SubCategoriesWithProductScreen />
              </MainLayoutWithCart>
            }
          />

          <Route path="/categories" element={<CategoriesScreen />} />

          <Route
            path="/products/:productId"
            element={<ProductDetailsScreen />}
          />
          <Route path="/address" element={<Address />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/privacy-policy" element={<Policies />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
