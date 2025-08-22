import CartSummaryBanner from "@/components/common/CartSummaryBanner";
import SimpleNavBar from "@/components/common/SimpleNavBar";
import ProductDetailsCartButton from "@/components/custom/button/ProductDetailsCartButton";
import { ProductDetailsSkeleton } from "@/components/skeletons/ProductDetailSkelton";
import ErrorScreen from "@/components/error/ErrorScreen";
import {
  useGetProductByIdQuery,
  useSearchProductsInfiniteQuery,
} from "@/features/product/productAPI";
import type {
  Product,
  ProductVariant,
} from "@/features/product/productAPI.type";
import { Star, Truck, Shield, RotateCcw, Share2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import ProductItem from "../Home/ProductItem";
import { ShareDrawer } from "@/components/common/ShareDrawer";

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

  const { data: relatedProductResponse } = useSearchProductsInfiniteQuery(
    {
      category_ids: selectedCategoryId,
      limit: 20,
    },
    {
      skip: !selectedCategoryId,
    },
  );

  const handleVariantChange = (variant: ProductVariant): void => {
    setSelectedVariant(variant);
    setSelectedImageIndex(0);
  };
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const handleImageSelect = (index: number): void => {
    setSelectedImageIndex(index);
  };

  const calculateDiscountPercentage = (mrp: number, price: number): number => {
    if (!mrp || !price || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = () => {
    setShowShareOptions(true);
  };
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const handleShareAction = (platform: string) => {
    const productLink = `https://shubhlabhpoojasamagri.com/products/${productId}`;
    const encodedLink = encodeURIComponent(productLink);
    const message = encodeURIComponent("Check out this product!");

    let appUrl = "";
    let fallbackUrl = "";

    if (platform === "facebook") {
      appUrl = `fb://facewebmodal/f?href=${productLink}`;
      fallbackUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
    } else if (platform === "whatsapp") {
      appUrl = `whatsapp://send?text=${message}%20${productLink}`;
      fallbackUrl = `https://wa.me/?text=${message}%20${encodedLink}`;
    } else if (platform === "gmail") {
      // Gmail doesn't support custom URL schemes directly, so fallback only
      fallbackUrl = `https://mail.google.com/mail/?view=cm&fs=1&body=${encodedLink}`;
    }

    // Try to open the app URL first (on mobile)
    if (/Mobi|Android/i.test(navigator.userAgent) && appUrl) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = appUrl;
      document.body.appendChild(iframe);

      // After a delay, fallback to the web URL
      setTimeout(() => {
        window.open(fallbackUrl, "_blank");
        document.body.removeChild(iframe);
      }, 1000); // 1s timeout for app open
    } else {
      // Desktop fallback
      window.open(fallbackUrl, "_blank");
    }

    setShowShareOptions(false);
  };
  const truncatedDescription = useMemo(() => {
    const description = selectedVariant?.description || "";
    const words = description.split(" ");
    // Show approx 30 words (adjust as needed)
    return words.length > 30 && !showFullDescription
      ? words.slice(0, 30).join(" ") + "..."
      : description;
  }, [selectedVariant?.description, showFullDescription]);

  if (isLoading || !selectedVariant) return <ProductDetailsSkeleton />;
  if (isError) return <ErrorScreen />;

  return (
    <div className="relative h-screen w-full max-w-full overflow-y-auto bg-gradient-to-br to-white">
      {/* Header - Fixed at top */}
      <div className="sticky top-0 z-10">
        <SimpleNavBar navBarText="Product Details" />
      </div>

      {/* Scrollable content */}
      <div className="mx-auto w-full max-w-full px-4 py-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="w-full min-w-0 space-y-4">
            <div className="group relative">
              <div className="mt-4 flex flex-col items-center justify-center md:order-1">
                <img
                  loading="lazy"
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

            <div className="flex gap-3 overflow-x-auto pt-2 pb-2 pl-2 md:order-2">
              {selectedVariant.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-300 ${
                    selectedImageIndex === index
                      ? "scale-105 shadow-lg ring-3 ring-orange-500"
                      : "hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <img
                    loading="lazy"
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="hidden grid-cols-3 gap-4 md:order-4 md:grid">
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

          {/* Product Details */}
          <div className="flex w-full min-w-0 flex-col space-y-6 md:order-3">
            {/* Title & Brand */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-start justify-between">
                <h1 className="mr-4 flex-1 text-xl leading-tight font-bold text-gray-900">
                  {selectedVariant.name}
                </h1>
                <button onClick={handleShare} className="flex-shrink-0">
                  <Share2 size={24} />
                </button>
                {showShareOptions && (
                  <ShareDrawer
                    onClose={() => setShowShareOptions(false)}
                    onShare={handleShareAction}
                  />
                )}
              </div>

              <p className="text-xl font-medium text-gray-600">
                {selectedVariant.brand_name}
              </p>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Based on {randomNumber} Reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-2">
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
            <div className="hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:block">
              <p className="leading-relaxed text-gray-700">
                {selectedVariant.description}
              </p>
            </div>

            {/* Variant Selection */}
            <div className="w-full space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Select Variant
              </h3>
              <div className="w-full overflow-x-auto">
                <div className="flex min-w-max gap-3 pb-2">
                  {productData.product_variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className={`flex-shrink-0 rounded-2xl px-6 py-3 font-medium whitespace-nowrap transition-all duration-300 ${
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
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex w-full">
              <ProductDetailsCartButton productVariant={selectedVariant} />
            </div>

            <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:hidden">
              <p className="leading-relaxed text-gray-700">
                {truncatedDescription}
              </p>
              {selectedVariant.description &&
                selectedVariant.description.split(" ").length > 30 && ( // Only show button if description is long
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 text-orange-600 hover:underline"
                  >
                    {showFullDescription ? "- Show Less" : "+ Show More"}
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* Mobile features section */}
        <div className="grid grid-cols-3 gap-4 pt-8 md:order-4 md:hidden">
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

        {/* Related products section */}
        <div className="mt-8 w-full md:order-5">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            You might also like
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {relatedProductResponse?.pages
              ?.flatMap((page) => page.data)
              .filter((product) => product.id !== productData.id)
              .map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </div>
        </div>

        {/* Bottom spacing for CartSummaryBanner */}
        <div className="h-20"></div>
      </div>

      {/* Fixed Cart Summary Banner */}
      <div className="fixed right-0 bottom-0 left-0 z-20">
        <CartSummaryBanner />
      </div>
    </div>
  );
};

export default ProductDetailsScreen;
