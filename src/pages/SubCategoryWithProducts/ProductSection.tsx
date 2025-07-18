import type { ProductSectionProps } from "@/interfaces/product-section";
import ProductItem2 from "../Home/ProductItem2";
import { useRef, useCallback } from "react";
import { Loader } from "lucide-react";
import { SubCategoriesWithProductSkeleton } from "@/components/skeletons/SubCategoriesWithProductSkeleton";
import EmptyScreen from "@/components/custom/EmptyScreen";
import NoProductFoundIcon from "../../assets/no_products.png";

import { useNavigate } from "react-router";

const ProductSection = ({
  productData,
  totalProuducts,
  onLoadMore,
  isFetching,
  isLoadingMore = false,
}: ProductSectionProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const navigate = useNavigate();
  const loadingRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            onLoadMore();
          }
        },
        { threshold: 0.1 },
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoadingMore, onLoadMore],
  );
  if (isFetching && !isLoadingMore) {
    return <SubCategoriesWithProductSkeleton isSideBarVisible={false} />;
  }

  if (productData.length === 0) {
    return (
      <EmptyScreen
        imageSrc={NoProductFoundIcon}
        title={"No Products Found"}
        showBackArrow={false}
        subtitle={""}
        buttonText={"Browse other Products"}
        onButtonClick={function (): void {
          navigate("/");
        }}
      />
    );
  }

  return (
    <>
      <div className="sticky top-0 z-15 line-clamp-1 min-h-[34px] w-full overflow-hidden rounded-tl-lg border-b border-[#282c3f0d] bg-white px-3 pt-4 pb-3 text-sm font-normal tracking-[-0.35px] break-words text-[#02060cbf]">
        <span className="font-bold">{totalProuducts} items</span> found
      </div>
      <div className="flex flex-wrap justify-start rounded-tl-lg">
        {productData.map((product) => (
          <ProductItem2 key={product.id} item={product} />
        ))}

        <div ref={loadingRef} className="flex w-full justify-center">
          {isLoadingMore ? (
            <Loader
              size={50}
              color="#ff5200"
              className="animate-spinner-leaf-fade p-2"
            />
          ) : (
            <div className="" />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSection;
