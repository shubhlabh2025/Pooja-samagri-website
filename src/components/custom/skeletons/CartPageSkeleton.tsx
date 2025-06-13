import { Skeleton } from "@/components/ui/skeleton";

export function CartPageSkeleton() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Review Your Order Title */}
      <Skeleton className="h-6 w-40" />

      {/* Cart Items */}
      <div className="space-y-4 rounded-lg bg-white p-4 shadow-sm">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            {/* Product info */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Quantity + Price */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>

      {/* Missed something */}
      <Skeleton className="h-10 w-full rounded-md" />

      {/* Coupon */}
      <div className="space-y-2 rounded-lg bg-white p-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Right - Bill Details */}
      <div className="space-y-2 rounded-lg bg-white p-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="space-y-2 rounded-lg bg-white p-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Place Order Footer */}
      <div className="fixed right-0 bottom-0 left-0 bg-white px-4 py-3 shadow-md">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
}
