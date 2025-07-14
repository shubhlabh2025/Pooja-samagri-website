import { useGetProductsInfiniteQuery } from "@/features/product/productAPI";
import { useGetSubCategoriesQuery } from "@/features/sub-category/subCategoryAPI";
import { useNavigate, useParams } from "react-router";
import SubCategorySideBar from "./SubCategorySideBar";
import { useGetCategoryByIdQuery } from "@/features/category/categoryAPI";
import { useState } from "react";
import ProductSection from "./ProductSection";
import { SubCategoriesWithProductSkeleton } from "@/components/skeletons/SubCategoriesWithProductSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";
import { ChevronLeft } from "lucide-react";

const SubCategoriesWithProductScreen = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const {
    data: categoryData = {
      data: {
        id: "",
        name: "",
        image: "",
        parent_id: "",
        createdAt: "",
        updatedAt: "",
        priority: 0,
      },
    },
    isLoading: catLoading,
    isError: catError,
  } = useGetCategoryByIdQuery(categoryId || "");

  const {
    data: subCategoryData = {
      data: [],
    },
    isLoading: subCatLoading,
    isError: subCatError,
  } = useGetSubCategoriesQuery({ parent_ids: categoryId || "" });

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string>(categoryId);

  const {
    data: infiniteProductData,
    isLoading: productLoading,
    isError: productError,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetProductsInfiniteQuery({
    category_id: selectedCategoryId,
    limit: 30,
  });

  const allProducts =
    infiniteProductData?.pages.flatMap((page) => page.data) || [];
  const totalProducts = infiniteProductData?.pages[0]?.meta.totalItems || 0;

  const handleUpdateCategory = (newCategoryId: string) => {
    setSelectedCategoryId(newCategoryId);
  };

  const isLoading = catLoading || subCatLoading || productLoading;
  const isError = catError || subCatError || productError;

  if (isLoading) {
    return <SubCategoriesWithProductSkeleton />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return (
    <div className="flex h-full gap-1.5 overflow-hidden bg-[#f0f0f5] pt-1">
      <div className="shadow-subcategory-screen flex h-full max-h-full max-w-[250px] flex-8 flex-col rounded-tr-lg bg-white">
        <div className="gap-3 flex min-h-[40px] items-center border-b border-[#282c3f0d] px-3 pt-4 pb-[12px] text-[#02060cbf]">
          <ChevronLeft
            size={20}
            className="cursor-pointer"
            strokeWidth={2.5}
            onClick={() => navigate(-1)}
            color="#02060cbf"
          />
          <div className="line-clamp-1 w-full overflow-hidden text-[16px] leading-4.5 font-medium tracking-[-0.35px] break-words text-[#02060cbf]">
            {categoryData.data.name}
          </div>
        </div>
        <ul className="hide-scrollbar flex-1 flex-col items-center gap-6 overflow-y-auto py-6">
          <SubCategorySideBar
            selectedCategoryId={selectedCategoryId}
            categoryData={categoryData.data}
            subCategoryData={subCategoryData.data}
            handleUpdateCategory={handleUpdateCategory}
          />
        </ul>
      </div>
      <div className="shadow-subcategory-screen flex flex-30 flex-col rounded-tl-lg bg-white">
        <ProductSection
          productData={allProducts}
          totalProuducts={totalProducts}
          onLoadMore={fetchNextPage}
          isFetching={isFetching}
          isLoadingMore={isFetchingNextPage}
        />
      </div>
    </div>
  );
};

export default SubCategoriesWithProductScreen;
