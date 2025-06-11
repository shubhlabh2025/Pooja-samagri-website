import { useGetProductsQuery } from "@/features/product/productAPI";
import { useGetSubCategoriesQuery } from "@/features/sub-category/subCategoryAPI";
import { useParams } from "react-router";
import SubCategorySideBar from "./SubCategorySideBar";
import { useGetCategoryByIdQuery } from "@/features/category/categoryAPI";
import { useState } from "react";
import ProductSection from "./ProductSection";

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
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    categoryData.data.name || "",
  );

  const {
    data: productData = {
      data: [],
      meta: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 30,
      },
    },
    isLoading: productLoading,
    isError: productError,
  } = useGetProductsQuery({
    category_id: categoryId,
    page: 1,
    limit: 30,
  });

  console.log("productData", productData);

  const handleUpdateCategory = (
    newCategoryId: string,
    newCategoryName: string,
  ) => {
    setSelectedCategoryId(newCategoryId);
    setSelectedCategoryName(newCategoryName);
  };

  const isLoading = catLoading || subCatLoading || productLoading;
  const isError = catError || subCatError || productError;

  if (isLoading) {
    return <div className="p-4">Loading data...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500">
        Error loading data. Please try again later.
      </div>
    );
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
      <ProductSection
        productData={productData.data}
        totalProuducts={productData.meta.totalItems}
        selectedCategoryName={
          selectedCategoryName == ""
            ? categoryData.data.name
            : selectedCategoryName
        }
      />
    </div>
  );
};

export default SubCategoriesWithProductScreen;
