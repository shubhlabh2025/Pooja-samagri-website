import { Skeleton } from "@/components/ui/skeleton";

export function HomeSkeleteon() {
  return (
    <div className="space-y-6 px-4 py-6">
      {/* Search + Top Nav skipped for brevity */}

      {/* Categories */}
      <div>
        {/* <Skeleton className="h-6 w-32 mb-4" /> "Categories" heading */}
        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <Skeleton className="h-16 w-16 rounded-xl" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <Skeleton className="h-40 w-full rounded-xl" />

      {/* Trending Products */}
      <div>
        <Skeleton className="mb-4 h-6 w-40" />{" "}
        {/* "Trending Products" heading */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-32 w-full rounded-md" />
              <Skeleton className="h-4 w-24" /> {/* Product name */}
              <Skeleton className="h-4 w-16" /> {/* Price */}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="mb-4 h-6 w-40" />{" "}
        {/* "Trending Products" heading */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-32 w-full rounded-md" />
              <Skeleton className="h-4 w-24" /> {/* Product name */}
              <Skeleton className="h-4 w-16" /> {/* Price */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
