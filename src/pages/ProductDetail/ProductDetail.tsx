import CartSummaryBanner from "@/components/common/CartSummaryBanner";
import SimpleNavBar from "@/components/common/SimpleNavBar";
import ProductDetailsCartButton from "@/components/custom/button/ProductDetailsCartButton";
import { ProductDetailsSkeleton } from "@/components/skeletons/ProductDetailSkelton";
import ErrorScreen from "@/components/error/ErrorScreen";
import {
  useGetProductByIdQuery,
  useGetProductsInfiniteQuery,
} from "@/features/product/productAPI";
import type {
  Product,
  ProductVariant,
} from "@/features/product/productAPI.type";
import { Star, Truck, Shield, RotateCcw } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

// Type definitions

const ProductDetailsScreen: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const { productId = "" } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const {
    data: productResponse,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  const productData: Product = useMemo(() => {
    return (
      productResponse?.data ?? {
        id: "",
        createdAt: "",
        updatedAt: "",
        product_variants: [],
      }
    );
  }, [productResponse?.data]);

  // Set default variant when product data loads
  useEffect(() => {
    if (productData.product_variants?.length > 0) {
      const defaultVariant =
        productData.product_variants.find((v) => v.default_variant) ||
        productData.product_variants[0];
      setSelectedVariant(defaultVariant);
      setSelectedImageIndex(0);
    }

    // ✅ Set category after product fetch
    if (productResponse?.data?.product_variants[0].categories?.length) {
      setSelectedCategoryId(
        productResponse?.data?.product_variants[0].categories[0].id,
      );
    }
  }, [productData, productResponse?.data]);

  const { data: relatedProductResponse } = useGetProductsInfiniteQuery(
    {
      category_id: selectedCategoryId,
      limit: 10,
    },
    {
      skip: !selectedCategoryId,
    },
  );

  const handleVariantChange = (variant: ProductVariant): void => {
    setSelectedVariant(variant);
    setSelectedImageIndex(0);
  };

  const handleImageSelect = (index: number): void => {
    setSelectedImageIndex(index);
  };

  const calculateDiscountPercentage = (mrp: number, price: number): number => {
    if (!mrp || !price || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError || !selectedVariant) return <ErrorScreen />;

  return (
    <div className="relative min-h-screen overflow-auto bg-gradient-to-br to-white">
      {/* Header */}
      <SimpleNavBar navBarText="Product Details" />

      <div className="max-w-9xl mx-auto px-4 py-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Product Image */}

          <div className="space-y-4">
            <div className="group relative">
              <div className="mt-4 flex flex-col items-center justify-center md:order-1">
                <img
                  src={
                    selectedVariant.images?.[selectedImageIndex] ||
                    selectedVariant.images?.[0] ||
                    "https://via.placeholder.com/400x400?text=No+Image"
                  }
                  alt="Product"
                  className="h-[300px] w-full max-w-md rounded-lg bg-white object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex gap-3">
              {selectedVariant.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`h-20 w-20 overflow-hidden rounded-2xl transition-all duration-300 ${
                    selectedImageIndex === index
                      ? "scale-105 shadow-lg ring-3 ring-orange-500"
                      : "hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                <Truck className="mx-auto mb-2 text-blue-500" size={24} />
                <p className="text-sm text-gray-600">3 Days Delivery</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                <Shield className="mx-auto mb-2 text-green-500" size={24} />
                <p className="text-sm text-gray-600">Quality Assured</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                <RotateCcw className="mx-auto mb-2 text-purple-500" size={24} />
                <p className="text-sm text-gray-600">Easy Returns</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Title & Brand */}
            <div className="space-y-2">
              <h1 className="text-xl leading-tight font-bold text-gray-900">
                {selectedVariant.name}
              </h1>
              <p className="text-xl font-medium text-gray-600">
                {selectedVariant.brand_name}
              </p>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Based on 3 Reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{selectedVariant.price}
              </span>
              <span className="text-l text-gray-400 line-through">
                ₹{selectedVariant.mrp}
              </span>
              <div className="rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                {calculateDiscountPercentage(
                  selectedVariant.mrp,
                  selectedVariant.price,
                )}
                % OFF
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <p className="leading-relaxed text-gray-700">
                {selectedVariant.description}
              </p>
            </div>

            {/* Variant Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Select Variant
              </h3>
              <div className="flex gap-3">
                {productData.product_variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    className={`rounded-2xl px-6 py-3 font-medium transition-all duration-300 ${
                      selectedVariant === variant
                        ? "scale-105 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "border-2 border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:shadow-md"
                    }`}
                  >
                    {variant.display_label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex">
              <ProductDetailsCartButton productVariant={selectedVariant} />
            </div>

            {/* Features */}
          </div>
        </div>
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            You might also like
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-8">
            {relatedProductResponse?.pages
              ?.flatMap((page) => page.data)
              .filter((product) => product.id !== productData.id)
              .map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    navigate(`/products/${product.id}`);
                  }}
                >
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-orange-50">
                      <img
                        src={product.product_variants?.[0].images[0]}
                        alt={product.product_variants?.[0].name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="space-y-2 p-4">
                      <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                        {product.product_variants?.[0].brand_name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          ₹{product.product_variants?.[0].price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.product_variants?.[0].mrp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <CartSummaryBanner />
    </div>
  );
};

export default ProductDetailsScreen;
