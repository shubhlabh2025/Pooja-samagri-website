import type { ProductSectionProps } from "@/interfaces/product-section";
import ProductItem2 from "../Home/ProductItem2";
import { useRef, useCallback } from "react";
import { Loader } from "lucide-react";
import { SubCategoriesWithProductSkeleton } from "@/components/custom/skeletons/SubCategoriesWithProductSkeleton";
import EmptyScreen from "@/components/custom/EmptyScreen";
import NoProductFoundIcon from "../../assets/no_products.png";

import { useNavigate } from "react-router";
import BannerCarousel from "@/components/custom/BannerCarousel";
import { useAppSelector } from "@/app/hooks";
import { selectConfiguration } from "@/features/configuration/configurationSlice";

const ProductSection = ({
  productData,
  totalProuducts,
  onLoadMore,
  isFetching,
  isLoadingMore = false,
}: ProductSectionProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const config = useAppSelector(selectConfiguration);

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
        showBackArrow={true}
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
      <div>
        <BannerCarousel
          adBanner={config.data?.data.ad_banners || []}
          type="CATEGORY"
        />
      </div>
      <div className="mb-3.5 line-clamp-1 min-h-[34px] w-full overflow-hidden px-3 pt-4 text-sm leading-4.5 font-normal tracking-[-0.35px] break-words text-[#02060cbf]">
        <span className="font-bold">{totalProuducts} items</span> found
      </div>
      <div className="hide-scrollbar flex max-h-full flex-wrap justify-start overflow-y-auto">
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
