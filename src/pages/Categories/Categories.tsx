import { SubCategoriesWithProductSkeleton } from "@/components/skeletons/SubCategoriesWithProductSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";
import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import { useNavigate } from "react-router";
import SimpleNavBar from "@/components/common/SimpleNavBar";
import { useEffect, useState } from "react";

const CategoriesScreen = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 12;

  const {
    data: categoryResponse = {
      data: [],
      meta: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: categoriesPerPage,
      },
    },
    isError: CategoryError,
    isLoading: CategoryLoading,
  } = useGetCategoriesQuery({
    page: currentPage,
    limit: categoriesPerPage,
    sort_by: "priority",
    sort_order: "DESC",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalPages = categoryResponse.meta.totalPages;
  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (CategoryLoading) {
    return <SubCategoriesWithProductSkeleton isSideBarVisible={false} />;
  }

  if (CategoryError) {
    return <ErrorScreen />;
  }

  return (
    // FIXED: Added proper scrolling container with height constraints and always visible scrollbar
    <div
      className="relative h-screen w-full overflow-y-scroll bg-gray-50"
      style={{ scrollbarWidth: "auto", msOverflowStyle: "scrollbar" }}
    >
      {/* Header - Fixed at top */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <SimpleNavBar navBarText={"Categories"} />
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col space-y-4 p-4">
        {/* Responsive Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categoryResponse.data.map((cat) => (
            <div
              key={cat.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-sm transition-transform duration-200 hover:scale-105"
              onClick={() => navigate(`/categories/${cat.id}`)}
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

        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-orange-500 text-white shadow-sm"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, categoryResponse.meta.totalPages),
                )
              }
              disabled={currentPage === categoryResponse.meta.totalPages}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Bottom spacing to ensure last items are visible */}
        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default CategoriesScreen;
