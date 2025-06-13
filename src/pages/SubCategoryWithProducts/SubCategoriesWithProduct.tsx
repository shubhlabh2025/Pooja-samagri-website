import { useGetProductsInfiniteQuery } from "@/features/product/productAPI";
import { useGetSubCategoriesQuery } from "@/features/sub-category/subCategoryAPI";
import { useParams } from "react-router";
import SubCategorySideBar from "./SubCategorySideBar";
import { useGetCategoryByIdQuery } from "@/features/category/categoryAPI";
import { useState } from "react";
import ProductSection from "./ProductSection";
import { SubCategoriesWithProductSkeleton } from "@/components/custom/skeletons/SubCategoriesWithProductSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";

const SubCategoriesWithProductScreen = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();

  const {
    data: categoryData = {
      data: {
        id: "",
        name: "",
        image: "",
        parent_id: "",
        createdAt: "",
        updatedAt: "",
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
      <ul className="hide-scrollbar flex h-full max-h-full max-w-[250px] flex-8 flex-col items-center gap-6 overflow-y-auto rounded-tr-lg bg-white py-6">
        <SubCategorySideBar
          selectedCategoryId={selectedCategoryId}
          categoryData={categoryData.data}
          subCategoryData={subCategoryData.data}
          handleUpdateCategory={handleUpdateCategory}
        />
      </ul>
      <div className="flex flex-30 flex-col rounded-tl-lg bg-white">
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
