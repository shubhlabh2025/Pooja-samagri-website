import { Skeleton } from "@/components/ui/skeleton";

export function SubCategoriesWithProductSkeleton({ isSideBarVisible = true }) {
  return (
    <div className="flex flex-row gap-4 px-4 py-6">
      {/* Sidebar Skeleton - stacked vertically */}
      {isSideBarVisible && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-6 rounded-full md:w-10" />
              <Skeleton className="h-4 w-16 md:w-24" />
            </div>
          ))}
        </div>
      )}

      {/* Products Skeleton Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-7">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="space-y-4 rounded-lg border p-4 shadow-sm">
            <Skeleton className="h-6 w-16 rounded" /> {/* Discount Badge */}
            <Skeleton className="h-40 w-full rounded-lg" />{" "}
            {/* Product Image */}
            <Skeleton className="h-5 w-16" /> {/* Product Title */}
            <Skeleton className="h-4 w-20" /> {/* Description */}
            <Skeleton className="h-4 w-16" /> {/* Quantity */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" /> {/* Add Button */}
          </div>
        ))}
      </div>
    </div>
  );
}
