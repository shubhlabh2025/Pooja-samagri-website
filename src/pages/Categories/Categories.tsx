import { SubCategoriesWithProductSkeleton } from "@/components/skeletons/SubCategoriesWithProductSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";
import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import { useNavigate } from "react-router";
import SimpleNavBar from "@/components/common/SimpleNavBar";

const CategoriesScreen = () => {
  const navigate = useNavigate();

  const {
    data: Category = {
      data: [],
    },
    isError: CategoryError,
    isLoading: CategoryLoading,
  } = useGetCategoriesQuery({
    limit: 30,
    sort_by: "priority",
    sort_order: "DESC",
  });

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
          {Category.data.map((cat, index) => (
            <div
              key={index}
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

        {/* Bottom spacing to ensure last items are visible */}
        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default CategoriesScreen;
