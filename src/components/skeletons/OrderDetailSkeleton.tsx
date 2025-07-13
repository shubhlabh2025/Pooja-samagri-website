import { Skeleton } from "../ui/skeleton";

const OrderDetailSkeleton = () => {
  return (
    <div className="hide-scrollbar flex h-full w-full flex-col gap-4 overflow-y-auto px-4 py-6 sm:flex-row sm:px-8">
      <div className="flex w-full flex-col gap-4 sm:w-7/12">
        <Skeleton className="h-64 rounded-xl bg-gray-200" />
        <Skeleton className="h-96 rounded-xl bg-gray-200" />
      </div>

      <div className="flex w-full flex-col gap-4 sm:w-5/12">
        <Skeleton className="h-48 rounded-xl bg-gray-200" />
        <Skeleton className="h-72 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
