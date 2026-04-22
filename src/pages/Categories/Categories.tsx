import { SubCategoriesWithProductSkeleton } from "@/components/skeletons/SubCategoriesWithProductSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";
import { useGetInfiniteCategoriesInfiniteQuery } from "@/features/category/categoryAPI";
import { useNavigate } from "react-router";
import SimpleNavBar from "@/components/common/SimpleNavBar";
import { useEffect, useRef } from "react";
import { buildCategoryPath } from "@/utils/productSlug";

const CategoriesScreen = () => {
  const navigate = useNavigate();
  const categoriesPerPage = 12;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: categoryResponse = {
      pages: [],
      pageParams: [],
    },
    isError: CategoryError,
    isLoading: CategoryLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteCategoriesInfiniteQuery({
    limit: categoriesPerPage,
    sort_by: "priority",
    sort_order: "DESC",
  });

  const categories = categoryResponse.pages.flatMap((page) => page.data);

  useEffect(() => {
    const loadMoreNode = loadMoreRef.current;
    const scrollRoot = scrollContainerRef.current;

    if (!loadMoreNode || !scrollRoot || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      {
        root: scrollRoot,
        rootMargin: "200px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(loadMoreNode);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (CategoryLoading) {
    return <SubCategoriesWithProductSkeleton isSideBarVisible={false} />;
  }

  if (CategoryError) {
    return <ErrorScreen />;
  }

  return (
    <div
      ref={scrollContainerRef}
      className="relative h-screen w-full overflow-y-scroll bg-gray-50"
      style={{ scrollbarWidth: "auto", msOverflowStyle: "scrollbar" }}
    >
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <SimpleNavBar navBarText={"Categories"} />
      </div>

      <div className="flex flex-col space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-sm transition-transform duration-200 hover:scale-105"
              onClick={() => navigate(buildCategoryPath(cat.name, cat.id))}
            >
              <img
                loading="lazy"
                src={cat.image}
                alt={cat.name}
                className="h-40 w-full object-cover md:h-60"
              />

              <div className="absolute bottom-0 w-full bg-black/70 py-2 text-center text-sm font-semibold text-white">
                {cat.name}
              </div>
            </div>
          ))}
        </div>

        <div ref={loadMoreRef} className="flex justify-center py-2">
          {isFetchingNextPage && (
            <div className="text-sm font-medium text-gray-500">
              Loading more categories...
            </div>
          )}

          {!hasNextPage && categories.length > 0 && (
            <div className="text-sm font-medium text-gray-400">
              You have reached the end.
            </div>
          )}
        </div>

        {categories.length === 0 && (
          <div className="py-8 text-center text-sm font-medium text-gray-500">
            No categories found.
          </div>
        )}

        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default CategoriesScreen;
