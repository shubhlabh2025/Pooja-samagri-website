import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="space-y-10 px-4 py-6">
      {/* Main Product Section */}
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Left Image Column */}
        <div className="flex w-full flex-col items-center space-y-4 lg:w-1/2">
          <Skeleton className="h-64 w-full rounded-lg" /> {/* Main Image */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-16 rounded-md" />
            ))}
          </div>
        </div>

        {/* Right Details Column */}
        <div className="w-full space-y-4 lg:w-1/2">
          <Skeleton className="h-6 w-32" /> {/* Title */}
          <Skeleton className="h-4 w-24" /> {/* Subheading */}
          <Skeleton className="h-5 w-40" /> {/* Rating */}
          <Skeleton className="h-6 w-28" /> {/* Price */}
          <Skeleton className="h-24 w-full rounded-md" /> {/* Description */}
          {/* Quantity */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
          {/* Size Selection */}
          <div>
            <Skeleton className="mb-2 h-5 w-24" />
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-16 rounded-md" />
              ))}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
          <Skeleton className="h-4 w-40" /> {/* Delivery info */}
        </div>
      </div>

      {/* Related Products */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-40" /> {/* "Related Products" */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
