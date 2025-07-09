import CartSummaryBanner from "@/components/common/CartSummaryBanner";
import OrderCard from "@/components/custom/card/OrderCard";
import { useGetOrdersInfiniteQuery } from "@/features/orders/orderAPI";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

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

  console.log("infiniteOrdersData", infiniteOrdersData);
  console.log("isLoading", isLoading);
  console.log("isError", isError);
  console.log("isFetchingNextPage", isFetchingNextPage);
  console.log("isFetching", isFetching);

  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-[#f0f0f5]">
      <div className="shadow-cart-card flex items-center gap-2 bg-white p-3">
        <ChevronLeft
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="line-clamp-1 text-lg leading-[21px] font-semibold -tracking-[0.4px] text-[#02060cbf]">
          Your Orders
        </p>
      </div>
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
