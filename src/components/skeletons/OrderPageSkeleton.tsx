import { Skeleton } from "@/components/ui/skeleton";

export default function OrderPageSkeleton() {
  return (
    <div className="hide-scrollbar flex h-full max-h-full flex-1 flex-col gap-4 overflow-scroll px-4 py-6 sm:px-8">
      {[...Array(8)].map((_, idx) => (
        <div
          className="flex w-full flex-col rounded-[12px] bg-white shadow-sm"
          key={idx}
        >
          <div className="flex w-full flex-wrap items-center border-b border-[#E9E9EB] px-4 pt-2 pb-1.5 sm:flex-nowrap sm:justify-between">
            <div className="w-1/2 text-[#02060ca6] sm:w-auto sm:pr-0">
              <Skeleton className="h-3.5 w-20" />
            </div>
            <div className="flex w-1/2 flex-row justify-end text-right sm:w-auto sm:text-left">
              <Skeleton className="h-3.5 w-20" />
            </div>
            <div className="mt-1 w-1/2 sm:mt-0 sm:w-auto sm:pr-0">
              <Skeleton className="h-3.5 w-20" />
            </div>
            <div className="mt-1 w-1/2 text-right sm:mt-0 sm:w-auto sm:text-left">
              <Skeleton className="h-3.5 w-20" />

              <Skeleton className="h-3.5 w-20" />
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3">
            <div className="flex justify-between">
              <Skeleton className="h-3.5 w-20" />

              <Skeleton className="h-3.5 w-20" />
            </div>
            <div className="sm:items-en flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex gap-2 sm:min-w-[262px]">
                {[...Array(4)].map((_, index) => (
                  <div
                    className="flex items-center justify-center rounded-[4px]"
                    key={index}
                  >
                    <Skeleton className="h-9 w-9" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-8.5 w-full sm:w-[35%]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
