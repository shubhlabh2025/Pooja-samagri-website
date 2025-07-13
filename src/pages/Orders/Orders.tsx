import CartSummaryBanner from "@/components/common/CartSummaryBanner";
import OrderCard from "@/components/custom/card/OrderCard";
import { useGetOrdersInfiniteQuery } from "@/features/orders/orderAPI";
import EmptyOrder from "./EmptyOrder";
import OrderPageSkeleton from "@/components/skeletons/OrderPageSkeleton";
import SimpleNavBar from "@/components/common/SimpleNavBar";
import { useCallback, useRef } from "react";
import { Loader } from "lucide-react";

const Orders = () => {
  const {
    data: infiniteOrdersData = {
      pages: [
        {
          data: [],
        },
      ],
    },
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetOrdersInfiniteQuery({ limit: 30 });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 },
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isFetchingNextPage, fetchNextPage],
  );

  const allOrders = infiniteOrdersData.pages.flatMap((page) => page.data);

  if (isLoading) {
    return (
      <div>
        <SimpleNavBar navBarText="Your Orders" />
        <OrderPageSkeleton />;
      </div>
    );
  }
  if (allOrders.length === 0) {
    return <EmptyOrder />;
  }

  console.log("infiniteOrdersData", infiniteOrdersData);
  console.log("isLoading", isLoading);
  console.log("isError", isError);
  console.log("isFetchingNextPage", isFetchingNextPage);
  console.log("isFetching", isFetching);

  return (
    <div className="flex h-full flex-col bg-[#f0f0f5]">
      <SimpleNavBar navBarText="Your Orders" />

      <div className="hide-scrollbar flex h-full max-h-full flex-1 flex-col gap-4 overflow-scroll px-4 py-6 sm:px-8">
        {allOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        <div ref={loadingRef} className="flex w-full justify-center">
          {isFetchingNextPage ? (
            <Loader
              size={50}
              color="#ff5200"
              className="animate-spinner-leaf-fade p-2"
            />
          ) : (
            <div className="" />
          )}
        </div>
      </div>
      <CartSummaryBanner />
    </div>
  );
};

export default Orders;
