import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <div className="min-h-screen bg-[#f7f7f9] p-4">
      <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Section: Review Your Order */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-lg bg-white p-4">
            <Skeleton className="mb-4 h-5 w-40" /> {/* Heading */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b py-3 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="ml-4 h-5 w-16" />
                </div>
              </div>
            ))}
          </div>

          <Skeleton className="mx-auto h-4 w-48" />

          <div className="flex items-center justify-between rounded-lg bg-white p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-4" />
          </div>

          <div className="space-y-2 rounded-lg bg-white p-4">
            <Skeleton className="mb-2 h-5 w-36" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-44" />
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* Right Section: Bill Details */}
        <div className="space-y-4">
          <div className="space-y-3 rounded-lg bg-white p-4">
            <Skeleton className="mb-3 h-5 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <div className="pt-2">
              <Skeleton className="h-5 w-36" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Pay Button */}
      <div className="sticky right-0 bottom-0 left-0 bg-white px-6 py-4">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
}
