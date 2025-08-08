import { useGetProductsInfiniteQuery } from "@/features/product/productAPI";
import { useGetSubCategoriesInfiniteQuery } from "@/features/sub-category/subCategoryAPI";
import { useNavigate, useParams } from "react-router";
import SubCategorySideBar from "./SubCategorySideBar";
import { useGetCategoryByIdQuery } from "@/features/category/categoryAPI";
import { useEffect, useState } from "react";
import ProductSection from "./ProductSection";
import { SubCategoriesWithProductSkeleton } from "@/components/skeletons/SubCategoriesWithProductSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";
import { ChevronLeft } from "lucide-react";
import BannerCarousel from "@/components/custom/BannerCarousel";
import { useAppSelector } from "@/app/hooks";
import { selectConfiguration } from "@/features/configuration/configurationSlice";

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
  const config = useAppSelector(selectConfiguration);

  const {
    data: subCategoryInfiniteData = {
      pages: [{ data: [] }],
    },
    isLoading: subCatLoading,
    isError: subCatError,
  } = useGetSubCategoriesInfiniteQuery({
    parent_ids: categoryId || "",
    sort_by: "priority",
    sort_order: "DESC",
  });

  const subCategoryData = subCategoryInfiniteData.pages.flatMap(
    (page) => page.data,
  );

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // or whatever your breakpoint is
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const allBanners = config.data?.data.ad_banners || [];
  const categoryBanners = allBanners.filter(
    (banner) => banner.type === "category",
  );

  return (
    <div className="flex h-full gap-1 bg-[#f0f0f5] pt-1">
      <div className="shadow-subcategory-screen flex h-full max-h-full max-w-[250px] flex-8 flex-col rounded-tr-lg bg-white">
        <div className="flex min-h-[40px] items-center gap-3 border-b border-[#282c3f0d] px-3 pt-4 pb-[12px] text-[#02060cbf]">
          <ChevronLeft
            size={20}
            className="cursor-pointer"
            strokeWidth={2.5}
            onClick={() => navigate(-1)}
            color="#02060cbf"
          />
          <div className="hidden w-full flex-1 sm:block">
            <div className="line-clamp-1 text-[16px] leading-4.5 font-medium tracking-[-0.35px] break-words text-[#02060cbf]">
              {categoryData.data.name}
            </div>
          </div>
        </div>
        <ul className="flex flex-1 flex-col items-center gap-6 overflow-y-auto py-6">
          <SubCategorySideBar
            selectedCategoryId={selectedCategoryId}
            categoryData={categoryData.data}
            subCategoryData={subCategoryData}
            handleUpdateCategory={handleUpdateCategory}
          />
        </ul>
      </div>
      <div className="flex w-full flex-col gap-1 overflow-scroll">
        {categoryBanners.length > 0 && (
          <BannerCarousel
            adBanner={categoryBanners}
            type={isMobile ? "mobileCategory" : "category"}
          />
        )}
        <div className="shadow-subcategory-screen w-full flex-1 rounded-tl-lg bg-white">
          <ProductSection
            productData={allProducts}
            totalProuducts={totalProducts}
            onLoadMore={fetchNextPage}
            isFetching={isFetching}
            isLoadingMore={isFetchingNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoriesWithProductScreen;
