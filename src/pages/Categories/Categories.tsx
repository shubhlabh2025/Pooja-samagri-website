import { SubCategoriesWithProductSkeleton } from "@/components/skeletons/SubCategoriesWithProductSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";
import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

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
    <div className="relative flex flex-col space-y-4 p-2">
      {/* Header with icon and title */}

      {/* Back button on the left */}
      <div className="flex h-16 w-full flex-row items-center border-b border-gray-200 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 flex items-center gap-1 rounded-full bg-gray-200 p-1 hover:bg-gray-300"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-xl">Categories</span>
      </div>

      {/* Responsive Grid */}
      <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {Category.data.map((cat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-sm"
            onClick={() => navigate(`/categories/${cat.id}`)}
          >
            <img loading="lazy"
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
    </div>
  );
};

export default CategoriesScreen;
