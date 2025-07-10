import CartSummaryBanner from "@/components/common/CartSummaryBanner";
import OrderCard from "@/components/custom/card/OrderCard";
import { useGetOrdersInfiniteQuery } from "@/features/orders/orderAPI";
import EmptyOrder from "./EmptyOrder";
import OrderPageSkeleton from "@/components/skeletons/OrderPageSkeleton";
import SimpleNavBar from "@/components/common/SimpleNavBar";

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
    // fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetOrdersInfiniteQuery({ limit: 30 });

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
      </div>
      <CartSummaryBanner />
    </div>
  );
};

export default Orders;
