import { ProductDetailsSkeleton } from "@/components/custom/skeletons/ProductDetailSkelton";
import ThumbnailCarousel from "@/components/custom/ThumbnailCarousel";
import ErrorScreen from "@/components/error/ErrorScreen";
import { useGetProductByIdQuery } from "@/features/product/productAPI";
import type {
  Product,
  ProductVariant,
} from "@/features/product/productAPI.type";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

// Type definitions

interface ProductResponse {
  data: Product;
}

interface RelatedProduct {
  brand: string;
  price: number;
  img: string;
}

const ProductDetailsScreen: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const { productId = "" } = useParams<{ productId: string }>();

  const {
    data: productResponse,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId || "") as {
    data: ProductResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  // ✅ Memoize to avoid triggering useEffect on every render
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

  // ✅ Set default variant when product data loads
  useEffect(() => {
    if (productData.product_variants?.length > 0) {
      const defaultVariant =
        productData.product_variants.find((v) => v.default_variant) ||
        productData.product_variants[0];
      setSelectedVariant(defaultVariant);
      setQuantity(defaultVariant.min_quantity || 1);
      setSelectedImageIndex(0);
    }
  }, [productData]);

  const relatedProducts: RelatedProduct[] = [
    {
      brand: "adidas",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
    {
      brand: "Nike",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
    {
      brand: "Nike",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
    {
      brand: "Nike",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
    {
      brand: "Nike",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
  ];

  const navigate = useNavigate();

  // Helper functions
  const handleQuantityChange = (newQuantity: number): void => {
    if (!selectedVariant) return;

    const minQty: number = selectedVariant.min_quantity || 1;
    const maxQty: number =
      selectedVariant.max_quantity ||
      selectedVariant.total_available_quantity ||
      999;

    if (newQuantity >= minQty && newQuantity <= maxQty) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (variant: ProductVariant): void => {
    setSelectedVariant(variant);
    setQuantity(variant.min_quantity || 1);
    setSelectedImageIndex(0); // Reset to first image when variant changes
  };

  const handleImageSelect = (index: number): void => {
    setSelectedImageIndex(index);
  };

  const calculateDiscountPercentage = (mrp: number, price: number): number => {
    if (!mrp || !price || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  if (!selectedVariant) {
    return <ErrorScreen />;
  }

  const discountPercentage: number = calculateDiscountPercentage(
    selectedVariant.mrp,
    selectedVariant.price,
  );

  return (
    <>
      <div className="relative flex flex-col gap-10 overflow-auto  p-10 md:grid md:grid-cols-2">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 mr-2 flex items-center gap-1 rounded-full bg-gray-200 p-1 hover:bg-gray-300"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Product Image on top for small devices */}
        <div className="mt-4 flex flex-col items-center justify-center md:order-1">
          <img
            src={
              selectedVariant.image?.[selectedImageIndex] ||
              selectedVariant.image?.[0] ||
              "https://via.placeholder.com/400x400?text=No+Image"
            }
            alt={selectedVariant.name || "Product Image"}
            className="h-[300px] w-full max-w-md rounded-lg bg-white object-contain"
          />

          {/* Small Thumbnails */}
          <ThumbnailCarousel
            images={selectedVariant.image || []}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={handleImageSelect}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6 md:order-2">
          <div className="mb-2">
            <h1 className="text-3xl font-bold">
              {selectedVariant.name || "Brand"}
            </h1>
            <p className="text-gray-600">
              {selectedVariant.brand_name || "Product Name"}
            </p>

            {/* Category Display
            {selectedVariant.categories?.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Category: {selectedVariant.categories[0].name}
              </p>
            )}
             */}
            {/* ⭐️ Star Review Section */}
            <div className="mt-2 flex flex-row items-center space-x-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.214 3.736a1 1 0 00.95.69h3.924c.969 0 1.371 1.24.588 1.81l-3.18 2.31a1 1 0 00-.364 1.118l1.214 3.736c.3.921-.755 1.688-1.54 1.118l-3.18-2.31a1 1 0 00-1.175 0l-3.18 2.31c-.784.57-1.838-.197-1.539-1.118l1.213-3.736a1 1 0 00-.364-1.118L2.273 9.163c-.783-.57-.38-1.81.588-1.81h3.925a1 1 0 00.95-.69l1.214-3.736z" />
                </svg>
              ))}
              <p className="pt-1 text-gray-600">Based on 3 Reviews</p>
            </div>
          </div>

          <div className="flex flex-row items-center space-x-2">
            <p className="text-2xl font-semibold">₹{selectedVariant.price}</p>
            {selectedVariant.mrp > selectedVariant.price && (
              <>
                <p className="text-l font-normal text-gray-500 line-through">
                  ₹{selectedVariant.mrp}
                </p>
                <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-800">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600">
            {selectedVariant.description ||
              "No description available for this product."}
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span
              className={`rounded px-2 py-1 text-sm ${
                selectedVariant.out_of_stock
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {selectedVariant.out_of_stock ? "Out of Stock" : "In Stock"}
            </span>
            {!selectedVariant.out_of_stock && (
              <span className="text-sm text-gray-600">
                ({selectedVariant.total_available_quantity} available)
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg">Quantity</p>
            <div className="flex items-center rounded border px-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= (selectedVariant.min_quantity || 1)}
                className="px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={
                  quantity >=
                  (selectedVariant.max_quantity ||
                    selectedVariant.total_available_quantity ||
                    999)
                }
                className="px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">
              Min: {selectedVariant.min_quantity || 1}, Max:{" "}
              {selectedVariant.max_quantity ||
                selectedVariant.total_available_quantity ||
                999}
            </span>
          </div>

          {/* Variant Selection */}
          {productData.product_variants?.length > 1 && (
            <div>
              <p className="mb-2 font-medium">Select Variant</p>
              <div className="flex flex-wrap gap-2">
                {productData.product_variants.map((variant: ProductVariant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    disabled={variant.out_of_stock}
                    className={`rounded border px-4 py-2 transition-colors ${
                      selectedVariant.id === variant.id
                        ? "bg-black text-white"
                        : variant.out_of_stock
                          ? "cursor-not-allowed bg-gray-100 text-gray-400"
                          : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    {variant.display_label}
                    {variant.out_of_stock && (
                      <span className="block text-xs">Out of Stock</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex gap-4">
            <button
              className="rounded bg-black px-6 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={selectedVariant.out_of_stock}
            >
              Buy Now
            </button>
            <button
              className="rounded border border-black px-6 py-2 disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400"
              disabled={selectedVariant.out_of_stock}
            >
              Add to Cart
            </button>
          </div>

          <p className="text-gray-500">
            Delivery in <span className="font-medium">(3 days)</span>
          </p>
        </div>

        <div className="col-span-2 mt-2 md:order-3">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Related Products
          </h2>
          <div className="scrollbar-hide flex gap-6 overflow-x-auto">
            {relatedProducts.map((product: RelatedProduct, idx: number) => (
              <div
                key={idx}
                className="min-w-[180px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={product.img}
                  alt={`Related product ${idx + 1}`}
                  className="mb-4 h-32 w-full rounded-lg object-cover"
                />
                <div className="flex items-center justify-between text-sm">
                  <p className="truncate font-medium text-gray-900">
                    {product.brand}
                  </p>
                  <p className="font-semibold text-gray-700">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsScreen;
