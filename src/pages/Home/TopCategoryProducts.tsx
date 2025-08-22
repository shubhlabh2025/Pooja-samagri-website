import { useSearchProductsInfiniteQuery } from "@/features/product/productAPI";
import type { TopCategoryProductsProps } from "@/interfaces/home";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import ProductItem from "./ProductItem";

const TopCategoryProducts = ({ category }: TopCategoryProductsProps) => {
  const navigate = useNavigate();
  const {
    data: ProductData = {
      pages: [
        {
          data: [],
        },
      ],
    },
    isLoading: productLoading,
    isError: productError,
  } = useSearchProductsInfiniteQuery({
    category_ids: category.id,
    limit: 20,
  });

  if (productLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }
  if (productError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-red-500">Error loading products.</p>
      </div>
    );
  }

  if (!ProductData || ProductData.pages[0].data.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3 px-4">
        <p className="text-[12px] leading-4 font-semibold tracking-[1.5px] break-words whitespace-nowrap text-[#02060cbf]">
          {category.name.toUpperCase()}
        </p>
        <div className="h-[1px] flex-1 [background:var(--bg-categroy-line)]"></div>
        <div
          className="flex cursor-pointer items-center gap-0.5"
          onClick={() => navigate(`/categories/${category.id}`)}
        >
          <p className="text-[13px] leading-[17px] font-semibold tracking-[-0.33px] whitespace-nowrap text-[#ff5200]">
            See All
          </p>
          <ChevronRight color="#ff5200" size={18} />
        </div>
      </div>
      <div className="flex max-w-full gap-7.5 overflow-hidden overflow-x-auto px-3 py-5">
        {ProductData.pages[0].data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TopCategoryProducts;
