import CartSummaryBanner from "@/components/common/CartSummaryBanner";
import { useGetOrderByIdQuery } from "@/features/orders/orderAPI";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import OrderDetailMainCard from "./OrderDetailMainCard";
import OrderItemSummaryCard from "./OrderItemSummaryCard";
import DelhiveryDetailCard from "./DelhiveryDetailCard";
import PaymentSummaryCard from "./PaymentSummaryCard";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const {
    data: orderDetails = { data: null },
    // isError,
    // isLoading,
  } = useGetOrderByIdQuery(orderId!);

  console.log("orderDetails", orderDetails);

  const navigate = useNavigate();

  if (!orderDetails.data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-lg text-gray-600">Order not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#f0f0f5]">
      <div className="shadow-cart-card flex items-center gap-2 bg-white p-3">
        <ChevronLeft
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="line-clamp-1 text-lg leading-[21px] font-semibold -tracking-[0.4px] text-[#02060cbf]">
          Order Details
        </p>
      </div>
      <div className="hide-scrollbar flex h-full max-h-full w-full flex-1 flex-col gap-4 overflow-scroll px-4 py-6 sm:flex-row sm:px-8">
        <div className="flex w-full flex-col gap-4 sm:flex-7">
          <OrderDetailMainCard orderDetails={orderDetails.data} />
          <OrderItemSummaryCard orderDetails={orderDetails.data} />
        </div>
        <div className="flex w-full flex-col gap-4 sm:flex-5">
          <DelhiveryDetailCard orderAddress={orderDetails.data.order_address} />
          <PaymentSummaryCard orderDetails={orderDetails.data} />
        </div>
      </div>
      <CartSummaryBanner />
    </div>
  );
};

export default OrderDetail;
