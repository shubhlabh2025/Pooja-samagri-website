import { SubCategoriesWithProductSkeleton } from "@/components/custom/skeletons/SubCategoriesWithProductSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";
import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

// const categories = [
//   {
//     title: "TEMPLE COLLECTION",
//     image:
//       "https://phool.co/cdn/shop/products/IMG_5524_1024x1024.jpg?v=1660634500",
//   },
//   {
//     title: "MOSQUITO REPELLENTS",
//     image:
//       "https://phool.co/cdn/shop/products/IMG_5524_1024x1024.jpg?v=1660634500",
//   },
//   {
//     title: "BAMBOOLESS INCENSE STICKS",
//     image:
//       "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
//   },
//   {
//     title: "GIFT BOXES",
//     image:
//       "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/z89a4dpw9tupoz16dsuc",
//   },
//   {
//     title: "PREMIUM INCENSE",
//     image:
//       "https://phool.co/cdn/shop/products/IMG_5524_1024x1024.jpg?v=1660634500",
//   },
// ];

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
    <div className="relative flex flex-col space-y-4 bg-[#fefbf5] p-2">
      {/* Header with icon and title */}

      {/* Back button on the left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 mr-2 flex items-center gap-1 rounded-full bg-gray-200 p-1 hover:bg-gray-300"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Responsive Grid */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {Category.data.map((cat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-sm"
            onClick={() => navigate(`/categories/${cat.id}`)}
          >
            <img
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
